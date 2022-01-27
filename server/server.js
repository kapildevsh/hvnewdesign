/* eslint-disable @typescript-eslint/no-var-requires */

const { program } = require('commander');

program
  .option('-p, --port <number>', 'port of server', process.env.PORT || '5050')
  .option('--host <string>', 'hostname of server', process.env.HOST || 'localhost')
  .option('--prod', 'Run in production mode')
  .option('--open', 'Open url in browser when server starts')
  .option('--dry', 'do not start server')
  .option('--debug', 'print command line')
  .option('--enable-swagger', 'Enable swagger UI')
  .option('--timeout <duration>', 'request timeout', '2s');

program.parse(process.argv);
const cliOpts = program.opts();

if (cliOpts.debug || cliOpts.dry) console.log(cliOpts);
if (!+cliOpts.port) throw new Error('Bad Port value: ' + cliOpts.port);
if (cliOpts.dry) process.exit();

const chalk = require('chalk');
const express = require('express');
const app = express();

const morgan = require('morgan');
const multer = require('multer')({ dest: './api/uploads' });

const Jabber = require('jabber');
const jabber = new Jabber();

const lodash = require('lodash');
const { writeFileSync, renameSync } = require('fs');
const uploads = {};
let id_start = process.hrtime()[0];

app.use(require('connect-timeout')(cliOpts.timeout));
app.use(require('compression')());
app.set('trust proxy', 1); // trust first proxy
app.use(
  require('express-session')({
    secret: 'happy_vivah',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    unset: 'destroy',
  })
);

const database = require('./data.db.json');

function saveDatabase() {
  writeFileSync('./data.db.json', JSON.stringify(database, null, 2));
}

const random = seed => Math.floor(Math.random() * seed);

let chatUserList;
let chatMsgId = 1000;

app.use(morgan('tiny'));
app.use(express.static('.'));

app.get('/exit', () => {
  console.log('exiting app');
  return process.exit(0);
});

cliOpts.enableSwagger && require('./swagger-ui')(app);

function emailToId(email) {
  if (!email.includes('@')) throw new Error();

  email = email.split('@');
  const emailProvider = email[1].toLowerCase();
  database.emailIndices = database.emailIndices || [];

  let emailIndex = database.emailIndices.indexOf(emailProvider);
  if (emailIndex < 0) database.emailIndices.push(emailProvider);
  emailIndex = database.emailIndices.indexOf(emailProvider);

  return email[0] + emailIndex;
}

function partialUser(user) {
  if (!user) return user;
  const { id, firstName, lastName, img, userType } = user;
  return { id, firstName, lastName, img, userType };
}

app.get('/api/echo', (req, res) => {
  if (!req.query?.msg) return res.status(400).send('No "msg" query param found');
  res
    .status(200)
    .type('text/plain')
    .send(req.query.msg);
});
app.get('/favicon.ico', (_, res) => res.sendStatus(404));
app.post('/api/logout', (req, res) => req.session.destroy(() => res.sendStatus(200)));
app.get('/api/login/check', (req, res) => {
  const user = database.profiles[req.session?.loggedInUser];
  return user ? res.jsonp(partialUser(user)) : res.sendStatus(204);
});
app.get('/api/interestRequestSent/:profileId?', (req, res) => {
  if (!req.session?.loggedInUser || !req.params.profileId || req.session?.loggedInUser === req.params.profileId) {
    return res
      .status(200)
      .type('text/plain')
      .send('false');
  }

  return res
    .status(200)
    .type('text/plain')
    .send('true');
});
app.get('/api/perfectMatch', (req, res) => {
  if (!req.session?.loggedInUser) return res.sendStatus(401);
  return res.jsonp(database.profiles[req.session?.loggedInUser]?.perfectMatch || []);
});
app.get('/api/homeData', (req, res) => {
  if (!req.session?.loggedInUser) return res.sendStatus(401);
  const { matches, premiumProfiles, recentlyUpdated } = database;
  return res.jsonp({ user: database.profiles[req.session.loggedInUser], matches, premiumProfiles, recentlyUpdated });
});
app.post('/api/login', express.urlencoded({ extended: false }), (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res
      .status(400)
      .type('text/plain')
      .send('Invalid Email or Password');

  const id = emailToId(email);
  let user = database.profiles[id];

  if (!user)
    return res
      .status(400)
      .type('text/plain')
      .send('Email not Registered');
  if (user.password !== password)
    return res
      .status(400)
      .type('text/plain')
      .send('Invalid password');

  req.session.loggedInUser = user.id;
  return res.sendStatus(204);
});
app.post('/api/gallery/remove/:itemId', (req, res) => {
  if (uploads[req.session.loggedInUser]) {
    let index = uploads[req.session.loggedInUser].findIndex(item => item.id === +req.params.itemId);
    if (index < 0) return res.sendStatus(400);

    uploads[req.session.loggedInUser].splice(index, 1);
  }
  return res.sendStatus(200);
});
app.post('/api/gallery/upload', multer.array('photos[]'), (req, res) => {
  if (!req.files?.length) return res.sendStatus(204);

  uploads[req.session.loggedInUser] = req.files
    .map(file => {
      const newPath = file.path + '-' + file.originalname;
      renameSync(file.path, newPath);
      return {
        img: newPath,
        date: new Date(),
        id: id_start++,
      };
    })
    .concat(uploads[req.session.loggedInUser] || []);
  res.sendStatus(200);
});
app.get('/api/similarProfiles', (req, res) => {
  res.jsonp(database.similarProfiles);
});
app.get('/api/profileData/:profileId?', (req, res) => {
  if (!req.params.profileId) return res.sendStatus(401);
  let data = database.profiles[req.params.profileId];

  if (!data) return res.sendStatus(404);

  res.jsonp(data);
});
app.get('/api/gallery/:profileId?', (req, res) => {
  if (!req.params.profileId) return res.sendStatus(401);
  // let data = database.galleries[req.params.profileId];
  let data = database.galleries.hansika0;

  if (!data) return res.sendStatus(404);

  data = req.session.loggedInUser === req.params.profileId ? Object.values(data).flatMap(d => d) : data.public || [];
  const user = database.profiles[req.params.profileId || req.session.loggedInUser];

  if (user?.id === req.session.loggedInUser) data = (uploads[req.session.loggedInUser] || []).concat(data);
  res.jsonp({ owner: partialUser(user), data });
});
app.get('/api/chatUserList', (req, res) => {
  if (!req.session?.loggedInUser) return res.sendStatus(401);

  chatUserList =
    chatUserList ||
    Array.from({ length: Number(req.query.userCount || 50) }, (_, n) => ({
      id: n + 100,
      name: jabber.createFullName(false),
      active: n < 4 && Math.random() * 2 > 1,
      avatar: `/images/profile${random(8) + 1}.jpg`,
      newMsgCount: n < 10 && random(10),
      lastChat: {
        ownerId: n + 100,
        msg: jabber.createParagraph(random(10) + 2),
        date: new Date().setDate(random(new Date().getDate())),
      },
    }));

  res.jsonp(chatUserList);
});
app.post('/api/send-msg', express.urlencoded({ extended: false }), (req, res) => {
  const { to, msg } = req.body;
  if (!to || !msg) return res.sendStatus(400);

  return res.jsonp({
    id: ++chatMsgId,
    ownerId: req.session?.loggedInUser,
    to: +to,
    msg,
    date: new Date().setDate(random(new Date().getDate())),
  });
});
app.get('/api/chatData/:user2Id', (req, res) => {
  if (!req.session?.loggedInUser) return res.sendStatus(401);

  const user2 = +req.params.user2Id;
  const data = chatUserList?.find(t => t.id === user2);

  if (!data)
    return res
      .status(404)
      .type('text/plain')
      .send('Not Found');

  res.jsonp(
    Array.from({ length: Number(req.query.chatCount || 50) }, () => ({
      id: ++chatMsgId,
      ownerId: Math.random() > 0.5 ? req.session.loggedInUser : user2.id,
      msg: jabber.createParagraph(random(10) + 2),
      date: new Date().setDate(random(new Date().getDate())),
    }))
  );
});

app.post('/api/register', express.json(), (req, res) => {
  const data = req.body;
  data.id = emailToId(data.email);
  if (database.profiles[data.id])
    return res
      .status(409)
      .type('text/plain')
      .send('A user is already registered with given email');

  database.profiles[data.id] = data;

  database.loggedInUser = data.id;
  saveDatabase();
  return data.id;
});

app.post('/api/mb-search/result', express.json(), (req, res) => {
  return res.jsonp(database['mb-search'].result);
});
app.get('/api/*', (req, res) => {
  const path = req.path
    ?.substr(5)
    .replace(/\.+/g, '__')
    .replace(/\//g, '.')
    .trim();
  const data = path && lodash.get(database, path);
  return data
    ? res.jsonp(data)
    : res
        .status(404)
        .type('text/plain')
        .send('Not resource found for path: ' + path);
});

if (!cliOpts.prod) {
  app.use(require('errorhandler'));
}

const callback = () => {
  console.log();
  console.log(
    chalk.green('start server at: '),
    chalk.yellow(`http://${cliOpts.host}:${cliOpts.port}`),
    cliOpts.prod ? chalk.green('(prod)') : chalk.red('(dev)')
  );
  cliOpts.enableSwagger &&
    console.log(chalk.green('Swagger UI enabled: '), `http://${cliOpts.host}:${cliOpts.port}/swagger`);
  console.log();

  if (cliOpts.open) {
    require('openurl').open(`http://${cliOpts.host}:${cliOpts.port}`);
  }
};

if (cliOpts.host !== 'localhost') app.listen(+cliOpts.port, cliOpts.host, callback);
else app.listen(+cliOpts.port, callback);

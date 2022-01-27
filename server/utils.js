/* eslint-disable @typescript-eslint/no-var-requires */

const { readdirSync, readFileSync, writeFileSync, createReadStream, createWriteStream, existsSync } = require('fs');
const { join } = require('path');
const { argv } = require('process');
const { pipeline } = require('stream');
const { promisify } = require('util');
const { createGzip } = require('zlib');

function build_data_db(write) {
  function create(dir) {
    return readdirSync(dir).reduce((acc, curr) => {
      if (curr.endsWith('.json')) {
        try {
          const json = readFileSync(join(dir, curr), 'utf-8');
          acc[curr.substring(0, curr.length - 5)] = json.trim().length !== 0 ? JSON.parse(json) : {};
        } catch (error) {
          console.log(join(dir, curr));
          throw error;
        }
      } else {
        acc[curr] = create(join(dir, curr));
      }

      return acc;
    }, {});
  }
  if (write) {
    writeFileSync('./data.db.json', JSON.stringify(create('./data'), null, 2));
    console.log('created: ', './data.db.json');
  } else return create('./data');
}

function updateIndex() {
  const p = '../dist/index.html';
  if (existsSync(p)) writeFileSync(p, readFileSync(p, 'utf-8').replace(/ type="module"/g, ''));
  else console.log('File not Found: ', p);
}

(async function main() {
  if (argv.includes('build')) {
    build_data_db(true);
  }

  if (argv.includes('compress')) {
    const gzip = createGzip();
    const src = createReadStream('./data.db.json');
    const outPath = (argv.includes('--prod') ? './dist' : './') + 'data.db.json.gz';
    const out = createWriteStream(outPath);

    await promisify(pipeline)(src, gzip, out);
    console.log('created: ', outPath);
  }

  if (argv.includes('update-index')) {
    updateIndex();
  }
})();

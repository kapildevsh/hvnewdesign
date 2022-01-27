/* eslint-disable @typescript-eslint/no-var-requires */

const { existsSync, readFileSync } = require('fs');
const { join } = require('path');

function defaultDir() {
  const swaggerDir = existsSync('./swagger-ui-dist') ? './swagger-ui-dist' : './node_modules/swagger-ui-dist';
  if (!existsSync(swaggerDir)) throw new Error("not Found: './swagger-ui-dist' or './node_modules/swagger-ui-dist'");

  return join(__dirname, swaggerDir);
}

module.exports = function init(app, swaggerDistDir = defaultDir(), urlPath = '/swagger') {
  if (!existsSync(swaggerDistDir)) throw new Error('Dir not found: ' + swaggerDistDir);

  const YAML = require('yamljs');

  app.get(urlPath, (_, res) => {
    const data = readFileSync(join(swaggerDistDir, 'index.html'), 'utf-8').replace(
      'https://petstore.swagger.io/v2/swagger.json',
      '/swagger/swagger.json'
    );

    return res
      .status(200)
      .type('text/html')
      .send(data);
  });
  app.get(urlPath + '/swagger.json', (_, res) => res.jsonp(YAML.load('./swagger.yaml')));
  app.get(urlPath + '/:filename', (req, res) => res.sendFile(join(swaggerDistDir, req.params.filename)));
};

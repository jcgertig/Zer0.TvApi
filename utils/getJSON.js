const http = require('http');
const https = require('https');

const method = {
  http: http,
  https: https
};

function getJSON(url, moddify = (i) => i) {
  return new Promise(function(accept, reject) {
    method[url.trim().indexOf('https') === 0 ? 'https' : 'http'].get(url, (res) => {
      const { statusCode, statusMessage } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}\n` +
                          `Status Message: ${statusMessage}`);
      }
      if (error) {
        console.error(error.message);
        reject();
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          accept(moddify(parsedData));
        } catch (e) {
          reject();
          console.error(e.message);
        }
      });
    }).on('error', (e) => {
      reject();
      console.error(`Got error: ${e.message}`);
    });
  });
}

module.exports = getJSON;

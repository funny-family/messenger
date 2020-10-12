const fs = require('fs');

const fileName = 'errors.log';

fs.watchFile('../src/logs/errors.log', '', (err) => {
  if (err) {
    console.log('\x1b[31m', `Cannot create file ${fileName}!`);
    throw err;
  }

  console.log('Results Received');
});

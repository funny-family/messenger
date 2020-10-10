const fs = require('fs');
const path = require('path');

const fileDirectory = path.join(__dirname, '/../src/logs/errors.log');

fs.truncate(fileDirectory, 0, (err) => {
  if (err) {
    console.log('\x1b[31m', `Cannot clean file content in "${fileDirectory}" directory.`);
    throw err;
  }

  console.log('File is cleaned!');
});

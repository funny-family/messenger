const fs = require('fs');
const path = require('path');

const fileName = 'errors.log';
const fileDirectory = path.join(__dirname, `../src/logs/${fileName}`);

if (fs.existsSync(fileDirectory)) {
  fs.truncate(fileDirectory, 0, (err) => {
    if (err) {
      console.log('\x1b[31m', `Cannot clean file content in "${fileDirectory}" directory.`);
      throw err;
    }

    console.log('File is cleaned!');
  });
} else {
  console.log('\x1b[31m', `Cannot find ${fileName} in ${fileDirectory} directory!`);
}

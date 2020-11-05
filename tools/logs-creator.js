const fs = require('fs');
const path = require('path');

const fileName = 'errors.log';
const fileDirectory = path.join(__dirname, `../src/logs/${fileName}`);

if (fs.existsSync(fileDirectory)) {
  console.log('\x1b[33m', `${fileName} is already exists!`);
} else {
  fs.writeFile(fileDirectory, '', (err) => {
    if (err) {
      console.log('\x1b[31m', `Cannot create ${fileName} file!`);
      throw err;
    }

    console.log('\x1b[36m', `${fileName} file is clear!`);
  });
}

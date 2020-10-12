const fs = require('fs');
const path = require('path');

const fileName = 'errors.log';
const fileDirectory = path.join(__dirname, `/../src/logs/${fileName}`);

if (fs.existsSync(fileDirectory)) {
  console.log(`${fileName} is already exists!`);
} else {
  fs.writeFile(fileDirectory, '', (err) => {
    if (err) {
      console.log('\x1b[31m', `Cannot create file ${fileName}!`);
      throw err;
    }

    console.log('Log file is created!');
  });
}

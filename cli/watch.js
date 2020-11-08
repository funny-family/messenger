const fs = require('fs');
const path = require('path');

const modulesDirectory = path.join(__dirname, '../src/modules');

fs.readdir(modulesDirectory, (err, files) => {
  if (err) {
    console.log('Readdir error!');
    throw err;
  }

  files.forEach((moduleFolder) => {
    console.log(moduleFolder);
  });
});

// fs.readdirSync(modulesDirectory).forEach((file) => {
//   console.log('use readdirSync:', file);
// });

// fs.watch(modulesDirectory, { encoding: 'buffer' }, (eventType, filename) => {
//   console.log('eventType:', eventType);
//   console.log('watching:', filename);
// });

// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
// https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5

// https://stackoverflow.com/questions/13695046/watch-a-folder-for-changes-using-node-js-and-print-file-paths-when-they-are-cha
// https://bezkoder.com/node-js-watch-folder-changes/

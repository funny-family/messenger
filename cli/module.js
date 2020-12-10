const fs = require('fs');
const path = require('path');

// eslint-disable-next-line
const modulesDirectory = path.join(__dirname, '../src/application/modules');

function getFolderListInDirectory(source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function createNewFolderIn(directory, folderName) {
  if (typeof folderName !== 'string') {
    throw new TypeError('Folder name must be type string!');
  }

  if (!folderName) {
    throw new Error('Folder name is required!');
  }

  return fs.mkdir(path.join(directory, folderName), (err) => {
    if (err) {
      console.log('Cannot create folder in directory!');
      throw err;
    }
  });
}

// console.log(getFolderListInDirectory(path.join(__dirname, '../src/application/modules')));

class Module {
  constructor(name, directory) {
    this.name = name;
    this.directory = directory;
  }

  create() {
    if (fs.existsSync(this.directory)) {
      getFolderListInDirectory(this.directory).forEach((folderName) => {
        if (folderName === this.name) {
          console.error(`Module name ${this.name} is already used!`);
        }

        createNewFolderIn(this.directory, 'some name');
      });
    } else {
      console.error(`Cannot create module ${this.name} in ${this.directory} directory!`);
    }
  }
}

// eslint-disable-next-line
class FileTemplate {
  constructor(template) {
    this.template = template;

    if (typeof this.template !== 'string') {
      throw new TypeError('Template arguments in constructor must be type of string!');
    }
  }
}


class ModuleCommandsRunner {
  constructor(module) {
    this.module = module;
  }

  run() {
    return this.module;
  }
}

new ModuleCommandsRunner(new Module()).run();

const firstParsedArgv = (
  JSON.parse(process.env.npm_config_argv).original[2] ||
  JSON.parse(process.env.npm_config_argv).cooked[2]
).toString().match(/\w/g).join('');
console.log(firstParsedArgv);

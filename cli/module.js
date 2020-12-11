const fs = require('fs');
const path = require('path');

// eslint-disable-next-line
const modulesDirectory = path.join(__dirname, '../src/application/modules');
const moduleNameFromScript = (
  JSON.parse(process.env.npm_config_argv).original[2] ||
  JSON.parse(process.env.npm_config_argv).cooked[2]
).toString().match(/\w/g).join('');

function getFolderListInDirectory(source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function createFolderIn(directory, folderName) {
  if (typeof folderName !== 'string') {
    throw new TypeError('Folder name must be type string!');
  }

  if (!folderName) {
    throw new Error('Folder name is required!');
  }

  fs.mkdir(path.join(directory, folderName), (err) => {
    if (err) {
      console.log(`Cannot create folder in ${directory} directory!`);
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
          return;
        }

        // const createdModuleDirectory = path.join(this.directory, moduleNameFromScript);

        createFolderIn(this.directory, moduleNameFromScript);

        // if (fs.existsSync(createdModuleDirectory)) {
        //   createFolderIn(this.directory, 'services');
        // } else {
        //   console.error(`Cannot create service folder in ${this.directory} directory!`);
        // }
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
    this.module.create();
  }
}

new ModuleCommandsRunner(new Module(moduleNameFromScript, modulesDirectory)).run();

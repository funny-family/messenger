const fs = require('fs');
const path = require('path');

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

  fs.mkdir(path.join(directory, folderName), { recursive: true }, (err) => {
    if (err) {
      console.error('\x1b[31m', `Cannot create folder in ${directory} directory!`);
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
    if (!fs.existsSync(this.directory)) {
      console.error('\x1b[31m', `Cannot create module ${this.name} in ${this.directory} directory!`);
      return;
    }

    getFolderListInDirectory(this.directory).forEach((folderName) => {
      if (folderName === this.name) {
        console.error('\x1b[31m', `Module name ${this.name} is already exists!`);
        return;
      }
    });

    createFolderIn(this.directory, moduleNameFromScript);

    const createdModuleDirectory = path.join(this.directory, moduleNameFromScript);

    if (!fs.existsSync(createdModuleDirectory)) {
      console.error('\x1b[31m', `Cannot create service folder in ${createdModuleDirectory} directory!`);
      return;
    }

    createFolderIn(createdModuleDirectory, 'services');
    console.log('\x1b[36m', `Module ${this.name} is created!`);
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

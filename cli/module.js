const fs = require('fs');
const path = require('path');

function getFolderList(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((directoryEntry) => directoryEntry.isDirectory())
    .map((directoryEntry) => directoryEntry.name);
}

function createFolder(directory, name) {
  if (typeof name !== 'string') {
    throw new TypeError('Folder name must be type string!');
  }

  if (!name) {
    throw new Error('Folder name is required!');
  }

  fs.mkdir(path.join(directory, name), { recursive: true }, (err) => {
    if (err) {
      console.error('\x1b[31m', `Cannot create folder in ${directory} directory!`);
      throw err;
    }
  });
}

function createFile(directory, name, content = '') {
  fs.writeFile(path.join(directory, name), content, (err) => {
    if (err) throw err;
  });
}

function readFile(directory) {
  return fs.readFileSync(directory, 'utf8');
}


class FileTemplateNormalizer {
  constructor(fileString, keyWord, replacer) {
    this.fileString = fileString;
    this.replacer = replacer;
    this.keyWord = keyWord;
  }

  normalize() {
    if (typeof this.fileString !== 'string') {
      throw new TypeError('File must be a string!');
    }

    const replacerRegExp = new RegExp(this.keyWord, 'g');
    return this.fileString.replace(replacerRegExp, this.replacer);
  }
}

class Module {
  constructor(name, directory) {
    this.name = name;
    this.directory = directory;
  }

  create() {
    if (!fs.existsSync(this.directory)) {
      console.error('\x1b[31m', `Cannot create module ${this.name} in ${this.directory} directory!`);
      process.exit(0);
    }

    getFolderList(this.directory).forEach((folderName) => {
      if (folderName === this.name) {
        console.error('\x1b[31m', `Module name ${this.name} is already exists!`);
        process.exit(0);
      }
    });

    const controllerFileTemplate = readFile(path.join(__dirname, './file-templates/template.controller.txt'));
    const moduleFileTemplate = readFile(path.join(__dirname, './file-templates/template.module.txt'));
    const serviceFileTemplate = readFile(path.join(__dirname, './file-templates/template.service.txt'));

    const keyWordToReplace = 'template';

    const normalizedControllerFile = new FileTemplateNormalizer(controllerFileTemplate, keyWordToReplace, this.name).normalize();
    const normalizedModuleFile = new FileTemplateNormalizer(moduleFileTemplate, keyWordToReplace, this.name).normalize();
    const normalizedServiceFile = new FileTemplateNormalizer(serviceFileTemplate, keyWordToReplace, this.name).normalize();

    const createdModuleDirectory = path.join(this.directory, this.name);

    createFolder(this.directory, this.name);
    createFolder(createdModuleDirectory, 'services');

    createFile(createdModuleDirectory, `${this.name}.controller.js`, normalizedControllerFile);
    createFile(createdModuleDirectory, `${this.name}.module.js`, normalizedModuleFile);
    createFile(path.join(createdModuleDirectory, 'services'), `${this.name}.service.js`, normalizedServiceFile);

    console.log('\x1b[36m', `Module ${this.name} is created!`);
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

const modulesDirectory = path.join(__dirname, '../src/application/modules');
const moduleNameFromScript = (
  JSON.parse(process.env.npm_config_argv).original[2] ||
  JSON.parse(process.env.npm_config_argv).cooked[2]
).toString().match(/\w/g).join('');

new ModuleCommandsRunner(new Module(moduleNameFromScript, modulesDirectory)).run();

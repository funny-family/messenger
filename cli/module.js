const fs = require('fs');
const path = require('path');

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

function createFileIn(directory, fileName, fileContent) {
  fs.writeFile(path.join(directory, fileName), fileContent, (err) => {
    if (err) throw err;
  });
}

function readFileFrom(pathToFile) {
  return fs.readFileSync(pathToFile, 'utf8');
}


class FileTemplateNormalizer {
  constructor(fileString, replacer) {
    this.fileString = fileString;
    this.replacer = replacer;
  }

  normalize() {
    if (typeof this.fileString !== 'string') {
      throw new TypeError('File must be a string!');
    }

    const replacerRegExp = new RegExp('template', 'g');
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

    getFolderListInDirectory(this.directory).forEach((folderName) => {
      if (folderName === this.name) {
        console.error('\x1b[31m', `Module name ${this.name} is already exists!`);
        process.exit(0);
      }
    });

    const controllerFileTemplate = readFileFrom(path.join(__dirname, './file-templates/template.controller.txt'));
    const moduleFileTemplate = readFileFrom(path.join(__dirname, './file-templates/template.module.txt'));
    const serviceFileTemplate = readFileFrom(path.join(__dirname, './file-templates/template.service.txt'));

    const normalizedControllerFile = new FileTemplateNormalizer(controllerFileTemplate, this.name).normalize();
    const normalizedModuleFile = new FileTemplateNormalizer(moduleFileTemplate, this.name).normalize();
    const normalizedServiceFile = new FileTemplateNormalizer(serviceFileTemplate, this.name).normalize();

    const createdModuleDirectory = path.join(this.directory, this.name);

    createFolderIn(this.directory, this.name);
    createFolderIn(createdModuleDirectory, 'services');

    createFileIn(createdModuleDirectory, `${this.name}.controller.js`, normalizedControllerFile);
    createFileIn(createdModuleDirectory, `${this.name}.module.js`, normalizedModuleFile);

    const createdServiceDirectory = path.join(createdModuleDirectory, 'services');
    createFileIn(createdServiceDirectory, `${this.name}.service.js`, normalizedServiceFile);

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

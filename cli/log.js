const fs = require('fs');
const path = require('path');

const logfile = {
  method: {
    create: 'create',
    clear: 'clear'
  }
};

class LogFile {
  /**
  * @param {string} name - log file name
  * @param {string} directory - log file directory
  */
  constructor(name, directory) {
    this.name = name;
    this.directory = directory;
  }

  create() {
    if (fs.existsSync(this.directory)) {
      console.log('\x1b[33m', `${this.name} is already exists!`);
    } else {
      fs.writeFile(this.directory, '', (err) => {
        if (err) {
          console.error('\x1b[31m', `Cannot create ${this.name} file!`);
          throw err;
        }

        console.log('\x1b[36m', `${this.name} file is created!`);
      });
    }
  }

  clear() {
    if (fs.existsSync(this.directory)) {
      fs.truncate(this.directory, 0, (err) => {
        if (err) {
          console.error('\x1b[31m', `Cannot clean file content in "${this.directory}" directory.`);
          throw err;
        }

        console.log('\x1b[36m', `${this.name} file is clear!`);
      });
    } else {
      console.error('\x1b[31m', `Cannot find ${this.name} in ${this.directory} directory!`);
    }
  }
}

class LogCommandsRunner {
  constructor(log) {
    this.log = log;
  }

  run() {
    process.argv.forEach((arg) => {
      switch (arg) {
        case logfile.method.create: {
          this.log.create();
          break;
        }

        case logfile.method.clear: {
          this.log.clear();
          break;
        }

        default:
          return;
      }
    });
  }
}

const name = 'errors.log';
const directory = path.join(__dirname, `../src/logs/${name}`);

new LogCommandsRunner(new LogFile(name, directory)).run();

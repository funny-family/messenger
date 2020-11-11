const fs = require('fs');
const config = require('config');

const logfile = {
  method: {
    create: 'create',
    clear: 'clear'
  }
};

/**
 * @class LogFile
 */
class LogFile {
  /**
   * @param {string} name - log file name
   * @param {string} directory - log file directory
   */
  constructor(name, directory) {
    this.name = name;
    this.directory = directory;
  }

  /**
   * create log file in specific directory
   * @todo replace fs.existsSync on fs.exists
   */
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

  /**
   * clear log file
   */
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

new LogCommandsRunner(new LogFile(config.logFile.name, config.logFile.directory)).run();

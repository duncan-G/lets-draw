/* eslint-disable no-console */

const chalk = require('chalk');

const divider = chalk.gray('----------------------------------------------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: (...err) => {
    console.log(divider);
    console.error(chalk.cyan(...err));
    console.log(divider);
  },

  log: (...message) => {
    console.log(chalk.magenta(...message));
  },

  logv: (...messages) => {
    messages.forEach(message => {
      console.log(chalk.magenta(message));
    })
  }
};

module.exports = logger;

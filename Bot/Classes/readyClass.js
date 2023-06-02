const { client } = require("../../server")
const chalk = require("chalk");

class ready { 
    constructor () {
        console.log(chalk.default.yellowBright("Discord Bot Loaded Successfully!"));
    }
}

module.exports = { ready }
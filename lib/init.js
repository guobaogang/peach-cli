const Utils = require('./utils');
const chalk = require('chalk');
const figlet = require('figlet');
const check = require('./checkVersion');

module.exports = () => {
    check(() => {
        console.log(
            chalk.green(
                figlet.textSync('PEACH-CLI', {
                    horizontalLayout: 'full'
                })
            )
        )

        Utils.createQuestion().then(res => {
            const {
                filename,
                templName
            } = res;
            Utils.gitClone(filename, templName)
        })
    })
}
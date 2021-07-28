const exec = require('child_process').exec
const co = require('co')
const chalk = require('chalk')
const CLI = require('clui'),
    Spinner = CLI.Spinner;

module.exports = () => {
    return co(function* () {
        let cmdStr = `npm install gbg-peach-cli -g`;
        let countdown = new Spinner('更新中，请稍后...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
        countdown.start();
        yield(function () {
            return new Promise(function (resolve, reject) {
                exec(cmdStr, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error)
                        process.exit();
                    }
                    console.log(chalk.yellow('\n更新完成！'))
                    // 处理指定文件夹
                    countdown.stop();
                    resolve()
                })
            })
        })()
    })
}
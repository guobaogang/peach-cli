const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const tempList = require('./tempList.json')
const exec = require('child_process').exec
const rimraf = require('rimraf')
const CLI = require('clui'),
    Spinner = CLI.Spinner;
const chalk = require('chalk');

module.exports = {
    createQuestion() {
        const questions = [{
                type: 'input',
                name: 'filename',
                message: '请输入要创建的文件名：',
                validate: function (value) {
                    var pass = value.match(/\w+/);
                    if (pass) {
                        return true;
                    }
                    return '请输入正确的文件名称(数字文字下划线)';
                }
            },
            {
                type: 'rawlist',
                name: 'templName',
                message: '请选择模板?',
                choices: tempList
            }
        ];
        return inquirer.prompt(questions)
    },

    /**
     * 复制模板文件
     */
    copyTempl(filename, tempName) {
        let desPath = path.join(__dirname, '../template/' + tempName)
        this.copyDir(desPath, filename)
        console.log('执行完毕');
    },
    /**
     * 复制
     * @param src
     * @param dist
     * @param callback
     */
    copyDir(src, dist, callback) {
        fs.access(dist, function (err) {
            if (err) {
                // 目录不存在时创建目录
                fs.mkdirSync(dist, {
                    recursive: true
                });
            }
            _copy(null, src, dist);
        });

        const _copy = (err, src, dist) => {
            if (err) {
                callback(err);
            } else {
                let dir = fs.readdirSync(src, 'utf-8');
                for (let j of dir) {
                    var _src = src + '/' + j;
                    var _dist = dist + '/' + j;
                    let stat = fs.statSync(_src);
                    if (stat.isDirectory()) {
                        this.copyDir(_src, _dist, callback);
                    } else {
                        fs.writeFileSync(_dist, fs.readFileSync(_src, {
                            encoding: 'utf-8'
                        }));
                    }
                }
            }
        }
    },
    /**
     * 克隆git项目
     */
    gitClone(filename, gitUrl, branch = 'master') {
        let cmdStr = `git clone ${gitUrl} ${filename} && cd ${filename} && git checkout ${branch}`;
        let countdown = new Spinner('努力加载中，请稍后...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
        countdown.start();
        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                process.exit();
            }
            rimraf.sync(`./${filename}/.git`)
            console.log(chalk.red('\n克隆完成'));
            countdown.stop()
        })
    },
}
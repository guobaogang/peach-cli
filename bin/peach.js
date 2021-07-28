#!/usr/bin/env node --harmony

var program = require('commander');

program
    .version(require('../package.json').version, '-v, -V, --version')
program
    .command('init')
    .description('初始化')
    .alias('i')
    .action(() => {
        require('../lib/init')()
    })
program
    .command('list')
    .description('模板列表')
    .alias('l')
    .action(() => {
        require('../lib/list')()
    })
program.parse(process.argv)

if (!program.args.length) {
    program.help()
}
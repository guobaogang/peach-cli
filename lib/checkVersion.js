 const request = require('request')
 const semver = require('semver')
 const co = require('co')
 const prompt = require('co-prompt')
 const chalk = require('chalk')
 const packageConfig = require('../package.json')
 const update = require('./update')
 
 module.exports = done => {
     request({
         url: 'https://registry.npm.taobao.org/gbg-peach-cli',
         timeout: 1000
     }, (err, res, body) => {
         if (!err && res.statusCode === 200) {
             const latestVersion = JSON.parse(body)['dist-tags'].latest
             const localVersion = packageConfig.version
             if (semver.lt(localVersion, latestVersion)) {
                 console.log()
                 console.log(chalk.yellow('  A newer version of ncchr is available.'))
                 console.log()
                 console.log('  latest:    ' + chalk.green(latestVersion))
                 console.log('  installed: ' + chalk.red(localVersion))
                 console.log()
                 co(function* () {
                     let flag = yield prompt('Do you want to update the package ? [Y/N]')
                     if (flag.toLowerCase() === 'y' || flag.toLowerCase() === 'yes') {
                        update().then(function(){
                            done()
                        })
                     } else if (flag.toLowerCase() === 'n' || flag.toLowerCase() === 'no') {
                         done()
                     }
                 })
             } else {
                 done()
             }
         } else {
             done()
         }
     })
 }
 
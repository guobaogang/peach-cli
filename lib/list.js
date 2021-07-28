const chalk = require('chalk');
const list = require('./tempList.json')
module.exports = () => {
    console.log(
        `现支持模板列表:\n${list.map(item => item.value).join('\n')}`
    )
}
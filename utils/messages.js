const moment = require('moment');

function formatMsg(username, text) {
    return {
        username,
        text,
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
}

module.exports = formatMsg;
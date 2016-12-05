/**
 *
 */

const db = require('../../db/db');

function createUser(User) {
    const crypto = require('./crypto')
    db.list.User.findOrCreate({
        where: {
            username: User.username
        },
        defaults: {
            username: User.username,
            password: crypto.createPassword(User.username, User.password)
        }
    })
    .then(arr => {
        let user = arr[0];
        let createStatus = arr[1];
        logger.log('user:', user.get())
        logger.log('create:', createStatus)
    })
}

function createReport(rep) {
    var report = rep || {
        uid: 'uid',
        token: 'token',
        homepage: '',
        remark: ''
    }
    db.list.Report.findOrCreate({
        where: {
            uid: report.uid
        },
        defaults: report
    })
    .then(arr => {
        let report = arr[0];
        let createStatus = arr[1];
        logger.log('report:', report.get())
        logger.log('create:', createStatus)
    })
}

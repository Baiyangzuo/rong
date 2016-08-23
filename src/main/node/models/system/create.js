/**
 *
 */

var db = require('../../db/db');
var crypto = require('./crypto');
var User = {
    username: 'username',
    password: 'password'
}

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
    console.log('user:', user.get())
    console.log('create:', createStatus)
})

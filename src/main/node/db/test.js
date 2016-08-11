var co = require('co');
var db = require('./db');
var User = db.list.User;

// co(function *(){

//     // var user = yield User.findOrCreate({
//     //     where: {
//     //         username: 'test'
//     //     },
//     //     defaults: {
//     //         password: 123456
//     //     }
//     // })
//     //
//     // console.log(user[0].get())

//     // var user = yield User.update({
//     //     deletedAt: null
//     // },{
//     //     where: {
//     //         deletedAt: {
//     //             $not: null
//     //         },
//     //         username: 'gavinning'
//     //     }
//     // })
//     //
//     // console.log(user)
//     //

//     // User.delete({
//     //     where: {
//     //         username: 'gavinning'
//     //     }
//     // })
//     //

//     // User.findAll({
//     //     include: [{
//     //         model: Tool,
//     //         where: { id: { $gt: 0 } },
//     //         paranoid: true // query and loads the soft deleted records
//     //     }]
//     // })
//     // .then(users => console.log(users))
// })

// User.findAll()
// .then(users => {
//     users.forEach(user => {
//         console.log(user.get())
//     })
// })

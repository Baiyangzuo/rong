var req = require('request')

req.get('http://127.0.0.1:9000/rose/login', function(err, resp){
    console.log(resp.statusCode)
    console.log(resp.body)
})

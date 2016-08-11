/**
 * InfoMiddleware
 */



module.exports = function(){

    return (req, res, next) => {
        // console.log('Enter InfoMiddleware')
        // console.log(req)
        // console.log('Leave InfoMiddleware')
        next()
    }
}

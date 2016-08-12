var LRU = require("lru-cache")
var options = {
    max: 500,
    length: function (n, key) { return n * 2 + key.length },
    dispose: function (key, n) { n.close() },
    maxAge: 1000 * 60 * 60 * 24
}
var cache = module.exports = LRU(options)

// 注册成功的IP地址
// 用于计算质量分值
cache.set('ips', [])

var md5 = require('md5');

module.exports = {
    getEncryption(username, password, code) {
        var str1 = md5(password);
        var str2 = md5(str1 + username);
        return code ? md5(str2 + code) : str2;
    }
}

window.cp = {
    getEncryption: function(username, password, code) {
        var str1 = md5(password);
        var str2 = md5(str1 + username);
        return code ? md5(str2 + code) : str2;
    }
}

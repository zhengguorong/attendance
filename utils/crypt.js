/**
 * Created by zhengguorong on 16/7/20.
 */
var crypto = require('crypto');


exports.des = {
    algorithm:{des:'des', ecb:'des-ecb',cbc:'des-cbc' },
    encrypt:function(plaintext,iv){
        var key = new Buffer("19490101");
        var iv = new Buffer(iv ? iv : 0);
        var cipher = crypto.createCipheriv(this.algorithm.ecb, key, iv);
        cipher.setAutoPadding(true) //default true
        var ciph = cipher.update(plaintext, 'utf8', 'base64');
        ciph += cipher.final('base64');
        return ciph;
    },
    decrypt:function(encrypt_text,iv){
        var key = new Buffer("19490101");
        var iv = new Buffer(iv ? iv : 0);
        var decipher = crypto.createDecipheriv(this.algorithm.ecb, key, iv);
        decipher.setAutoPadding(true);
        var txt = decipher.update(encrypt_text, 'base64', 'utf8');
        txt += decipher.final('utf8');
        return txt;
    }

};
/**
 * Created by zhengguorong on 16/7/20.
 */
var request = require('request');
var server = require('./index');
var Wilddog = require("wilddog");
var cryptUtil=require('../utils/crypt');
var userDB = new Wilddog("https://attendance.wilddogio.com/users");


var login = function(params,success){
    request.post({url:server.domain+"/user/ssoLogin?"+server.getSignParams(),
        headers: {"Content-Type": 'application/json'},body:JSON.stringify(params)}, function(err, response, body) {
        if(err) { console.log(err); return; }
        success(response,JSON.parse(body))
    });
}
var refreshToken=function(userId,success){
    //查询用户
    userDB.orderByKey().equalTo(userId||'').once("value", function(snapshot) {
        if(snapshot.val()){
            var user=snapshot.val()[userId]
            //获取用户TOKEN
            login({"password":user.password,"account":user.account,deviceNum:""},function (res,data) {
                console.log(data)
                if(data.responseCode==2204){
                    userDB.child(userId).update({
                        "state": '密码错误'
                    });
                    return;
                }
                server.token=data.token;
                userDB.child(userId).update({
                    "token": data.token
                });
                success(data.token);
            })
        }
    });
}
var getUserById=function(userId,success){
    userDB.orderByKey().equalTo(userId+''||'').once("value", function(snapshot) {
        success(snapshot.val()[userId])
    });
}
var getUsers=function(success){
    //查询用户
    userDB.orderByKey().once("value", function(snapshot) {
        success(snapshot.val())
    });
}
var addUser=function(username,account,password,email){
    var data={}
    data[account]={
        name: username,
        account: account,
        password: cryptUtil.des.encrypt(password, 0),
        email:email,
        deviceNum: '0000'
    }
    userDB.update(data)
}
var updateUser=function(account,params){
    userDB.child(account).update(params)
}
var deleteUser = function (userId) {
    var data={};
    data[userId]={}
    userDB.update(data)
}
var getTaskingUsers = function (success) {
    userDB.orderByChild('tasking').equalTo(true).once("value", function(snapshot) {
        success(snapshot.val())
    });
}

module.exports={
    login:login,
    refreshToken:refreshToken,
    getUsers:getUsers,
    getUserById:getUserById,
    addUser:addUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    getTaskingUsers:getTaskingUsers
}
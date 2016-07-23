/**
 * Created by zhengguorong on 16/7/23.
 */
var nodemailer = require('nodemailer');
var moment = require('moment');
var userApi = require('../server/user');

var smtpConfig = {
    host: 'mail.bluemoon.com.cn',
    port: 25,
    secure: false, // use SSL
    auth: {
        user: 'zhengguorong@bluemoon.com.cn',
        pass: '111***zzz'
    }
};
var transporter = nodemailer.createTransport(smtpConfig)

var sendEmail=function(title,context,targer){
    var mailOptions = {
        from: 'zhengguorong@bluemoon.com.cn', // sender address
        to: targer, // list of receivers
        subject: title, // Subject line
        text: context // plaintext body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log('send fail'+error)
            return error
        }
        console.log('Message sent: ' + info.response);
    });
}
var sendInWorkEmail=function (userId) {
    userApi.getUserById(userId,function (user) {
        if(user.email){
            sendEmail('上班卡打卡成功','员工:'+userId+'于'+moment().format('llll')+'打上班卡成功',user.email);
        }
    })
}
var sendOutWorkEmail = function (userId) {
    userApi.getUserById(userId,function (user) {
        if(user.email){
            sendEmail('下班卡打卡成功','员工:'+userId+'于'+moment().format('llll')+'打下班卡成功',user.email);
        }
    })
}
module.exports={
    sendEmail:sendEmail,
    sendInWorkEmail:sendInWorkEmail,
    sendOutWorkEmail:sendOutWorkEmail
}
var express = require('express');
var router = express.Router();
var attendanceApi = require('../server/attendance');
var server = require('../server/index');
var userApi = require('../server/user');
var email = require('../utils/mail');


var self=this;
router.get('/history/:userId',function(req,res,next){
    self.res=res;
    userApi.getUserById(req.params.userId,function (user) {
        attendanceApi.getPunchCardList({token:user.token,timestamp:201607},function(res,data){
            console.log(data)
            self.res.render('history',data);
        })
    })


})
router.get('/test',function (req, res, next) {
    var userId='80473541'
    try {
        email.sendInWorkEmail('80473541')
        res.json(200,{isSuccess:true,msg:'发送成功'})
    }
    catch (e){

        res.json(200,{isSuccess:false,msg:'发送失败'+e.message})
    }

})

module.exports = router;
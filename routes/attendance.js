var express = require('express');
var router = express.Router();
var attendanceApi = require('../server/attendance');
var server = require('../server/index');
var userApi = require('../server/user')

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

module.exports = router;
var express = require('express');
var router = express.Router();
var userApi = require('../server/user');
var attendanceApi = require('../server/attendance')
var server = require('../server/index');
var schedule = require('node-schedule');

router.get('/addUser', function (req, res, next) {
    try {
        userApi.addUser(req.query.username, req.query.account, req.query.password);
        res.json(200,{isSuccess:true,msg:'保存成功'});
    }
    catch (e){
        res.json(200,{isSuccess:false,msg:'保存失败'});
    }

})
router.get('/users', function (req, res, next) {
    try {
        userApi.getUsers(function (data) {
            res.json(200, {isSuccess: true, users: data});
        })
    }
    catch (e){
        res.json(200,{isSuccess:false,msg:'获取失败'});
    }

})
router.get('/deleteUser', function (req, res, next) {
    var userId=req.query.userId
    userApi.deleteUser(userId);
    //删除用户的同时,删除定时任务
    try {
        var job = schedule.scheduledJobs[userId];
        job.cancel();
    }
    catch (e){
        console.log("找不到定时器")
    }
    res.json(200,{isSuccess:true,msg:'删除成功'})
})


//设置定时任务
router.get('/addTask', function (req, res, next) {
    var userId = req.query.userId
    //设置上班打卡定时任务
    var time = req.query.time;
    try {
        //设置上班打卡定时任务
        attendanceApi.startTask(userId, time)
        //设置下班打卡定时任务
        attendanceApi.finishTask(userId, time)
        userApi.updateUser(userId,{tasking:true,time:req.query.time})
        res.json(200,{isSuccess:true,msg:'保存成功'});
    }
    catch (e){
        res.json(200,{isSuccess:false,msg:'定时任务添加失败,'+e.message});
    }



})
//删除定时任务
router.get('/deleteTask',function(req,res,next){
    var userId=req.query.userId;
    try {
        var job = schedule.scheduledJobs[userId];
        job.cancel();
        userApi.updateUser(userId,{tasking: false})
        res.json(200,{isSuccess:true,msg:'停止成功'});
    }
    catch (e){
        res.json(200,{isSuccess:false,msg:'定时器不存在'});
    }

})





module.exports = router;
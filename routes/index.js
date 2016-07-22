var express = require('express');
var router = express.Router();
var user = require('../server/user')
var server = require('../server/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  user.getUsers(function(data){
    res.render('index', {'data':data});
  })

});


module.exports = router;

/**
 * Created by zhengguorong on 16/7/20.
 */


var domain="http://angelapi.bluemoon.com.cn:8882/bluemoon-control"
var getSignParams=function(){
    return "client=android&cuid=d8242ca9-e4e0-42a8-8c1c-da6a226f2c82&version=4.0.0&format=json&time=1468985999176&appType=moonAngel&lng=113.544021&lat=23.148696&hig=0.0&sign=20da5cda17b3c35f17ef34dabf1430f6"
}
module.exports={
    domain:domain,
    getSignParams:getSignParams,
    token:''
}
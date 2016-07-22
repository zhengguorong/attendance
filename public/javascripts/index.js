/**
 * Created by zhengguorong on 16/7/21.
 */
function UserModel(params){
    this.username = ko.observable(params&&params.name);
    this.account = ko.observable(params&&params.account);
    this.password = ko.observable(params&&params.password);
    this.tasking = ko.observable(params&&params.tasking||false);
    this.times = ko.observableArray(params&&params.time&&params.time.split(','));
}

function IndexModel(){
    var self=this;
    self.addUserModel=new UserModel();
    self.users=ko.observableArray();
    self.addUser=function(){
        $.get('/api/addUser',{username:self.addUserModel.username(),account:self.addUserModel.account(),password:self.addUserModel.password()},function (data) {
            if(data.isSuccess){
                self.addUserModel.username('')
                self.addUserModel.account('')
                self.addUserModel.password('')
                $('#addModal').modal('hide')
                self.getUsers()
            }else {
                alert("保存失败")
            }
        },'json')
    }
    self.getUsers=function () {
        $.get('/api/users',function (data) {
            if(data.isSuccess){
                self.users.removeAll()
                //创建数据模型
                for(key in data.users){
                    self.users.push(new UserModel(data.users[key]))
                }
            }
        },'json')
    }
    
    self.addTask=function (user) {
        $.get('/api/addTask',{userId:user.account(),time:self.arrayToString(user.times())},function(data){
            self.getUsers();
        },'json')
    }
    self.deleteTask=function (user) {
        $.get('/api/deleteTask',{userId:user.account()},function(data){
            if(data.isSuccess){
                self.getUsers()
            }else{
                alert(data.msg)
            }
        },'json')
    }
    self.deleteUser=function (user) {
        $.get('/api/deleteUser',{userId:user.account()},function (data) {
            self.getUsers()
        },'json')
    }
    self.arrayToString=function (array) {
        var result=""
        for(var i=0;i<array.length;i++){
            if(array.length-1==i){
                result=result+array[i]
            }else{
                result=result+array[i]+','
            }

        }
        return result
    }

}
var indexModel=new IndexModel();
ko.applyBindings(indexModel);

$(function () {
    indexModel.getUsers();
})

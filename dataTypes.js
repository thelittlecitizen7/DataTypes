

window.onload = () => {
    var userHandler = new UserHandler();
    var user1 = new User("lior",1234);
    var user2 = new User("amit",1234);
    userHandler.addUser(user1);
    userHandler.ensureConnect("lior",1234);
    console.log(userHandler.isUserConnected("lior"));
    userHandler.logOut("lior");
    console.log(userHandler.isUserConnected("lior"));
    userHandler.addUser(user2);
    userHandler.ensureConnect("amit",1234);
    console.log(userHandler.isUserConnected("amit"));
}

class User{
    userName;
    password;
    
    constructor(userName , password){
        this.userName = userName;
        this.password = Symbol(password)
    }
    getPassword(){
        return this.password.description;
    }
} 

class UserHandler {
    users;
    allConnectedUsers;
    constructor(){
        this.users = new Set();
        this.allConnectedUsers = new Set();
    }

    addUser(user){
        if (this.isUserExistInSystem(user.userName)){
            throw "The user name with name " + user.userName + " already exit in system"
        }
        this.users.add(user);
    }

    isUserConnected(userName){
        return this.allConnectedUsers.has(userName)
    }


    ensureConnect(userName , password){
        var allUsers = [];
        for (var user of this.users){
            allUsers.push(user);
        }
        var hasUserWithCurrentDetails = allUsers.some((user) => user.userName == userName && user.getPassword() == password);
        if (hasUserWithCurrentDetails){
            this.allConnectedUsers.add(userName);
        }
        else{
            throw "The username or password not correct"
        }
    }

    isUserExistInSystem(userName){
        for (var user of this.users.values()){
            if (user.userName == userName){
                return true;
            }
        }
        return false;

    }

    logOut(userName){
        if (this.isUserConnected(userName) && this.isUserExistInSystem(userName)){
            this.allConnectedUsers.delete(userName);
        }
    }
}

[{
    id: '/#12poiadgkeea',
    name: 'Martin',
    room: 'Sum random room'
}]

//addUser(id,name,room)
//removeUserFromRoom(id)
//getUser(id)
//getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }
    addUser (id, name, room) {
        let user = {id, name, room}
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser (id) {
        return this.users.filter((user) => user.id == id)[0];
    }
    getUserList(room) {
        let users = this.users.filter((user) => {
            return user.room === room
        })
        let namesArray = users.map((user) => user.name)
        // zápis na předchozím je stejný jako na dalším řádku, ale je o dost jednodušší
        // let namesArray = users.map((user) => {
        //     return user.name
        // })

        return namesArray;

    }
}

module.exports = {Users};

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }
//
// let me = new Person('Martin', 18);
// var desription = me.getUserDescription();
// console.log(desription);

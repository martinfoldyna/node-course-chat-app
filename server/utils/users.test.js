const expect = require('expect');

const {Users} = require('./users');

describe('Users', function () {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Martin',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Phil',
            room: 'Node Course'
        }, {
            id: '3',
            name: 'Leo',
            room: 'Swift Course'
        }]
    })

    it('should add new users', function () {
        let users = new Users();
        var user = {
            id: '123',
            name: 'Martin',
            room: 'Sum random room'
        };

        let resUsers = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', function () {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', function () {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(users.users.length);

    });

    it('should find user', function () {
        let userId = '2';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
        
    });

    it('should not find user', function () {
        let userId = '6';
        let user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return names for node course', function () {
        let userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Martin', 'Phil'])
    });

    it('should return names for swift course', function () {
        let userList = users.getUserList('Swift Course');

        expect(userList).toEqual(['Leo'])
    });
});
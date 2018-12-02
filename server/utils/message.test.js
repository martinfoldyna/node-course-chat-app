var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Martin';
        var text = 'Some random text';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text})
        //-> expect(message).toInclude({from: from, text: text}) akorát zjednodušeno
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', function () {
        let from = 'Deb';
        let latitude = 15;
        let longitude = 19;
        //this is the url that we exprect to be generated
        let url = 'https://www.google.com/maps?q=15,19';
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url})
    })
})
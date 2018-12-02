var expect = require('expect');

var {generateMessage} = require('./message');

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
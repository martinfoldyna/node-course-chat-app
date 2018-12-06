let expect = require('expect');

let {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let res = isRealString(69);
        expect(res).toBe(false)
        //-> expect(message).toInclude({from: from, text: text}) akorát zjednodušeno
    })
    it('should reject string with only spaces', () => {
        let res = isRealString('   ');
        expect(res).toBe(false);
    })
    it('should allow string with non-space characters', () => {
        let res = isRealString(' Martin Foldyna  ')
        expect(res).toBe(true);
    })
})
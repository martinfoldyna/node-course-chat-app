let moment = require('moment');

//0 = Jan 1st 1970 00:00:00 am
// let date = new Date().getTime();

let date = moment();
date.add(1, 'year'); //přidá jeden rok
console.log(date.format('ddd D.MMM YYYY'));

console.log(date.format('h:mm a'))


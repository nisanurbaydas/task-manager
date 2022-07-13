const events = require('events');

const eventEmitter = new events.EventEmitter();
//console.log(eventEmitter);

module.exports = eventEmitter;
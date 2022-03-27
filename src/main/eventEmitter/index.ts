const events = require('events');

class CustomEmitter extends events {}

export = new CustomEmitter();

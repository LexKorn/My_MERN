const { Schema, model } = require('mongoose');

const schema = new Schema({
    rooms: {type: Number, default: 0},
    area: {type: Number, default: 0},
    price: {type: Number, default: 0},
    plan: {type: String, default: ''},
    description: {type: String, default: ''},
    renovation: {type: Boolean, default: false},
    date: {type: Date, default: Date.now }
});

module.exports = model('MyFlats', schema);
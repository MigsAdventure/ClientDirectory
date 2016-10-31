const mongoose = require('mongoose');
const moment = require('moment');

let Client;
const Schema = mongoose.Schema;
// var customDate = moment().format('ll');
const clientSchema = new Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  age: { type: Number, min: 0, max: 120 },
  gender: { type: String, enum: ['male', 'female'] },
  allergies: [{ type: String, maxlength: 150, trim: true }],
  lastVisit: { type: Date },
});

Client = mongoose.model('Client', clientSchema);

module.exports = Client;

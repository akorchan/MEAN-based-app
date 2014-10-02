'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Word = new Schema({
    word: String,
    meaning: [String],
    votes: { type: Number, default: 1 },
    created: { type: Date, default: Date.now },
    uprated: { type: Date, default: Date.now }
});

mongoose.model('Word', Word);

var dburl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/local';
mongoose.connect(dburl);
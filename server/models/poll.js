var appolo = require('appolo-express');

var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({ ip: 'String' });

var answerSchema = new mongoose.Schema({
    text: { type: String },
    votes: [voteSchema],
    totalVotes: { type: Number,default:0 }
});

var pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    totalVotes: { type: Number,default:0 },
    answers: [answerSchema],
    date: { type: Number,default:0 }
});

var pollModel = mongoose.model('Poll', pollSchema);

appolo.inject.addObject('PollModel', pollModel);

module.exports = pollModel ;
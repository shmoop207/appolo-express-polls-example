"use strict";
var appolo = require('appolo-express'),
     _ = require('lodash');

module.exports = appolo.Controller.define({
    $config: {
        id: 'dataController',
        inject: ['pollsManager'],
        routes: [
            {
                path: '/getPoll/',
                method: 'get',
                action: 'getPoll',
                validations: {
                    pollId:appolo.validator.string().required()
                }
            },
            {
                path: '/getAllQuestions/',
                method: 'get',
                action: 'getAllQuestions'
            },
            {
                path: '/createPoll/',
                method: 'post',
                action: 'createPoll',
                validations: {
                    question:appolo.validator.string().required(),
                    answers:appolo.validator.array().min(2).invalid('')
                }
            },
            {
                path: '/vote/',
                method: 'post',
                action: 'vote',
                validations: {
                    pollId:appolo.validator.string().required(),
                    answerId:appolo.validator.string().required()
                }
            }
        ]
    },

    getAllQuestions: function (req, res) {

        this.pollsManager.getAllQuestions()
            .then(this.sendOk.bind(this))
            .fail(this.sendServerError.bind(this))
    },
    vote: function (req, res) {

        var ip = req.header('x-forwarded-for') || req.ip;

        this.pollsManager.voteForPoll(req.model.pollId, req.model.answerId, ip)
            .then(this.checkForVotedUser.bind(this))
            .spread(this._prepareDto.bind(this))
            .then(this.sendOk.bind(this))
            .fail(this.sendServerError.bind(this))
    },

    getPoll: function (req, res) {

        this.pollsManager.getPoll(req.model.pollId)
            .then(this.checkForVotedUser.bind(this))
            .spread(this._prepareDto.bind(this))
            .then(this.sendOk.bind(this))
            .fail(this.sendServerError.bind(this))
    },
    createPoll: function (req, res) {
        this.pollsManager.createPoll(req.model.question,req.model.answers)
            .then(this.sendOk.bind(this))
            .fail(this.sendServerError.bind(this))
    },
    checkForVotedUser:function(poll){
        var ip = this.req.header('x-forwarded-for') || this.req.ip;

       var answerVoted = _.find(poll.answers,function(answer){
            return _.find(answer.votes,function(vote){
                return vote.ip == ip;
            })
        });

        poll.answerVoted = answerVoted;

        return [poll,answerVoted];
    },
    _prepareDto:function(poll,answerVoted){
        poll = poll.toObject();

        _.forEach(poll.answers,function(answer){
            delete answer.votes
        });

        if(answerVoted){
            answerVoted = answerVoted.toObject();
            delete answerVoted.votes;
            poll.answerVoted = answerVoted;
        }



        return poll;
    }

})
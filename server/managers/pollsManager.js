"use strict";
var appolo = require('appolo-express'),
    Q = require('q'),
    _ = require('lodash');

module.exports = appolo.EventDispatcher.define({
    $config:{
        id:'pollsManager',
        singleton:true,
        inject:['PollModel','logger','env']
    },
    getAllQuestions:function(){

        var deferred = Q.defer();

        this.PollModel.find({},'question totalVotes date',function(err,docs){

            if(err){
                this.logger.error("failed to get poll question",{err:err});
                return deferred.reject(err);
            }

            deferred.resolve(docs);
        });

        return deferred.promise;
    },

    getPoll:function(pollId){

        var deferred = Q.defer();

        this.PollModel.findById(pollId,function(err,doc){
            if(err){
                this.logger.error("failed to get poll question",{err:err});
                return deferred.reject(err);
            }

            deferred.resolve(doc);
        });

        return deferred.promise;
    },
    createPoll:function(question,answers){
        var deferred = Q.defer();

        //remove empty answers
        _.remove(answers, function(answer) { return answer.text == "" });

        var poll = new this.PollModel({
            question:question,
            answers:answers,
            date:new Date().getTime()
        });

        return this.savePoll(poll);
    },

    savePoll:function(poll){
        var deferred = Q.defer();

        poll.save(function(err, doc) {
            if(err) {
                this.logger.error("failed to save poll",{err:err});
                return deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    },

    voteForPoll:function(pollId,answerId,ip){
        var deferred = Q.defer();
        var data = {
            pollId:pollId,
            answerId:answerId,
            ip:ip
        };

        this.getPoll(pollId)
            .then(this._updatedPollAnswers.bind(this,data))
            .then(this.savePoll.bind(this))
            .then(this._finishPollVote.bind(this,data,deferred))
            .fail(this._onPollVoteError.bind(this,data,deferred));

        return deferred.promise;

    },
    _updatedPollAnswers:function(data,poll){
        var answer = poll.answers.id(data.answerId);

        if(!answer){
            throw  new Error("filed to find poll answer")
        }

        answer.votes.push({ ip: data.ip });
        answer.totalVotes++;
        poll.totalVotes++;

        return poll;
    },
    _finishPollVote:function(data,deferred,poll){

        this.logger.info("poll voted",{data:data});

        deferred.resolve(poll);
    },
    _onPollVoteError:function(data,deferred,err){

        this.logger.error("failed to vote poll",{err:err,data:data});

        deferred.reject(err);
    }

});
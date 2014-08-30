angular.module('pollsApp').service('pollsService', ['$http', '$q', function ($http, $q) {
    this.createPoll = function (poll) {
        return $http.post('/createPoll/', poll)
    }

    this.getAllQuestions = function () {

        var deferred = $q.defer()

        $http.get('/getAllQuestions/')
            .success(function (data, status, headers, config) {
                deferred.resolve(data)
            }).error(function () {
                deferred.reject();
            })

        return deferred.promise;
    }

    this.getPoll = function (pollId) {

        var deferred = $q.defer();

        $http.get('/getPoll/',{params:{pollId:pollId} })
            .success(function (data, status, headers, config) {
                deferred.resolve(data)
            }).error(function () {
                deferred.reject();
            })

        return deferred.promise;
    }

    this.vote = function(pollId, answerId){
        var deferred = $q.defer();

        $http.post('/vote/',{pollId:pollId,answerId:answerId})
            .success(function (data, status, headers, config) {
                deferred.resolve(data)
            }).error(function () {
                deferred.reject();
            })

        return deferred.promise;
    }

}])
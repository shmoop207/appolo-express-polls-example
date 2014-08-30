angular.module('pollsApp').controller('pollItemController',['$scope','pollsService','$routeParams',function($scope,pollsService, $routeParams){

    $scope.poll;

    $scope.vote = function(){
        pollsService.vote($scope.poll._id, $scope.poll.answerId)
            .then(_onGetPollSuccess)
            .catch(_onGetPollFail);
    }


    pollsService.getPoll($routeParams.pollId)
        .then(_onGetPollSuccess)
        .catch(_onGetPollFail);


    function _onGetPollSuccess(poll){
        $scope.poll = poll;

    }
    function _onGetPollFail(){

    }

}])
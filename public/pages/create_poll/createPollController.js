angular.module('pollsApp').controller('createPollController', ['$scope','$location', 'pollsService', function ($scope,$location ,pollsService) {
    $scope.poll = {
        question: '',
        answers: [
            { text: '' },
            { text: '' }
        ]
    }
    $scope.addAnswer = function () {
        $scope.poll.answers.push({ text: '' });

    }

    $scope.removeAnswer = function(answer,index){
        $scope.poll.answers.splice(index, 1);
    }
    $scope.createPoll = function () {


        if (!$scope.poll.question) {
            alert('You must enter a question');
            return;
        }

        if ($scope.poll.answers.length < 2) {
            alert('You must enter at least two answers');
            return;
        }


        pollsService.createPoll($scope.poll).then(_onCreatePollSuccess).catch(_onCreatePollError);
    }

    function _onCreatePollSuccess(){
        $location.path('polls');
    }

    function _onCreatePollError(){
        alert('failed to create poll try again later');
    }

}])
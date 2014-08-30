angular.module('pollsApp').controller('pollListController', ['$scope', 'pollsService', function ($scope, pollsService) {
    $scope.polls = [];

    $scope.search = "";
    $scope.predicate = 'date'

    pollsService.getAllQuestions()
        .then(_onGetAllQuestionSuccess)
        .catch(_onGetAllQuestionFail);

    function _onGetAllQuestionSuccess(polls) {
        $scope.polls = polls;

    }

    function _onGetAllQuestionFail() {
        alert('failed to load polls try again later')
    }

}])
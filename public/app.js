angular.module('pollsApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {


        $routeProvider
            .when('/polls', { templateUrl: 'pages/polls_list/pollsList.html', controller:'pollListController' })
            .when('/poll/:pollId', { templateUrl: 'pages/poll_item/pollItem.html', controller:'pollItemController' })
            .when('/create', { templateUrl: 'pages/create_poll/createPoll.html', controller:'createPollController' })
            .otherwise({ redirectTo: '/polls' });
    }]);
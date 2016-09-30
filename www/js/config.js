'use strict';

var app = angular.module('todoApp');

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $stateProvider
        .state('tabs', {
            url: '/tabs',
            templateUrl: 'templates/tabs.html',
            abstract: true
        })

        .state('tabs.tasks', {
            url: '/tasks',
            views: {
                'tasks': {
                    templateUrl: 'components/project-tasks/project-tasks.html',
                    controller: 'ProjectTasksController as vm'
                }
            }
        })

        .state('tabs.favorites', {
            url: '/favorites',
            views: {
                'favorites': {
                    templateUrl: 'components/favorite-projects/favorite-projects.html',
                    controller: 'FavoritesController as vm'
                }
            }
        });

    $urlRouterProvider.otherwise('/tabs/tasks');
});
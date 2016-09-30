'use strict';

var app = angular.module('todoApp');

app.controller('FavoritesController', function($rootScope, $state) {
    var vm = this;

    vm.selectProject = selectProject;

    function selectProject(titleIndex) {
        var title = $rootScope.FavoriteProjects[titleIndex];
        var index = $rootScope.Projects.map(function(project) { return project.title; }).indexOf(title);
        $rootScope.ActiveProjectIndex = index;
        $rootScope.activeProject = $rootScope.Projects[$rootScope.ActiveProjectIndex];
        $state.go('tabs.tasks');
    }
});
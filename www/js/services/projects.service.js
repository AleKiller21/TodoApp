'use strict';

var app = angular.module('todoApp');

app.factory('projects', function($rootScope) {
    var service = {
        addProject: addProject,
        deleteProject: deleteProject,
        prioritizeProject: prioritizeProject
    };

    return service;

    function addProject(name) {
        $rootScope.Projects.push({title: name, tasks: [], favorite: false});
        console.log($rootScope.Projects);
        window.localStorage['Projects'] = JSON.stringify($rootScope.Projects);
    }

    function deleteProject(projectIndex) {
        if($rootScope.Projects[projectIndex].favorite) unprioritizeProject(projectIndex);

        $rootScope.Projects.splice(projectIndex, 1);
        console.log($rootScope.Projects);
        window.localStorage['Projects'] = JSON.stringify($rootScope.Projects);
    }

    function prioritizeProject(projectIndex) {
        if(!$rootScope.Projects[projectIndex].favorite) {
            $rootScope.FavoriteProjects.push($rootScope.Projects[projectIndex].title);
            $rootScope.Projects[projectIndex].favorite = true;
            window.localStorage['FavoriteProjects'] = JSON.stringify($rootScope.FavoriteProjects);
            window.localStorage['Projects'] = JSON.stringify($rootScope.Projects);
            console.log(window.localStorage['FavoriteProjects']);
        }

        else {
            unprioritizeProject(projectIndex);
        }
    }

    function unprioritizeProject(projectIndex) {
        var index = $rootScope.FavoriteProjects.indexOf($rootScope.Projects[projectIndex].title);
        $rootScope.FavoriteProjects.splice(index, 1);
        $rootScope.Projects[projectIndex].favorite = false;
        window.localStorage['FavoriteProjects'] = JSON.stringify($rootScope.FavoriteProjects);
        window.localStorage['Projects'] = JSON.stringify($rootScope.Projects);
        console.log(window.localStorage['FavoriteProjects']);
    }

});
'use strict';

var app = angular.module('todoApp');

app.controller('ProjectTasksController', function($ionicModal, $ionicPopup, $ionicSideMenuDelegate, $rootScope, $scope, projects) {
    var vm = this;

    vm.taskModal;
    vm.viewTitle = 'tasks';
    //$rootScope.activeProject = {};
    vm.showTaskModal = showTaskModal;
    vm.showProjectPopup = showProjectPopup;
    vm.deleteProject = deleteProject;
    vm.deleteTask = deleteTask;
    vm.selectProject = selectProject;
    vm.prioritizeProject = prioritizeProject;
    vm.saveTasksState = saveTasksState;

    $scope.closeTaskModal = closeTaskModal;
    $scope.createTask = createTask;
    $scope.task = {};

    setActiveProject();
    console.log($rootScope.Projects);

    $ionicModal.fromTemplateUrl('templates/task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {vm.taskModal = modal});

    function showTaskModal() {
        vm.taskModal.show();
    }

    function closeTaskModal() {
        vm.taskModal.hide();
    }

    function showProjectPopup() {
        $scope.project = {};

        $ionicPopup.show({
            template: '<input type="text" ng-model="project.title">',
            title: 'New project',
            scope: $scope,
            buttons: [
                {text: 'Cancel', type: 'button-assertive'},
                {
                    text: 'Create',
                    type: 'button-positive',
                    onTap: function(event) {
                        if(!$scope.project.title) event.preventDefault();
                        else return $scope.project.title;
                    }
                }
            ]
        }).then(function(response) {
            if(!response) return;

            window.localStorage['ActiveProjectIndex'] = $rootScope.ActiveProjectIndex = $rootScope.Projects.length;
            projects.addProject(response);
            setActiveProject();
        });
    }

    function deleteProject(index) {
        projects.deleteProject(index);
        window.localStorage['ActiveProjectIndex'] = $rootScope.ActiveProjectIndex = $rootScope.Projects.length - 1;
        setActiveProject();
        sortTasks();
        $ionicSideMenuDelegate._instances[0].toggleLeft();
    }

    function setActiveProject() {
        if(!$rootScope.Projects.length) $rootScope.activeProject = {title: 'tasks', tasks: []};
        else if($rootScope.Projects.length === 1) {$rootScope.activeProject = $rootScope.Projects[0];}
        else $rootScope.activeProject = $rootScope.Projects[$rootScope.ActiveProjectIndex];
    }

    function createTask() {
        $scope.task.state = false;
        $rootScope.activeProject.tasks.push($scope.task);
        window.localStorage['Projects'] = JSON.stringify($rootScope.Projects);
        closeTaskModal();
        console.log($rootScope.Projects);
        $scope.task = {};
    }

    function deleteTask(index) {
        $rootScope.activeProject.tasks.splice(index, 1);
        window.localStorage['Projects'] = JSON.stringify($rootScope.Projects);
    }

    function selectProject(index) {
        $rootScope.activeProject = $rootScope.Projects[index];
        sortTasks();
        window.localStorage['ActiveProjectIndex'] = $rootScope.ActiveProjectIndex = index;
        $ionicSideMenuDelegate._instances[0].toggleLeft();
    }

    function sortTasks() {
        $rootScope.activeProject.tasks.sort(function(taskBefore, taskAfter) {
            return taskBefore.state - taskAfter.state;
        });
    }

    function prioritizeProject(index) {
        projects.prioritizeProject(index);
    }

    function saveTasksState() {
        window.localStorage['Projects'] = JSON.stringify($rootScope.Projects);
    }
});
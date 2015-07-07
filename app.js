'use strict';

var formApp = angular.module('formApp', [
    'schemaForm',
    'schemaFormWizard'
]);

// our controller for the form
// =============================================================================
formApp.controller('formController', ['$scope', '$http', 'WizardHandler', function($scope, $http, WizardHandler) {

    $scope.loadForm = function() {
        $http.get('schema.json').success(function(data) {
            $scope.schema = data.schema;
            $scope.form = data.form;
            $scope.currentTabIndex = 0;
            WizardHandler.activateTab($scope, $scope.currentTabIndex);
        });
    };


    $scope.loadForm(10);

    $scope.model = {};

    $scope.submit = function() {
        $scope.$broadcast('schemaFormValidate');
        if ($scope.myForm.$valid) {
            console.log($scope.model);
        }
    };

    $scope.nextStep = function() {
        WizardHandler.validateTab($scope, $scope.currentTabIndex).then(function() {
            WizardHandler.activateTab($scope, ++$scope.currentTabIndex);
        });
    };

    $scope.previousStep = function() {
        WizardHandler.activateTab($scope, --$scope.currentTabIndex);
    };


    $scope.valueChanged = function(key,modelValue) {
        if(key[0] === 'category') {
            $scope.loadForm(modelValue);
        }
    };

}]);






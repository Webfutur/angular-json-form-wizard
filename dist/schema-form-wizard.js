/**
 * angular-schema-form-wizard - Wizard your form
 * @version v0.1.0
 * @link https://github.com/Webfutur/angular-schema-form-wizard
 * @license MIT
 */
'use strict';

var schemaFormWizard = angular.module('schemaFormWizard', []);

schemaFormWizard.config(['schemaFormDecoratorsProvider', function(decoratorsProvider) {
    decoratorsProvider.addMapping(
        'bootstrapDecorator',
        'wizard',
        'bootstrap/wizard.html'
    );

}]);

schemaFormWizard.service('WizardHandler', ['$q', function($q) {

    this.clone = function(obj)
    {
        var copy;
        if (null == obj || "object" != typeof obj) {
            return obj;
        }
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    this.validateTab = function(scope, tabIndex)
    {
        var dumpTabs = this.clone(scope.form[0].tabs);
        for (var i = 0; i < scope.form[0].tabs.length; i++) {
            if (i > tabIndex) {
                scope.form[0].tabs[i].items = [];
            }
        }
        scope.$broadcast('schemaFormValidate');
        var deferred = $q.defer();
        setTimeout(function() {
            scope.form[0].tabs = dumpTabs;
            if (scope.myForm.$valid) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        }, 100);
        return deferred.promise;
    };

    this.activateTab = function(scope, tabIndex)
    {
        for (var i = 0; i < scope.form[0].tabs.length; i++) {
            var tab = scope.form[0].tabs[i];
            tab.active = (i == tabIndex);
        }
    };

    this.displayArrayButtons = function(form)
    {
        for (var k in form) {
            if (k == 'add' && form[k] === false) {
                form[k] = null;
            }
            if (k == 'remove' && form[k] === false) {
                form[k] = null;
            }
            if (typeof form[k] == "object" && form[k] !== null) {
                this.displayArrayButtons(form[k]);
            }
        }
    };

}]);
angular.module("schemaFormWizard").run(["$templateCache", function($templateCache) {$templateCache.put("bootstrap/wizard-buttons.html","<div class=\"btn-group schema-form-actions\">\r\n    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"currentTabIndex == 0\" ng-click=\"previousStep()\">Previous</button>\r\n    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"currentTabIndex == form[0].tabs.length-1\" ng-click=\"nextStep()\">Next</button>\r\n    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"myForm.$invalid\" ng-click=\"submit()\">Submit</button>\r\n</div>\r\n");
$templateCache.put("bootstrap/wizard.html","<div ng-init=\"selected = { tab: 0 }\" class=\"schema-form-tabs {{form.htmlClass}}\">\r\n    <ul class=\"nav nav-tabs\">\r\n        <li ng-repeat=\"tab in form.tabs\"\r\n            class=\"disabled\"\r\n            ng-class=\"{active: tab.active}\">\r\n            <a class=\"disabled\" ng-disabled=\"true\">{{ tab.title }}</a>\r\n        </li>\r\n    </ul>\r\n    <div class=\"tab-content {{form.fieldHtmlClass}}\">\r\n        <div class=\"tab-pane\"\r\n            ng-disabled\r\n            ng-repeat=\"tab in form.tabs\"\r\n            ng-show=\"tab.active\"\r\n            ng-class=\"{active: tab.active}\">\r\n            <bootstrap-decorator ng-repeat=\"item in tab.items\" form=\"item\"></bootstrap-decorator>\r\n        </div>\r\n    </div>\r\n</div>\r\n");}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVtYS1mb3JtLXdpemFyZC5qcyIsInRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBIiwiZmlsZSI6InNjaGVtYS1mb3JtLXdpemFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHNjaGVtYUZvcm1XaXphcmQgPSBhbmd1bGFyLm1vZHVsZSgnc2NoZW1hRm9ybVdpemFyZCcsIFtdKTtcblxuc2NoZW1hRm9ybVdpemFyZC5jb25maWcoWydzY2hlbWFGb3JtRGVjb3JhdG9yc1Byb3ZpZGVyJywgZnVuY3Rpb24oZGVjb3JhdG9yc1Byb3ZpZGVyKSB7XG4gICAgZGVjb3JhdG9yc1Byb3ZpZGVyLmFkZE1hcHBpbmcoXG4gICAgICAgICdib290c3RyYXBEZWNvcmF0b3InLFxuICAgICAgICAnd2l6YXJkJyxcbiAgICAgICAgJ2Jvb3RzdHJhcC93aXphcmQuaHRtbCdcbiAgICApO1xuXG59XSk7XG5cbnNjaGVtYUZvcm1XaXphcmQuc2VydmljZSgnV2l6YXJkSGFuZGxlcicsIFsnJHEnLCBmdW5jdGlvbigkcSkge1xuXG4gICAgdGhpcy5jbG9uZSA9IGZ1bmN0aW9uKG9iailcbiAgICB7XG4gICAgICAgIHZhciBjb3B5O1xuICAgICAgICBpZiAobnVsbCA9PSBvYmogfHwgXCJvYmplY3RcIiAhPSB0eXBlb2Ygb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBjb3B5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGNvcHkuc2V0VGltZShvYmouZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgY29weSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGNvcHlbaV0gPSB0aGlzLmNsb25lKG9ialtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29weTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBjb3B5ID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBhdHRyIGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoYXR0cikpIGNvcHlbYXR0cl0gPSB0aGlzLmNsb25lKG9ialthdHRyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29weTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gY29weSBvYmohIEl0cyB0eXBlIGlzbid0IHN1cHBvcnRlZC5cIik7XG4gICAgfTtcblxuICAgIHRoaXMudmFsaWRhdGVUYWIgPSBmdW5jdGlvbihzY29wZSwgdGFiSW5kZXgpXG4gICAge1xuICAgICAgICB2YXIgZHVtcFRhYnMgPSB0aGlzLmNsb25lKHNjb3BlLmZvcm1bMF0udGFicyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NvcGUuZm9ybVswXS50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+IHRhYkluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuZm9ybVswXS50YWJzW2ldLml0ZW1zID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuJGJyb2FkY2FzdCgnc2NoZW1hRm9ybVZhbGlkYXRlJyk7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzY29wZS5mb3JtWzBdLnRhYnMgPSBkdW1wVGFicztcbiAgICAgICAgICAgIGlmIChzY29wZS5teUZvcm0uJHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXMuYWN0aXZhdGVUYWIgPSBmdW5jdGlvbihzY29wZSwgdGFiSW5kZXgpXG4gICAge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjb3BlLmZvcm1bMF0udGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRhYiA9IHNjb3BlLmZvcm1bMF0udGFic1tpXTtcbiAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaSA9PSB0YWJJbmRleCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwbGF5QXJyYXlCdXR0b25zID0gZnVuY3Rpb24oZm9ybSlcbiAgICB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gZm9ybSkge1xuICAgICAgICAgICAgaWYgKGsgPT0gJ2FkZCcgJiYgZm9ybVtrXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBmb3JtW2tdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrID09ICdyZW1vdmUnICYmIGZvcm1ba10gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZm9ybVtrXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1ba10gPT0gXCJvYmplY3RcIiAmJiBmb3JtW2tdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5QXJyYXlCdXR0b25zKGZvcm1ba10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxufV0pOyIsbnVsbF0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
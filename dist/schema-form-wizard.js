/**
 * angular-schema-form-wizard - Wizard your form
 * @version v0.1.0
 * @link https://github.com/Webfutur/angular-schema-form-wizard
 * @license GPL-2.0
 */
'use strict';

angular.
module('schemaFormWizard', []).

config(['schemaFormDecoratorsProvider', function(decoratorsProvider) {
    decoratorsProvider.addMapping(
        'bootstrapDecorator',
        'wizard',
        'wizard.html'
    );
}]).

service('WizardHandler', ['$q', function($q) {

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
        var dumpModel = this.clone(scope.model);
        for (var i = 0; i < scope.form[0].tabs.length; i++) {
            if (i > tabIndex) {
                scope.form[0].tabs[i].items = [];
            }
        }
        scope.$broadcast('schemaFormValidate');
        var deferred = $q.defer();
        setTimeout(function() {
            scope.form[0].tabs = dumpTabs;
            scope.model = dumpModel;
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

angular.module("schemaFormWizard").run(["$templateCache", function($templateCache) {$templateCache.put("wizard-buttons.html","<div class=\"btn-group schema-form-actions\">\n    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"currentTabIndex == 0\" ng-click=\"previousStep()\">Previous</button>\n    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"currentTabIndex == form[0].tabs.length-1\" ng-click=\"nextStep()\">Next</button>\n    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"myForm.$invalid\" ng-click=\"submit()\">Submit</button>\n</div>\n");
$templateCache.put("wizard.html","<div ng-init=\"selected = { tab: 0 }\" class=\"schema-form-tabs {{form.htmlClass}}\">\n    <ul class=\"nav nav-tabs\">\n        <li ng-repeat=\"tab in form.tabs\"\n            class=\"disabled\"\n            ng-class=\"{active: tab.active}\">\n            <a class=\"disabled\" ng-disabled=\"true\">{{ tab.title }}</a>\n        </li>\n    </ul>\n    <div class=\"tab-content {{form.fieldHtmlClass}}\">\n        <div class=\"tab-pane\"\n            ng-disabled\n            ng-repeat=\"tab in form.tabs\"\n            ng-show=\"tab.active\"\n            ng-class=\"{active: tab.active}\">\n            <bootstrap-decorator ng-repeat=\"item in tab.items\" form=\"item\"></bootstrap-decorator>\n        </div>\n    </div>\n</div>\n");}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVtYS1mb3JtLXdpemFyZC5qcyIsInRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFGQTtBQUNBIiwiZmlsZSI6InNjaGVtYS1mb3JtLXdpemFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5cbm1vZHVsZSgnc2NoZW1hRm9ybVdpemFyZCcsIFtdKS5cblxuY29uZmlnKFsnc2NoZW1hRm9ybURlY29yYXRvcnNQcm92aWRlcicsIGZ1bmN0aW9uKGRlY29yYXRvcnNQcm92aWRlcikge1xuICAgIGRlY29yYXRvcnNQcm92aWRlci5hZGRNYXBwaW5nKFxuICAgICAgICAnYm9vdHN0cmFwRGVjb3JhdG9yJyxcbiAgICAgICAgJ3dpemFyZCcsXG4gICAgICAgICd3aXphcmQuaHRtbCdcbiAgICApO1xufV0pLlxuXG5zZXJ2aWNlKCdXaXphcmRIYW5kbGVyJywgWyckcScsIGZ1bmN0aW9uKCRxKSB7XG5cbiAgICB0aGlzLmNsb25lID0gZnVuY3Rpb24ob2JqKVxuICAgIHtcbiAgICAgICAgdmFyIGNvcHk7XG4gICAgICAgIGlmIChudWxsID09IG9iaiB8fCBcIm9iamVjdFwiICE9IHR5cGVvZiBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGNvcHkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgY29weS5zZXRUaW1lKG9iai5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBjb3B5ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29weVtpXSA9IHRoaXMuY2xvbmUob2JqW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIGNvcHkgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSkgY29weVthdHRyXSA9IHRoaXMuY2xvbmUob2JqW2F0dHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBjb3B5IG9iaiEgSXRzIHR5cGUgaXNuJ3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy52YWxpZGF0ZVRhYiA9IGZ1bmN0aW9uKHNjb3BlLCB0YWJJbmRleClcbiAgICB7XG4gICAgICAgIHZhciBkdW1wVGFicyA9IHRoaXMuY2xvbmUoc2NvcGUuZm9ybVswXS50YWJzKTtcbiAgICAgICAgdmFyIGR1bXBNb2RlbCA9IHRoaXMuY2xvbmUoc2NvcGUubW9kZWwpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjb3BlLmZvcm1bMF0udGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPiB0YWJJbmRleCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmZvcm1bMF0udGFic1tpXS5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiRicm9hZGNhc3QoJ3NjaGVtYUZvcm1WYWxpZGF0ZScpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUuZm9ybVswXS50YWJzID0gZHVtcFRhYnM7XG4gICAgICAgICAgICBzY29wZS5tb2RlbCA9IGR1bXBNb2RlbDtcbiAgICAgICAgICAgIGlmIChzY29wZS5teUZvcm0uJHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXMuYWN0aXZhdGVUYWIgPSBmdW5jdGlvbihzY29wZSwgdGFiSW5kZXgpXG4gICAge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjb3BlLmZvcm1bMF0udGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRhYiA9IHNjb3BlLmZvcm1bMF0udGFic1tpXTtcbiAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaSA9PSB0YWJJbmRleCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwbGF5QXJyYXlCdXR0b25zID0gZnVuY3Rpb24oZm9ybSlcbiAgICB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gZm9ybSkge1xuICAgICAgICAgICAgaWYgKGsgPT0gJ2FkZCcgJiYgZm9ybVtrXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBmb3JtW2tdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrID09ICdyZW1vdmUnICYmIGZvcm1ba10gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZm9ybVtrXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1ba10gPT0gXCJvYmplY3RcIiAmJiBmb3JtW2tdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5QXJyYXlCdXR0b25zKGZvcm1ba10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxufV0pO1xuIixudWxsXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
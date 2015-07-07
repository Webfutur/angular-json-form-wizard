/**
 * angular-schema-form-wizard - Wizard your form
 * @version v0.1.0
 * @link https://github.com/Webfutur/angular-schema-form-wizard
 * @license GPLv2
 */
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

angular.module("schemaFormWizard").run(["$templateCache", function($templateCache) {$templateCache.put("wizard-buttons.html","<div class=\"btn-group schema-form-actions\">\r\n    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"currentTabIndex == 0\" ng-click=\"previousStep()\">Previous</button>\r\n    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"currentTabIndex == form[0].tabs.length-1\" ng-click=\"nextStep()\">Next</button>\r\n    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"myForm.$invalid\" ng-click=\"submit()\">Submit</button>\r\n</div>\r\n");
$templateCache.put("wizard.html","<div ng-init=\"selected = { tab: 0 }\" class=\"schema-form-tabs {{form.htmlClass}}\">\r\n    <ul class=\"nav nav-tabs\">\r\n        <li ng-repeat=\"tab in form.tabs\"\r\n            class=\"disabled\"\r\n            ng-class=\"{active: tab.active}\">\r\n            <a class=\"disabled\" ng-disabled=\"true\">{{ tab.title }}</a>\r\n        </li>\r\n    </ul>\r\n    <div class=\"tab-content {{form.fieldHtmlClass}}\">\r\n        <div class=\"tab-pane\"\r\n            ng-disabled\r\n            ng-repeat=\"tab in form.tabs\"\r\n            ng-show=\"tab.active\"\r\n            ng-class=\"{active: tab.active}\">\r\n            <bootstrap-decorator ng-repeat=\"item in tab.items\" form=\"item\"></bootstrap-decorator>\r\n        </div>\r\n    </div>\r\n</div>\r\n");}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVtYS1mb3JtLXdpemFyZC5qcyIsInRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0RkE7QUFDQSIsImZpbGUiOiJzY2hlbWEtZm9ybS13aXphcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLlxubW9kdWxlKCdzY2hlbWFGb3JtV2l6YXJkJywgW10pLlxuXG5jb25maWcoWydzY2hlbWFGb3JtRGVjb3JhdG9yc1Byb3ZpZGVyJywgZnVuY3Rpb24oZGVjb3JhdG9yc1Byb3ZpZGVyKSB7XG4gICAgZGVjb3JhdG9yc1Byb3ZpZGVyLmFkZE1hcHBpbmcoXG4gICAgICAgICdib290c3RyYXBEZWNvcmF0b3InLFxuICAgICAgICAnd2l6YXJkJyxcbiAgICAgICAgJ3dpemFyZC5odG1sJ1xuICAgICk7XG59XSkuXG5cbnNlcnZpY2UoJ1dpemFyZEhhbmRsZXInLCBbJyRxJywgZnVuY3Rpb24oJHEpIHtcblxuICAgIHRoaXMuY2xvbmUgPSBmdW5jdGlvbihvYmopXG4gICAge1xuICAgICAgICB2YXIgY29weTtcbiAgICAgICAgaWYgKG51bGwgPT0gb2JqIHx8IFwib2JqZWN0XCIgIT0gdHlwZW9mIG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgY29weSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBjb3B5LnNldFRpbWUob2JqLmdldFRpbWUoKSk7XG4gICAgICAgICAgICByZXR1cm4gY29weTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGNvcHkgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb3B5W2ldID0gdGhpcy5jbG9uZShvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgY29weSA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgYXR0ciBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSBjb3B5W2F0dHJdID0gdGhpcy5jbG9uZShvYmpbYXR0cl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGNvcHkgb2JqISBJdHMgdHlwZSBpc24ndCBzdXBwb3J0ZWQuXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnZhbGlkYXRlVGFiID0gZnVuY3Rpb24oc2NvcGUsIHRhYkluZGV4KVxuICAgIHtcbiAgICAgICAgdmFyIGR1bXBUYWJzID0gdGhpcy5jbG9uZShzY29wZS5mb3JtWzBdLnRhYnMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjb3BlLmZvcm1bMF0udGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPiB0YWJJbmRleCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmZvcm1bMF0udGFic1tpXS5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiRicm9hZGNhc3QoJ3NjaGVtYUZvcm1WYWxpZGF0ZScpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUuZm9ybVswXS50YWJzID0gZHVtcFRhYnM7XG4gICAgICAgICAgICBpZiAoc2NvcGUubXlGb3JtLiR2YWxpZCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGlzLmFjdGl2YXRlVGFiID0gZnVuY3Rpb24oc2NvcGUsIHRhYkluZGV4KVxuICAgIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY29wZS5mb3JtWzBdLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0YWIgPSBzY29wZS5mb3JtWzBdLnRhYnNbaV07XG4gICAgICAgICAgICB0YWIuYWN0aXZlID0gKGkgPT0gdGFiSW5kZXgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcGxheUFycmF5QnV0dG9ucyA9IGZ1bmN0aW9uKGZvcm0pXG4gICAge1xuICAgICAgICBmb3IgKHZhciBrIGluIGZvcm0pIHtcbiAgICAgICAgICAgIGlmIChrID09ICdhZGQnICYmIGZvcm1ba10gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZm9ybVtrXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoayA9PSAncmVtb3ZlJyAmJiBmb3JtW2tdID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGZvcm1ba10gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtW2tdID09IFwib2JqZWN0XCIgJiYgZm9ybVtrXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUFycmF5QnV0dG9ucyhmb3JtW2tdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbn1dKTtcbiIsbnVsbF0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
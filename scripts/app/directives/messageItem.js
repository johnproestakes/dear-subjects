angular.module('SubjectWriter')
.directive('messageItem', ['$timeout', function($timeout){
  return {
    restrict: "E",
    template: '<div ng-class="messageCls">\
    <div class="right floated content" ng-show="error.ctaLabel!==\'\'" >\
    <div class="ui small compact" \
    ng-class="buttonCls" ng-if="buttonCls" \
    \ ng-click="error.ctaHandler(item)" \
     ng-bind-html="error.ctaLabel">{{error.ctaLabel ? error.ctaLabel : "Resolve"}}</div>\
    </div>\
    <div class="right floated content" ng-show="error.cleanType==\'QA\'" >\
    <span class="ui icon label" ng-show="error.cleanType==\'QA\'&&error.override"><i class="thumbs up icon"></i> YOU CONFIRMED</span>\
    <div class="ui small compact" \
    ng-class="buttonCls" ng-if="buttonCls" ng-hide="error.override" \
    \ ng-click="error.setOverrideStatus(true);error.ctaHandler()"><i class="check icon"></i> Confirm</div>\
    </div>\
      <div class="content" ng-show="buttonCls"> \
        <h4 ng-bind-html="error.title | dewidow"></h4>\
        <div ng-bind-html="error.description"></div>{{item.ctaLabel}}</div>\
        <div ng-if="error.resource!==\'\'"><a ng-href="{{error.resource}}" target="_blank">Read more <i class="external alternate icon"></i></a></div>\
    </div>',
    scope: {error: "=", item:"="},
    link: function(scope, el, attr){
      $timeout(function(){
        var cls = ["", "red", "orange", "violet", "teal", "blue"];


        scope.buttonCls = [cls[scope.error.severity],"button"].join(" ");

        if(scope.error.cleanType=="QA" && scope.error.override) {
          scope.messageCls = "";
        } else {
          scope.messageCls = ["type-",scope.error.type," level-",scope.error.severity].join("");
        }

        scope.$on('$destroy', function(){
          // jQuery(el).popup("destroy");
        });
    });
  }
};


}]);

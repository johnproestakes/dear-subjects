angular.module('SubjectWriter')
.directive('messageCenter', ['$timeout', function($timeout){
  return {
    restrict: "E",
    template: '<div class="message-center"><div class="ui tiny secondary menu">\
    <div class="item mnu-title" style="padding-left:0;">{{heading === undefined ? "MESSAGES:" : heading }}</div>\
    <a class="item" ng-click="IntelligenceCenter.setType(\'\')" ng-class="{active: IntelligenceCenter.search.type==\'\'}" ng-show="IntelligenceCenter.canViewAll()">All <span class="ui tiny label">{{errors.messages.length}}</span></a>\
    <a class="item" ng-repeat="(tab,val) in errors.tabs track by $index" ng-show="errors.count[tab]" ng-click="IntelligenceCenter.setType(val)" ng-class="{active: IntelligenceCenter.search.type==val}">{{tab | uncamelize}} <span class="ui tiny label">{{errors.count[tab]}}</span></a>\
    </div>\
    <div id="error-messages-list" class="ui middle aligned divided list">\
      <message-item item="item" class="item" ng-repeat="obj in errors.messages | filter: IntelligenceCenter.search" error="obj"></message-item>\
      </div>\
      <div align="center" style="margin-top: -1.5em; padding-bottom: 1.5em;" ng-show="IntelligenceCenter.search.type!==\'\' && IntelligenceCenter.canViewAll()">\
      <button class="ui tiny basic button" ng-click="IntelligenceCenter.setType(\'\')"><i class="minus square icon"></i> Remove filter</button></div>\
    </div>',
    scope: {
      errors:"=",
      heading:"@",
      item:"="
    },
    link: function(scope, el, attr){
      $timeout(function(){

        scope.IntelligenceCenter = new EMLMakerIntelligence.IntelligenceCenter(scope.errors, scope);

        scope.$on('$destroy', function(){
          // jQuery(el).popup("destroy");
        });
    });
  }
};


}]);

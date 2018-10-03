angular.module('SubjectWriter')
.directive('simpleAccordion', ['$timeout', function($timeout){
  return {
    restrict: "E",
    transclude: true,
    scope:{heading:"@",show: "="},
    template: '<div ng-class="{expanded: show, collapsed: !show}"><div ng-click="togglePane()" class="accordion-title">\
    <i class="chevron right icon" ng-show="!show" alt="[+]"></i>\
    <i class="chevron down icon" ng-show="show" alt="[-]"></i>\
     <span>{{heading}}</span></div><ng-transclude ng-show="show"></ng-transclude></div>',
    link: function(scope, el, attr){
      scope.show = false;
      $timeout(function(){
        scope.togglePane = function(){
          scope.show = !scope.show;
        };
        jQuery.extend(jQuery(el),{"toggleAccordion": function(){
          scope.$apply(function(){
            scope.togglePane();
          });
        }});
        scope.$on('$destroy', function(){
          // jQuery(el).popup("destroy");
        });
      });
    }
  };
}]);

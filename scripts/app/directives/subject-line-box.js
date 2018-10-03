angular.module('SubjectWriter')
.directive('subjectLineBox', ['$timeout', function($timeout){
  return {
    restrict: "E",
    template: '<div >\
    <div class="ui sl-top">\
      <div id="writer">\
          <textarea placeholder="Type your subject line here" ng-model="DearSubjects.subjectLine" ng-change-lazy="DearSubjects.updateSubjectLine()" autocorrect="off"/></textarea>\
          <button class="ui purple icon button" ng-click="DearSubjects.loading=true;DearSubjects.initSearch()" ng-class="{loading: DearSubjects.loading}"><i class="search icon"></i> Search</button>\
        </div>\
        </div>\
    </div>\
    <div class="sl top fixed" ng-show="___showFixedComponent">\
    <div class="ui container form" style="padding:1em 0">\
      <div class="ui grid">\
      <div class="two wide column">\
        <button ng-click="scrollToTop()" class="ui large basic fluid icon button"><i class="up arrow icon"></i></button>\
        </div>\
      <div class="twelve wide column">\
      <div class="field">\
        <div class="ui large action input">\
          <input type="text" ng-model="DearSubjects.subjectLine" ng-change-lazy="DearSubjects.updateSubjectLine()" autocorrect="off"/>\
          <button class="ui purple icon button" ng-click="DearSubjects.loading=true;DearSubjects.initSearch()" ng-class="{loading: DearSubjects.loading}"><i class="search icon"></i></button>\
        </div>\
      </div>\
      </div>\
      <div class="two wide column">\
        <button ng-click="scrollToTop()" class="ui large basic fluid icon button"><i class="bell icon"></i></button>\
        </div>\
      </div>\
    </div>\
    </div>\
    </div>',
    link: function(scope, el, attr){
      scope.___showFixedComponent = false;
      $timeout(function(){
        jQuery('#writer').on('click', function(){
          jQuery('#writer').find("textarea").focus();
        });
        jQuery('.sl-top')
          .visibility({
            once: false,
            onTopPassedReverse: function(calculations){
              console.log("TOPPASSEDREVERSED");
              scope.$apply(function(){
                scope.___showFixedComponent = false;
              });
            },
            onBottomPassed: function(calculations) {
              scope.$apply(function(){
                console.log("BOTTOMPASSED");
                scope.___showFixedComponent = true;
              });
            }
          })
        ;




        scope.$on('$destroy', function(){
          // jQuery(el).popup("destroy");
        });
      });
    }
  };


}]);

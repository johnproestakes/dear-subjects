angular.module('SubjectWriter')
.directive('uiDropdown', ['$timeout', function($timeout){
	return {
		restrict: "A",
		// transclude: true,
		link: function(scope, el, attr){

			$timeout(function(){
				$(el).dropdown();
				});
				scope.$on('$destroy', function(){
					$(el).dropdown("destroy");
				});

			}
		};
	}]);

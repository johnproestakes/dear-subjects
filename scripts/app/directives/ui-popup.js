angular.module('SubjectWriter')
.directive('uiPopup', ['$timeout', function($timeout){
	return {
		restrict: "A",
		// transclude: true,
		link: function(scope, el, attr){

			$timeout(function(){
				$(el).popup();
				});
				scope.$on('$destroy', function(){
					$(el).popup("destroy");
				});

			}
		};
	}]);

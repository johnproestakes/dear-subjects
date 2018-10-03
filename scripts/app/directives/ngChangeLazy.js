angular.module('SubjectWriter')
.directive('ngChangeLazy', ['$timeout', function($timeout){
	return {
		restrict: "A",
		// transclude: true,
		scope: {
			ngModel:"=",
			ngChangeLazy:"&",
			changeLazyBuffer:"=",
			dataTransferEvt:"="
		},
		link: function(scope, el, attr){
			var timer = null;
			$timeout(function(){
				var lastValue = scope.ngModel.toString();
				el.on('keyup', function(e){
					clearTimeout(timer);
					timer = setTimeout(function(){
						if(lastValue !== el[0].value){
						scope.$apply(function(){
								scope.ngChangeLazy();
								lastValue = el[0].value;
						});
						}
					}, attr.changeLazyBuffer=== undefined ? 500 : attr.changeLazyBuffer*1);
				});
				scope.$on('$destroy', function(){
					el.off('keyup');
				});
			});

			}
		};
	}]);

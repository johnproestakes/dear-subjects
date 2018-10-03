angular.module('SubjectWriter')
.directive('dropEnable', ['$timeout', function($timeout){
	return {
		restrict: "A",
		// transclude: true,
		scope: {
			ondropfile:"&",
			dataTransferEvt:"="
		},
		link: function(scope, el, attr){
			var fileDropper = el;
			var timer = null;
			//reset
			var dropperReset = function(evt){
				clearTimeout(timer);
				timer = setTimeout(function(){
					fileDropper.removeClass('active');
					fileDropper.css({border: "",color:"", background: ""});
				}, 100);
					evt.stopPropagation();
    			evt.preventDefault();

				};

				var counter = 0;
			$timeout(function(){

			fileDropper.get(0).addEventListener('drop', function(evt){
				if(location.hash !== "#/main") return false;
					evt.stopPropagation();
    			evt.preventDefault();
					counter++;
					console.log(evt);
					scope.ondropfile({"evt":evt});
					dropperReset(evt);
					if(location.hash == "#/main"){

					}



				}, false);
			fileDropper.get(0).addEventListener('dragend', dropperReset, false);
			fileDropper.get(0).addEventListener('dragleave', dropperReset, false);
			fileDropper.get(0).addEventListener('dragover', function(evt){

				// evt.stopPropagation();

				clearTimeout(timer);
				if(location.hash !== "#/main") return false;
				evt.dataTransfer.dropEffect = 'copy';
				fileDropper.addClass("active");
				fileDropper.css({border: "solid 3px blue", color:"blue", background: "lightblue"});
				timer = setTimeout(function(){

					// evt.preventDefault();
				}, 100);

				evt.preventDefault();
				}, false);


				});

			}
		};
	}]);

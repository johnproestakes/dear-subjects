angular.module("SubjectWriter",[
  'ngSanitize',
  'ngRoute'
]);


// function doSmth(str){
//   var output = [];
//   var b = str.toLowerCase().split(" ");
//   var c = 0;
//   for(var i=0;i<b.length;i++){
//     var c = i;
//     while(c<=b.length){
//       var d = b.slice().slice(i,c).join(" ");
//       if(d!=="")
//         output.push(d.trim());
//         c++;
//     }
//   }
// output.sort(function(a,b){return a.length>b.length ? -1 : 1;});
// return output;
// }
// function removeStopWords(text){
//   var b = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among","amongst","amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];
//
//   return text.split(" ").filter(function(a){ return b.indexOf(a)==-1;}).join(" ");
// }
function findString(text){
  var mystr = removeStopWords(text.replace(/[^\w\s]/gi, ''));
  var mystrK = doSmth(mystr);
  var output = [];
  var b = a.split("\n");
  for(var i=0;i<b.length;i++){
  var d1 = doSmth(removeStopWords(b[i].replace(/[^\w\s]/gi, '').replace(/\s\s/g," ")));
  var simil = percent_diff(mystrK, d1);

  if(simil>.1){
    console.log(d1, simil);
    output.push([b[i], simil]);
  }


  }
  output.sort(function(a1,b1){return a1[1]<b1[1] ? 1 : -1;});
  console.log(output.slice(0,20));
}

function percent_diff(a1, a2){
  var matches = a1.slice().filter(function(b){ return a2.indexOf(b)>-1});
  return matches.length / a1.length;
}
var autoExpandTextarea = function (field) {

	// Reset field height
	field.style.height = 'inherit';
	// Get the computed styles for the element
	var computed = window.getComputedStyle(field);
	// Calculate the height
	var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
	             + parseInt(computed.getPropertyValue('padding-top'), 10)
	             + field.scrollHeight
	             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
	             + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

	field.style.height = height + 'px';
};

document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() !== 'textarea') return;
	autoExpandTextarea(event.target);
}, false);
function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

angular.module("SubjectWriter")
.controller("MainController", ["$scope", function($scope){
  $scope.write = "HEY!";

  $scope.DearSubjectsData = new DearSubjectsData($scope);
  $scope.scrollToTop = function(){
    try {
      $("html, body").animate({ scrollTop: 0 });
    } catch(e){
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

  };
  $scope.SLIntelligence = DearSubjects.intelligence.module("Subject");
  $scope.PBIntelligence = DearSubjects.intelligence.module("BestPractices");
  $scope.acknowldeged = false;
  $scope.dropFile = function(evt){
    $scope.DearSubjects = new DearSubjectsEngine($scope.DearSubjectsData);
    $scope.DearSubjectsData.loadFromCSV(evt);
  };
}]);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL21haW4uanMiLCJkaXJlY3RpdmVzL2Ryb3AtZW5hYmxlLmpzIiwiZGlyZWN0aXZlcy9tZXNzYWdlQ2VudGVyLmpzIiwiZGlyZWN0aXZlcy9tZXNzYWdlSXRlbS5qcyIsImRpcmVjdGl2ZXMvbmdDaGFuZ2VMYXp5LmpzIiwiZGlyZWN0aXZlcy9zYW1wbGUuanMiLCJkaXJlY3RpdmVzL3NpbXBsZUFjY29yZGlvbi5qcyIsImRpcmVjdGl2ZXMvc3ViamVjdC1saW5lLWJveC5qcyIsImRpcmVjdGl2ZXMvdWktZHJvcGRvd24uanMiLCJkaXJlY3RpdmVzL3VpLXBvcHVwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKFwiU3ViamVjdFdyaXRlclwiLFtcbiAgJ25nU2FuaXRpemUnLFxuICAnbmdSb3V0ZSdcbl0pO1xuXG5cbi8vIGZ1bmN0aW9uIGRvU210aChzdHIpe1xuLy8gICB2YXIgb3V0cHV0ID0gW107XG4vLyAgIHZhciBiID0gc3RyLnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpO1xuLy8gICB2YXIgYyA9IDA7XG4vLyAgIGZvcih2YXIgaT0wO2k8Yi5sZW5ndGg7aSsrKXtcbi8vICAgICB2YXIgYyA9IGk7XG4vLyAgICAgd2hpbGUoYzw9Yi5sZW5ndGgpe1xuLy8gICAgICAgdmFyIGQgPSBiLnNsaWNlKCkuc2xpY2UoaSxjKS5qb2luKFwiIFwiKTtcbi8vICAgICAgIGlmKGQhPT1cIlwiKVxuLy8gICAgICAgICBvdXRwdXQucHVzaChkLnRyaW0oKSk7XG4vLyAgICAgICAgIGMrKztcbi8vICAgICB9XG4vLyAgIH1cbi8vIG91dHB1dC5zb3J0KGZ1bmN0aW9uKGEsYil7cmV0dXJuIGEubGVuZ3RoPmIubGVuZ3RoID8gLTEgOiAxO30pO1xuLy8gcmV0dXJuIG91dHB1dDtcbi8vIH1cbi8vIGZ1bmN0aW9uIHJlbW92ZVN0b3BXb3Jkcyh0ZXh0KXtcbi8vICAgdmFyIGIgPSBbXCJhXCIsIFwiYWJvdXRcIiwgXCJhYm92ZVwiLCBcImFib3ZlXCIsIFwiYWNyb3NzXCIsIFwiYWZ0ZXJcIiwgXCJhZnRlcndhcmRzXCIsIFwiYWdhaW5cIiwgXCJhZ2FpbnN0XCIsIFwiYWxsXCIsIFwiYWxtb3N0XCIsIFwiYWxvbmVcIiwgXCJhbG9uZ1wiLCBcImFscmVhZHlcIiwgXCJhbHNvXCIsXCJhbHRob3VnaFwiLFwiYWx3YXlzXCIsXCJhbVwiLFwiYW1vbmdcIixcImFtb25nc3RcIixcImFtb3VuZ3N0XCIsIFwiYW1vdW50XCIsICBcImFuXCIsIFwiYW5kXCIsIFwiYW5vdGhlclwiLCBcImFueVwiLFwiYW55aG93XCIsXCJhbnlvbmVcIixcImFueXRoaW5nXCIsXCJhbnl3YXlcIiwgXCJhbnl3aGVyZVwiLCBcImFyZVwiLCBcImFyb3VuZFwiLCBcImFzXCIsICBcImF0XCIsIFwiYmFja1wiLFwiYmVcIixcImJlY2FtZVwiLCBcImJlY2F1c2VcIixcImJlY29tZVwiLFwiYmVjb21lc1wiLCBcImJlY29taW5nXCIsIFwiYmVlblwiLCBcImJlZm9yZVwiLCBcImJlZm9yZWhhbmRcIiwgXCJiZWhpbmRcIiwgXCJiZWluZ1wiLCBcImJlbG93XCIsIFwiYmVzaWRlXCIsIFwiYmVzaWRlc1wiLCBcImJldHdlZW5cIiwgXCJiZXlvbmRcIiwgXCJiaWxsXCIsIFwiYm90aFwiLCBcImJvdHRvbVwiLFwiYnV0XCIsIFwiYnlcIiwgXCJjYWxsXCIsIFwiY2FuXCIsIFwiY2Fubm90XCIsIFwiY2FudFwiLCBcImNvXCIsIFwiY29uXCIsIFwiY291bGRcIiwgXCJjb3VsZG50XCIsIFwiY3J5XCIsIFwiZGVcIiwgXCJkZXNjcmliZVwiLCBcImRldGFpbFwiLCBcImRvXCIsIFwiZG9uZVwiLCBcImRvd25cIiwgXCJkdWVcIiwgXCJkdXJpbmdcIiwgXCJlYWNoXCIsIFwiZWdcIiwgXCJlaWdodFwiLCBcImVpdGhlclwiLCBcImVsZXZlblwiLFwiZWxzZVwiLCBcImVsc2V3aGVyZVwiLCBcImVtcHR5XCIsIFwiZW5vdWdoXCIsIFwiZXRjXCIsIFwiZXZlblwiLCBcImV2ZXJcIiwgXCJldmVyeVwiLCBcImV2ZXJ5b25lXCIsIFwiZXZlcnl0aGluZ1wiLCBcImV2ZXJ5d2hlcmVcIiwgXCJleGNlcHRcIiwgXCJmZXdcIiwgXCJmaWZ0ZWVuXCIsIFwiZmlmeVwiLCBcImZpbGxcIiwgXCJmaW5kXCIsIFwiZmlyZVwiLCBcImZpcnN0XCIsIFwiZml2ZVwiLCBcImZvclwiLCBcImZvcm1lclwiLCBcImZvcm1lcmx5XCIsIFwiZm9ydHlcIiwgXCJmb3VuZFwiLCBcImZvdXJcIiwgXCJmcm9tXCIsIFwiZnJvbnRcIiwgXCJmdWxsXCIsIFwiZnVydGhlclwiLCBcImdldFwiLCBcImdpdmVcIiwgXCJnb1wiLCBcImhhZFwiLCBcImhhc1wiLCBcImhhc250XCIsIFwiaGF2ZVwiLCBcImhlXCIsIFwiaGVuY2VcIiwgXCJoZXJcIiwgXCJoZXJlXCIsIFwiaGVyZWFmdGVyXCIsIFwiaGVyZWJ5XCIsIFwiaGVyZWluXCIsIFwiaGVyZXVwb25cIiwgXCJoZXJzXCIsIFwiaGVyc2VsZlwiLCBcImhpbVwiLCBcImhpbXNlbGZcIiwgXCJoaXNcIiwgXCJob3dcIiwgXCJob3dldmVyXCIsIFwiaHVuZHJlZFwiLCBcImllXCIsIFwiaWZcIiwgXCJpblwiLCBcImluY1wiLCBcImluZGVlZFwiLCBcImludGVyZXN0XCIsIFwiaW50b1wiLCBcImlzXCIsIFwiaXRcIiwgXCJpdHNcIiwgXCJpdHNlbGZcIiwgXCJrZWVwXCIsIFwibGFzdFwiLCBcImxhdHRlclwiLCBcImxhdHRlcmx5XCIsIFwibGVhc3RcIiwgXCJsZXNzXCIsIFwibHRkXCIsIFwibWFkZVwiLCBcIm1hbnlcIiwgXCJtYXlcIiwgXCJtZVwiLCBcIm1lYW53aGlsZVwiLCBcIm1pZ2h0XCIsIFwibWlsbFwiLCBcIm1pbmVcIiwgXCJtb3JlXCIsIFwibW9yZW92ZXJcIiwgXCJtb3N0XCIsIFwibW9zdGx5XCIsIFwibW92ZVwiLCBcIm11Y2hcIiwgXCJtdXN0XCIsIFwibXlcIiwgXCJteXNlbGZcIiwgXCJuYW1lXCIsIFwibmFtZWx5XCIsIFwibmVpdGhlclwiLCBcIm5ldmVyXCIsIFwibmV2ZXJ0aGVsZXNzXCIsIFwibmV4dFwiLCBcIm5pbmVcIiwgXCJub1wiLCBcIm5vYm9keVwiLCBcIm5vbmVcIiwgXCJub29uZVwiLCBcIm5vclwiLCBcIm5vdFwiLCBcIm5vdGhpbmdcIiwgXCJub3dcIiwgXCJub3doZXJlXCIsIFwib2ZcIiwgXCJvZmZcIiwgXCJvZnRlblwiLCBcIm9uXCIsIFwib25jZVwiLCBcIm9uZVwiLCBcIm9ubHlcIiwgXCJvbnRvXCIsIFwib3JcIiwgXCJvdGhlclwiLCBcIm90aGVyc1wiLCBcIm90aGVyd2lzZVwiLCBcIm91clwiLCBcIm91cnNcIiwgXCJvdXJzZWx2ZXNcIiwgXCJvdXRcIiwgXCJvdmVyXCIsIFwib3duXCIsXCJwYXJ0XCIsIFwicGVyXCIsIFwicGVyaGFwc1wiLCBcInBsZWFzZVwiLCBcInB1dFwiLCBcInJhdGhlclwiLCBcInJlXCIsIFwic2FtZVwiLCBcInNlZVwiLCBcInNlZW1cIiwgXCJzZWVtZWRcIiwgXCJzZWVtaW5nXCIsIFwic2VlbXNcIiwgXCJzZXJpb3VzXCIsIFwic2V2ZXJhbFwiLCBcInNoZVwiLCBcInNob3VsZFwiLCBcInNob3dcIiwgXCJzaWRlXCIsIFwic2luY2VcIiwgXCJzaW5jZXJlXCIsIFwic2l4XCIsIFwic2l4dHlcIiwgXCJzb1wiLCBcInNvbWVcIiwgXCJzb21laG93XCIsIFwic29tZW9uZVwiLCBcInNvbWV0aGluZ1wiLCBcInNvbWV0aW1lXCIsIFwic29tZXRpbWVzXCIsIFwic29tZXdoZXJlXCIsIFwic3RpbGxcIiwgXCJzdWNoXCIsIFwic3lzdGVtXCIsIFwidGFrZVwiLCBcInRlblwiLCBcInRoYW5cIiwgXCJ0aGF0XCIsIFwidGhlXCIsIFwidGhlaXJcIiwgXCJ0aGVtXCIsIFwidGhlbXNlbHZlc1wiLCBcInRoZW5cIiwgXCJ0aGVuY2VcIiwgXCJ0aGVyZVwiLCBcInRoZXJlYWZ0ZXJcIiwgXCJ0aGVyZWJ5XCIsIFwidGhlcmVmb3JlXCIsIFwidGhlcmVpblwiLCBcInRoZXJldXBvblwiLCBcInRoZXNlXCIsIFwidGhleVwiLCBcInRoaWNrdlwiLCBcInRoaW5cIiwgXCJ0aGlyZFwiLCBcInRoaXNcIiwgXCJ0aG9zZVwiLCBcInRob3VnaFwiLCBcInRocmVlXCIsIFwidGhyb3VnaFwiLCBcInRocm91Z2hvdXRcIiwgXCJ0aHJ1XCIsIFwidGh1c1wiLCBcInRvXCIsIFwidG9nZXRoZXJcIiwgXCJ0b29cIiwgXCJ0b3BcIiwgXCJ0b3dhcmRcIiwgXCJ0b3dhcmRzXCIsIFwidHdlbHZlXCIsIFwidHdlbnR5XCIsIFwidHdvXCIsIFwidW5cIiwgXCJ1bmRlclwiLCBcInVudGlsXCIsIFwidXBcIiwgXCJ1cG9uXCIsIFwidXNcIiwgXCJ2ZXJ5XCIsIFwidmlhXCIsIFwid2FzXCIsIFwid2VcIiwgXCJ3ZWxsXCIsIFwid2VyZVwiLCBcIndoYXRcIiwgXCJ3aGF0ZXZlclwiLCBcIndoZW5cIiwgXCJ3aGVuY2VcIiwgXCJ3aGVuZXZlclwiLCBcIndoZXJlXCIsIFwid2hlcmVhZnRlclwiLCBcIndoZXJlYXNcIiwgXCJ3aGVyZWJ5XCIsIFwid2hlcmVpblwiLCBcIndoZXJldXBvblwiLCBcIndoZXJldmVyXCIsIFwid2hldGhlclwiLCBcIndoaWNoXCIsIFwid2hpbGVcIiwgXCJ3aGl0aGVyXCIsIFwid2hvXCIsIFwid2hvZXZlclwiLCBcIndob2xlXCIsIFwid2hvbVwiLCBcIndob3NlXCIsIFwid2h5XCIsIFwid2lsbFwiLCBcIndpdGhcIiwgXCJ3aXRoaW5cIiwgXCJ3aXRob3V0XCIsIFwid291bGRcIiwgXCJ5ZXRcIiwgXCJ5b3VcIiwgXCJ5b3VyXCIsIFwieW91cnNcIiwgXCJ5b3Vyc2VsZlwiLCBcInlvdXJzZWx2ZXNcIiwgXCJ0aGVcIl07XG4vL1xuLy8gICByZXR1cm4gdGV4dC5zcGxpdChcIiBcIikuZmlsdGVyKGZ1bmN0aW9uKGEpeyByZXR1cm4gYi5pbmRleE9mKGEpPT0tMTt9KS5qb2luKFwiIFwiKTtcbi8vIH1cbmZ1bmN0aW9uIGZpbmRTdHJpbmcodGV4dCl7XG4gIHZhciBteXN0ciA9IHJlbW92ZVN0b3BXb3Jkcyh0ZXh0LnJlcGxhY2UoL1teXFx3XFxzXS9naSwgJycpKTtcbiAgdmFyIG15c3RySyA9IGRvU210aChteXN0cik7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIGIgPSBhLnNwbGl0KFwiXFxuXCIpO1xuICBmb3IodmFyIGk9MDtpPGIubGVuZ3RoO2krKyl7XG4gIHZhciBkMSA9IGRvU210aChyZW1vdmVTdG9wV29yZHMoYltpXS5yZXBsYWNlKC9bXlxcd1xcc10vZ2ksICcnKS5yZXBsYWNlKC9cXHNcXHMvZyxcIiBcIikpKTtcbiAgdmFyIHNpbWlsID0gcGVyY2VudF9kaWZmKG15c3RySywgZDEpO1xuXG4gIGlmKHNpbWlsPi4xKXtcbiAgICBjb25zb2xlLmxvZyhkMSwgc2ltaWwpO1xuICAgIG91dHB1dC5wdXNoKFtiW2ldLCBzaW1pbF0pO1xuICB9XG5cblxuICB9XG4gIG91dHB1dC5zb3J0KGZ1bmN0aW9uKGExLGIxKXtyZXR1cm4gYTFbMV08YjFbMV0gPyAxIDogLTE7fSk7XG4gIGNvbnNvbGUubG9nKG91dHB1dC5zbGljZSgwLDIwKSk7XG59XG5cbmZ1bmN0aW9uIHBlcmNlbnRfZGlmZihhMSwgYTIpe1xuICB2YXIgbWF0Y2hlcyA9IGExLnNsaWNlKCkuZmlsdGVyKGZ1bmN0aW9uKGIpeyByZXR1cm4gYTIuaW5kZXhPZihiKT4tMX0pO1xuICByZXR1cm4gbWF0Y2hlcy5sZW5ndGggLyBhMS5sZW5ndGg7XG59XG52YXIgYXV0b0V4cGFuZFRleHRhcmVhID0gZnVuY3Rpb24gKGZpZWxkKSB7XG5cblx0Ly8gUmVzZXQgZmllbGQgaGVpZ2h0XG5cdGZpZWxkLnN0eWxlLmhlaWdodCA9ICdpbmhlcml0Jztcblx0Ly8gR2V0IHRoZSBjb21wdXRlZCBzdHlsZXMgZm9yIHRoZSBlbGVtZW50XG5cdHZhciBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGZpZWxkKTtcblx0Ly8gQ2FsY3VsYXRlIHRoZSBoZWlnaHRcblx0dmFyIGhlaWdodCA9IHBhcnNlSW50KGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoJ2JvcmRlci10b3Atd2lkdGgnKSwgMTApXG5cdCAgICAgICAgICAgICArIHBhcnNlSW50KGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctdG9wJyksIDEwKVxuXHQgICAgICAgICAgICAgKyBmaWVsZC5zY3JvbGxIZWlnaHRcblx0ICAgICAgICAgICAgICsgcGFyc2VJbnQoY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1ib3R0b20nKSwgMTApXG5cdCAgICAgICAgICAgICArIHBhcnNlSW50KGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoJ2JvcmRlci1ib3R0b20td2lkdGgnKSwgMTApO1xuXG5cdGZpZWxkLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ3RleHRhcmVhJykgcmV0dXJuO1xuXHRhdXRvRXhwYW5kVGV4dGFyZWEoZXZlbnQudGFyZ2V0KTtcbn0sIGZhbHNlKTtcbmZ1bmN0aW9uIGFycl9kaWZmIChhMSwgYTIpIHtcblxuICAgIHZhciBhID0gW10sIGRpZmYgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYTEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYVthMVtpXV0gPSB0cnVlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYTIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFbYTJbaV1dKSB7XG4gICAgICAgICAgICBkZWxldGUgYVthMltpXV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhW2EyW2ldXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBrIGluIGEpIHtcbiAgICAgICAgZGlmZi5wdXNoKGspO1xuICAgIH1cblxuICAgIHJldHVybiBkaWZmO1xufVxuIiwiYW5ndWxhci5tb2R1bGUoXCJTdWJqZWN0V3JpdGVyXCIpXG4uY29udHJvbGxlcihcIk1haW5Db250cm9sbGVyXCIsIFtcIiRzY29wZVwiLCBmdW5jdGlvbigkc2NvcGUpe1xuICAkc2NvcGUud3JpdGUgPSBcIkhFWSFcIjtcblxuICAkc2NvcGUuRGVhclN1YmplY3RzRGF0YSA9IG5ldyBEZWFyU3ViamVjdHNEYXRhKCRzY29wZSk7XG4gICRzY29wZS5zY3JvbGxUb1RvcCA9IGZ1bmN0aW9uKCl7XG4gICAgdHJ5IHtcbiAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuXG4gIH07XG4gICRzY29wZS5TTEludGVsbGlnZW5jZSA9IERlYXJTdWJqZWN0cy5pbnRlbGxpZ2VuY2UubW9kdWxlKFwiU3ViamVjdFwiKTtcbiAgJHNjb3BlLlBCSW50ZWxsaWdlbmNlID0gRGVhclN1YmplY3RzLmludGVsbGlnZW5jZS5tb2R1bGUoXCJCZXN0UHJhY3RpY2VzXCIpO1xuICAkc2NvcGUuYWNrbm93bGRlZ2VkID0gZmFsc2U7XG4gICRzY29wZS5kcm9wRmlsZSA9IGZ1bmN0aW9uKGV2dCl7XG4gICAgJHNjb3BlLkRlYXJTdWJqZWN0cyA9IG5ldyBEZWFyU3ViamVjdHNFbmdpbmUoJHNjb3BlLkRlYXJTdWJqZWN0c0RhdGEpO1xuICAgICRzY29wZS5EZWFyU3ViamVjdHNEYXRhLmxvYWRGcm9tQ1NWKGV2dCk7XG4gIH07XG59XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnU3ViamVjdFdyaXRlcicpXG4uZGlyZWN0aXZlKCdkcm9wRW5hYmxlJywgWyckdGltZW91dCcsIGZ1bmN0aW9uKCR0aW1lb3V0KXtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogXCJBXCIsXG5cdFx0Ly8gdHJhbnNjbHVkZTogdHJ1ZSxcblx0XHRzY29wZToge1xuXHRcdFx0b25kcm9wZmlsZTpcIiZcIixcblx0XHRcdGRhdGFUcmFuc2ZlckV2dDpcIj1cIlxuXHRcdH0sXG5cdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKXtcblx0XHRcdHZhciBmaWxlRHJvcHBlciA9IGVsO1xuXHRcdFx0dmFyIHRpbWVyID0gbnVsbDtcblx0XHRcdC8vcmVzZXRcblx0XHRcdHZhciBkcm9wcGVyUmVzZXQgPSBmdW5jdGlvbihldnQpe1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xuXHRcdFx0XHR0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRmaWxlRHJvcHBlci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdFx0ZmlsZURyb3BwZXIuY3NzKHtib3JkZXI6IFwiXCIsY29sb3I6XCJcIiwgYmFja2dyb3VuZDogXCJcIn0pO1xuXHRcdFx0XHR9LCAxMDApO1xuXHRcdFx0XHRcdGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHZhciBjb3VudGVyID0gMDtcblx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XG5cblx0XHRcdGZpbGVEcm9wcGVyLmdldCgwKS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZnVuY3Rpb24oZXZ0KXtcblx0XHRcdFx0aWYobG9jYXRpb24uaGFzaCAhPT0gXCIjL21haW5cIikgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRjb3VudGVyKys7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZXZ0KTtcblx0XHRcdFx0XHRzY29wZS5vbmRyb3BmaWxlKHtcImV2dFwiOmV2dH0pO1xuXHRcdFx0XHRcdGRyb3BwZXJSZXNldChldnQpO1xuXHRcdFx0XHRcdGlmKGxvY2F0aW9uLmhhc2ggPT0gXCIjL21haW5cIil7XG5cblx0XHRcdFx0XHR9XG5cblxuXG5cdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdGZpbGVEcm9wcGVyLmdldCgwKS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZHJvcHBlclJlc2V0LCBmYWxzZSk7XG5cdFx0XHRmaWxlRHJvcHBlci5nZXQoMCkuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJvcHBlclJlc2V0LCBmYWxzZSk7XG5cdFx0XHRmaWxlRHJvcHBlci5nZXQoMCkuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBmdW5jdGlvbihldnQpe1xuXG5cdFx0XHRcdC8vIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xuXHRcdFx0XHRpZihsb2NhdGlvbi5oYXNoICE9PSBcIiMvbWFpblwiKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGV2dC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5Jztcblx0XHRcdFx0ZmlsZURyb3BwZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0XHRcdGZpbGVEcm9wcGVyLmNzcyh7Ym9yZGVyOiBcInNvbGlkIDNweCBibHVlXCIsIGNvbG9yOlwiYmx1ZVwiLCBiYWNrZ3JvdW5kOiBcImxpZ2h0Ymx1ZVwifSk7XG5cdFx0XHRcdHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuXG5cdFx0XHRcdFx0Ly8gZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH0sIDEwMCk7XG5cblx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH0sIGZhbHNlKTtcblxuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9XG5cdFx0fTtcblx0fV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ1N1YmplY3RXcml0ZXInKVxuLmRpcmVjdGl2ZSgnbWVzc2FnZUNlbnRlcicsIFsnJHRpbWVvdXQnLCBmdW5jdGlvbigkdGltZW91dCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cIm1lc3NhZ2UtY2VudGVyXCI+PGRpdiBjbGFzcz1cInVpIHRpbnkgc2Vjb25kYXJ5IG1lbnVcIj5cXFxuICAgIDxkaXYgY2xhc3M9XCJpdGVtIG1udS10aXRsZVwiIHN0eWxlPVwicGFkZGluZy1sZWZ0OjA7XCI+e3toZWFkaW5nID09PSB1bmRlZmluZWQgPyBcIk1FU1NBR0VTOlwiIDogaGVhZGluZyB9fTwvZGl2PlxcXG4gICAgPGEgY2xhc3M9XCJpdGVtXCIgbmctY2xpY2s9XCJJbnRlbGxpZ2VuY2VDZW50ZXIuc2V0VHlwZShcXCdcXCcpXCIgbmctY2xhc3M9XCJ7YWN0aXZlOiBJbnRlbGxpZ2VuY2VDZW50ZXIuc2VhcmNoLnR5cGU9PVxcJ1xcJ31cIiBuZy1zaG93PVwiSW50ZWxsaWdlbmNlQ2VudGVyLmNhblZpZXdBbGwoKVwiPkFsbCA8c3BhbiBjbGFzcz1cInVpIHRpbnkgbGFiZWxcIj57e2Vycm9ycy5tZXNzYWdlcy5sZW5ndGh9fTwvc3Bhbj48L2E+XFxcbiAgICA8YSBjbGFzcz1cIml0ZW1cIiBuZy1yZXBlYXQ9XCIodGFiLHZhbCkgaW4gZXJyb3JzLnRhYnMgdHJhY2sgYnkgJGluZGV4XCIgbmctc2hvdz1cImVycm9ycy5jb3VudFt0YWJdXCIgbmctY2xpY2s9XCJJbnRlbGxpZ2VuY2VDZW50ZXIuc2V0VHlwZSh2YWwpXCIgbmctY2xhc3M9XCJ7YWN0aXZlOiBJbnRlbGxpZ2VuY2VDZW50ZXIuc2VhcmNoLnR5cGU9PXZhbH1cIj57e3RhYiB8IHVuY2FtZWxpemV9fSA8c3BhbiBjbGFzcz1cInVpIHRpbnkgbGFiZWxcIj57e2Vycm9ycy5jb3VudFt0YWJdfX08L3NwYW4+PC9hPlxcXG4gICAgPC9kaXY+XFxcbiAgICA8ZGl2IGlkPVwiZXJyb3ItbWVzc2FnZXMtbGlzdFwiIGNsYXNzPVwidWkgbWlkZGxlIGFsaWduZWQgZGl2aWRlZCBsaXN0XCI+XFxcbiAgICAgIDxtZXNzYWdlLWl0ZW0gaXRlbT1cIml0ZW1cIiBjbGFzcz1cIml0ZW1cIiBuZy1yZXBlYXQ9XCJvYmogaW4gZXJyb3JzLm1lc3NhZ2VzIHwgZmlsdGVyOiBJbnRlbGxpZ2VuY2VDZW50ZXIuc2VhcmNoXCIgZXJyb3I9XCJvYmpcIj48L21lc3NhZ2UtaXRlbT5cXFxuICAgICAgPC9kaXY+XFxcbiAgICAgIDxkaXYgYWxpZ249XCJjZW50ZXJcIiBzdHlsZT1cIm1hcmdpbi10b3A6IC0xLjVlbTsgcGFkZGluZy1ib3R0b206IDEuNWVtO1wiIG5nLXNob3c9XCJJbnRlbGxpZ2VuY2VDZW50ZXIuc2VhcmNoLnR5cGUhPT1cXCdcXCcgJiYgSW50ZWxsaWdlbmNlQ2VudGVyLmNhblZpZXdBbGwoKVwiPlxcXG4gICAgICA8YnV0dG9uIGNsYXNzPVwidWkgdGlueSBiYXNpYyBidXR0b25cIiBuZy1jbGljaz1cIkludGVsbGlnZW5jZUNlbnRlci5zZXRUeXBlKFxcJ1xcJylcIj48aSBjbGFzcz1cIm1pbnVzIHNxdWFyZSBpY29uXCI+PC9pPiBSZW1vdmUgZmlsdGVyPC9idXR0b24+PC9kaXY+XFxcbiAgICA8L2Rpdj4nLFxuICAgIHNjb3BlOiB7XG4gICAgICBlcnJvcnM6XCI9XCIsXG4gICAgICBoZWFkaW5nOlwiQFwiLFxuICAgICAgaXRlbTpcIj1cIlxuICAgIH0sXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKXtcbiAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgc2NvcGUuSW50ZWxsaWdlbmNlQ2VudGVyID0gbmV3IEVNTE1ha2VySW50ZWxsaWdlbmNlLkludGVsbGlnZW5jZUNlbnRlcihzY29wZS5lcnJvcnMsIHNjb3BlKTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAvLyBqUXVlcnkoZWwpLnBvcHVwKFwiZGVzdHJveVwiKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cblxufV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ1N1YmplY3RXcml0ZXInKVxuLmRpcmVjdGl2ZSgnbWVzc2FnZUl0ZW0nLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpe1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICB0ZW1wbGF0ZTogJzxkaXYgbmctY2xhc3M9XCJtZXNzYWdlQ2xzXCI+XFxcbiAgICA8ZGl2IGNsYXNzPVwicmlnaHQgZmxvYXRlZCBjb250ZW50XCIgbmctc2hvdz1cImVycm9yLmN0YUxhYmVsIT09XFwnXFwnXCIgPlxcXG4gICAgPGRpdiBjbGFzcz1cInVpIHNtYWxsIGNvbXBhY3RcIiBcXFxuICAgIG5nLWNsYXNzPVwiYnV0dG9uQ2xzXCIgbmctaWY9XCJidXR0b25DbHNcIiBcXFxuICAgIFxcIG5nLWNsaWNrPVwiZXJyb3IuY3RhSGFuZGxlcihpdGVtKVwiIFxcXG4gICAgIG5nLWJpbmQtaHRtbD1cImVycm9yLmN0YUxhYmVsXCI+e3tlcnJvci5jdGFMYWJlbCA/IGVycm9yLmN0YUxhYmVsIDogXCJSZXNvbHZlXCJ9fTwvZGl2PlxcXG4gICAgPC9kaXY+XFxcbiAgICA8ZGl2IGNsYXNzPVwicmlnaHQgZmxvYXRlZCBjb250ZW50XCIgbmctc2hvdz1cImVycm9yLmNsZWFuVHlwZT09XFwnUUFcXCdcIiA+XFxcbiAgICA8c3BhbiBjbGFzcz1cInVpIGljb24gbGFiZWxcIiBuZy1zaG93PVwiZXJyb3IuY2xlYW5UeXBlPT1cXCdRQVxcJyYmZXJyb3Iub3ZlcnJpZGVcIj48aSBjbGFzcz1cInRodW1icyB1cCBpY29uXCI+PC9pPiBZT1UgQ09ORklSTUVEPC9zcGFuPlxcXG4gICAgPGRpdiBjbGFzcz1cInVpIHNtYWxsIGNvbXBhY3RcIiBcXFxuICAgIG5nLWNsYXNzPVwiYnV0dG9uQ2xzXCIgbmctaWY9XCJidXR0b25DbHNcIiBuZy1oaWRlPVwiZXJyb3Iub3ZlcnJpZGVcIiBcXFxuICAgIFxcIG5nLWNsaWNrPVwiZXJyb3Iuc2V0T3ZlcnJpZGVTdGF0dXModHJ1ZSk7ZXJyb3IuY3RhSGFuZGxlcigpXCI+PGkgY2xhc3M9XCJjaGVjayBpY29uXCI+PC9pPiBDb25maXJtPC9kaXY+XFxcbiAgICA8L2Rpdj5cXFxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIiBuZy1zaG93PVwiYnV0dG9uQ2xzXCI+IFxcXG4gICAgICAgIDxoNCBuZy1iaW5kLWh0bWw9XCJlcnJvci50aXRsZSB8IGRld2lkb3dcIj48L2g0PlxcXG4gICAgICAgIDxkaXYgbmctYmluZC1odG1sPVwiZXJyb3IuZGVzY3JpcHRpb25cIj48L2Rpdj57e2l0ZW0uY3RhTGFiZWx9fTwvZGl2PlxcXG4gICAgICAgIDxkaXYgbmctaWY9XCJlcnJvci5yZXNvdXJjZSE9PVxcJ1xcJ1wiPjxhIG5nLWhyZWY9XCJ7e2Vycm9yLnJlc291cmNlfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj5SZWFkIG1vcmUgPGkgY2xhc3M9XCJleHRlcm5hbCBhbHRlcm5hdGUgaWNvblwiPjwvaT48L2E+PC9kaXY+XFxcbiAgICA8L2Rpdj4nLFxuICAgIHNjb3BlOiB7ZXJyb3I6IFwiPVwiLCBpdGVtOlwiPVwifSxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHIpe1xuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGNscyA9IFtcIlwiLCBcInJlZFwiLCBcIm9yYW5nZVwiLCBcInZpb2xldFwiLCBcInRlYWxcIiwgXCJibHVlXCJdO1xuXG5cbiAgICAgICAgc2NvcGUuYnV0dG9uQ2xzID0gW2Nsc1tzY29wZS5lcnJvci5zZXZlcml0eV0sXCJidXR0b25cIl0uam9pbihcIiBcIik7XG5cbiAgICAgICAgaWYoc2NvcGUuZXJyb3IuY2xlYW5UeXBlPT1cIlFBXCIgJiYgc2NvcGUuZXJyb3Iub3ZlcnJpZGUpIHtcbiAgICAgICAgICBzY29wZS5tZXNzYWdlQ2xzID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzY29wZS5tZXNzYWdlQ2xzID0gW1widHlwZS1cIixzY29wZS5lcnJvci50eXBlLFwiIGxldmVsLVwiLHNjb3BlLmVycm9yLnNldmVyaXR5XS5qb2luKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8galF1ZXJ5KGVsKS5wb3B1cChcImRlc3Ryb3lcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG5cbn1dKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdTdWJqZWN0V3JpdGVyJylcbi5kaXJlY3RpdmUoJ25nQ2hhbmdlTGF6eScsIFsnJHRpbWVvdXQnLCBmdW5jdGlvbigkdGltZW91dCl7XG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6IFwiQVwiLFxuXHRcdC8vIHRyYW5zY2x1ZGU6IHRydWUsXG5cdFx0c2NvcGU6IHtcblx0XHRcdG5nTW9kZWw6XCI9XCIsXG5cdFx0XHRuZ0NoYW5nZUxhenk6XCImXCIsXG5cdFx0XHRjaGFuZ2VMYXp5QnVmZmVyOlwiPVwiLFxuXHRcdFx0ZGF0YVRyYW5zZmVyRXZ0OlwiPVwiXG5cdFx0fSxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHIpe1xuXHRcdFx0dmFyIHRpbWVyID0gbnVsbDtcblx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBsYXN0VmFsdWUgPSBzY29wZS5uZ01vZGVsLnRvU3RyaW5nKCk7XG5cdFx0XHRcdGVsLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0XHRcdFx0dGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRpZihsYXN0VmFsdWUgIT09IGVsWzBdLnZhbHVlKXtcblx0XHRcdFx0XHRcdHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdHNjb3BlLm5nQ2hhbmdlTGF6eSgpO1xuXHRcdFx0XHRcdFx0XHRcdGxhc3RWYWx1ZSA9IGVsWzBdLnZhbHVlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSwgYXR0ci5jaGFuZ2VMYXp5QnVmZmVyPT09IHVuZGVmaW5lZCA/IDUwMCA6IGF0dHIuY2hhbmdlTGF6eUJ1ZmZlcioxKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGVsLm9mZigna2V5dXAnKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0fVxuXHRcdH07XG5cdH1dKTtcbiIsIiIsImFuZ3VsYXIubW9kdWxlKCdTdWJqZWN0V3JpdGVyJylcbi5kaXJlY3RpdmUoJ3NpbXBsZUFjY29yZGlvbicsIFsnJHRpbWVvdXQnLCBmdW5jdGlvbigkdGltZW91dCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgc2NvcGU6e2hlYWRpbmc6XCJAXCIsc2hvdzogXCI9XCJ9LFxuICAgIHRlbXBsYXRlOiAnPGRpdiBuZy1jbGFzcz1cIntleHBhbmRlZDogc2hvdywgY29sbGFwc2VkOiAhc2hvd31cIj48ZGl2IG5nLWNsaWNrPVwidG9nZ2xlUGFuZSgpXCIgY2xhc3M9XCJhY2NvcmRpb24tdGl0bGVcIj5cXFxuICAgIDxpIGNsYXNzPVwiY2hldnJvbiByaWdodCBpY29uXCIgbmctc2hvdz1cIiFzaG93XCIgYWx0PVwiWytdXCI+PC9pPlxcXG4gICAgPGkgY2xhc3M9XCJjaGV2cm9uIGRvd24gaWNvblwiIG5nLXNob3c9XCJzaG93XCIgYWx0PVwiWy1dXCI+PC9pPlxcXG4gICAgIDxzcGFuPnt7aGVhZGluZ319PC9zcGFuPjwvZGl2PjxuZy10cmFuc2NsdWRlIG5nLXNob3c9XCJzaG93XCI+PC9uZy10cmFuc2NsdWRlPjwvZGl2PicsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKXtcbiAgICAgIHNjb3BlLnNob3cgPSBmYWxzZTtcbiAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHNjb3BlLnRvZ2dsZVBhbmUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgIHNjb3BlLnNob3cgPSAhc2NvcGUuc2hvdztcbiAgICAgICAgfTtcbiAgICAgICAgalF1ZXJ5LmV4dGVuZChqUXVlcnkoZWwpLHtcInRvZ2dsZUFjY29yZGlvblwiOiBmdW5jdGlvbigpe1xuICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlUGFuZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9fSk7XG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpe1xuICAgICAgICAgIC8vIGpRdWVyeShlbCkucG9wdXAoXCJkZXN0cm95XCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1dKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdTdWJqZWN0V3JpdGVyJylcbi5kaXJlY3RpdmUoJ3N1YmplY3RMaW5lQm94JywgWyckdGltZW91dCcsIGZ1bmN0aW9uKCR0aW1lb3V0KXtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogXCJFXCIsXG4gICAgdGVtcGxhdGU6ICc8ZGl2ID5cXFxuICAgIDxkaXYgY2xhc3M9XCJ1aSBzbC10b3BcIj5cXFxuICAgICAgPGRpdiBpZD1cIndyaXRlclwiPlxcXG4gICAgICAgICAgPHRleHRhcmVhIHBsYWNlaG9sZGVyPVwiVHlwZSB5b3VyIHN1YmplY3QgbGluZSBoZXJlXCIgbmctbW9kZWw9XCJEZWFyU3ViamVjdHMuc3ViamVjdExpbmVcIiBuZy1jaGFuZ2UtbGF6eT1cIkRlYXJTdWJqZWN0cy51cGRhdGVTdWJqZWN0TGluZSgpXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIi8+PC90ZXh0YXJlYT5cXFxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ1aSBwdXJwbGUgaWNvbiBidXR0b25cIiBuZy1jbGljaz1cIkRlYXJTdWJqZWN0cy5sb2FkaW5nPXRydWU7RGVhclN1YmplY3RzLmluaXRTZWFyY2goKVwiIG5nLWNsYXNzPVwie2xvYWRpbmc6IERlYXJTdWJqZWN0cy5sb2FkaW5nfVwiPjxpIGNsYXNzPVwic2VhcmNoIGljb25cIj48L2k+IFNlYXJjaDwvYnV0dG9uPlxcXG4gICAgICAgIDwvZGl2PlxcXG4gICAgICAgIDwvZGl2PlxcXG4gICAgPC9kaXY+XFxcbiAgICA8ZGl2IGNsYXNzPVwic2wgdG9wIGZpeGVkXCIgbmctc2hvdz1cIl9fX3Nob3dGaXhlZENvbXBvbmVudFwiPlxcXG4gICAgPGRpdiBjbGFzcz1cInVpIGNvbnRhaW5lciBmb3JtXCIgc3R5bGU9XCJwYWRkaW5nOjFlbSAwXCI+XFxcbiAgICAgIDxkaXYgY2xhc3M9XCJ1aSBncmlkXCI+XFxcbiAgICAgIDxkaXYgY2xhc3M9XCJ0d28gd2lkZSBjb2x1bW5cIj5cXFxuICAgICAgICA8YnV0dG9uIG5nLWNsaWNrPVwic2Nyb2xsVG9Ub3AoKVwiIGNsYXNzPVwidWkgbGFyZ2UgYmFzaWMgZmx1aWQgaWNvbiBidXR0b25cIj48aSBjbGFzcz1cInVwIGFycm93IGljb25cIj48L2k+PC9idXR0b24+XFxcbiAgICAgICAgPC9kaXY+XFxcbiAgICAgIDxkaXYgY2xhc3M9XCJ0d2VsdmUgd2lkZSBjb2x1bW5cIj5cXFxuICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XFxcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpIGxhcmdlIGFjdGlvbiBpbnB1dFwiPlxcXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmctbW9kZWw9XCJEZWFyU3ViamVjdHMuc3ViamVjdExpbmVcIiBuZy1jaGFuZ2UtbGF6eT1cIkRlYXJTdWJqZWN0cy51cGRhdGVTdWJqZWN0TGluZSgpXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIi8+XFxcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidWkgcHVycGxlIGljb24gYnV0dG9uXCIgbmctY2xpY2s9XCJEZWFyU3ViamVjdHMubG9hZGluZz10cnVlO0RlYXJTdWJqZWN0cy5pbml0U2VhcmNoKClcIiBuZy1jbGFzcz1cIntsb2FkaW5nOiBEZWFyU3ViamVjdHMubG9hZGluZ31cIj48aSBjbGFzcz1cInNlYXJjaCBpY29uXCI+PC9pPjwvYnV0dG9uPlxcXG4gICAgICAgIDwvZGl2PlxcXG4gICAgICA8L2Rpdj5cXFxuICAgICAgPC9kaXY+XFxcbiAgICAgIDxkaXYgY2xhc3M9XCJ0d28gd2lkZSBjb2x1bW5cIj5cXFxuICAgICAgICA8YnV0dG9uIG5nLWNsaWNrPVwic2Nyb2xsVG9Ub3AoKVwiIGNsYXNzPVwidWkgbGFyZ2UgYmFzaWMgZmx1aWQgaWNvbiBidXR0b25cIj48aSBjbGFzcz1cImJlbGwgaWNvblwiPjwvaT48L2J1dHRvbj5cXFxuICAgICAgICA8L2Rpdj5cXFxuICAgICAgPC9kaXY+XFxcbiAgICA8L2Rpdj5cXFxuICAgIDwvZGl2PlxcXG4gICAgPC9kaXY+JyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHIpe1xuICAgICAgc2NvcGUuX19fc2hvd0ZpeGVkQ29tcG9uZW50ID0gZmFsc2U7XG4gICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBqUXVlcnkoJyN3cml0ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgIGpRdWVyeSgnI3dyaXRlcicpLmZpbmQoXCJ0ZXh0YXJlYVwiKS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICAgICAgalF1ZXJ5KCcuc2wtdG9wJylcbiAgICAgICAgICAudmlzaWJpbGl0eSh7XG4gICAgICAgICAgICBvbmNlOiBmYWxzZSxcbiAgICAgICAgICAgIG9uVG9wUGFzc2VkUmV2ZXJzZTogZnVuY3Rpb24oY2FsY3VsYXRpb25zKXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUT1BQQVNTRURSRVZFUlNFRFwiKTtcbiAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2NvcGUuX19fc2hvd0ZpeGVkQ29tcG9uZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQm90dG9tUGFzc2VkOiBmdW5jdGlvbihjYWxjdWxhdGlvbnMpIHtcbiAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCT1RUT01QQVNTRURcIik7XG4gICAgICAgICAgICAgICAgc2NvcGUuX19fc2hvd0ZpeGVkQ29tcG9uZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgO1xuXG5cblxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpe1xuICAgICAgICAgIC8vIGpRdWVyeShlbCkucG9wdXAoXCJkZXN0cm95XCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuXG59XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnU3ViamVjdFdyaXRlcicpXG4uZGlyZWN0aXZlKCd1aURyb3Bkb3duJywgWyckdGltZW91dCcsIGZ1bmN0aW9uKCR0aW1lb3V0KXtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogXCJBXCIsXG5cdFx0Ly8gdHJhbnNjbHVkZTogdHJ1ZSxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHIpe1xuXG5cdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHQkKGVsKS5kcm9wZG93bigpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JChlbCkuZHJvcGRvd24oXCJkZXN0cm95XCIpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fVxuXHRcdH07XG5cdH1dKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdTdWJqZWN0V3JpdGVyJylcbi5kaXJlY3RpdmUoJ3VpUG9wdXAnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpe1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiBcIkFcIixcblx0XHQvLyB0cmFuc2NsdWRlOiB0cnVlLFxuXHRcdGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cil7XG5cblx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQoZWwpLnBvcHVwKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKGVsKS5wb3B1cChcImRlc3Ryb3lcIik7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9XG5cdFx0fTtcblx0fV0pO1xuIl19

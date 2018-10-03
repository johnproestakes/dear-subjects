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

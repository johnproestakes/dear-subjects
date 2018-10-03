DearSubjects.intelligence.module("BestPractices")
.register("bp-creating-urgency", ["DearSubjectsEngine", function(DearSubjectsEngine){

  return {
    type:0,
    severity: 0,
    title: "Creating a sense of urgency",
    // description: "Although, the common thought is, subject lines should be as long as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
    resource: "",
    canContinue: true,
    when: function(){
      return /limited|only|today|hurry|act\snow|rush|last\schance|deadline|final|never\sagain|clearance|delay|now|never|miss\sout|expires/gi.test(DearSubjectsEngine.subjectLine);
    }

  };
}]);

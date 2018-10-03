DearSubjects.intelligence.module("BestPractices")
.register("bp-promoting-content", ["DearSubjectsEngine", function(DearSubjectsEngine){

  return {
    type:0,
    severity: 0,
    title: "Subject lines for content promotion",
    // description: "Although, the common thought is, subject lines should be as long as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
    resource: "",
    canContinue: true,
    when: function(){
      return /download|e\-?book|white\spaper|article|blog|podcast|read|learn|find/gi.test(DearSubjectsEngine.subjectLine);
    }

  };
}]);

DearSubjects.intelligence.module("Subject").register("sl-might-be-too-long", ["DearSubjectsEngine", function(DearSubjectsEngine){

  return {
    type:0,
    severity: 0,
    title: "Your subject line might be too long. ("+DearSubjectsEngine.subjectLine.length+")",
    description: "Although, the common thought is, subject lines should be as long as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
    resource: "",
    canContinue: true,
    when: function(){
      return DearSubjectsEngine.subjectLine.length>60;
    }

  };
}]);

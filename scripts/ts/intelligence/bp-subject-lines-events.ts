DearSubjects.intelligence.module("BestPractices")
.register("bp-subject-lines-events", ["DearSubjectsEngine", function(DearSubjectsEngine){







  return {
    type:0,
    severity: 0,
    title: "Subject lines for events",
    // description: "g as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
    resource: "",
    canContinue: true,
    when: function(){
      return /visit|booth|vip|event|webinar|webcast|tradeshow|forum|seminar/gi.test(DearSubjectsEngine.subjectLine);
    }

  };
}]);

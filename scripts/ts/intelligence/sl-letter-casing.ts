DearSubjects.intelligence.module("Subject").register("sl-letter-casing", ["DearSubjectsEngine", function(DearSubjectsEngine){
  //convert to title case? and then do leveshein?
  //convert to all caps and then do leveshein?


function isSentenceCase(text){
  let a = text.replace(/[^\w]/gi,"");
  var caps=0, lcase=0;
  for (var i=0;i<a.length;i++){
    if(/[A-Z]/.test(a[i])) caps++;
    if(/[a-z]/.test(a[i])) lcase++;
  }
  return caps/a.length;
}



  return {
    type:0,
    severity: 0,
    title: "Subject lines should be in sentence case.",
    description: "It seems like you some words that are all caps or a mix of sentence and all caps.",
    resource: "",
    canContinue: true,
    when: function(){
      return isSentenceCase(DearSubjectsEngine.subjectLine)>.20;
    }

  };
}]);

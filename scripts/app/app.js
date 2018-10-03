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

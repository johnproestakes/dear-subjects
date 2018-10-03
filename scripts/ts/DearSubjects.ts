class DearSubjectsData{
  data:any[];
  headings: string[];
  scope: any;

  constructor(scope){
    this.scope = scope;
  }
  CSVtoArray(text) {
    let ret = [''], i = 0, p = '', s = true;
    for (let l in text) {
        l = text[l];
        if ('"' === l) {
            s = !s;
            if ('"' === p) {
                ret[i] += '"';
                l = '-';
            } else if ('' === p)
                l = '-';
        } else if (s && ',' === l)
            l = ret[++i] = '';
        else
            ret[i] += l;
        p = l;
    }
    return ret;
  }
  loadFromCSV(evt){
    let files = evt.dataTransfer.files;
    if(evt.dataTransfer.files.length>1){
        alert('you can only import one file at at time.');
      } else {
        var reader = new FileReader();
        var DSD = this;
        reader.onloadend = function(evt){
          var output = {
            content: evt.target.result.split(/\r\n|\n/),
            filename: files[0].name,
            ext: (files[0].name.split(".")).pop().toLowerCase()
          };
          // evt.target.result
          //split rows
          //split commas
          DSD.headings = (output.content.splice(0,1)).toString().split(",");
          // console.log(DSD.headings);
          //rows = output.content
          var contentRows = [];

          for(var i =0;i<output.content.length;i++){
            //split commas;
            if(output.content[i][1]=="") output.content[i][1]=0;
            if(output.content[i][2]=="") output.content[i][2]=0;
            contentRows.push(DSD.CSVtoArray(output.content[i]));
          }

          DSD.data = contentRows;
          DSD.scope.$apply(function(){

          });
          //navigate away
        };
        reader.readAsText(files[0]);
      }
  }
  loadFromCopyPaste(){

  }
}
class DearSubjectsDataRow {
  subject: string;
  exactMatch: boolean;
  delivered: number;
  uniqueOpens: number;
  uniqueOpenRate: number;
  similarity: number;
  relationMean: string;
  relationMedian: string;
  formattedSubjectLine: string;

  constructor(arr, similarityToQuery){
    this.formattedSubjectLine = "";
    this.exactMatch = false;
    this.subject = arr[0];
    this.delivered = parseInt(arr[1]);
    this.uniqueOpens = parseInt(arr[2]);
    if(this.delivered==0){
      this.uniqueOpenRate = 0;
    } else {
      this.uniqueOpenRate = Math.round((this.uniqueOpens/this.delivered)*10000)/100;
    }

    this.similarity = Math.round(similarityToQuery*10000)/100;
  }
  setGlobalMean(mean){
    // console.log(mean, this.uniqueOpenRate);
    if(this.uniqueOpenRate <= mean*1 + .5 && this.uniqueOpenRate >= mean*1 - .5 ){
      this.relationMean = "About the same";
    } else if(this.uniqueOpenRate > mean*1 + .5){
      //above
      this.relationMean = "Above";
    } else if(this.uniqueOpenRate < mean*1 - .5){
      //below
      this.relationMean = "Below";
    }
    // console.log(this.relationMean);
  }
  setGlobalMedian(mean){
    // console.log(mean, this.uniqueOpenRate);
    if(this.uniqueOpenRate <= mean*1 + .5 && this.uniqueOpenRate >= mean*1 - .5 ){
      this.relationMedian = "About the same";
    } else if(this.uniqueOpenRate > mean*1 + .5){
      //above
      this.relationMedian = "Above";
    } else if(this.uniqueOpenRate < mean*1 - .5){
      //below
      this.relationMedian = "Below";
    }
    // console.log(this.relationMedian);
  }
  adequateSampleSize(){
    if(parseInt(this.delivered.toString())<500){
      return false;
    } else {
      return true;
    }
  }
}
class DearSubjectsResultSet {
  data: DearSubjectsDataRow[];
  avgOpenRate: number;
  medOpenRate: number;

  constructor(data){
    var delivered = 0;
    var opens = 0;
    var medVals = [];
    for(var i=0;i<data.length;i++){
      delivered = delivered + parseInt(data[i][1]);
      opens = opens + parseInt(data[i][2]);
      medVals.push(data[i][3]);
      // this.data.push({
      //   subject:
      // });
    }
    if(medVals.length==0){
      this.medOpenRate = 0;
    } else {
      var half = Math.floor(medVals.length / 2);
      if(medVals.length % 2 ==0){
        this.medOpenRate = medVals[half];
      } else {
        this.medOpenRate = (medVals[half - 1] + medVals[half]) / 2.0;
      }
    }
    this.avgOpenRate = opens/delivered;
    // data;
    // this.data = {};

    //find mean;
    //find median;


  }

}
class DearSubjectsEngine {
  dataSet: DearSubjectsData;
  subjectLine: string;
  overrideWords: string[];
  maxResults: number;
  resultSet: any[];
  avgOpenRate: number;
  stopWords: string[];
  medOpenRate: number;
  loading: boolean;
  intelligence: IntelligenceModule;
  bestPractices: IntelligenceModule;

  constructor(dataSet){
    this.stopWords = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among","amongst","amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your","youre", "yours", "yourself", "yourselves", "the"];
    this.dataSet = dataSet;
    this.overrideWords = [];
    this.subjectLine = "[eBook] Population health strategies power health system improvement.";
    this.maxResults = 20;
    this.intelligence = DearSubjects.intelligence.module("Subject");
    this.intelligence.inject("DearSubjectsEngine", this);

    this.loading = false;
    this.bestPractices = DearSubjects.intelligence.module("BestPractices");
    this.bestPractices.mode = IntelligenceModuleMode.SWITCHBOARD;
    this.bestPractices.inject("DearSubjectsEngine", this);

    this.updateSubjectLine();

  }

  removeSpecialCharacters(str):string{
      return str.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s{2,}/g," ");
  }
  get subjectLineParts(){
    return this.removeSpecialCharacters(this.subjectLine).split(" ");
  }
  toggleOverriddenWord(word){
    let index = this.overrideWords.indexOf(word);
    if(index>-1){
      //remove
      this.overrideWords.splice(index, 1);
      console.log('removed', this.overrideWords);
    } else {
      this.overrideWords.push(word);
      console.log('added', this.overrideWords);
    }
  }
  updateSubjectLine(){
    this.intelligence.evaluateRules();
    this.bestPractices.evaluateRules();


  }
  sortResultsBy(key){
    console.log(this.resultSet);
    this.resultSet.sort(function(a,b){
      return a[key]<b[key] ? 1 : -1;
    });
    console.log(this.resultSet);
  }
  initSearch(){
    this.loading = true;
    console.log("starting search");
    //createHash
    var output = [];
    var queryHash = this.createHash(
        this.removeStopWords(
          this.removeSpecialCharacters(this.subjectLine)
        )
      );
      queryHash = this.concat_plurals(queryHash);

    for(var i=0;i<this.dataSet.data.length;i++){
      //create alternate hash;
      let targetHash = this.createHash(
        this.removeStopWords(
          this.removeSpecialCharacters(this.dataSet.data[i][0])
        )
      );
      let similarity = this.percent_diff(queryHash, targetHash);
      if(similarity>0){
        var dsdr = new DearSubjectsDataRow(this.dataSet.data[i], similarity);
        dsdr.formattedSubjectLine = this.formattedSubjectLine(queryHash, this.dataSet.data[i][0]);
        if(this.subjectLine == dsdr.subject){
          dsdr.exactMatch = true;
        }
        output.push(dsdr);
      }
    }
    output.sort(function(a1,b1){return a1.similarity<b1.similarity ? 1 : -1;});
    this.resultSet = output.slice(0,this.maxResults);
    this.avgOpenRate = this.calculateAvgOpenRate(this.resultSet);
    this.calculateMedianOpenRate(this.resultSet);
    this.loading = false;

  }
  calculateAvgOpenRate(dataSet){
    var deliveredTotal = 0, opensTotal = 0;
    for(var i=0;i<dataSet.length;i++){
      try{
        if(dataSet[i].delivered>0){
          deliveredTotal= deliveredTotal + parseInt(dataSet[i].delivered);
          opensTotal = opensTotal+ parseInt(dataSet[i].uniqueOpens);
        }

      } catch(e){

      }

    }

    var result = Math.round(opensTotal/deliveredTotal*10000)/100;
    // console.log(deliveredTotal, opensTotal, result);
    for(var i=0;i<dataSet.length;i++){
      dataSet[i].setGlobalMean(result);
    }
    return result;

  }
  calculateMedianOpenRate(dataSet){
    var values = [];
    for(var i=0;i<dataSet.length;i++){
      try{
        if(dataSet[i].delivered>0){
          dataSet[i].uniqueOpenRate * 1;
          values.push(dataSet[i].uniqueOpenRate);
        }
      } catch(e){

      }

    }

    if(values.length ===0) {
      this.medOpenRate = 0;
    } else {
      var half = Math.floor(values.length / 2);

      if (values.length % 2)
        this.medOpenRate = values[half];
      else
        this.medOpenRate = (values[half - 1] + values[half]) / 2.0;
    }
    for(var i=0;i<dataSet.length;i++){
      dataSet[i].setGlobalMedian(this.medOpenRate);
    }


  }

  concat_plurals(a1:string[]):string[]{
    var output =[];
    for(var i=0;i<a1.length;i++){
      output.push(a1[i]);
      let m = window.pluralize(a1[i],2);
      let s = window.pluralize(a1[i],1);
      if(output.indexOf(m)==-1) output.push(m);
      if(output.indexOf(s)==-1) output.push(s);
    }
    output.sort(function(a,b){return a.length>b.length ? -1 : 1;});
    // console.log(output);
    return output;
  }
  percent_diff(a1, a2){
    var matches = a1.slice().filter(function(b){ return a2.indexOf(b)>-1});
    return matches.length / a1.length;
  }
  formattedSubjectLine(queryHash, text):string{
    var counter = 0;
    var found = [];
    text = " " + text.replace(/([^\w\s])/gi, function(a){
      return " " + a + " ";
    }) + " ";
    for(var i=0;i<queryHash.length;i++){
      var reg = new RegExp(queryHash[i],"ig");
      if(reg.test(text)){
        var m = text.match(reg);
        // console.log(text, queryHash[i], m);
        if(m.length>0){

          found.push(m[0]);
          text = text.replace(new RegExp(" "+m[0]+" ","ig"), "$"+counter+"$");
          counter++;
        }

      }
    }

    var newText = text.toString();
    for(var i=0;i<found.length;i++){
      newText = newText.replace(new RegExp("\\$"+i+"\\$","ig"), " <span class=\"highlight\">"+found[i].trim()+"</span> ");
    }
    //console.log(text, found, newText);
    // console.log(newText);
    newText = newText.replace(/(\s[^\w\s]\s)/gi, function(a){
      return a.trim();
    });
    return newText.trim();
  }
  isStopWord(word):boolean {
    if(this.overrideWords.indexOf(word)>-1) return false;
    if(!isNaN(parseFloat(word)) && isFinite(word)) return true; //numeric
    if(this.stopWords.indexOf(word)>-1) return true;
    return false;
  }
  removeStopWords(text):string{
    return text.split(" ").filter((a)=>{
      return !this.isStopWord(a.toLowerCase());
    }).join(" ");
  }
  createHash(str):string[]{
    var output = [];
    var b = str.toLowerCase().split(" ");
    var c = 0;
    for(var i=0;i<b.length;i++){
      var c = i;
      while(c<=b.length){
        var d = b.slice().slice(i,c).join(" ").trim().replace(/\s{2,}/g,"");

        if(d!=="" && d!==" ") {
          output.push(d);
        }

            c++;

      }
    }
    output.sort(function(a,b){return a.length>b.length ? -1 : 1;});
    return output;
  }
}

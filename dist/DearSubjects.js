var DearSubjectsData = (function () {
    function DearSubjectsData(scope) {
        this.scope = scope;
    }
    DearSubjectsData.prototype.CSVtoArray = function (text) {
        var ret = [''], i = 0, p = '', s = true;
        for (var l in text) {
            l = text[l];
            if ('"' === l) {
                s = !s;
                if ('"' === p) {
                    ret[i] += '"';
                    l = '-';
                }
                else if ('' === p)
                    l = '-';
            }
            else if (s && ',' === l)
                l = ret[++i] = '';
            else
                ret[i] += l;
            p = l;
        }
        return ret;
    };
    DearSubjectsData.prototype.loadFromCSV = function (evt) {
        var files = evt.dataTransfer.files;
        if (evt.dataTransfer.files.length > 1) {
            alert('you can only import one file at at time.');
        }
        else {
            var reader = new FileReader();
            var DSD = this;
            reader.onloadend = function (evt) {
                var output = {
                    content: evt.target.result.split(/\r\n|\n/),
                    filename: files[0].name,
                    ext: (files[0].name.split(".")).pop().toLowerCase()
                };
                // evt.target.result
                //split rows
                //split commas
                DSD.headings = (output.content.splice(0, 1)).toString().split(",");
                // console.log(DSD.headings);
                //rows = output.content
                var contentRows = [];
                for (var i = 0; i < output.content.length; i++) {
                    //split commas;
                    if (output.content[i][1] == "")
                        output.content[i][1] = 0;
                    if (output.content[i][2] == "")
                        output.content[i][2] = 0;
                    contentRows.push(DSD.CSVtoArray(output.content[i]));
                }
                DSD.data = contentRows;
                DSD.scope.$apply(function () {
                });
                //navigate away
            };
            reader.readAsText(files[0]);
        }
    };
    DearSubjectsData.prototype.loadFromCopyPaste = function () {
    };
    return DearSubjectsData;
}());
var DearSubjectsDataRow = (function () {
    function DearSubjectsDataRow(arr, similarityToQuery) {
        this.formattedSubjectLine = "";
        this.exactMatch = false;
        this.subject = arr[0];
        this.delivered = parseInt(arr[1]);
        this.uniqueOpens = parseInt(arr[2]);
        if (this.delivered == 0) {
            this.uniqueOpenRate = 0;
        }
        else {
            this.uniqueOpenRate = Math.round((this.uniqueOpens / this.delivered) * 10000) / 100;
        }
        this.similarity = Math.round(similarityToQuery * 10000) / 100;
    }
    DearSubjectsDataRow.prototype.setGlobalMean = function (mean) {
        // console.log(mean, this.uniqueOpenRate);
        if (this.uniqueOpenRate <= mean * 1 + .5 && this.uniqueOpenRate >= mean * 1 - .5) {
            this.relationMean = "About the same";
        }
        else if (this.uniqueOpenRate > mean * 1 + .5) {
            //above
            this.relationMean = "Above";
        }
        else if (this.uniqueOpenRate < mean * 1 - .5) {
            //below
            this.relationMean = "Below";
        }
        // console.log(this.relationMean);
    };
    DearSubjectsDataRow.prototype.setGlobalMedian = function (mean) {
        // console.log(mean, this.uniqueOpenRate);
        if (this.uniqueOpenRate <= mean * 1 + .5 && this.uniqueOpenRate >= mean * 1 - .5) {
            this.relationMedian = "About the same";
        }
        else if (this.uniqueOpenRate > mean * 1 + .5) {
            //above
            this.relationMedian = "Above";
        }
        else if (this.uniqueOpenRate < mean * 1 - .5) {
            //below
            this.relationMedian = "Below";
        }
        // console.log(this.relationMedian);
    };
    DearSubjectsDataRow.prototype.adequateSampleSize = function () {
        if (parseInt(this.delivered.toString()) < 500) {
            return false;
        }
        else {
            return true;
        }
    };
    return DearSubjectsDataRow;
}());
var DearSubjectsResultSet = (function () {
    function DearSubjectsResultSet(data) {
        var delivered = 0;
        var opens = 0;
        var medVals = [];
        for (var i = 0; i < data.length; i++) {
            delivered = delivered + parseInt(data[i][1]);
            opens = opens + parseInt(data[i][2]);
            medVals.push(data[i][3]);
        }
        if (medVals.length == 0) {
            this.medOpenRate = 0;
        }
        else {
            var half = Math.floor(medVals.length / 2);
            if (medVals.length % 2 == 0) {
                this.medOpenRate = medVals[half];
            }
            else {
                this.medOpenRate = (medVals[half - 1] + medVals[half]) / 2.0;
            }
        }
        this.avgOpenRate = opens / delivered;
        // data;
        // this.data = {};
        //find mean;
        //find median;
    }
    return DearSubjectsResultSet;
}());
var DearSubjectsEngine = (function () {
    function DearSubjectsEngine(dataSet) {
        this.stopWords = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "youre", "yours", "yourself", "yourselves", "the"];
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
    DearSubjectsEngine.prototype.removeSpecialCharacters = function (str) {
        return str.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s{2,}/g, " ");
    };
    Object.defineProperty(DearSubjectsEngine.prototype, "subjectLineParts", {
        get: function () {
            return this.removeSpecialCharacters(this.subjectLine).split(" ");
        },
        enumerable: true,
        configurable: true
    });
    DearSubjectsEngine.prototype.toggleOverriddenWord = function (word) {
        var index = this.overrideWords.indexOf(word);
        if (index > -1) {
            //remove
            this.overrideWords.splice(index, 1);
            console.log('removed', this.overrideWords);
        }
        else {
            this.overrideWords.push(word);
            console.log('added', this.overrideWords);
        }
    };
    DearSubjectsEngine.prototype.updateSubjectLine = function () {
        this.intelligence.evaluateRules();
        this.bestPractices.evaluateRules();
    };
    DearSubjectsEngine.prototype.sortResultsBy = function (key) {
        console.log(this.resultSet);
        this.resultSet.sort(function (a, b) {
            return a[key] < b[key] ? 1 : -1;
        });
        console.log(this.resultSet);
    };
    DearSubjectsEngine.prototype.initSearch = function () {
        this.loading = true;
        console.log("starting search");
        //createHash
        var output = [];
        var queryHash = this.createHash(this.removeStopWords(this.removeSpecialCharacters(this.subjectLine)));
        queryHash = this.concat_plurals(queryHash);
        for (var i = 0; i < this.dataSet.data.length; i++) {
            //create alternate hash;
            var targetHash = this.createHash(this.removeStopWords(this.removeSpecialCharacters(this.dataSet.data[i][0])));
            var similarity = this.percent_diff(queryHash, targetHash);
            if (similarity > 0) {
                var dsdr = new DearSubjectsDataRow(this.dataSet.data[i], similarity);
                dsdr.formattedSubjectLine = this.formattedSubjectLine(queryHash, this.dataSet.data[i][0]);
                if (this.subjectLine == dsdr.subject) {
                    dsdr.exactMatch = true;
                }
                output.push(dsdr);
            }
        }
        output.sort(function (a1, b1) { return a1.similarity < b1.similarity ? 1 : -1; });
        this.resultSet = output.slice(0, this.maxResults);
        this.avgOpenRate = this.calculateAvgOpenRate(this.resultSet);
        this.calculateMedianOpenRate(this.resultSet);
        this.loading = false;
    };
    DearSubjectsEngine.prototype.calculateAvgOpenRate = function (dataSet) {
        var deliveredTotal = 0, opensTotal = 0;
        for (var i = 0; i < dataSet.length; i++) {
            try {
                if (dataSet[i].delivered > 0) {
                    deliveredTotal = deliveredTotal + parseInt(dataSet[i].delivered);
                    opensTotal = opensTotal + parseInt(dataSet[i].uniqueOpens);
                }
            }
            catch (e) {
            }
        }
        var result = Math.round(opensTotal / deliveredTotal * 10000) / 100;
        // console.log(deliveredTotal, opensTotal, result);
        for (var i = 0; i < dataSet.length; i++) {
            dataSet[i].setGlobalMean(result);
        }
        return result;
    };
    DearSubjectsEngine.prototype.calculateMedianOpenRate = function (dataSet) {
        var values = [];
        for (var i = 0; i < dataSet.length; i++) {
            try {
                if (dataSet[i].delivered > 0) {
                    dataSet[i].uniqueOpenRate * 1;
                    values.push(dataSet[i].uniqueOpenRate);
                }
            }
            catch (e) {
            }
        }
        if (values.length === 0) {
            this.medOpenRate = 0;
        }
        else {
            var half = Math.floor(values.length / 2);
            if (values.length % 2)
                this.medOpenRate = values[half];
            else
                this.medOpenRate = (values[half - 1] + values[half]) / 2.0;
        }
        for (var i = 0; i < dataSet.length; i++) {
            dataSet[i].setGlobalMedian(this.medOpenRate);
        }
    };
    DearSubjectsEngine.prototype.concat_plurals = function (a1) {
        var output = [];
        for (var i = 0; i < a1.length; i++) {
            output.push(a1[i]);
            var m = window.pluralize(a1[i], 2);
            var s = window.pluralize(a1[i], 1);
            if (output.indexOf(m) == -1)
                output.push(m);
            if (output.indexOf(s) == -1)
                output.push(s);
        }
        output.sort(function (a, b) { return a.length > b.length ? -1 : 1; });
        // console.log(output);
        return output;
    };
    DearSubjectsEngine.prototype.percent_diff = function (a1, a2) {
        var matches = a1.slice().filter(function (b) { return a2.indexOf(b) > -1; });
        return matches.length / a1.length;
    };
    DearSubjectsEngine.prototype.formattedSubjectLine = function (queryHash, text) {
        var counter = 0;
        var found = [];
        text = " " + text.replace(/([^\w\s])/gi, function (a) {
            return " " + a + " ";
        }) + " ";
        for (var i = 0; i < queryHash.length; i++) {
            var reg = new RegExp(queryHash[i], "ig");
            if (reg.test(text)) {
                var m = text.match(reg);
                // console.log(text, queryHash[i], m);
                if (m.length > 0) {
                    found.push(m[0]);
                    text = text.replace(new RegExp(" " + m[0] + " ", "ig"), "$" + counter + "$");
                    counter++;
                }
            }
        }
        var newText = text.toString();
        for (var i = 0; i < found.length; i++) {
            newText = newText.replace(new RegExp("\\$" + i + "\\$", "ig"), " <span class=\"highlight\">" + found[i].trim() + "</span> ");
        }
        //console.log(text, found, newText);
        // console.log(newText);
        newText = newText.replace(/(\s[^\w\s]\s)/gi, function (a) {
            return a.trim();
        });
        return newText.trim();
    };
    DearSubjectsEngine.prototype.isStopWord = function (word) {
        if (this.overrideWords.indexOf(word) > -1)
            return false;
        if (!isNaN(parseFloat(word)) && isFinite(word))
            return true; //numeric
        if (this.stopWords.indexOf(word) > -1)
            return true;
        return false;
    };
    DearSubjectsEngine.prototype.removeStopWords = function (text) {
        var _this = this;
        return text.split(" ").filter(function (a) {
            return !_this.isStopWord(a.toLowerCase());
        }).join(" ");
    };
    DearSubjectsEngine.prototype.createHash = function (str) {
        var output = [];
        var b = str.toLowerCase().split(" ");
        var c = 0;
        for (var i = 0; i < b.length; i++) {
            var c = i;
            while (c <= b.length) {
                var d = b.slice().slice(i, c).join(" ").trim().replace(/\s{2,}/g, "");
                if (d !== "" && d !== " ") {
                    output.push(d);
                }
                c++;
            }
        }
        output.sort(function (a, b) { return a.length > b.length ? -1 : 1; });
        return output;
    };
    return DearSubjectsEngine;
}());

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IntelligenceModuleMode;
(function (IntelligenceModuleMode) {
    IntelligenceModuleMode[IntelligenceModuleMode["NORMAL"] = 0] = "NORMAL";
    IntelligenceModuleMode[IntelligenceModuleMode["SWITCHBOARD"] = 1] = "SWITCHBOARD";
})(IntelligenceModuleMode || (IntelligenceModuleMode = {}));
var InjectorModule = (function () {
    function InjectorModule() {
        this.variables = {};
    }
    InjectorModule.prototype.__getParams = function (keys, injectables) {
        var args = keys.map(function (key) {
            return injectables[key];
        });
        //console.log(keys,args);
        return args;
    };
    InjectorModule.prototype.__getInjector = function (specs) {
        var output = { fn: function () { }, args: [] };
        if (typeof specs == "object") {
            output.fn = specs[specs.length - 1];
            output.args = this.__getParams(specs.slice(0, specs.length - 1), this.variables);
        }
        else {
            output.fn = specs;
        }
        return output;
    };
    InjectorModule.prototype.inject = function (varName, varValue) {
        this.variables[varName] = varValue;
    };
    return InjectorModule;
}());
var IntelligenceModule = (function (_super) {
    __extends(IntelligenceModule, _super);
    function IntelligenceModule(scope) {
        _super.call(this);
        this.scope = scope;
        this.rules = {};
        this.inject("IntelligenceModule", this);
        this.resetMessages();
    }
    IntelligenceModule.prototype.evaluateRules = function () {
        this.resetMessages();
        var rules = Object.keys(this.rules);
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            var result = this.evaluateRule(this.rules[rule]);
            var proceed = result.hasOwnProperty("when") ? result.when.apply(null) : false;
            if (this.mode == IntelligenceModuleMode.SWITCHBOARD) {
                result.active = proceed;
                this.messages.push(result);
            }
            else {
                if (proceed) {
                    this.messages.push(result);
                }
            }
        }
        if (this.mode == IntelligenceModuleMode.SWITCHBOARD) {
            this.messages.sort(function (a, b) {
                if (a.active)
                    return -1;
                if (!a.active)
                    return 1;
            });
        }
        else {
        }
    };
    IntelligenceModule.prototype.evaluateRule = function (rule) {
        var result, func;
        if (typeof rule === "object") {
            var injector = this.__getInjector(rule);
            result = injector.fn.apply(null, injector.args);
        }
        else {
            result = rule();
        }
        return result;
    };
    IntelligenceModule.prototype.resetMessages = function () {
        this.messages = [];
        this.canContinue = true;
    };
    IntelligenceModule.prototype.register = function (id, rule) {
        this.rules[id] = rule;
        return this;
    };
    return IntelligenceModule;
}(InjectorModule));
var IntelligenceEngine = (function () {
    function IntelligenceEngine() {
        this.scopes = [];
    }
    IntelligenceEngine.prototype.__locateScope = function (scope, mode) {
        var result = this.scopes.filter(function (obj) {
            return obj.scope == scope;
        });
        if (result.length == 0) {
            var a = new IntelligenceModule(scope);
            a.mode = mode;
            var b = this.scopes.push(a);
            return a;
        }
        else {
            return result[0];
        }
    };
    IntelligenceEngine.prototype.module = function (scope, mode) {
        if (mode === void 0) { mode = IntelligenceModuleMode.NORMAL; }
        var module = this.__locateScope(scope, mode);
        return module;
    };
    return IntelligenceEngine;
}());
var DearSubjects;
(function (EMLMaker) {
    DearSubjects.intelligence = new IntelligenceEngine();
})(DearSubjects || (DearSubjects = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlYXJTdWJqZWN0cy50cyIsIkludGVsbGlnZW5jZUVuZ2luZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUtFLDBCQUFZLEtBQUs7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBQ0QscUNBQVUsR0FBVixVQUFXLElBQUk7UUFDYixJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUCxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO29CQUNkLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ1osQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDaEIsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNoQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUk7Z0JBQ0EsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQztRQUNELE1BQU0sQ0FBQyxH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LEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNXpGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsdUVBQXVFLENBQUM7UUFDM0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQztRQUM3RCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUUzQixDQUFDO0lBRUQsb0RBQXVCLEdBQXZCLFVBQXdCLEdBQUc7UUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUNELHNCQUFJLGdEQUFnQjthQUFwQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRSxDQUFDOzs7T0FBQTtJQUNELGlEQUFvQixHQUFwQixVQUFxQixJQUFJO1FBQ3ZCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDWCxRQUFRO1lBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNILENBQUM7SUFDRCw4Q0FBaUIsR0FBakI7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7SUFHckMsQ0FBQztJQUNELDBDQUFhLEdBQWIsVUFBYyxHQUFHO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsdUNBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixZQUFZO1FBQ1osSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQzNCLElBQUksQ0FBQyxlQUFlLENBQ2xCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQy9DLENBQ0YsQ0FBQztRQUNGLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdDLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDMUMsd0JBQXdCO1lBQ3hCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQzlCLElBQUksQ0FBQyxlQUFlLENBQ2xCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN0RCxDQUNGLENBQUM7WUFDRixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMxRCxFQUFFLENBQUEsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDZixJQUFJLElBQUksR0FBRyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO29CQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDekIsQ0FBQztnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFTLEVBQUUsRUFBQyxFQUFFLElBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUV2QixDQUFDO0lBQ0QsaURBQW9CLEdBQXBCLFVBQXFCLE9BQU87UUFDMUIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDdkMsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDaEMsSUFBRyxDQUFDO2dCQUNGLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDekIsY0FBYyxHQUFFLGNBQWMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNoRSxVQUFVLEdBQUcsVUFBVSxHQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzVELENBQUM7WUFFSCxDQUFFO1lBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUVYLENBQUM7UUFFSCxDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUMsY0FBYyxHQUFDLEtBQUssQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUM3RCxtREFBbUQ7UUFDbkQsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUVoQixDQUFDO0lBQ0Qsb0RBQXVCLEdBQXZCLFVBQXdCLE9BQU87UUFDN0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ2hDLElBQUcsQ0FBQztnQkFDRixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDekMsQ0FBQztZQUNILENBQUU7WUFBQSxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRVgsQ0FBQztRQUVILENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRXpDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJO2dCQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUdILENBQUM7SUFFRCwyQ0FBYyxHQUFkLFVBQWUsRUFBVztRQUN4QixJQUFJLE1BQU0sR0FBRSxFQUFFLENBQUM7UUFDZixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDL0QsdUJBQXVCO1FBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELHlDQUFZLEdBQVosVUFBYSxFQUFFLEVBQUUsRUFBRTtRQUNqQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVMsQ0FBQyxJQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBQ0QsaURBQW9CLEdBQXBCLFVBQXFCLFNBQVMsRUFBRSxJQUFJO1FBQ2xDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVMsQ0FBQztZQUNqRCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDdkIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ1QsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDbEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNqQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixzQ0FBc0M7Z0JBQ3RDLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFFYixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNwRSxPQUFPLEVBQUUsQ0FBQztnQkFDWixDQUFDO1lBRUgsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDOUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLEVBQUUsNkJBQTZCLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RILENBQUM7UUFDRCxvQ0FBb0M7UUFDcEMsd0JBQXdCO1FBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFVBQVMsQ0FBQztZQUNyRCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0QsdUNBQVUsR0FBVixVQUFXLElBQUk7UUFDYixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckQsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVM7UUFDckUsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0QsNENBQWUsR0FBZixVQUFnQixJQUFJO1FBQXBCLGlCQUlDO1FBSEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFDRCx1Q0FBVSxHQUFWLFVBQVcsR0FBRztRQUNaLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNWLE9BQU0sQ0FBQyxJQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRXBFLEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBRyxFQUFFLElBQUksQ0FBQyxLQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUcsQ0FBQyxFQUFFLENBQUM7WUFFVixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQXZPQSxBQXVPQyxJQUFBOzs7Ozs7O0FDM1lELElBQUssc0JBR0o7QUFIRCxXQUFLLHNCQUFzQjtJQUN6Qix1RUFBUSxDQUFBO0lBQ1IsaUZBQVcsQ0FBQTtBQUNiLENBQUMsRUFISSxzQkFBc0IsS0FBdEIsc0JBQXNCLFFBRzFCO0FBRUQ7SUFHRTtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxvQ0FBVyxHQUFYLFVBQVksSUFBSSxFQUFFLFdBQVc7UUFDM0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQVU7WUFDN0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILHlCQUF5QjtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELHNDQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2pCLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRSxFQUFFLGNBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUM1QyxFQUFFLENBQUEsQ0FBQyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sT0FBTyxFQUFFLFFBQVE7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUM7SUFFckMsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQTtBQUVEO0lBQWlDLHNDQUFjO0lBTzdDLDRCQUFZLEtBQUs7UUFDZixpQkFBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELDBDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsR0FBRyxDQUFBLENBQWMsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUssQ0FBQztZQUFuQixJQUFJLElBQUksY0FBQTtZQUNWLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBRTVFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQztnQkFDakQsTUFBTSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTdCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO29CQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QixDQUFDO1lBQ0gsQ0FBQztTQUdKO1FBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUV6QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztRQUVSLENBQUM7SUFDTCxDQUFDO0lBQ0QseUNBQVksR0FBWixVQUFhLElBQUk7UUFDZixJQUFJLE1BQU0sRUFBRSxJQUFJLENBQUM7UUFDakIsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUEsQ0FBQztZQUMzQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0QsMENBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFDRCxxQ0FBUSxHQUFSLFVBQVMsRUFBRSxFQUFFLElBQUk7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0E3REEsQUE2REMsQ0E3RGdDLGNBQWMsR0E2RDlDO0FBRUQ7SUFFRTtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDRCwwQ0FBYSxHQUFiLFVBQWMsS0FBSyxFQUFFLElBQUk7UUFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBUyxHQUFzQjtZQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNkLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBQ0gsbUNBQU0sR0FBTixVQUFPLEtBQUssRUFBRSxJQUFrQztRQUFsQyxvQkFBa0MsR0FBbEMsT0FBSyxzQkFBc0IsQ0FBQyxNQUFNO1FBQzlDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsSUFBQTtBQUVELElBQUksWUFBWSxDQUFDO0FBQ2pCLENBQUMsVUFBVSxRQUFRO0lBQ2YsWUFBWSxDQUFDLFlBQVksR0FBSSxJQUFJLGtCQUFrQixFQUFFLENBQUM7QUFDMUQsQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiRGVhclN1YmplY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRGVhclN1YmplY3RzRGF0YXtcbiAgZGF0YTphbnlbXTtcbiAgaGVhZGluZ3M6IHN0cmluZ1tdO1xuICBzY29wZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlKXtcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gIH1cbiAgQ1NWdG9BcnJheSh0ZXh0KSB7XG4gICAgbGV0IHJldCA9IFsnJ10sIGkgPSAwLCBwID0gJycsIHMgPSB0cnVlO1xuICAgIGZvciAobGV0IGwgaW4gdGV4dCkge1xuICAgICAgICBsID0gdGV4dFtsXTtcbiAgICAgICAgaWYgKCdcIicgPT09IGwpIHtcbiAgICAgICAgICAgIHMgPSAhcztcbiAgICAgICAgICAgIGlmICgnXCInID09PSBwKSB7XG4gICAgICAgICAgICAgICAgcmV0W2ldICs9ICdcIic7XG4gICAgICAgICAgICAgICAgbCA9ICctJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJycgPT09IHApXG4gICAgICAgICAgICAgICAgbCA9ICctJztcbiAgICAgICAgfSBlbHNlIGlmIChzICYmICcsJyA9PT0gbClcbiAgICAgICAgICAgIGwgPSByZXRbKytpXSA9ICcnO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXRbaV0gKz0gbDtcbiAgICAgICAgcCA9IGw7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgbG9hZEZyb21DU1YoZXZ0KXtcbiAgICBsZXQgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgIGlmKGV2dC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoPjEpe1xuICAgICAgICBhbGVydCgneW91IGNhbiBvbmx5IGltcG9ydCBvbmUgZmlsZSBhdCBhdCB0aW1lLicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHZhciBEU0QgPSB0aGlzO1xuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24oZXZ0KXtcbiAgICAgICAgICB2YXIgb3V0cHV0ID0ge1xuICAgICAgICAgICAgY29udGVudDogZXZ0LnRhcmdldC5yZXN1bHQuc3BsaXQoL1xcclxcbnxcXG4vKSxcbiAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlc1swXS5uYW1lLFxuICAgICAgICAgICAgZXh0OiAoZmlsZXNbMF0ubmFtZS5zcGxpdChcIi5cIikpLnBvcCgpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGV2dC50YXJnZXQucmVzdWx0XG4gICAgICAgICAgLy9zcGxpdCByb3dzXG4gICAgICAgICAgLy9zcGxpdCBjb21tYXNcbiAgICAgICAgICBEU0QuaGVhZGluZ3MgPSAob3V0cHV0LmNvbnRlbnQuc3BsaWNlKDAsMSkpLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKERTRC5oZWFkaW5ncyk7XG4gICAgICAgICAgLy9yb3dzID0gb3V0cHV0LmNvbnRlbnRcbiAgICAgICAgICB2YXIgY29udGVudFJvd3MgPSBbXTtcblxuICAgICAgICAgIGZvcih2YXIgaSA9MDtpPG91dHB1dC5jb250ZW50Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgLy9zcGxpdCBjb21tYXM7XG4gICAgICAgICAgICBpZihvdXRwdXQuY29udGVudFtpXVsxXT09XCJcIikgb3V0cHV0LmNvbnRlbnRbaV1bMV09MDtcbiAgICAgICAgICAgIGlmKG91dHB1dC5jb250ZW50W2ldWzJdPT1cIlwiKSBvdXRwdXQuY29udGVudFtpXVsyXT0wO1xuICAgICAgICAgICAgY29udGVudFJvd3MucHVzaChEU0QuQ1NWdG9BcnJheShvdXRwdXQuY29udGVudFtpXSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIERTRC5kYXRhID0gY29udGVudFJvd3M7XG4gICAgICAgICAgRFNELnNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy9uYXZpZ2F0ZSBhd2F5XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVzWzBdKTtcbiAgICAgIH1cbiAgfVxuICBsb2FkRnJvbUNvcHlQYXN0ZSgpe1xuXG4gIH1cbn1cbmNsYXNzIERlYXJTdWJqZWN0c0RhdGFSb3cge1xuICBzdWJqZWN0OiBzdHJpbmc7XG4gIGV4YWN0TWF0Y2g6IGJvb2xlYW47XG4gIGRlbGl2ZXJlZDogbnVtYmVyO1xuICB1bmlxdWVPcGVuczogbnVtYmVyO1xuICB1bmlxdWVPcGVuUmF0ZTogbnVtYmVyO1xuICBzaW1pbGFyaXR5OiBudW1iZXI7XG4gIHJlbGF0aW9uTWVhbjogc3RyaW5nO1xuICByZWxhdGlvbk1lZGlhbjogc3RyaW5nO1xuICBmb3JtYXR0ZWRTdWJqZWN0TGluZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGFyciwgc2ltaWxhcml0eVRvUXVlcnkpe1xuICAgIHRoaXMuZm9ybWF0dGVkU3ViamVjdExpbmUgPSBcIlwiO1xuICAgIHRoaXMuZXhhY3RNYXRjaCA9IGZhbHNlO1xuICAgIHRoaXMuc3ViamVjdCA9IGFyclswXTtcbiAgICB0aGlzLmRlbGl2ZXJlZCA9IHBhcnNlSW50KGFyclsxXSk7XG4gICAgdGhpcy51bmlxdWVPcGVucyA9IHBhcnNlSW50KGFyclsyXSk7XG4gICAgaWYodGhpcy5kZWxpdmVyZWQ9PTApe1xuICAgICAgdGhpcy51bmlxdWVPcGVuUmF0ZSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudW5pcXVlT3BlblJhdGUgPSBNYXRoLnJvdW5kKCh0aGlzLnVuaXF1ZU9wZW5zL3RoaXMuZGVsaXZlcmVkKSoxMDAwMCkvMTAwO1xuICAgIH1cblxuICAgIHRoaXMuc2ltaWxhcml0eSA9IE1hdGgucm91bmQoc2ltaWxhcml0eVRvUXVlcnkqMTAwMDApLzEwMDtcbiAgfVxuICBzZXRHbG9iYWxNZWFuKG1lYW4pe1xuICAgIC8vIGNvbnNvbGUubG9nKG1lYW4sIHRoaXMudW5pcXVlT3BlblJhdGUpO1xuICAgIGlmKHRoaXMudW5pcXVlT3BlblJhdGUgPD0gbWVhbioxICsgLjUgJiYgdGhpcy51bmlxdWVPcGVuUmF0ZSA+PSBtZWFuKjEgLSAuNSApe1xuICAgICAgdGhpcy5yZWxhdGlvbk1lYW4gPSBcIkFib3V0IHRoZSBzYW1lXCI7XG4gICAgfSBlbHNlIGlmKHRoaXMudW5pcXVlT3BlblJhdGUgPiBtZWFuKjEgKyAuNSl7XG4gICAgICAvL2Fib3ZlXG4gICAgICB0aGlzLnJlbGF0aW9uTWVhbiA9IFwiQWJvdmVcIjtcbiAgICB9IGVsc2UgaWYodGhpcy51bmlxdWVPcGVuUmF0ZSA8IG1lYW4qMSAtIC41KXtcbiAgICAgIC8vYmVsb3dcbiAgICAgIHRoaXMucmVsYXRpb25NZWFuID0gXCJCZWxvd1wiO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlbGF0aW9uTWVhbik7XG4gIH1cbiAgc2V0R2xvYmFsTWVkaWFuKG1lYW4pe1xuICAgIC8vIGNvbnNvbGUubG9nKG1lYW4sIHRoaXMudW5pcXVlT3BlblJhdGUpO1xuICAgIGlmKHRoaXMudW5pcXVlT3BlblJhdGUgPD0gbWVhbioxICsgLjUgJiYgdGhpcy51bmlxdWVPcGVuUmF0ZSA+PSBtZWFuKjEgLSAuNSApe1xuICAgICAgdGhpcy5yZWxhdGlvbk1lZGlhbiA9IFwiQWJvdXQgdGhlIHNhbWVcIjtcbiAgICB9IGVsc2UgaWYodGhpcy51bmlxdWVPcGVuUmF0ZSA+IG1lYW4qMSArIC41KXtcbiAgICAgIC8vYWJvdmVcbiAgICAgIHRoaXMucmVsYXRpb25NZWRpYW4gPSBcIkFib3ZlXCI7XG4gICAgfSBlbHNlIGlmKHRoaXMudW5pcXVlT3BlblJhdGUgPCBtZWFuKjEgLSAuNSl7XG4gICAgICAvL2JlbG93XG4gICAgICB0aGlzLnJlbGF0aW9uTWVkaWFuID0gXCJCZWxvd1wiO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlbGF0aW9uTWVkaWFuKTtcbiAgfVxuICBhZGVxdWF0ZVNhbXBsZVNpemUoKXtcbiAgICBpZihwYXJzZUludCh0aGlzLmRlbGl2ZXJlZC50b1N0cmluZygpKTw1MDApe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbmNsYXNzIERlYXJTdWJqZWN0c1Jlc3VsdFNldCB7XG4gIGRhdGE6IERlYXJTdWJqZWN0c0RhdGFSb3dbXTtcbiAgYXZnT3BlblJhdGU6IG51bWJlcjtcbiAgbWVkT3BlblJhdGU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihkYXRhKXtcbiAgICB2YXIgZGVsaXZlcmVkID0gMDtcbiAgICB2YXIgb3BlbnMgPSAwO1xuICAgIHZhciBtZWRWYWxzID0gW107XG4gICAgZm9yKHZhciBpPTA7aTxkYXRhLmxlbmd0aDtpKyspe1xuICAgICAgZGVsaXZlcmVkID0gZGVsaXZlcmVkICsgcGFyc2VJbnQoZGF0YVtpXVsxXSk7XG4gICAgICBvcGVucyA9IG9wZW5zICsgcGFyc2VJbnQoZGF0YVtpXVsyXSk7XG4gICAgICBtZWRWYWxzLnB1c2goZGF0YVtpXVszXSk7XG4gICAgICAvLyB0aGlzLmRhdGEucHVzaCh7XG4gICAgICAvLyAgIHN1YmplY3Q6XG4gICAgICAvLyB9KTtcbiAgICB9XG4gICAgaWYobWVkVmFscy5sZW5ndGg9PTApe1xuICAgICAgdGhpcy5tZWRPcGVuUmF0ZSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBoYWxmID0gTWF0aC5mbG9vcihtZWRWYWxzLmxlbmd0aCAvIDIpO1xuICAgICAgaWYobWVkVmFscy5sZW5ndGggJSAyID09MCl7XG4gICAgICAgIHRoaXMubWVkT3BlblJhdGUgPSBtZWRWYWxzW2hhbGZdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tZWRPcGVuUmF0ZSA9IChtZWRWYWxzW2hhbGYgLSAxXSArIG1lZFZhbHNbaGFsZl0pIC8gMi4wO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmF2Z09wZW5SYXRlID0gb3BlbnMvZGVsaXZlcmVkO1xuICAgIC8vIGRhdGE7XG4gICAgLy8gdGhpcy5kYXRhID0ge307XG5cbiAgICAvL2ZpbmQgbWVhbjtcbiAgICAvL2ZpbmQgbWVkaWFuO1xuXG5cbiAgfVxuXG59XG5jbGFzcyBEZWFyU3ViamVjdHNFbmdpbmUge1xuICBkYXRhU2V0OiBEZWFyU3ViamVjdHNEYXRhO1xuICBzdWJqZWN0TGluZTogc3RyaW5nO1xuICBvdmVycmlkZVdvcmRzOiBzdHJpbmdbXTtcbiAgbWF4UmVzdWx0czogbnVtYmVyO1xuICByZXN1bHRTZXQ6IGFueVtdO1xuICBhdmdPcGVuUmF0ZTogbnVtYmVyO1xuICBzdG9wV29yZHM6IHN0cmluZ1tdO1xuICBtZWRPcGVuUmF0ZTogbnVtYmVyO1xuICBsb2FkaW5nOiBib29sZWFuO1xuICBpbnRlbGxpZ2VuY2U6IEludGVsbGlnZW5jZU1vZHVsZTtcbiAgYmVzdFByYWN0aWNlczogSW50ZWxsaWdlbmNlTW9kdWxlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGFTZXQpe1xuICAgIHRoaXMuc3RvcFdvcmRzID0gW1wiYVwiLCBcImFib3V0XCIsIFwiYWJvdmVcIiwgXCJhYm92ZVwiLCBcImFjcm9zc1wiLCBcImFmdGVyXCIsIFwiYWZ0ZXJ3YXJkc1wiLCBcImFnYWluXCIsIFwiYWdhaW5zdFwiLCBcImFsbFwiLCBcImFsbW9zdFwiLCBcImFsb25lXCIsIFwiYWxvbmdcIiwgXCJhbHJlYWR5XCIsIFwiYWxzb1wiLFwiYWx0aG91Z2hcIixcImFsd2F5c1wiLFwiYW1cIixcImFtb25nXCIsXCJhbW9uZ3N0XCIsXCJhbW91bmdzdFwiLCBcImFtb3VudFwiLCAgXCJhblwiLCBcImFuZFwiLCBcImFub3RoZXJcIiwgXCJhbnlcIixcImFueWhvd1wiLFwiYW55b25lXCIsXCJhbnl0aGluZ1wiLFwiYW55d2F5XCIsIFwiYW55d2hlcmVcIiwgXCJhcmVcIiwgXCJhcm91bmRcIiwgXCJhc1wiLCAgXCJhdFwiLCBcImJhY2tcIixcImJlXCIsXCJiZWNhbWVcIiwgXCJiZWNhdXNlXCIsXCJiZWNvbWVcIixcImJlY29tZXNcIiwgXCJiZWNvbWluZ1wiLCBcImJlZW5cIiwgXCJiZWZvcmVcIiwgXCJiZWZvcmVoYW5kXCIsIFwiYmVoaW5kXCIsIFwiYmVpbmdcIiwgXCJiZWxvd1wiLCBcImJlc2lkZVwiLCBcImJlc2lkZXNcIiwgXCJiZXR3ZWVuXCIsIFwiYmV5b25kXCIsIFwiYmlsbFwiLCBcImJvdGhcIiwgXCJib3R0b21cIixcImJ1dFwiLCBcImJ5XCIsIFwiY2FsbFwiLCBcImNhblwiLCBcImNhbm5vdFwiLCBcImNhbnRcIiwgXCJjb1wiLCBcImNvblwiLCBcImNvdWxkXCIsIFwiY291bGRudFwiLCBcImNyeVwiLCBcImRlXCIsIFwiZGVzY3JpYmVcIiwgXCJkZXRhaWxcIiwgXCJkb1wiLCBcImRvbmVcIiwgXCJkb3duXCIsIFwiZHVlXCIsIFwiZHVyaW5nXCIsIFwiZWFjaFwiLCBcImVnXCIsIFwiZWlnaHRcIiwgXCJlaXRoZXJcIiwgXCJlbGV2ZW5cIixcImVsc2VcIiwgXCJlbHNld2hlcmVcIiwgXCJlbXB0eVwiLCBcImVub3VnaFwiLCBcImV0Y1wiLCBcImV2ZW5cIiwgXCJldmVyXCIsIFwiZXZlcnlcIiwgXCJldmVyeW9uZVwiLCBcImV2ZXJ5dGhpbmdcIiwgXCJldmVyeXdoZXJlXCIsIFwiZXhjZXB0XCIsIFwiZmV3XCIsIFwiZmlmdGVlblwiLCBcImZpZnlcIiwgXCJmaWxsXCIsIFwiZmluZFwiLCBcImZpcmVcIiwgXCJmaXJzdFwiLCBcImZpdmVcIiwgXCJmb3JcIiwgXCJmb3JtZXJcIiwgXCJmb3JtZXJseVwiLCBcImZvcnR5XCIsIFwiZm91bmRcIiwgXCJmb3VyXCIsIFwiZnJvbVwiLCBcImZyb250XCIsIFwiZnVsbFwiLCBcImZ1cnRoZXJcIiwgXCJnZXRcIiwgXCJnaXZlXCIsIFwiZ29cIiwgXCJoYWRcIiwgXCJoYXNcIiwgXCJoYXNudFwiLCBcImhhdmVcIiwgXCJoZVwiLCBcImhlbmNlXCIsIFwiaGVyXCIsIFwiaGVyZVwiLCBcImhlcmVhZnRlclwiLCBcImhlcmVieVwiLCBcImhlcmVpblwiLCBcImhlcmV1cG9uXCIsIFwiaGVyc1wiLCBcImhlcnNlbGZcIiwgXCJoaW1cIiwgXCJoaW1zZWxmXCIsIFwiaGlzXCIsIFwiaG93XCIsIFwiaG93ZXZlclwiLCBcImh1bmRyZWRcIiwgXCJpZVwiLCBcImlmXCIsIFwiaW5cIiwgXCJpbmNcIiwgXCJpbmRlZWRcIiwgXCJpbnRlcmVzdFwiLCBcImludG9cIiwgXCJpc1wiLCBcIml0XCIsIFwiaXRzXCIsIFwiaXRzZWxmXCIsIFwia2VlcFwiLCBcImxhc3RcIiwgXCJsYXR0ZXJcIiwgXCJsYXR0ZXJseVwiLCBcImxlYXN0XCIsIFwibGVzc1wiLCBcImx0ZFwiLCBcIm1hZGVcIiwgXCJtYW55XCIsIFwibWF5XCIsIFwibWVcIiwgXCJtZWFud2hpbGVcIiwgXCJtaWdodFwiLCBcIm1pbGxcIiwgXCJtaW5lXCIsIFwibW9yZVwiLCBcIm1vcmVvdmVyXCIsIFwibW9zdFwiLCBcIm1vc3RseVwiLCBcIm1vdmVcIiwgXCJtdWNoXCIsIFwibXVzdFwiLCBcIm15XCIsIFwibXlzZWxmXCIsIFwibmFtZVwiLCBcIm5hbWVseVwiLCBcIm5laXRoZXJcIiwgXCJuZXZlclwiLCBcIm5ldmVydGhlbGVzc1wiLCBcIm5leHRcIiwgXCJuaW5lXCIsIFwibm9cIiwgXCJub2JvZHlcIiwgXCJub25lXCIsIFwibm9vbmVcIiwgXCJub3JcIiwgXCJub3RcIiwgXCJub3RoaW5nXCIsIFwibm93XCIsIFwibm93aGVyZVwiLCBcIm9mXCIsIFwib2ZmXCIsIFwib2Z0ZW5cIiwgXCJvblwiLCBcIm9uY2VcIiwgXCJvbmVcIiwgXCJvbmx5XCIsIFwib250b1wiLCBcIm9yXCIsIFwib3RoZXJcIiwgXCJvdGhlcnNcIiwgXCJvdGhlcndpc2VcIiwgXCJvdXJcIiwgXCJvdXJzXCIsIFwib3Vyc2VsdmVzXCIsIFwib3V0XCIsIFwib3ZlclwiLCBcIm93blwiLFwicGFydFwiLCBcInBlclwiLCBcInBlcmhhcHNcIiwgXCJwbGVhc2VcIiwgXCJwdXRcIiwgXCJyYXRoZXJcIiwgXCJyZVwiLCBcInNhbWVcIiwgXCJzZWVcIiwgXCJzZWVtXCIsIFwic2VlbWVkXCIsIFwic2VlbWluZ1wiLCBcInNlZW1zXCIsIFwic2VyaW91c1wiLCBcInNldmVyYWxcIiwgXCJzaGVcIiwgXCJzaG91bGRcIiwgXCJzaG93XCIsIFwic2lkZVwiLCBcInNpbmNlXCIsIFwic2luY2VyZVwiLCBcInNpeFwiLCBcInNpeHR5XCIsIFwic29cIiwgXCJzb21lXCIsIFwic29tZWhvd1wiLCBcInNvbWVvbmVcIiwgXCJzb21ldGhpbmdcIiwgXCJzb21ldGltZVwiLCBcInNvbWV0aW1lc1wiLCBcInNvbWV3aGVyZVwiLCBcInN0aWxsXCIsIFwic3VjaFwiLCBcInRha2VcIiwgXCJ0ZW5cIiwgXCJ0aGFuXCIsIFwidGhhdFwiLCBcInRoZVwiLCBcInRoZWlyXCIsIFwidGhlbVwiLCBcInRoZW1zZWx2ZXNcIiwgXCJ0aGVuXCIsIFwidGhlbmNlXCIsIFwidGhlcmVcIiwgXCJ0aGVyZWFmdGVyXCIsIFwidGhlcmVieVwiLCBcInRoZXJlZm9yZVwiLCBcInRoZXJlaW5cIiwgXCJ0aGVyZXVwb25cIiwgXCJ0aGVzZVwiLCBcInRoZXlcIiwgXCJ0aGlja3ZcIiwgXCJ0aGluXCIsIFwidGhpcmRcIiwgXCJ0aGlzXCIsIFwidGhvc2VcIiwgXCJ0aG91Z2hcIiwgXCJ0aHJlZVwiLCBcInRocm91Z2hcIiwgXCJ0aHJvdWdob3V0XCIsIFwidGhydVwiLCBcInRodXNcIiwgXCJ0b1wiLCBcInRvZ2V0aGVyXCIsIFwidG9vXCIsIFwidG9wXCIsIFwidG93YXJkXCIsIFwidG93YXJkc1wiLCBcInR3ZWx2ZVwiLCBcInR3ZW50eVwiLCBcInR3b1wiLCBcInVuXCIsIFwidW5kZXJcIiwgXCJ1bnRpbFwiLCBcInVwXCIsIFwidXBvblwiLCBcInVzXCIsIFwidmVyeVwiLCBcInZpYVwiLCBcIndhc1wiLCBcIndlXCIsIFwid2VsbFwiLCBcIndlcmVcIiwgXCJ3aGF0XCIsIFwid2hhdGV2ZXJcIiwgXCJ3aGVuXCIsIFwid2hlbmNlXCIsIFwid2hlbmV2ZXJcIiwgXCJ3aGVyZVwiLCBcIndoZXJlYWZ0ZXJcIiwgXCJ3aGVyZWFzXCIsIFwid2hlcmVieVwiLCBcIndoZXJlaW5cIiwgXCJ3aGVyZXVwb25cIiwgXCJ3aGVyZXZlclwiLCBcIndoZXRoZXJcIiwgXCJ3aGljaFwiLCBcIndoaWxlXCIsIFwid2hpdGhlclwiLCBcIndob1wiLCBcIndob2V2ZXJcIiwgXCJ3aG9sZVwiLCBcIndob21cIiwgXCJ3aG9zZVwiLCBcIndoeVwiLCBcIndpbGxcIiwgXCJ3aXRoXCIsIFwid2l0aGluXCIsIFwid2l0aG91dFwiLCBcIndvdWxkXCIsIFwieWV0XCIsIFwieW91XCIsIFwieW91clwiLFwieW91cmVcIiwgXCJ5b3Vyc1wiLCBcInlvdXJzZWxmXCIsIFwieW91cnNlbHZlc1wiLCBcInRoZVwiXTtcbiAgICB0aGlzLmRhdGFTZXQgPSBkYXRhU2V0O1xuICAgIHRoaXMub3ZlcnJpZGVXb3JkcyA9IFtdO1xuICAgIHRoaXMuc3ViamVjdExpbmUgPSBcIltlQm9va10gUG9wdWxhdGlvbiBoZWFsdGggc3RyYXRlZ2llcyBwb3dlciBoZWFsdGggc3lzdGVtIGltcHJvdmVtZW50LlwiO1xuICAgIHRoaXMubWF4UmVzdWx0cyA9IDIwO1xuICAgIHRoaXMuaW50ZWxsaWdlbmNlID0gRGVhclN1YmplY3RzLmludGVsbGlnZW5jZS5tb2R1bGUoXCJTdWJqZWN0XCIpO1xuICAgIHRoaXMuaW50ZWxsaWdlbmNlLmluamVjdChcIkRlYXJTdWJqZWN0c0VuZ2luZVwiLCB0aGlzKTtcblxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuYmVzdFByYWN0aWNlcyA9IERlYXJTdWJqZWN0cy5pbnRlbGxpZ2VuY2UubW9kdWxlKFwiQmVzdFByYWN0aWNlc1wiKTtcbiAgICB0aGlzLmJlc3RQcmFjdGljZXMubW9kZSA9IEludGVsbGlnZW5jZU1vZHVsZU1vZGUuU1dJVENIQk9BUkQ7XG4gICAgdGhpcy5iZXN0UHJhY3RpY2VzLmluamVjdChcIkRlYXJTdWJqZWN0c0VuZ2luZVwiLCB0aGlzKTtcblxuICAgIHRoaXMudXBkYXRlU3ViamVjdExpbmUoKTtcblxuICB9XG5cbiAgcmVtb3ZlU3BlY2lhbENoYXJhY3RlcnMoc3RyKTpzdHJpbmd7XG4gICAgICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15cXHdcXHNdL2dpLCAnJykucmVwbGFjZSgvXFxzezIsfS9nLFwiIFwiKTtcbiAgfVxuICBnZXQgc3ViamVjdExpbmVQYXJ0cygpe1xuICAgIHJldHVybiB0aGlzLnJlbW92ZVNwZWNpYWxDaGFyYWN0ZXJzKHRoaXMuc3ViamVjdExpbmUpLnNwbGl0KFwiIFwiKTtcbiAgfVxuICB0b2dnbGVPdmVycmlkZGVuV29yZCh3b3JkKXtcbiAgICBsZXQgaW5kZXggPSB0aGlzLm92ZXJyaWRlV29yZHMuaW5kZXhPZih3b3JkKTtcbiAgICBpZihpbmRleD4tMSl7XG4gICAgICAvL3JlbW92ZVxuICAgICAgdGhpcy5vdmVycmlkZVdvcmRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBjb25zb2xlLmxvZygncmVtb3ZlZCcsIHRoaXMub3ZlcnJpZGVXb3Jkcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3ZlcnJpZGVXb3Jkcy5wdXNoKHdvcmQpO1xuICAgICAgY29uc29sZS5sb2coJ2FkZGVkJywgdGhpcy5vdmVycmlkZVdvcmRzKTtcbiAgICB9XG4gIH1cbiAgdXBkYXRlU3ViamVjdExpbmUoKXtcbiAgICB0aGlzLmludGVsbGlnZW5jZS5ldmFsdWF0ZVJ1bGVzKCk7XG4gICAgdGhpcy5iZXN0UHJhY3RpY2VzLmV2YWx1YXRlUnVsZXMoKTtcblxuXG4gIH1cbiAgc29ydFJlc3VsdHNCeShrZXkpe1xuICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0U2V0KTtcbiAgICB0aGlzLnJlc3VsdFNldC5zb3J0KGZ1bmN0aW9uKGEsYil7XG4gICAgICByZXR1cm4gYVtrZXldPGJba2V5XSA/IDEgOiAtMTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdFNldCk7XG4gIH1cbiAgaW5pdFNlYXJjaCgpe1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgY29uc29sZS5sb2coXCJzdGFydGluZyBzZWFyY2hcIik7XG4gICAgLy9jcmVhdGVIYXNoXG4gICAgdmFyIG91dHB1dCA9IFtdO1xuICAgIHZhciBxdWVyeUhhc2ggPSB0aGlzLmNyZWF0ZUhhc2goXG4gICAgICAgIHRoaXMucmVtb3ZlU3RvcFdvcmRzKFxuICAgICAgICAgIHRoaXMucmVtb3ZlU3BlY2lhbENoYXJhY3RlcnModGhpcy5zdWJqZWN0TGluZSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIHF1ZXJ5SGFzaCA9IHRoaXMuY29uY2F0X3BsdXJhbHMocXVlcnlIYXNoKTtcblxuICAgIGZvcih2YXIgaT0wO2k8dGhpcy5kYXRhU2V0LmRhdGEubGVuZ3RoO2krKyl7XG4gICAgICAvL2NyZWF0ZSBhbHRlcm5hdGUgaGFzaDtcbiAgICAgIGxldCB0YXJnZXRIYXNoID0gdGhpcy5jcmVhdGVIYXNoKFxuICAgICAgICB0aGlzLnJlbW92ZVN0b3BXb3JkcyhcbiAgICAgICAgICB0aGlzLnJlbW92ZVNwZWNpYWxDaGFyYWN0ZXJzKHRoaXMuZGF0YVNldC5kYXRhW2ldWzBdKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgbGV0IHNpbWlsYXJpdHkgPSB0aGlzLnBlcmNlbnRfZGlmZihxdWVyeUhhc2gsIHRhcmdldEhhc2gpO1xuICAgICAgaWYoc2ltaWxhcml0eT4wKXtcbiAgICAgICAgdmFyIGRzZHIgPSBuZXcgRGVhclN1YmplY3RzRGF0YVJvdyh0aGlzLmRhdGFTZXQuZGF0YVtpXSwgc2ltaWxhcml0eSk7XG4gICAgICAgIGRzZHIuZm9ybWF0dGVkU3ViamVjdExpbmUgPSB0aGlzLmZvcm1hdHRlZFN1YmplY3RMaW5lKHF1ZXJ5SGFzaCwgdGhpcy5kYXRhU2V0LmRhdGFbaV1bMF0pO1xuICAgICAgICBpZih0aGlzLnN1YmplY3RMaW5lID09IGRzZHIuc3ViamVjdCl7XG4gICAgICAgICAgZHNkci5leGFjdE1hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQucHVzaChkc2RyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgb3V0cHV0LnNvcnQoZnVuY3Rpb24oYTEsYjEpe3JldHVybiBhMS5zaW1pbGFyaXR5PGIxLnNpbWlsYXJpdHkgPyAxIDogLTE7fSk7XG4gICAgdGhpcy5yZXN1bHRTZXQgPSBvdXRwdXQuc2xpY2UoMCx0aGlzLm1heFJlc3VsdHMpO1xuICAgIHRoaXMuYXZnT3BlblJhdGUgPSB0aGlzLmNhbGN1bGF0ZUF2Z09wZW5SYXRlKHRoaXMucmVzdWx0U2V0KTtcbiAgICB0aGlzLmNhbGN1bGF0ZU1lZGlhbk9wZW5SYXRlKHRoaXMucmVzdWx0U2V0KTtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICB9XG4gIGNhbGN1bGF0ZUF2Z09wZW5SYXRlKGRhdGFTZXQpe1xuICAgIHZhciBkZWxpdmVyZWRUb3RhbCA9IDAsIG9wZW5zVG90YWwgPSAwO1xuICAgIGZvcih2YXIgaT0wO2k8ZGF0YVNldC5sZW5ndGg7aSsrKXtcbiAgICAgIHRyeXtcbiAgICAgICAgaWYoZGF0YVNldFtpXS5kZWxpdmVyZWQ+MCl7XG4gICAgICAgICAgZGVsaXZlcmVkVG90YWw9IGRlbGl2ZXJlZFRvdGFsICsgcGFyc2VJbnQoZGF0YVNldFtpXS5kZWxpdmVyZWQpO1xuICAgICAgICAgIG9wZW5zVG90YWwgPSBvcGVuc1RvdGFsKyBwYXJzZUludChkYXRhU2V0W2ldLnVuaXF1ZU9wZW5zKTtcbiAgICAgICAgfVxuXG4gICAgICB9IGNhdGNoKGUpe1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gTWF0aC5yb3VuZChvcGVuc1RvdGFsL2RlbGl2ZXJlZFRvdGFsKjEwMDAwKS8xMDA7XG4gICAgLy8gY29uc29sZS5sb2coZGVsaXZlcmVkVG90YWwsIG9wZW5zVG90YWwsIHJlc3VsdCk7XG4gICAgZm9yKHZhciBpPTA7aTxkYXRhU2V0Lmxlbmd0aDtpKyspe1xuICAgICAgZGF0YVNldFtpXS5zZXRHbG9iYWxNZWFuKHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG5cbiAgfVxuICBjYWxjdWxhdGVNZWRpYW5PcGVuUmF0ZShkYXRhU2V0KXtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yKHZhciBpPTA7aTxkYXRhU2V0Lmxlbmd0aDtpKyspe1xuICAgICAgdHJ5e1xuICAgICAgICBpZihkYXRhU2V0W2ldLmRlbGl2ZXJlZD4wKXtcbiAgICAgICAgICBkYXRhU2V0W2ldLnVuaXF1ZU9wZW5SYXRlICogMTtcbiAgICAgICAgICB2YWx1ZXMucHVzaChkYXRhU2V0W2ldLnVuaXF1ZU9wZW5SYXRlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaChlKXtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYodmFsdWVzLmxlbmd0aCA9PT0wKSB7XG4gICAgICB0aGlzLm1lZE9wZW5SYXRlID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGhhbGYgPSBNYXRoLmZsb29yKHZhbHVlcy5sZW5ndGggLyAyKTtcblxuICAgICAgaWYgKHZhbHVlcy5sZW5ndGggJSAyKVxuICAgICAgICB0aGlzLm1lZE9wZW5SYXRlID0gdmFsdWVzW2hhbGZdO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLm1lZE9wZW5SYXRlID0gKHZhbHVlc1toYWxmIC0gMV0gKyB2YWx1ZXNbaGFsZl0pIC8gMi4wO1xuICAgIH1cbiAgICBmb3IodmFyIGk9MDtpPGRhdGFTZXQubGVuZ3RoO2krKyl7XG4gICAgICBkYXRhU2V0W2ldLnNldEdsb2JhbE1lZGlhbih0aGlzLm1lZE9wZW5SYXRlKTtcbiAgICB9XG5cblxuICB9XG5cbiAgY29uY2F0X3BsdXJhbHMoYTE6c3RyaW5nW10pOnN0cmluZ1tde1xuICAgIHZhciBvdXRwdXQgPVtdO1xuICAgIGZvcih2YXIgaT0wO2k8YTEubGVuZ3RoO2krKyl7XG4gICAgICBvdXRwdXQucHVzaChhMVtpXSk7XG4gICAgICBsZXQgbSA9IHdpbmRvdy5wbHVyYWxpemUoYTFbaV0sMik7XG4gICAgICBsZXQgcyA9IHdpbmRvdy5wbHVyYWxpemUoYTFbaV0sMSk7XG4gICAgICBpZihvdXRwdXQuaW5kZXhPZihtKT09LTEpIG91dHB1dC5wdXNoKG0pO1xuICAgICAgaWYob3V0cHV0LmluZGV4T2Yocyk9PS0xKSBvdXRwdXQucHVzaChzKTtcbiAgICB9XG4gICAgb3V0cHV0LnNvcnQoZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS5sZW5ndGg+Yi5sZW5ndGggPyAtMSA6IDE7fSk7XG4gICAgLy8gY29uc29sZS5sb2cob3V0cHV0KTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG4gIHBlcmNlbnRfZGlmZihhMSwgYTIpe1xuICAgIHZhciBtYXRjaGVzID0gYTEuc2xpY2UoKS5maWx0ZXIoZnVuY3Rpb24oYil7IHJldHVybiBhMi5pbmRleE9mKGIpPi0xfSk7XG4gICAgcmV0dXJuIG1hdGNoZXMubGVuZ3RoIC8gYTEubGVuZ3RoO1xuICB9XG4gIGZvcm1hdHRlZFN1YmplY3RMaW5lKHF1ZXJ5SGFzaCwgdGV4dCk6c3RyaW5ne1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICB2YXIgZm91bmQgPSBbXTtcbiAgICB0ZXh0ID0gXCIgXCIgKyB0ZXh0LnJlcGxhY2UoLyhbXlxcd1xcc10pL2dpLCBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBcIiBcIiArIGEgKyBcIiBcIjtcbiAgICB9KSArIFwiIFwiO1xuICAgIGZvcih2YXIgaT0wO2k8cXVlcnlIYXNoLmxlbmd0aDtpKyspe1xuICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAocXVlcnlIYXNoW2ldLFwiaWdcIik7XG4gICAgICBpZihyZWcudGVzdCh0ZXh0KSl7XG4gICAgICAgIHZhciBtID0gdGV4dC5tYXRjaChyZWcpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZXh0LCBxdWVyeUhhc2hbaV0sIG0pO1xuICAgICAgICBpZihtLmxlbmd0aD4wKXtcblxuICAgICAgICAgIGZvdW5kLnB1c2gobVswXSk7XG4gICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShuZXcgUmVnRXhwKFwiIFwiK21bMF0rXCIgXCIsXCJpZ1wiKSwgXCIkXCIrY291bnRlcitcIiRcIik7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3VGV4dCA9IHRleHQudG9TdHJpbmcoKTtcbiAgICBmb3IodmFyIGk9MDtpPGZvdW5kLmxlbmd0aDtpKyspe1xuICAgICAgbmV3VGV4dCA9IG5ld1RleHQucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXCRcIitpK1wiXFxcXCRcIixcImlnXCIpLCBcIiA8c3BhbiBjbGFzcz1cXFwiaGlnaGxpZ2h0XFxcIj5cIitmb3VuZFtpXS50cmltKCkrXCI8L3NwYW4+IFwiKTtcbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyh0ZXh0LCBmb3VuZCwgbmV3VGV4dCk7XG4gICAgLy8gY29uc29sZS5sb2cobmV3VGV4dCk7XG4gICAgbmV3VGV4dCA9IG5ld1RleHQucmVwbGFjZSgvKFxcc1teXFx3XFxzXVxccykvZ2ksIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGEudHJpbSgpO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXdUZXh0LnRyaW0oKTtcbiAgfVxuICBpc1N0b3BXb3JkKHdvcmQpOmJvb2xlYW4ge1xuICAgIGlmKHRoaXMub3ZlcnJpZGVXb3Jkcy5pbmRleE9mKHdvcmQpPi0xKSByZXR1cm4gZmFsc2U7XG4gICAgaWYoIWlzTmFOKHBhcnNlRmxvYXQod29yZCkpICYmIGlzRmluaXRlKHdvcmQpKSByZXR1cm4gdHJ1ZTsgLy9udW1lcmljXG4gICAgaWYodGhpcy5zdG9wV29yZHMuaW5kZXhPZih3b3JkKT4tMSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJlbW92ZVN0b3BXb3Jkcyh0ZXh0KTpzdHJpbmd7XG4gICAgcmV0dXJuIHRleHQuc3BsaXQoXCIgXCIpLmZpbHRlcigoYSk9PntcbiAgICAgIHJldHVybiAhdGhpcy5pc1N0b3BXb3JkKGEudG9Mb3dlckNhc2UoKSk7XG4gICAgfSkuam9pbihcIiBcIik7XG4gIH1cbiAgY3JlYXRlSGFzaChzdHIpOnN0cmluZ1tde1xuICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICB2YXIgYiA9IHN0ci50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiIFwiKTtcbiAgICB2YXIgYyA9IDA7XG4gICAgZm9yKHZhciBpPTA7aTxiLmxlbmd0aDtpKyspe1xuICAgICAgdmFyIGMgPSBpO1xuICAgICAgd2hpbGUoYzw9Yi5sZW5ndGgpe1xuICAgICAgICB2YXIgZCA9IGIuc2xpY2UoKS5zbGljZShpLGMpLmpvaW4oXCIgXCIpLnRyaW0oKS5yZXBsYWNlKC9cXHN7Mix9L2csXCJcIik7XG5cbiAgICAgICAgaWYoZCE9PVwiXCIgJiYgZCE9PVwiIFwiKSB7XG4gICAgICAgICAgb3V0cHV0LnB1c2goZCk7XG4gICAgICAgIH1cblxuICAgICAgICAgICAgYysrO1xuXG4gICAgICB9XG4gICAgfVxuICAgIG91dHB1dC5zb3J0KGZ1bmN0aW9uKGEsYil7cmV0dXJuIGEubGVuZ3RoPmIubGVuZ3RoID8gLTEgOiAxO30pO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cbiIsIlxuZW51bSBJbnRlbGxpZ2VuY2VNb2R1bGVNb2RlIHtcbiAgTk9STUFMPTAsXG4gIFNXSVRDSEJPQVJEXG59XG5cbmNsYXNzIEluamVjdG9yTW9kdWxlIHtcbiAgLy8gc2NvcGU6IGFueVtdO1xuICB2YXJpYWJsZXM6IHtzdHJpbmc/OmFueX07XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy52YXJpYWJsZXMgPSB7fTtcbiAgfVxuICBfX2dldFBhcmFtcyhrZXlzLCBpbmplY3RhYmxlcyl7XG4gICAgdmFyIGFyZ3MgPSBrZXlzLm1hcCgoa2V5OnN0cmluZyk9PntcbiAgICAgIHJldHVybiBpbmplY3RhYmxlc1trZXldXG4gICAgfSk7XG4gICAgLy9jb25zb2xlLmxvZyhrZXlzLGFyZ3MpO1xuICAgIHJldHVybiBhcmdzO1xuICB9XG4gIF9fZ2V0SW5qZWN0b3Ioc3BlY3MpeyAvL2Zvcm1hdCBpcyBbXCJcIiwgZm4oYSldIG9yIGZuKCl7fVxuICAgIHZhciBvdXRwdXQgPSB7IGZuOiBmdW5jdGlvbigpe30sIGFyZ3M6IFtdIH07XG4gICAgaWYodHlwZW9mIHNwZWNzID09IFwib2JqZWN0XCIpe1xuICAgICAgb3V0cHV0LmZuID0gc3BlY3Nbc3BlY3MubGVuZ3RoLTFdO1xuICAgICAgb3V0cHV0LmFyZ3MgPSB0aGlzLl9fZ2V0UGFyYW1zKHNwZWNzLnNsaWNlKDAsIHNwZWNzLmxlbmd0aC0xKSwgdGhpcy52YXJpYWJsZXMpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5mbiA9IHNwZWNzO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgaW5qZWN0KHZhck5hbWUsIHZhclZhbHVlKXtcbiAgICB0aGlzLnZhcmlhYmxlc1t2YXJOYW1lXSA9IHZhclZhbHVlO1xuXG4gIH1cbn1cblxuY2xhc3MgSW50ZWxsaWdlbmNlTW9kdWxlIGV4dGVuZHMgSW5qZWN0b3JNb2R1bGUge1xuICBzY29wZTogc3RyaW5nO1xuICBydWxlczoge3N0cmluZz86IGFueX07XG4gIG1lc3NhZ2VzOiBhbnlbXTtcbiAgbW9kZTogSW50ZWxsaWdlbmNlTW9kdWxlTW9kZTtcbiAgY2FuQ29udGludWU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Ioc2NvcGUpe1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgIHRoaXMucnVsZXMgPSB7fTtcbiAgICB0aGlzLmluamVjdChcIkludGVsbGlnZW5jZU1vZHVsZVwiLCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0TWVzc2FnZXMoKTtcbiAgfVxuICBldmFsdWF0ZVJ1bGVzKCl7XG4gICAgdGhpcy5yZXNldE1lc3NhZ2VzKCk7XG4gICAgICB2YXIgcnVsZXMgPSBPYmplY3Qua2V5cyh0aGlzLnJ1bGVzKTtcbiAgICAgIGZvcih2YXIgcnVsZSAgb2YgcnVsZXMpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5ldmFsdWF0ZVJ1bGUodGhpcy5ydWxlc1tydWxlXSk7XG4gICAgICAgIHZhciBwcm9jZWVkID0gcmVzdWx0Lmhhc093blByb3BlcnR5KFwid2hlblwiKSA/IHJlc3VsdC53aGVuLmFwcGx5KG51bGwpIDogZmFsc2U7XG5cbiAgICAgICAgICBpZih0aGlzLm1vZGU9PSBJbnRlbGxpZ2VuY2VNb2R1bGVNb2RlLlNXSVRDSEJPQVJEKXtcbiAgICAgICAgICAgIHJlc3VsdC5hY3RpdmUgPSBwcm9jZWVkO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKHJlc3VsdCk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYocHJvY2VlZCl7XG4gICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuXG4gICAgICB9XG4gICAgICBpZih0aGlzLm1vZGUgPT0gSW50ZWxsaWdlbmNlTW9kdWxlTW9kZS5TV0lUQ0hCT0FSRCl7XG4gICAgICAgIHRoaXMubWVzc2FnZXMuc29ydChmdW5jdGlvbihhLGIpe1xuICAgICAgICAgIGlmKGEuYWN0aXZlKSByZXR1cm4gLTE7XG4gICAgICAgICAgaWYoIWEuYWN0aXZlKSByZXR1cm4gMTtcblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgIH1cbiAgfVxuICBldmFsdWF0ZVJ1bGUocnVsZSl7XG4gICAgdmFyIHJlc3VsdCwgZnVuYztcbiAgICBpZih0eXBlb2YgcnVsZSA9PT0gXCJvYmplY3RcIil7XG4gICAgICBsZXQgaW5qZWN0b3IgPSB0aGlzLl9fZ2V0SW5qZWN0b3IocnVsZSk7XG4gICAgICByZXN1bHQgPSBpbmplY3Rvci5mbi5hcHBseShudWxsLCBpbmplY3Rvci5hcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gcnVsZSgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHJlc2V0TWVzc2FnZXMoKXtcbiAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgdGhpcy5jYW5Db250aW51ZSA9IHRydWU7XG4gIH1cbiAgcmVnaXN0ZXIoaWQsIHJ1bGUpOkludGVsbGlnZW5jZU1vZHVsZSB7XG4gICAgdGhpcy5ydWxlc1tpZF0gPSBydWxlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmNsYXNzIEludGVsbGlnZW5jZUVuZ2luZSB7XG4gIHNjb3BlczogSW50ZWxsaWdlbmNlTW9kdWxlW107XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5zY29wZXMgPSBbXTtcbiAgfVxuICBfX2xvY2F0ZVNjb3BlKHNjb3BlLCBtb2RlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zY29wZXMuZmlsdGVyKGZ1bmN0aW9uKG9iajpJbnRlbGxpZ2VuY2VNb2R1bGUpe1xuICAgICAgICByZXR1cm4gb2JqLnNjb3BlID09IHNjb3BlO1xuICAgICAgIH0pO1xuXG4gICAgICBpZihyZXN1bHQubGVuZ3RoID09IDApe1xuICAgICAgICBsZXQgYSA9IG5ldyBJbnRlbGxpZ2VuY2VNb2R1bGUoc2NvcGUpO1xuICAgICAgICBhLm1vZGUgPSBtb2RlO1xuICAgICAgICBsZXQgYiA9IHRoaXMuc2NvcGVzLnB1c2goYSk7XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdFswXTtcbiAgICAgIH1cbiAgICB9XG4gIG1vZHVsZShzY29wZSwgbW9kZT1JbnRlbGxpZ2VuY2VNb2R1bGVNb2RlLk5PUk1BTCl7XG4gICAgbGV0IG1vZHVsZSA9IHRoaXMuX19sb2NhdGVTY29wZShzY29wZSwgbW9kZSk7XG4gICAgcmV0dXJuIG1vZHVsZTtcbiAgfVxufVxuXG52YXIgRGVhclN1YmplY3RzO1xuKGZ1bmN0aW9uIChFTUxNYWtlcikge1xuICAgIERlYXJTdWJqZWN0cy5pbnRlbGxpZ2VuY2UgPSAgbmV3IEludGVsbGlnZW5jZUVuZ2luZSgpO1xufSkoRGVhclN1YmplY3RzIHx8IChEZWFyU3ViamVjdHMgPSB7fSkpO1xuIl19

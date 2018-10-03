
enum IntelligenceModuleMode {
  NORMAL=0,
  SWITCHBOARD
}

class InjectorModule {
  // scope: any[];
  variables: {string?:any};
  constructor(){
    this.variables = {};
  }
  __getParams(keys, injectables){
    var args = keys.map((key:string)=>{
      return injectables[key]
    });
    //console.log(keys,args);
    return args;
  }
  __getInjector(specs){ //format is ["", fn(a)] or fn(){}
    var output = { fn: function(){}, args: [] };
    if(typeof specs == "object"){
      output.fn = specs[specs.length-1];
      output.args = this.__getParams(specs.slice(0, specs.length-1), this.variables);

    } else {
      output.fn = specs;
    }
    return output;
  }

  inject(varName, varValue){
    this.variables[varName] = varValue;

  }
}

class IntelligenceModule extends InjectorModule {
  scope: string;
  rules: {string?: any};
  messages: any[];
  mode: IntelligenceModuleMode;
  canContinue: boolean;

  constructor(scope){
    super();
    this.scope = scope;
    this.rules = {};
    this.inject("IntelligenceModule", this);
    this.resetMessages();
  }
  evaluateRules(){
    this.resetMessages();
      var rules = Object.keys(this.rules);
      for(var rule  of rules){
        var result = this.evaluateRule(this.rules[rule]);
        var proceed = result.hasOwnProperty("when") ? result.when.apply(null) : false;

          if(this.mode== IntelligenceModuleMode.SWITCHBOARD){
            result.active = proceed;
            this.messages.push(result);

          } else {
            if(proceed){
              this.messages.push(result);
            }
          }


      }
      if(this.mode == IntelligenceModuleMode.SWITCHBOARD){
        this.messages.sort(function(a,b){
          if(a.active) return -1;
          if(!a.active) return 1;

        });
      } else {

      }
  }
  evaluateRule(rule){
    var result, func;
    if(typeof rule === "object"){
      let injector = this.__getInjector(rule);
      result = injector.fn.apply(null, injector.args);
    } else {
      result = rule();
    }
    return result;
  }
  resetMessages(){
    this.messages = [];
    this.canContinue = true;
  }
  register(id, rule):IntelligenceModule {
    this.rules[id] = rule;
    return this;
  }
}

class IntelligenceEngine {
  scopes: IntelligenceModule[];
  constructor(){
    this.scopes = [];
  }
  __locateScope(scope, mode) {
      var result = this.scopes.filter(function(obj:IntelligenceModule){
        return obj.scope == scope;
       });

      if(result.length == 0){
        let a = new IntelligenceModule(scope);
        a.mode = mode;
        let b = this.scopes.push(a);
        return a;
      } else {
        return result[0];
      }
    }
  module(scope, mode=IntelligenceModuleMode.NORMAL){
    let module = this.__locateScope(scope, mode);
    return module;
  }
}

var DearSubjects;
(function (EMLMaker) {
    DearSubjects.intelligence =  new IntelligenceEngine();
})(DearSubjects || (DearSubjects = {}));

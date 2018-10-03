angular.module("SubjectWriter").config(
  ["$routeProvider",'$locationProvider', function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    //$locationProvider.html5Mode(true);
  $routeProvider.when("/main", {
    template:`
      <div class="ui container" ng-show="!DearSubjects">
        <h1 align="center">Drag in your source data.</h1>
        </div>

      <div class="ui container" ng-if="DearSubjects">
        <h1>Create the perfect subject line</h1>

        <subject-line-box></subject-line-box>

        <div class="ui stackable grid" style="margin-top:0">
          <div class="eight wide column">

          <h2 class="ui small header">Intelligence alerts</h2>
          <div ng-show="SLIntelligence.messages.length==0">
            No alerts at this time.
            </div>
            <div ng-if="DearSubjects"
            class="ui message"
            ng-repeat="message in SLIntelligence.messages track by $index">
              <h4>{{message.title}}</h4>
              <div>{{message.description}}</div>
              </div>
            </div>
          <div class="eight wide column">
          <h2  class="ui small header">Best practices</h2>

          <div style="margin:-.5em -.5em 0 -.5em"><div ng-repeat="item in DearSubjects.bestPractices.messages" class="sl card-container">
            <a href="#" class="sl card" ng-class="{active: item.active}">
            {{item.title}}
            </a>
            </div>
            </div>

            <br>
              <div class="clear"><a href="#">More resources for effective subject lines <i class="external icon"></i></a></div>
            </div>

          </div>
      <div>

      <h2 ng-show="DearSubjects.resultSet.length>0">Past performance data</h2>

      <div  ng-show="DearSubjects.resultSet.length>0 && acknowldeged">

      <div ng-show="refineQuery">
        <span class="ui label"
          ng-click="DearSubjects.toggleOverriddenWord(word)"
          ng-repeat="word in DearSubjects.subjectLineParts track by $index" ng-class="{purple: !DearSubjects.isStopWord(word)}">{{word}}</span>
        </div>


      <div class="ui icon top left pointing dropdown button" ui-dropdown>
        <i class="cog icon"></i>
        <div class="menu">
          <div class="header">Query</div>
          <div class="item" ng-click="refineQuery=true">Refine ...</div>
          <div class="header">Results</div>
          <div class="item">
            <i class="dropdown icon"></i>
            <span class="text">Sort by</span>
            <div class="menu">
              <div class="item" ng-click="DearSubjects.sortResultsBy('uniqueOpenRate')">Unique Open Rate</div>
              <div class="item" ng-click="DearSubjects.sortResultsBy('uniqueOpens')">Unique Opens</div>
              <div class="item" ng-click="DearSubjects.sortResultsBy('delivered')">Total Delivered</div>
              <div class="item" ng-click="DearSubjects.sortResultsBy('relationMean')">Relation to Avg Open Rate</div>
              <div class="item" ng-click="DearSubjects.sortResultsBy('relationMedian')">Relation to Median Open Rate</div>
              <div class="item" ng-click="DearSubjects.sortResultsBy('similarity')">Match %</div>
            </div>
          </div>
          <div class="item">
            <i class="dropdown icon"></i>
            <span class="text">Number of results</span>
            <div class="menu">
              <div class="item" ng-click="DearSubjects.maxResults=10;DearSubjects.initSearch()">10 <i class="check icon" ng-if="DearSubjects.maxResults==10"></i></div>
              <div class="item" ng-click="DearSubjects.maxResults=25;DearSubjects.initSearch()">25 <i class="check icon" ng-if="DearSubjects.maxResults==25"></i></div>
              <div class="item" ng-click="DearSubjects.maxResults=50;DearSubjects.initSearch()">50 <i class="check icon" ng-if="DearSubjects.maxResults==50"></i></div>
            </div>
          </div>
        </div>
      </div>


      </div>




        <div ng-show="DearSubjects.resultSet.length==0">There were no results</div>

        <div class="ui purple message" ng-show="DearSubjects.resultSet.length>0 && !acknowldeged">
          <i class="close icon" ng-click="DearSubjects.resultSet=[]"></i>
          <div class="header">
            Important information about this data
          </div>
          <p>While review this historical data, keep in mind that there are many factors that influence open rates, particularly:</p>
          <ul class="list">
            <li>List segmentation and target audience.</li>
            <li>Time context of email send.</li>
            <li>Whether or not the email was expected by the recipient.</li>
            <li>Subject line and preheader text.</li>
          </ul>
          <p>Although, this data will give you a picture of subject lines as they relate to the open rates,
          this data does not provide the full context regarding why some emails performed better than others.</p>
          <button class="ui purple button" ng-click="acknowldeged=true">Acknowledge</button>
          <button class="ui basic purple button" ng-click="acknowldeged=true">Learn more</button>
        </div>

        <table class="ui table" ng-show="DearSubjects.resultSet.length>0 && acknowldeged">
        <thead><tr>
          <th ng-repeat="item in DearSubjects.dataSet.headings track by $index">{{item}}</th>
          <th >Relation to Avg Open Rate</th>
          <th >Relation to Median Open Rate</th>
          </tr></thead>

      <tbody>  <tr ng-repeat="item in DearSubjects.resultSet track by $index" ng-class="{positive: item.exactMatch}">
          <td ><span ng-if="item.exactMatch" ui-popup data-title="Exact match" data-content="This is an exact match"><i class="green check icon"></i></span><span ng-bind-html="item.formattedSubjectLine"></span></td>
          <td ng-class="{error:item.delivered<50}"><span ui-popup data-title="Low delivery" data-content="This item has low delivered rate so it is possible that the open rate is not signifficant" ng-if="item.delivered<50"><i  class="attention icon" ></i></span>{{item.delivered}}</td>
          <td>{{item.uniqueOpens}}</td>
          <td ng-class="{error:item.uniqueOpenRate==0&& item.uniqueOpens>0}"><span ui-popup data-title="Delivery data missing" data-content="The delivery data is missing, but there is open data available so the open rate could not be calculated." ng-if="item.uniqueOpenRate==0&& item.uniqueOpens>0"><i class="attention icon"></i></span>{{item.uniqueOpenRate}}%</td>
          <td>{{item.relationMean}}</td>
          <td>{{item.relationMedian}}</td>

          </tr></tbody></table>


        <div style="height:70px;"></div>
        <div class="ui inverted purple bottom fixed menu">
          <div class="ui container">
          <div class="item" ng-show="DearSubjectsData.data.length>0">data set size: {{DearSubjectsData.data.length}}</div>
          <div class="item" ng-show="DearSubjects.avgOpenRate">Avg Unique Open Rate: {{DearSubjects.avgOpenRate}}%</div>
          <div class="item" ng-show="DearSubjects.medOpenRate">Median Unique Open Rate: {{DearSubjects.medOpenRate}}%</div>
          </div>
          </div>
      </div>`
  }).otherwise("/main");
  return $routeProvider;
}]);

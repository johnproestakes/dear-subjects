DearSubjects.intelligence.module("BestPractices")
    .register("bp-creating-urgency", ["DearSubjectsEngine", function (DearSubjectsEngine) {
        return {
            type: 0,
            severity: 0,
            title: "Creating a sense of urgency",
            // description: "Although, the common thought is, subject lines should be as long as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
            resource: "",
            canContinue: true,
            when: function () {
                return /limited|only|today|hurry|act\snow|rush|last\schance|deadline|final|never\sagain|clearance|delay|now|never|miss\sout|expires/gi.test(DearSubjectsEngine.subjectLine);
            }
        };
    }]);

DearSubjects.intelligence.module("BestPractices")
    .register("bp-personalization", ["DearSubjectsEngine", function (DearSubjectsEngine) {
        return {
            type: 0,
            severity: 0,
            title: "Using Personalization in Subject Lines",
            // description: "Although, the common thought is, subject lines should be as long as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
            resource: "",
            canContinue: true,
            when: function () {
                return /you/gi.test(DearSubjectsEngine.subjectLine);
            }
        };
    }]);

DearSubjects.intelligence.module("BestPractices")
    .register("bp-promoting-content", ["DearSubjectsEngine", function (DearSubjectsEngine) {
        return {
            type: 0,
            severity: 0,
            title: "Subject lines for content promotion",
            // description: "Although, the common thought is, subject lines should be as long as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
            resource: "",
            canContinue: true,
            when: function () {
                return /download|e\-?book|white\spaper|article|blog|podcast|read|learn|find/gi.test(DearSubjectsEngine.subjectLine);
            }
        };
    }]);

DearSubjects.intelligence.module("BestPractices")
    .register("bp-requesting-meetings", ["DearSubjectsEngine", function (DearSubjectsEngine) {
        return {
            type: 0,
            severity: 0,
            title: "Subject lines for requesting meetings with clients",
            // description: "Although, the common thought is, subject lines should be as long as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
            resource: "",
            canContinue: true,
            when: function () {
                return /meet|join|contact/gi.test(DearSubjectsEngine.subjectLine);
            }
        };
    }]);

DearSubjects.intelligence.module("BestPractices")
    .register("bp-subject-lines-events", ["DearSubjectsEngine", function (DearSubjectsEngine) {
        return {
            type: 0,
            severity: 0,
            title: "Subject lines for events",
            // description: "g as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
            resource: "",
            canContinue: true,
            when: function () {
                return /visit|booth|vip|event|webinar|webcast|tradeshow|forum|seminar/gi.test(DearSubjectsEngine.subjectLine);
            }
        };
    }]);

DearSubjects.intelligence.module("Subject").register("sl-letter-casing", ["DearSubjectsEngine", function (DearSubjectsEngine) {
        //convert to title case? and then do leveshein?
        //convert to all caps and then do leveshein?
        function isSentenceCase(text) {
            var a = text.replace(/[^\w]/gi, "");
            var caps = 0, lcase = 0;
            for (var i = 0; i < a.length; i++) {
                if (/[A-Z]/.test(a[i]))
                    caps++;
                if (/[a-z]/.test(a[i]))
                    lcase++;
            }
            return caps / a.length;
        }
        return {
            type: 0,
            severity: 0,
            title: "Subject lines should be in sentence case.",
            description: "It seems like you some words that are all caps or a mix of sentence and all caps.",
            resource: "",
            canContinue: true,
            when: function () {
                return isSentenceCase(DearSubjectsEngine.subjectLine) > .20;
            }
        };
    }]);

DearSubjects.intelligence.module("Subject").register("sl-might-be-too-long", ["DearSubjectsEngine", function (DearSubjectsEngine) {
        return {
            type: 0,
            severity: 0,
            title: "Your subject line might be too long. (" + DearSubjectsEngine.subjectLine.length + ")",
            description: "Although, the common thought is, subject lines should be as long as they need to be, subject lines that are under 50 characters tend to have higher open rates. Additionally, email clients generally can only display the first 50 to 60 characters of a subject line.",
            resource: "",
            canContinue: true,
            when: function () {
                return DearSubjectsEngine.subjectLine.length > 60;
            }
        };
    }]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJwLWNyZWF0aW5nLXVyZ2VuY3kudHMiLCJicC1wZXJzb25hbGl6YXRpb24udHMiLCJicC1wcm9tb3RpbmctY29udGVudC50cyIsImJwLXJlcXVlc3RpbmctbWVldGluZ3MudHMiLCJicC1zdWJqZWN0LWxpbmVzLWV2ZW50cy50cyIsInNsLWxldHRlci1jYXNpbmcudHMiLCJzbC1taWdodC1iZS10b28tbG9uZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7S0FDaEQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUMsb0JBQW9CLEVBQUUsVUFBUyxrQkFBa0I7UUFFakYsTUFBTSxDQUFDO1lBQ0wsSUFBSSxFQUFDLENBQUM7WUFDTixRQUFRLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSw2QkFBNkI7WUFDcEMsMFJBQTBSO1lBQzFSLFFBQVEsRUFBRSxFQUFFO1lBQ1osV0FBVyxFQUFFLElBQUk7WUFDakIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sQ0FBQywrSEFBK0gsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUssQ0FBQztTQUVGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDOztBQ2ZKLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztLQUNoRCxRQUFRLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFTLGtCQUFrQjtRQUVoRixNQUFNLENBQUM7WUFDTCxJQUFJLEVBQUMsQ0FBQztZQUNOLFFBQVEsRUFBRSxDQUFDO1lBQ1gsS0FBSyxFQUFFLHdDQUF3QztZQUMvQywwUkFBMFI7WUFDMVIsUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUUsSUFBSTtZQUNqQixJQUFJLEVBQUU7Z0JBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEQsQ0FBQztTQUVGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDOztBQ2ZKLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztLQUNoRCxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFTLGtCQUFrQjtRQUVsRixNQUFNLENBQUM7WUFDTCxJQUFJLEVBQUMsQ0FBQztZQUNOLFFBQVEsRUFBRSxDQUFDO1lBQ1gsS0FBSyxFQUFFLHFDQUFxQztZQUM1QywwUkFBMFI7WUFDMVIsUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUUsSUFBSTtZQUNqQixJQUFJLEVBQUU7Z0JBQ0osTUFBTSxDQUFDLHVFQUF1RSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0SCxDQUFDO1NBRUYsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FDZkosWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0tBQ2hELFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFVBQVMsa0JBQWtCO1FBRXBGLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBQyxDQUFDO1lBQ04sUUFBUSxFQUFFLENBQUM7WUFDWCxLQUFLLEVBQUUsb0RBQW9EO1lBQzNELDBSQUEwUjtZQUMxUixRQUFRLEVBQUUsRUFBRTtZQUNaLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLElBQUksRUFBRTtnQkFDSixNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7U0FFRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUNmSixZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7S0FDaEQsUUFBUSxDQUFDLHlCQUF5QixFQUFFLENBQUMsb0JBQW9CLEVBQUUsVUFBUyxrQkFBa0I7UUFRckYsTUFBTSxDQUFDO1lBQ0wsSUFBSSxFQUFDLENBQUM7WUFDTixRQUFRLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsMk5BQTJOO1lBQzNOLFFBQVEsRUFBRSxFQUFFO1lBQ1osV0FBVyxFQUFFLElBQUk7WUFDakIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sQ0FBQyxpRUFBaUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEgsQ0FBQztTQUVGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDOztBQ3JCSixZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFTLGtCQUFrQjtRQUN6SCwrQ0FBK0M7UUFDL0MsNENBQTRDO1FBRzlDLHdCQUF3QixJQUFJO1lBQzFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLElBQUksSUFBSSxHQUFDLENBQUMsRUFBRSxLQUFLLEdBQUMsQ0FBQyxDQUFDO1lBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO2dCQUMzQixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksRUFBRSxDQUFDO2dCQUM5QixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pDLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUlDLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBQyxDQUFDO1lBQ04sUUFBUSxFQUFFLENBQUM7WUFDWCxLQUFLLEVBQUUsMkNBQTJDO1lBQ2xELFdBQVcsRUFBRSxtRkFBbUY7WUFDaEcsUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUUsSUFBSTtZQUNqQixJQUFJLEVBQUU7Z0JBQ0osTUFBTSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsR0FBQyxHQUFHLENBQUM7WUFDNUQsQ0FBQztTQUVGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDOztBQzdCSixZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFTLGtCQUFrQjtRQUU3SCxNQUFNLENBQUM7WUFDTCxJQUFJLEVBQUMsQ0FBQztZQUNOLFFBQVEsRUFBRSxDQUFDO1lBQ1gsS0FBSyxFQUFFLHdDQUF3QyxHQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUMsR0FBRztZQUN6RixXQUFXLEVBQUUseVFBQXlRO1lBQ3RSLFFBQVEsRUFBRSxFQUFFO1lBQ1osV0FBVyxFQUFFLElBQUk7WUFDakIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQztZQUNsRCxDQUFDO1NBRUYsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiRGVhclN1YmplY3RzLWludGVsbGlnZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIkRlYXJTdWJqZWN0cy5pbnRlbGxpZ2VuY2UubW9kdWxlKFwiQmVzdFByYWN0aWNlc1wiKVxuLnJlZ2lzdGVyKFwiYnAtY3JlYXRpbmctdXJnZW5jeVwiLCBbXCJEZWFyU3ViamVjdHNFbmdpbmVcIiwgZnVuY3Rpb24oRGVhclN1YmplY3RzRW5naW5lKXtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6MCxcbiAgICBzZXZlcml0eTogMCxcbiAgICB0aXRsZTogXCJDcmVhdGluZyBhIHNlbnNlIG9mIHVyZ2VuY3lcIixcbiAgICAvLyBkZXNjcmlwdGlvbjogXCJBbHRob3VnaCwgdGhlIGNvbW1vbiB0aG91Z2h0IGlzLCBzdWJqZWN0IGxpbmVzIHNob3VsZCBiZSBhcyBsb25nIGFzIHRoZXkgbmVlZCB0byBiZSwgc3ViamVjdCBsaW5lcyB0aGF0IGFyZSB1bmRlciA1MCBjaGFyYWN0ZXJzIHRlbmQgdG8gaGF2ZSBoaWdoZXIgb3BlbiByYXRlcy4gQWRkaXRpb25hbGx5LCBlbWFpbCBjbGllbnRzIGdlbmVyYWxseSBjYW4gb25seSBkaXNwbGF5IHRoZSBmaXJzdCA1MCB0byA2MCBjaGFyYWN0ZXJzIG9mIGEgc3ViamVjdCBsaW5lLlwiLFxuICAgIHJlc291cmNlOiBcIlwiLFxuICAgIGNhbkNvbnRpbnVlOiB0cnVlLFxuICAgIHdoZW46IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gL2xpbWl0ZWR8b25seXx0b2RheXxodXJyeXxhY3RcXHNub3d8cnVzaHxsYXN0XFxzY2hhbmNlfGRlYWRsaW5lfGZpbmFsfG5ldmVyXFxzYWdhaW58Y2xlYXJhbmNlfGRlbGF5fG5vd3xuZXZlcnxtaXNzXFxzb3V0fGV4cGlyZXMvZ2kudGVzdChEZWFyU3ViamVjdHNFbmdpbmUuc3ViamVjdExpbmUpO1xuICAgIH1cblxuICB9O1xufV0pO1xuIiwiRGVhclN1YmplY3RzLmludGVsbGlnZW5jZS5tb2R1bGUoXCJCZXN0UHJhY3RpY2VzXCIpXG4ucmVnaXN0ZXIoXCJicC1wZXJzb25hbGl6YXRpb25cIiwgW1wiRGVhclN1YmplY3RzRW5naW5lXCIsIGZ1bmN0aW9uKERlYXJTdWJqZWN0c0VuZ2luZSl7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOjAsXG4gICAgc2V2ZXJpdHk6IDAsXG4gICAgdGl0bGU6IFwiVXNpbmcgUGVyc29uYWxpemF0aW9uIGluIFN1YmplY3QgTGluZXNcIixcbiAgICAvLyBkZXNjcmlwdGlvbjogXCJBbHRob3VnaCwgdGhlIGNvbW1vbiB0aG91Z2h0IGlzLCBzdWJqZWN0IGxpbmVzIHNob3VsZCBiZSBhcyBsb25nIGFzIHRoZXkgbmVlZCB0byBiZSwgc3ViamVjdCBsaW5lcyB0aGF0IGFyZSB1bmRlciA1MCBjaGFyYWN0ZXJzIHRlbmQgdG8gaGF2ZSBoaWdoZXIgb3BlbiByYXRlcy4gQWRkaXRpb25hbGx5LCBlbWFpbCBjbGllbnRzIGdlbmVyYWxseSBjYW4gb25seSBkaXNwbGF5IHRoZSBmaXJzdCA1MCB0byA2MCBjaGFyYWN0ZXJzIG9mIGEgc3ViamVjdCBsaW5lLlwiLFxuICAgIHJlc291cmNlOiBcIlwiLFxuICAgIGNhbkNvbnRpbnVlOiB0cnVlLFxuICAgIHdoZW46IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gL3lvdS9naS50ZXN0KERlYXJTdWJqZWN0c0VuZ2luZS5zdWJqZWN0TGluZSk7XG4gICAgfVxuXG4gIH07XG59XSk7XG4iLCJEZWFyU3ViamVjdHMuaW50ZWxsaWdlbmNlLm1vZHVsZShcIkJlc3RQcmFjdGljZXNcIilcbi5yZWdpc3RlcihcImJwLXByb21vdGluZy1jb250ZW50XCIsIFtcIkRlYXJTdWJqZWN0c0VuZ2luZVwiLCBmdW5jdGlvbihEZWFyU3ViamVjdHNFbmdpbmUpe1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTowLFxuICAgIHNldmVyaXR5OiAwLFxuICAgIHRpdGxlOiBcIlN1YmplY3QgbGluZXMgZm9yIGNvbnRlbnQgcHJvbW90aW9uXCIsXG4gICAgLy8gZGVzY3JpcHRpb246IFwiQWx0aG91Z2gsIHRoZSBjb21tb24gdGhvdWdodCBpcywgc3ViamVjdCBsaW5lcyBzaG91bGQgYmUgYXMgbG9uZyBhcyB0aGV5IG5lZWQgdG8gYmUsIHN1YmplY3QgbGluZXMgdGhhdCBhcmUgdW5kZXIgNTAgY2hhcmFjdGVycyB0ZW5kIHRvIGhhdmUgaGlnaGVyIG9wZW4gcmF0ZXMuIEFkZGl0aW9uYWxseSwgZW1haWwgY2xpZW50cyBnZW5lcmFsbHkgY2FuIG9ubHkgZGlzcGxheSB0aGUgZmlyc3QgNTAgdG8gNjAgY2hhcmFjdGVycyBvZiBhIHN1YmplY3QgbGluZS5cIixcbiAgICByZXNvdXJjZTogXCJcIixcbiAgICBjYW5Db250aW51ZTogdHJ1ZSxcbiAgICB3aGVuOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIC9kb3dubG9hZHxlXFwtP2Jvb2t8d2hpdGVcXHNwYXBlcnxhcnRpY2xlfGJsb2d8cG9kY2FzdHxyZWFkfGxlYXJufGZpbmQvZ2kudGVzdChEZWFyU3ViamVjdHNFbmdpbmUuc3ViamVjdExpbmUpO1xuICAgIH1cblxuICB9O1xufV0pO1xuIiwiRGVhclN1YmplY3RzLmludGVsbGlnZW5jZS5tb2R1bGUoXCJCZXN0UHJhY3RpY2VzXCIpXG4ucmVnaXN0ZXIoXCJicC1yZXF1ZXN0aW5nLW1lZXRpbmdzXCIsIFtcIkRlYXJTdWJqZWN0c0VuZ2luZVwiLCBmdW5jdGlvbihEZWFyU3ViamVjdHNFbmdpbmUpe1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTowLFxuICAgIHNldmVyaXR5OiAwLFxuICAgIHRpdGxlOiBcIlN1YmplY3QgbGluZXMgZm9yIHJlcXVlc3RpbmcgbWVldGluZ3Mgd2l0aCBjbGllbnRzXCIsXG4gICAgLy8gZGVzY3JpcHRpb246IFwiQWx0aG91Z2gsIHRoZSBjb21tb24gdGhvdWdodCBpcywgc3ViamVjdCBsaW5lcyBzaG91bGQgYmUgYXMgbG9uZyBhcyB0aGV5IG5lZWQgdG8gYmUsIHN1YmplY3QgbGluZXMgdGhhdCBhcmUgdW5kZXIgNTAgY2hhcmFjdGVycyB0ZW5kIHRvIGhhdmUgaGlnaGVyIG9wZW4gcmF0ZXMuIEFkZGl0aW9uYWxseSwgZW1haWwgY2xpZW50cyBnZW5lcmFsbHkgY2FuIG9ubHkgZGlzcGxheSB0aGUgZmlyc3QgNTAgdG8gNjAgY2hhcmFjdGVycyBvZiBhIHN1YmplY3QgbGluZS5cIixcbiAgICByZXNvdXJjZTogXCJcIixcbiAgICBjYW5Db250aW51ZTogdHJ1ZSxcbiAgICB3aGVuOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIC9tZWV0fGpvaW58Y29udGFjdC9naS50ZXN0KERlYXJTdWJqZWN0c0VuZ2luZS5zdWJqZWN0TGluZSk7XG4gICAgfVxuXG4gIH07XG59XSk7XG4iLCJEZWFyU3ViamVjdHMuaW50ZWxsaWdlbmNlLm1vZHVsZShcIkJlc3RQcmFjdGljZXNcIilcbi5yZWdpc3RlcihcImJwLXN1YmplY3QtbGluZXMtZXZlbnRzXCIsIFtcIkRlYXJTdWJqZWN0c0VuZ2luZVwiLCBmdW5jdGlvbihEZWFyU3ViamVjdHNFbmdpbmUpe1xuXG5cblxuXG5cblxuXG4gIHJldHVybiB7XG4gICAgdHlwZTowLFxuICAgIHNldmVyaXR5OiAwLFxuICAgIHRpdGxlOiBcIlN1YmplY3QgbGluZXMgZm9yIGV2ZW50c1wiLFxuICAgIC8vIGRlc2NyaXB0aW9uOiBcImcgYXMgdGhleSBuZWVkIHRvIGJlLCBzdWJqZWN0IGxpbmVzIHRoYXQgYXJlIHVuZGVyIDUwIGNoYXJhY3RlcnMgdGVuZCB0byBoYXZlIGhpZ2hlciBvcGVuIHJhdGVzLiBBZGRpdGlvbmFsbHksIGVtYWlsIGNsaWVudHMgZ2VuZXJhbGx5IGNhbiBvbmx5IGRpc3BsYXkgdGhlIGZpcnN0IDUwIHRvIDYwIGNoYXJhY3RlcnMgb2YgYSBzdWJqZWN0IGxpbmUuXCIsXG4gICAgcmVzb3VyY2U6IFwiXCIsXG4gICAgY2FuQ29udGludWU6IHRydWUsXG4gICAgd2hlbjogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAvdmlzaXR8Ym9vdGh8dmlwfGV2ZW50fHdlYmluYXJ8d2ViY2FzdHx0cmFkZXNob3d8Zm9ydW18c2VtaW5hci9naS50ZXN0KERlYXJTdWJqZWN0c0VuZ2luZS5zdWJqZWN0TGluZSk7XG4gICAgfVxuXG4gIH07XG59XSk7XG4iLCJEZWFyU3ViamVjdHMuaW50ZWxsaWdlbmNlLm1vZHVsZShcIlN1YmplY3RcIikucmVnaXN0ZXIoXCJzbC1sZXR0ZXItY2FzaW5nXCIsIFtcIkRlYXJTdWJqZWN0c0VuZ2luZVwiLCBmdW5jdGlvbihEZWFyU3ViamVjdHNFbmdpbmUpe1xuICAvL2NvbnZlcnQgdG8gdGl0bGUgY2FzZT8gYW5kIHRoZW4gZG8gbGV2ZXNoZWluP1xuICAvL2NvbnZlcnQgdG8gYWxsIGNhcHMgYW5kIHRoZW4gZG8gbGV2ZXNoZWluP1xuXG5cbmZ1bmN0aW9uIGlzU2VudGVuY2VDYXNlKHRleHQpe1xuICBsZXQgYSA9IHRleHQucmVwbGFjZSgvW15cXHddL2dpLFwiXCIpO1xuICB2YXIgY2Fwcz0wLCBsY2FzZT0wO1xuICBmb3IgKHZhciBpPTA7aTxhLmxlbmd0aDtpKyspe1xuICAgIGlmKC9bQS1aXS8udGVzdChhW2ldKSkgY2FwcysrO1xuICAgIGlmKC9bYS16XS8udGVzdChhW2ldKSkgbGNhc2UrKztcbiAgfVxuICByZXR1cm4gY2Fwcy9hLmxlbmd0aDtcbn1cblxuXG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOjAsXG4gICAgc2V2ZXJpdHk6IDAsXG4gICAgdGl0bGU6IFwiU3ViamVjdCBsaW5lcyBzaG91bGQgYmUgaW4gc2VudGVuY2UgY2FzZS5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJJdCBzZWVtcyBsaWtlIHlvdSBzb21lIHdvcmRzIHRoYXQgYXJlIGFsbCBjYXBzIG9yIGEgbWl4IG9mIHNlbnRlbmNlIGFuZCBhbGwgY2Fwcy5cIixcbiAgICByZXNvdXJjZTogXCJcIixcbiAgICBjYW5Db250aW51ZTogdHJ1ZSxcbiAgICB3aGVuOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGlzU2VudGVuY2VDYXNlKERlYXJTdWJqZWN0c0VuZ2luZS5zdWJqZWN0TGluZSk+LjIwO1xuICAgIH1cblxuICB9O1xufV0pO1xuIiwiRGVhclN1YmplY3RzLmludGVsbGlnZW5jZS5tb2R1bGUoXCJTdWJqZWN0XCIpLnJlZ2lzdGVyKFwic2wtbWlnaHQtYmUtdG9vLWxvbmdcIiwgW1wiRGVhclN1YmplY3RzRW5naW5lXCIsIGZ1bmN0aW9uKERlYXJTdWJqZWN0c0VuZ2luZSl7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOjAsXG4gICAgc2V2ZXJpdHk6IDAsXG4gICAgdGl0bGU6IFwiWW91ciBzdWJqZWN0IGxpbmUgbWlnaHQgYmUgdG9vIGxvbmcuIChcIitEZWFyU3ViamVjdHNFbmdpbmUuc3ViamVjdExpbmUubGVuZ3RoK1wiKVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsdGhvdWdoLCB0aGUgY29tbW9uIHRob3VnaHQgaXMsIHN1YmplY3QgbGluZXMgc2hvdWxkIGJlIGFzIGxvbmcgYXMgdGhleSBuZWVkIHRvIGJlLCBzdWJqZWN0IGxpbmVzIHRoYXQgYXJlIHVuZGVyIDUwIGNoYXJhY3RlcnMgdGVuZCB0byBoYXZlIGhpZ2hlciBvcGVuIHJhdGVzLiBBZGRpdGlvbmFsbHksIGVtYWlsIGNsaWVudHMgZ2VuZXJhbGx5IGNhbiBvbmx5IGRpc3BsYXkgdGhlIGZpcnN0IDUwIHRvIDYwIGNoYXJhY3RlcnMgb2YgYSBzdWJqZWN0IGxpbmUuXCIsXG4gICAgcmVzb3VyY2U6IFwiXCIsXG4gICAgY2FuQ29udGludWU6IHRydWUsXG4gICAgd2hlbjogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBEZWFyU3ViamVjdHNFbmdpbmUuc3ViamVjdExpbmUubGVuZ3RoPjYwO1xuICAgIH1cblxuICB9O1xufV0pO1xuIl19

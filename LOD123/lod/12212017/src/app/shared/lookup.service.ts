import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { PalData } from '../components/pal/pal.model';
import { AppConfig } from '../app.config';

@Injectable()
export class LookupService {

  constructor(private http: Http, private appConfig: AppConfig) {}
  //private url="/rest/bc/proxy";
  //private apiUrl = 'https://dev-sagis-owcs.acuitys.com/rest/';
  readonly url: string = this.appConfig.getConfig('apiEndPoint');
  //readonly url: string = "https://dev-sagis-owcs.acuitys.com";//this.appConfig.getConfig('local');
  
  user: string = this.appConfig.getConfig('user');
  userName: string = this.appConfig.getConfig(this.user + 'UserId');
  password: string = this.appConfig.getConfig(this.user + 'Password');
  private headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 
                'Authorization': "Basic " + btoa(this.userName + ":" + this.password), 'Access-Control-Allow-Origin': '*'  });
  private options = new RequestOptions({ headers: this.headers });
  
  //For POC all these service directly returns the response to caller component
  // change the logic to use callback option -- this is todo item
  
      getReindexCategories(){
            var request={ "serverType":"IS",
                  "url":"wsc.getReindexCategories",
                  "requestMethod":"GET"
                  };
            let requestUrl = this.url + "wsc.getReindexCategories";
            return this.http.get(requestUrl, this.options);
            //return this.http.post(this.url,request);
            /*
            .then(function(response) {
            callbackFunc(response.data.ReindexCategories);
            });
            */
      } 
  
  getReindexReviewStatuses(){
      var request={ "serverType":"IS",
          "url":"/rest/OWCS_Common.restServices.claimsAdjudication.getReindexReviewStatuses",
          "requestMethod":"GET"
          };
      let requestUrl = this.url + "/rest/OWCS_Common.restServices.claimsAdjudication.getReindexReviewStatuses";
      return this.http.get(requestUrl, this.options);
    /*
    .then(function(response) {
        console.log("getReindexReviewStatuses response: " + response.data.ReindexReviewStatuses);
        callbackFunc(response.data);
    });
     */
  } 
  
  getCategoryAndSubjects(){
      var request={ "serverType":"IS",
          "url":"/rest/OWCS_Common.restServices.claimsAdjudication.getCategoryAndSubject",
          "requestMethod":"GET"
          };
      let requestUrl = this.url + "/rest/OWCS_Common.restServices.claimsAdjudication.getCategoryAndSubject";
      return this.http.get(requestUrl, this.options);
    /*
        .then(function(response) {
              callbackFunc(response.data); 
        });
   */
   }



  getSettlementTaskType(){
      var request={ "serverType":"IS",
          "url":"/rest/OWCS_Common.restServices.claimsAdjudication.getSettlementTaskType",
          "requestMethod":"GET"
          };
      
      let requestUrl = this.url + "/rest/OWCS_Common.restServices.claimsAdjudication.getSettlementTaskType";
      return this.http.get(requestUrl, this.options);
    /*
        .then(function(response) {
              callbackFunc(response.data);
        });
     */
  } 


  getPaymentRequiredValues(){
      var request={ "serverType":"IS",
          "url":"/rest/OWCS_Common.restServices.claimsAdjudication.getPaymentRequiredValues",
          "requestMethod":"GET"
          };
      let requestUrl = this.url + "/rest/OWCS_Common.restServices.claimsAdjudication.getPaymentRequiredValues";
      return this.http.get(requestUrl, this.options);

  }

  getPartOfBodyValues(){
      var request={ "serverType":"IS",
         "url":"/rest/OWCS_Common.wsp.getPartOfBody",
         "requestMethod":"GET"
         };
      let requestUrl = this.url + "/rest/OWCS_Common.wsp.getPartOfBody";
      return this.http.get(requestUrl, this.options);
 }
  
 getNatureOfInjuryValues(){
      var request={ "serverType":"IS",
         "url":"/rest/OWCS_Common.wsp.getNatureOfInjury",
         "requestMethod":"GET"
         };
      let requestUrl = this.url + "/rest/OWCS_Common.wsp.getNatureOfInjury";
      return this.http.get(requestUrl, this.options);
 }
  
 getInjuryTypeValues(){
      var request={ "serverType":"IS",
         "url":"/rest/OWCS_Common.wsp.getInjuryType",
         "requestMethod":"GET"
         };
      let requestUrl = this.url + "/rest/OWCS_Common.wsp.getInjuryType";
      return this.http.get(requestUrl, this.options);
 }

 getExtentOfInjuryValues(){
      var request={ "serverType":"IS",
         "url":"/rest/OWCS_Common.wsp.getExtentOfInjury",
         "requestMethod":"GET"
         };
      let requestUrl = this.url + "/rest/OWCS_Common.wsp.getExtentOfInjury";
      return this.http.get(requestUrl, this.options);
 }

 getCauseOfInjuryValues(){
    var request={ "serverType":"IS",
       "url":"/rest/OWCS_Common.wsp.getInjuryCauseType",
       "requestMethod":"GET"
       };
    let requestUrl = this.url + "/rest/OWCS_Common.wsp.getInjuryCauseType";
    return this.http.get(requestUrl, this.options);
}

 getCaseTypeValues(){
      var request={ "serverType":"IS",
         "url":"/rest/OWCS_Common.wsp.getCaseType",
         "requestMethod":"GET"
         };
      let requestUrl = this.url + "/rest/OWCS_Common.wsp.getCaseType";
      return this.http.get(requestUrl, this.options);
 }
  
  getDocumentClassValues(){
      var request={ "serverType":"IS",
         "url":"/rest/OWCS_Common.wsp.getDocClass",
         "requestMethod":"GET"
         };
      let requestUrl = this.url + "/rest/OWCS_Common.wsp.getDocClass";
      return this.http.get(requestUrl, this.options);
 }

 getStateAndCountryValues(){
      var request={ "serverType":"IS",
         "url":"/rest/OWCS_Common.wsp.getCountryAndStates",
         "requestMethod":"GET"
         };
      let requestUrl = this.url + "/rest/OWCS_Common.wsp.getCountryAndStates";
      return this.http.get(requestUrl, this.options);
 }


}

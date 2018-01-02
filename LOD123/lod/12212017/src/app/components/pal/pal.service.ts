import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { PalData } from './pal.model';
import { CaseSearch } from '../../model/caseSearch.model';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs';

@Injectable()
export class PalService {

  constructor(private http: Http, private appConfig: AppConfig) {}
  readonly url: string = this.appConfig.getConfig('apiEndPoint');//"https://dev-sagis-owcs.acuitys.com";//this.appConfig.getConfig('local');
  user: string = this.appConfig.getConfig('user');
  userName: string = this.appConfig.getConfig(this.user + 'UserId');
  password: string = this.appConfig.getConfig(this.user + 'Password');
  //readonly url="/rest/bc/proxy";
  private headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 
                    'Authorization': "Basic " + btoa(this.userName + ":" + this.password), 'Access-Control-Allow-Origin': '*' });
  private options = new RequestOptions({ headers: this.headers }); 

  
  //For POC all these service directly returns the response to caller component
  // change the logic to use callback option -- this is todo item
  getOPSPlanPalTask() {    
      let request={ "serverType":"IS",
              "url": "/rest/OWCS_PAL_UI.PalTasks.opsPlanPalTask",
              "requestMethod":"GET"
              };
      let requestUrl = this.url + "/rest/OWCS_PAL_UI.PalTasks.opsPlanPalTask";
      return this.http.get(requestUrl,this.options);
    }
  
  getOtherTasks(taskId: number){
      console.log("calling service getOPSPlanPalTask for taskId : " + taskId);
        var request={ "serverType":"IS",
              "url": this.url + "/rest/OWCS_PAL_UI.OtherTasks.getOtherTasks",
              "requestMethod":"GET"
              };
     let requestUrl = this.url + "/rest/OWCS_PAL_UI.OtherTasks.getOtherTasks";
     return this.http.get(requestUrl,this.options);
  }
  checkPotentialDuplicateDataEntry(ssn: number){
      console.log("calling service checkPotentialDuplicateDataEntry for ssn : " +ssn);
        var request={ "serverType":"IS",
              "url": this.url + "/rest/OWCS_LongShore.CentralCaseCreate.wsp.checkPotentialDuplicateDataEntry?ssn="+ssn,
              "requestMethod":"GET"
              };             
      let requestUrl = this.url + "/rest/OWCS_LongShore.CentralCaseCreate.wsp.checkPotentialDuplicateDataEntry?ssn="+ssn;
      return this.http.get(requestUrl,this.options);
  }

  searchCaseold(caseSearch: CaseSearch){
    console.log("calling service checkPotentialDuplicateDataEntry for ssn : " , caseSearch);
      var request={ "serverType":"IS",
            "url": this.url + "/rest/OWCS_LongShore.CentralCaseCreate.wsp.checkPotentialDuplicateDataEntry?ssn="+caseSearch.ssn+"&caseNumber="+caseSearch.caseId+"&dateOfInjury="+caseSearch.doi+"&lastName"+caseSearch.lastName,
            "requestMethod":"GET"
            };   
    let requestUrl = this.url + "/rest/OWCS_LongShore.CentralCaseCreate.wsp.checkPotentialDuplicateDataEntry?ssn="+caseSearch.ssn+"&caseNumber="+caseSearch.caseId+"&dateOfInjury="+caseSearch.doi+"&lastName"+caseSearch.lastName;      
    return this.http.get(requestUrl,this.options);
}
searchCase(caseSearch: CaseSearch){
  console.log("calling service caseSearch for ssn : " , caseSearch);

  console.log("test url: ", "/rest/OWCS_Common.wsp.searchCase?ssn="+caseSearch.ssn+"&caseNumber="+caseSearch.caseNumber+"&dateOfInjury="+caseSearch.doi+"&lastName="+caseSearch.lastName)
    var request={ "serverType":"IS",
          "url": this.url + "/rest/OWCS_Common.wsp.searchCase?ssn="+caseSearch.ssn+"&caseNumber="+caseSearch.caseNumber+"&dateOfInjury="+caseSearch.doi+"&lastName="+caseSearch.lastName,
          "requestMethod":"GET"
          };
  let requestUrl = this.url + "/rest/OWCS_Common.wsp.searchCase?ssn="+caseSearch.ssn+"&caseNumber="+caseSearch.caseNumber+"&dateOfInjury="+caseSearch.doi+"&lastName="+caseSearch.lastName;      
  return this.http.get(requestUrl,this.options);
}

fetchDocsByCaseID(caseId) {
    //var url="/rest/pub/opentask";
    //var url="/rest/bc/proxy";
    console.log("calling fetchDocsByCaseID framework caseId: " + caseId);
    var request={ "serverType":"IS",
              "url": this.url + "/rest/OWCS_Case.wsp.getCaseDocuments?CASE_NUMBER="+caseId,
              "requestMethod":"GET"
              };
    let requestUrl = this.url + "/rest/OWCS_Case.wsp.getCaseDocuments?CASE_NUMBER="+caseId;
    return this.http.get(requestUrl,this.options);
}

getCaseDetails(caseId) {
  console.log("calling getCaseDetails framework caseId: " + caseId);
  var request={ "serverType":"IS",
            "url": this.url + "/rest/OWCS_Case.wsp.getCaseDetails?CASE_NUMBER="+caseId,
            "requestMethod":"GET"
            };
  let requestUrl = this.url + "/rest/OWCS_Case.wsp.getCaseDetails?CASE_NUMBER="+caseId;
  return this.http.get(requestUrl,this.options);
}

lockBatchByDocID( documentID: string,  QueueType: string, all: string) {
  
    console.log("calling lockBatchByDocID framework documentID: " + documentID);
    console.log("calling lockBatchByDocID framework QueueType: " + QueueType);
    var request={ "serverType":"IS",
              "url": this.url + "/rest/OWCS_PAL_UI.wsp.lockBatch?docId="+documentID+"&queueType="+QueueType,
              "requestMethod":"GET"
              };
    let requestUrl = this.url + "/rest/OWCS_PAL_UI.wsp.lockBatch?docId="+documentID+"&queueType="+QueueType+"&all="+all;
    return this.http.get(requestUrl,this.options)
          .toPromise()
          .then(res => <any>res.json())
          .catch(this.handleError);
}

  getNextDocFromBatch(batchID: string,  QueueType: string){
    
    console.log("calling getNextDocFromBatch framework batchID: " + batchID);
    console.log("calling getNextDocFromBatch framework QueueType: " + QueueType);
    //OWCS_Case.wsp.getNextDocForUserBatch:_get
    var request={ "serverType":"IS",
              "url": this.url + "OWCS_Case.wsp.getNextDocForUserBatch?batchId="+batchID+"&queueType="+QueueType,
              "requestMethod":"GET"
              };
    let requestUrl = this.url + "OWCS_Case.wsp.getNextDocForUserBatch?batchId="+batchID+"&queueType="+QueueType;
    return this.http.get(requestUrl,this.options);
    }
    
  getPartyByEmployerType(){
    return this.http.get("../../../assets/data/export_emp_New.json");
  }

  getPartyByAttorneyType(){
    return this.http.get("../../../assets/data/export_atty_New.json");
  }

  getPartyByInsCarrType(){
    return this.http.get("../../../assets/data/export_carr_New.json");
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

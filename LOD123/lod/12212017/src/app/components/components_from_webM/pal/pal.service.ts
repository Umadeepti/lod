import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { PalData } from '/owcs/app/components/pal/pal.model';


@Injectable()
export class PalService {

  constructor(private http: Http) {}
  const url="/rest/bc/proxy";
  
  //For POC all these service directly returns the response to caller component
  // change the logic to use callback option -- this is todo item
  getOPSPlanPalTask() {    
      let request={ "serverType":"IS",
              "url":"/rest/OWCS_PAL_UI.PalTasks.opsPlanPalTask",
              "requestMethod":"GET"
              };
      return this.http.post(this.url,request);
    }
  
  getOtherTasks(taskId: number){
      console.log("calling service getOPSPlanPalTask for taskId : " + taskId);
        var request={ "serverType":"IS",
              "url":"/rest/OWCS_PAL_UI.OtherTasks.getOtherTasks",
              "requestMethod":"GET"
              };             
     return this.http.post(this.url,request);
  }
  checkPotentialDuplicateDataEntry(ssn: number, dateOfBirth: string, dateOfInjury: string, lastName: string){
      console.log("calling service checkPotentialDuplicateDataEntry for ssn : " +ssn);
      var request={ "serverType":"IS",
      "url":"/rest/OWCS_LongShore.CentralCaseCreate.wsp.checkPotentialDuplicateDataEntry?ssn="+ssn+"&lastName="+lastName+"&birthDate="+dateOfBirth+"&injuryDate="+dateOfInjury,
            "requestMethod":"GET"
            };             
     return this.http.post(this.url,request);
  }

  searchCaseold(caseSearch: CaseSearch){
    console.log("calling service checkPotentialDuplicateDataEntry for ssn : " , caseSearch);
      var request={ "serverType":"IS",
            "url":"/rest/OWCS_LongShore.CentralCaseCreate.wsp.checkPotentialDuplicateDataEntry?ssn="+caseSearch.ssn+"&caseNumber="+caseSearch.caseId+"&dateOfInjury="+caseSearch.doi+"&lastName"+caseSearch.lastName,
            "requestMethod":"GET"
            };             
   return this.http.post(this.url,request);
}
searchCase(caseSearch: CaseSearch){
  console.log("calling service caseSearch for ssn : " , caseSearch);

  console.log("test url: ", "/rest/OWCS_Common.wsp.searchCase?ssn="+caseSearch.ssn+"&caseNumber="+caseSearch.caseNumber+"&dateOfInjury="+caseSearch.doi+"&lastName="+caseSearch.lastName)
    var request={ "serverType":"IS",
          "url":"/rest/OWCS_Common.wsp.searchCase?ssn="+caseSearch.ssn+"&caseNumber="+caseSearch.caseNumber+"&dateOfInjury="+caseSearch.doi+"&lastName="+caseSearch.lastName,
          "requestMethod":"GET"
          };             
  return this.http.post(this.url,request);
}

fetchDocsByCaseID(caseId, callbackFunc) {
    //var url="/rest/pub/opentask";
    //var url="/rest/bc/proxy";
    console.log("calling fetchDocsByCaseID framework caseId: " + caseId);
    var request={ "serverType":"IS",
              "url":"/rest/OWCS_Case.wsp.getCaseDocuments?CASE_NUMBER="+caseId,
              "requestMethod":"GET"
              };
    return this.http.post(this.url,request);
}

getCaseDetails(caseId, callbackFunc) {
  console.log("calling getCaseDetails framework caseId: " + caseId);
  var request={ "serverType":"IS",
            "url":"/rest/OWCS_Case.wsp.getCaseDetails?CASE_NUMBER="+caseId,
            "requestMethod":"GET"
            };
  return this.http.post(this.url,request);
}

lockBatchByDocID( documentID: string,  QueueType: string,  all: string){
  
  console.log("calling lockBatchByDocID framework documentID: " + documentID);
  
  console.log("calling lockBatchByDocID framework QueueType: " + QueueType);

  var request={ "serverType":"IS",
            "url":"/rest/OWCS_PAL_UI.wsp.lockBatch?docId="+documentID+"&queueType="+QueueType+"&all="+all,
            "requestMethod":"GET"
            };
  return this.http.post(this.url,request);
    
  }

  getNextDocFromBatch(batchID: string,  QueueType: string){
    
    console.log("calling getNextDocFromBatch framework batchID: " + batchID);
    console.log("calling getNextDocFromBatch framework QueueType: " + QueueType);
    //OWCS_Case.wsp.getNextDocForUserBatch:_get
    var request={ "serverType":"IS",
              "url":"OWCS_Case.wsp.getNextDocForUserBatch?batchId="+batchID+"&queueType="+QueueType,
              "requestMethod":"GET"
              };
    return this.http.post(this.url,request);
      
    }
    


    getPartyByEmployerType(){
      return this.http.get("/owcs/app/shared/export_emp_New.json");
    }
    
    getPartyByAttorneyType(){
      return this.http.get("/owcs/app/shared/export_atty_New.json");
    }
    
    getPartyByInsCarrType(){
      return this.http.get("/owcs/app/shared/export_carr_New.json");
    }



}

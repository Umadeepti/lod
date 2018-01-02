import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CaseIndexData } from './caseIndex.model';
import { CaseCreateData } from './caseCreate.model';
import { AppConfig } from '../../app.config';

@Injectable()
export class CasesService {

  constructor(private http: Http, private appConfig: AppConfig) {}
  //readonly url="/rest/bc/proxy";
  //readonly url: string = "https://dev-sagis-owcs.acuitys.com";//this.appConfig.getConfig('local');
  readonly url: string = this.appConfig.getConfig('apiEndPoint');
  user: string = this.appConfig.getConfig('user');
  userName: string = this.appConfig.getConfig(this.user + 'UserId');
  password: string = this.appConfig.getConfig(this.user + 'Password');
  private headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json, */*',
           'Authorization': "Basic " + btoa(this.userName + ":" + this.password), 'Access-Control-Allow-Origin': '*'  });
  private options = new RequestOptions({ headers: this.headers });
  //For POC all these service directly returns the response to caller component
  // change the logic to use callback option -- this is todo item
  
  checkPotentialDuplicateDataEntry(ssn: number){
      console.log("calling service checkPotentialDuplicateDataEntry for ssn : " +ssn);
        var request={ "serverType":"IS",
              "url":"/rest/OWCS_LongShore.CentralCaseCreate.wsp.checkPotentialDuplicateDataEntry?ssn="+ssn,
              "requestMethod":"GET"
              };             
      let requestUrl = this.url + "/rest/OWCS_LongShore.CentralCaseCreate.wsp.checkPotentialDuplicateDataEntry?ssn="+ssn;
      return this.http.get(requestUrl, this.options);
  }
  
  IndexCaseDocuments(caseNumber: string, documentId: number){
      console.log("calling IndexCaseDocuments for caseId : " +caseNumber + " Document ID: " +documentId);
        
        var request={ "serverType":"IS",
              "url":"/rest/OWCS_Case.wsp.indexCaseDocuments?CaseNumber="+caseNumber+"&documentIntakeId="+documentId,
              "requestMethod":"GET"
              }; 
      console.log('Index Request' , request);
      let requestUrl = this.url + "/rest/OWCS_Case.wsp.indexCaseDocuments?CaseNumber="+caseNumber+"&documentIntakeId="+documentId;
      return this.http.post(requestUrl, this.options);
  }


  CreateCase(caseCreateData: CaseCreateData, documentId: string) {
    
       var caseDataJson = 	{
        "getCaseCreateData": 
          {
            //Section 1
            "caseNumber"			: caseCreateData.caseNumber ,
            "caseForm"				: caseCreateData.caseForm ,
            "documentIntakeId": documentId,
            "SSN"					: caseCreateData.SSN ,
            "dateOfInjury"			: caseCreateData.dateOfInjury ,
            "dateOfBirth"			: caseCreateData.dateOfBirth ,
            "injuredLastName"		: caseCreateData.injuredLastName ,
            "injuredFirstName"		: caseCreateData.injuredFirstName ,
            "injuredMidName"  : caseCreateData.injuredMidName ,
            "injPerPhoneNbr"		: caseCreateData.injPerPhoneNbr ,
            "injPerAdrLine1"		: caseCreateData.injPerAdrLine1 ,
            "injPerAdrLine2"		: caseCreateData.injPerAdrLine2 ,
            "injPerAdrCity"		: caseCreateData.injPerAdrCity ,
            "injPerAdrState"		: caseCreateData.injPerAdrState ,
            "injPerAdrZip"			: caseCreateData.injPerAdrZip ,
            "injPerAdrCountry"		: caseCreateData.injPerAdrCountry ,
            "injuryType"			: caseCreateData.injuryType ,
            "caseType"				: caseCreateData.caseType ,
            "natureOfInjury"		: caseCreateData.natureOfInjury ,
            "partOfBody"			: caseCreateData.partOfBody ,
            "Employer1"				: caseCreateData.Employer1 ,
            "Employer2"				: caseCreateData.Employer2 ,
            "EmpPartyId1"				: caseCreateData.EmpPartyId1 ,
            "EmpPartyId2"				: caseCreateData.EmpPartyId2 ,
            "EmpPartyAdr1"				: caseCreateData.EmpPartyAdr1 ,
            "EmpPartyAdr2"				: caseCreateData.EmpPartyAdr2 ,
            "claimantLastName"		: caseCreateData.claimantLastName ,
            "claimantFirstName"		: caseCreateData.claimantFirstName ,
            "placeOfInjuryCtry"		: caseCreateData.placeOfInjuryCtry ,
            "placeOfInjuryStSel"  : caseCreateData.placeOfInjuryStSel ,
            "placeOfInjuryType"  : caseCreateData.placeOfInjuryType ,
            "stateProvidence"		: caseCreateData.stateProvidence ,
            "extentOfInjury"		: caseCreateData.extentOfInjury , 
            "causedDeath"		    : caseCreateData.causedDeath ,
            "causedLostTime"    : caseCreateData.causedLostTime,
            "stoppedWorkImmediately" : caseCreateData.stoppedWorkImmediately,
            "doingUsualWork"    : caseCreateData.doingUsualWork,
            "onPremises"        : caseCreateData.onPremises,
            "dateReport"        : caseCreateData.dateReport,

            //Section 2
             /*Case Create Section2 fields Start */
            "claimantLN"			: caseCreateData.claimantLN ,
            "claimantFN"			: caseCreateData.claimantFN ,
            "claimantMN"			: caseCreateData.claimantMN ,
            "claimantAdd1"			: caseCreateData.claimantAdd1 ,
            "claimantAdd2"			: caseCreateData.claimantAdd2 ,
            "claimantCity"			: caseCreateData.claimantCity ,
            "claimantState"			: caseCreateData.claimantState ,
            "claimantZip"			: caseCreateData.claimantZip ,
            "claimantCountry"		: caseCreateData.claimantCountry ,
            "occupation"			: caseCreateData.occupation ,
            "attorney1"				: caseCreateData.attorney1 ,
            "attPartyId1"			: caseCreateData.attPartyId1 ,
            "attPartyAdr1"				: caseCreateData.attPartyAdr1 ,
            "attorney1Rep"			: caseCreateData.attorney1Rep ,
            "attorney2"				: caseCreateData.attorney2 ,
            "attPartyId2"			: caseCreateData.attPartyId2 ,
            "attPartyAdr2"				: caseCreateData.attPartyAdr2 ,
            "attorney2Rep"			: caseCreateData.attorney2Rep ,
            "attorney3"				: caseCreateData.attorney3 ,
            "attPartyId3"			: caseCreateData.attPartyId3 ,
            "attPartyAdr3"				: caseCreateData.attPartyAdr3 ,
            "attorney3Rep"			: caseCreateData.attorney3Rep ,
            "carrier"				: caseCreateData.carrier ,
            "injuredPhone"			: caseCreateData.injuredPhone ,
            "contractingAgency"		: caseCreateData.contractingAgency ,
            "primeContract"			: caseCreateData.primeContract ,
            "subContract"			: caseCreateData.subContract ,
      
            //Section 3
            /*Case Create Section3 fields Start */
            "sex": caseCreateData.sex ,
            "nationality"			: caseCreateData.nationality ,
            "firstLostTime"			: caseCreateData.firstLostTime ,
            "firstLosDate"			: caseCreateData.firstLosDate ,
            "returnedToWork"		: caseCreateData.returnedToWork ,
            "daysWorked"			: caseCreateData.daysWorked ,
            "dateOfKnowledge"		: caseCreateData.dateOfKnowledge ,
            "causeOfInjury"			: caseCreateData.causeOfInjury ,
            "natureOfInjuryDesc"	: caseCreateData.natureOfInjuryDesc , 
            "medicalAttn"			: caseCreateData.medicalAttn ,
            "physicianEmp"			: caseCreateData.physicianEmp ,
            "carrierName1"			: caseCreateData.carrierName1 ,
            "carrierPartyId1"			: caseCreateData.carrierPartyId1 ,
            "carrierPartyAdr1"			: caseCreateData.carrierPartyAdr1 ,
            "carrierName2"			: caseCreateData.carrierName2 ,
            "carrierPartyId2"			: caseCreateData.carrierPartyId2 ,
            "carrierPartyAdr2"			: caseCreateData.carrierPartyAdr2 ,
            "employerBusiness"		: caseCreateData.employerBusiness ,
            "employerAuthorityTitle": caseCreateData.employerAuthorityTitle ,
            "dateSigned"			: caseCreateData.dateSigned,

            //new 203 fields
            "attorney1Repname"  : caseCreateData.attorney1Repname,
            "citizen"    : caseCreateData.citizen,
            "disfigurement"    : caseCreateData.disfigurement,
            "wagesSinceDisabled"    : caseCreateData.wagesSinceDisabled,
            "workedWhileDisabled"    : caseCreateData.workedWhileDisabled,
            "stillDisabled"    : caseCreateData.stillDisabled,
            "treatmentByEr"    : caseCreateData.treatmentByEr,
            "thirdPartyClaim"    : caseCreateData.thirdPartyClaim,
            "dateOfAccident"    : caseCreateData.dateOfAccident,
            "marital"    : caseCreateData.marital,
            "dateClaim"  : caseCreateData.dateClaim
          }
        };
         var request={ "serverType":"IS",
         "url":"/rest/OWCS_Case.wsp.createCase",
          "requestMethod":"PUT", 
          "data": JSON.stringify(caseDataJson)
          };
    let data = JSON.stringify(caseDataJson);
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //headers.append('Accept', '*/*');
    let requestUrl = this.url + "/rest/OWCS_Case.wsp.createCase";

    return this.http.post(requestUrl, data, this.options);
  }

  ProcessDupToCase(caseNumber: string, documentId: string, letterFlag: string){
    
            var dataJson = {
              "caseNumber":  caseNumber,
              "documentIntakeId":  documentId,
             "sendLetter": letterFlag
              };
              var request={ "serverType":"IS",
              "url":"/rest/OWCS_SharedQueue.wsp.processDuplicateCase",
               "requestMethod":"POST", 
               "data": JSON.stringify(dataJson)
               };
    
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
      return this.http.post(this.url, request);
       
  }
 

 IndexDocumentToCase(caseIndexData: CaseIndexData, caseId: string, documentId: number){

        var dataJson = {
          "indexCaseDocumentInput": {
          "CaseNumber":  caseIndexData.caseNumber,
          "documentIntakeId": caseIndexData.docIntakeId,
          "documentCreateDate": caseIndexData.authorDate,
          "documentSubjectDesc":caseIndexData.subject,
          "documentCategoryType":caseIndexData.category,
          "documentType":"MEDICAL",
          "documentTotalPagesNumber":"1",
          "documentFormatType":"PDF",
          "documentStatusType":"OPEN",
          "externalSysDocId":"1",
          "externalSysName":"1",
          "documentAuthorDesc":"1",
          "documentEditableFlag":"N",
          "documentArchieveFlag":"N",
          "documentRetryFlag":"N",
          "documentRetryCount":"0",
          "documentAuthorDate":caseIndexData.authorDate,
          "documentPostmarkDate":caseIndexData.postmarkDate,
          "documentDescription":caseIndexData.description,
          "priorityFlag":caseIndexData.priorityFlag,
          "duplicateFlag":caseIndexData.duplicateFlag,
          "sensitiveFlag":caseIndexData.sensitiveFlag
      
          }             
      };
          var request={ "serverType":"IS",
          "url":"/rest/OWCS_Case.wsp.indexCaseDocuments",
           "requestMethod":"PUT", 
           "data": JSON.stringify(dataJson)
           };

    let data = JSON.stringify(dataJson);
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //headers.append('Accept', '*/*');
    let requestUrl = this.url + "/rest/OWCS_Case.wsp.indexCaseDocuments";
    /*
      var data = {"serverType":"IS", 
          "url":"/rest/rs/monitor/process/instanceSearch",
            "host":"localhost", "port":"5555", 
            "protocol":"http", "requestMethod":"POST", 
            "data":"{\"instanceSearchQuery\":{\"processKey\":\"FeatureProject/Feature\", \"pageNumber\":1,\"pageSize\":10,\"status\":\"2\",\"instanceId\":null, \"customId\":null,\"businessConsoleRequest\":true}}" "requestHeaders:{'key1':'value1','key2':'value2'}"}
  */
    return this.http.post(requestUrl, data, this.options);
   
  }
  
}

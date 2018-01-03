import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CaseIndexData } from '/owcs/app/components/cases/caseIndex.model';
import { CaseCreateData } from '/owcs/app/components/cases/caseCreate.model';

@Injectable()
export class CasesService {

  constructor(private http: Http) {}
  const url="/rest/bc/proxy";
  
  //For POC all these service directly returns the response to caller component
  // change the logic to use callback option -- this is todo item
  
  checkPotentialDuplicateDataEntry(ssn: number){
      console.log("calling service checkPotentialDuplicateDataEntry for ssn : " +ssn);
        var request={ "serverType":"IS",
              "url":"/rest/OWCS_LongShore.CentralCaseCreate.wsp.checkPotentialDuplicateDataEntry?ssn="+ssn,
              "requestMethod":"GET"
              };             
     return this.http.post(this.url,request);
  }
  
  IndexCaseDocuments(caseNumber: string, documentId: number){
      console.log("calling IndexCaseDocuments for caseId : " +caseNumber + " Document ID: " +documentId);
        
        var request={ "serverType":"IS",
              "url":"/rest/OWCS_Case.wsp.indexCaseDocuments?CaseNumber="+caseNumber+"&documentIntakeId="+documentId,
              "requestMethod":"GET"
              }; 
       console.log('Index Request' , request);
     return this.http.post(this.url,request);
  }


  CreateCase(caseCreateData: CaseCreateData, documentId: string){
    
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
            "dateReceived"      : caseCreateData.dateReceived,
      
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
            "caseOfInjury"			: caseCreateData.caseOfInjury ,
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
            "causeOfInjury"    : caseCreateData.caseOfInjury,
            "thirdPartyClaim"    : caseCreateData.thirdPartyClaim,
            "marital"    : caseCreateData.marital,
            "dateClaim"  : caseCreateData.dateClaim,


            //new 262 fields
            /*"deceasedFirstName"  : caseCreateData.deceasedFirstName,
            "deceasedMiddleName"  : caseCreateData.deceasedMiddleName,
            "deceasedLastName"  : caseCreateData.deceasedLastName,
            "deceasedAdrLine1"  : caseCreateData.deceasedAdrLine1,
            "deceasedAdrLine2"  : caseCreateData.deceasedAdrLine2,
            "deceasedAdrCity"  : caseCreateData.deceasedAdrCity,
            "deceasedAdrState"  : caseCreateData.deceasedAdrState,
            "deceasedAdrZip"  : caseCreateData.deceasedAdrZip,
            "deceasedAdrCtry"  : caseCreateData.deceasedAdrCtry,*/
            "placeDeathCity"  : caseCreateData.placeDeathCity,
            "placeDeathSt"  : caseCreateData.placeDeathSt,
            "placeDeathCtry"  : caseCreateData.placeDeathCtry,
            "dateOfDeath"  : caseCreateData.dateOfDeath,
            "widowFirstName"  : caseCreateData.widowFirstName,
            "widowMidName"  : caseCreateData.widowMidName,
            "widowLastName"  : caseCreateData.widowLastName,
            "widowAdrLine1"  : caseCreateData.widowAdrLine1,
            "widowAdrLine2"  : caseCreateData.widowAdrLine2,
            "widowAdrCity"  : caseCreateData.widowAdrCity,
            "widowAdrSt"  : caseCreateData.widowAdrSt,
            "widowAdrZip"  : caseCreateData.widowAdrZip,
            "widowAdrCountry"  : caseCreateData.widowAdrCountry,
            "widowSSN"  : caseCreateData.widowSSN,
            "widowDateOfBirth"  : caseCreateData.widowDateOfBirth,
            "widowNationality"  : caseCreateData.widowNationality,
            "widowPhone"  : caseCreateData.widowPhone,
            "widowSignatureDate"  : caseCreateData.widowSignatureDate,
            "childFirstName"  : caseCreateData.childFirstName,
            "childMidName"  : caseCreateData.childMidName,
            "childLastName"  : caseCreateData.childLastName,
            "childAdrLine1"  : caseCreateData.childAdrLine1,
            "childAdrLine2"  : caseCreateData.childAdrLine2,
            "childAdrCity"  : caseCreateData.childAdrCity,
            "childAdrSt"  : caseCreateData.childAdrSt,
            "childAdrZip"  : caseCreateData.childAdrZip,
            "childAdrCtry"  : caseCreateData.childAdrCtry,
            "childSSN"  : caseCreateData.childSSN,
            "childDateOfBirth"  : caseCreateData.childDateOfBirth,
            "childNationality"  : caseCreateData.childNationality,
            "dependentFirstName"  : caseCreateData.dependentFirstName,
            "dependentMidName"  : caseCreateData.dependentMidName,
            "dependentLastName"  : caseCreateData.dependentLastName,
            "dependentAdrLine1"  : caseCreateData.dependentAdrLine1,
            "dependentAdrLine2"  : caseCreateData.dependentAdrLine2,
            "dependentAdrCity"  : caseCreateData.dependentAdrCity,
            "dependentAdrSt"  : caseCreateData.dependentAdrSt,
            "dependentAdrZip"  : caseCreateData.dependentAdrZip,
            "dependentAdrCtry"  : caseCreateData.dependentAdrCtry,
            "dependentSignatureDate"  : caseCreateData.dependentSignatureDate,
            "dependencyType"  : caseCreateData.dependencyType,
            "guardian"  : caseCreateData.guardian,
            "claimantType"  : caseCreateData.claimantType,
            "dependentAge"  : caseCreateData.dependentAge,

            //207
            "claimantPhone": caseCreateData.claimantPhone,
            "controversionReason": caseCreateData.controversionReason,
            "noticeDate": caseCreateData.noticeDate,

            //208
            "compDisabilityType":    caseCreateData.compDisabilityType,
            "averageWeeklyWage":    caseCreateData.averageWeeklyWage,
            "compensationRate":    caseCreateData.compensationRate,
            "paymentBeginDate":    caseCreateData.paymentBeginDate,
            "paymentBeginDateReason":    caseCreateData.paymentBeginDateReason,
            "continuingPaySalary":    caseCreateData.continuingPaySalary,
            "inlieuCompensation":    caseCreateData.inlieuCompensation,
            "firstPaymentDate":    caseCreateData.firstPaymentDate,
            "typeOfNotice":    caseCreateData.typeOfNotice,
            "lastPaymentDate":    caseCreateData.lastPaymentDate,
            "paymentType":    caseCreateData.paymentType,
            "paymentFromDate":    caseCreateData.paymentFromDate,
            "paymentThroughDate":    caseCreateData.paymentThroughDate,
            "paymentWeeklyAmount":    caseCreateData.paymentWeeklyAmount,
            "paymentWeeks":    caseCreateData.paymentWeeks,
            "paymentPercentage":    caseCreateData.paymentPercentage,
            "otherPaymentType":    caseCreateData.otherPaymentType,
            "beneficiaryDescription":    caseCreateData.beneficiaryDescription,
            "otherPaymentAmount":    caseCreateData.otherPaymentAmount,

            //201
            "stoppedWork": caseCreateData.noticeDeliveryDate,
            "claimantSignatureDate": caseCreateData.noticeDeliveryDate,
            "noticeDeliveryDate": caseCreateData.noticeDeliveryDate,
            "employeePhone": caseCreateData.employeePhone
          }
        };
         var request={ "serverType":"IS",
         "url":"/rest/OWCS_Case.wsp.createCase",
          "requestMethod":"PUT", 
          "data": JSON.stringify(caseDataJson)
          };
 let headers = new Headers();
 headers.append('Content-Type', 'application/json');
   headers.append('Accept', '*/*');
 
 return this.http.post(this.url, request);
  
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
          "documentCreateDate": caseIndexData.receivedDate,
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

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
  /*
    var data = {"serverType":"IS", 
        "url":"/rest/rs/monitor/process/instanceSearch",
           "host":"localhost", "port":"5555", 
           "protocol":"http", "requestMethod":"POST", 
           "data":"{\"instanceSearchQuery\":{\"processKey\":\"FeatureProject/Feature\", \"pageNumber\":1,\"pageSize\":10,\"status\":\"2\",\"instanceId\":null, \"customId\":null,\"businessConsoleRequest\":true}}" "requestHeaders:{'key1':'value1','key2':'value2'}"}
*/
  return this.http.post(this.url, request);
   
  }
  
}

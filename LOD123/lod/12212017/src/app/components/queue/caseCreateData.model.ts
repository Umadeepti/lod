
export class CaseCreateData {
  public name: string;
  public description: string;
  public imagePath: string;
  
  public Form: string;
public SSN: string;
public dateOfInjury: string;
public dateOfBirth: string;
public injLastName: string;
public injFirstName: string;
public injuryType: string;
public caseType: string;
public natureOfInjury: string;
public partOfBody: string;
public empName: string;
public ClaimantLastNm: string;
public CliamantAddLine1: string;
public CliamantAddLine2: string;
public city: string;
public state: string;
public zip: string; 
public country: string;
public placeOfInjury: string;
public extentOfInjury: string;
public carrierNumber: string;
public timeOfInjury: string;
public injuredTelephone: string;
public contAgency: string;
public primeContact: string;
public subContact: string;
public injuryOccured: string;
public sex: string;
public firstLostTime: string;
public immStopWork: string;
public returnedToWork: string;
public doingUsualWork: string;
public OccurOnPremise: string;
public depEmpWorks: string;
public Occupation: string;
public payStopped: string;
  //public testDatas: TestData[];

  //constructor(name: string, desc: string, imagePath: string, testDatas: TestData[]) {
  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
   // this.testDatas = testDatas;
  }
}


export class CaseIndexData {
  
  public caseNumber: string;
  public claimant: string;
  public category: string;
  public subject: string;
  public reviewStatus: string;
  public authorDate: string;
  public receivedDate: string;
  public validateRecdDate: string;
  public description: string;
  public postmarkDate: string;
  public priorityFlag: string;
  public duplicateFlag: string;
  public sensitiveFlag: string;
  public docClass: string;
  public docIntakeId: string;
  
  

  //constructor(name: string, desc: string, imagePath: string, testDatas: TestData[]) {
  constructor(name: string, desc: string, imagePath: string) {
    this.caseNumber = name;
    this.claimant = desc;
    //this.postmarkDate = imagePath;
   // this.imagePath = imagePath;
   // this.testDatas = testDatas;
  }
 
}

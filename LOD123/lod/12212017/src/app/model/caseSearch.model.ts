export class CaseSearch {
    caseId: string="";
    doi: string = "";
    ssn: string="";
    lastName: string = "";
    caseNumber : string = "";
  
  constructor() { 
  }
  
  setDOI(doi: string): void {this.doi = doi;}
  setCaseId(caseId: string): void {this.caseId = caseId;}
  setCaseNumber(caseNumber: string): void {this.caseNumber = caseNumber;}
  setSSN(ssn: string): void {this.ssn = ssn;}
  setLastName(lastName: string): void {this.lastName = lastName;}
  
}




export class CaseCreateData {
  
  //Section 1
  public caseNumber: string;
  public caseForm: string="";
  public dateSubmitted: string="";
  public scannedDate: string;
  public SSN: string="";
  public dateOfInjury: string;
  public dateOfBirth: string;
  public injuredLastName: string;
  public injuredMidName: string;
  public injuredFirstName: string;
  public injPerPhoneNbr : string;
  public injPerAdrLine1: string;
  public injPerAdrLine2: string;
  public injPerAdrCity : string;
  public injPerAdrState: string;
  public injPerAdrZip: string;
  public injPerAdrCountry: string;
  public injuryType: string;
  public caseType: string;
  public natureOfInjury: string;
  public partOfBody: string;
  public Employer1: string;
  public Employer2: string;
  public EmpPartyId1: string;
  public EmpPartyId2: string;
  public EmpPartyAdr1: string;
  public EmpPartyAdr2: string;

  public claimantLastName: string;
  public claimantFirstName: string;
  public placeOfInjuryCtry: string;
  public placeOfInjuryStSel: string;
  public placeOfInjuryType: string;
  public stateProvidence: string;
  public extentOfInjury: string;
  public causedDeath: string;
  public causedLostTime: string;
  public stoppedWorkImmediately: string;
  public doingUsualWork: string;
  public onPremises: string;
  public dateReport: string;

  //Section 2
  /*Case Create Section2 fields Start */
public claimantLN: string;
public claimantFN: string;
public claimantMN: string;
public claimantAdd1: string;
public claimantAdd2: string;
public claimantCity: string;
public claimantState: string;
public claimantZip: string;
public claimantCountry: string;
public occupation: string;
public attorney1: string;
public attPartyId1: string;
public attPartyAdr1: string;
public attorney1Rep: string;
public attorney2: string;
public attPartyId2: string;
public attPartyAdr2: string;
public attorney2Rep: string;
public attorney3: string;
public attPartyId3: string;
public attPartyAdr3: string;
public attorney3Rep: string;
public carrier: string;
public injuredPhone: string;
public contractingAgency: string;
public primeContract: string;
public subContract: string;
/*Case Create Section2 fields End */



//Section 3
/*Case Create Section3 fields Start */
public sex: string;
public nationality: string;
public firstLostTime: string;
public firstLosDate: string;
public payStoppedDate: string;
public returnedToWork: string;
public daysWorked: string;
public dateOfKnowledge: string;
public causeOfInjury: string;
public natureOfInjuryDesc: string; 
public medicalAttn: string;
public physicianEmp: string;
public carrierName1: string;
public carrierPartyId1: string;
public carrierPartyAdr1: string;
public carrierName2: string;
public carrierPartyId2: string;
public carrierPartyAdr2: string;
public employerBusiness: string;
public employerAuthorityTitle: string;
public dateSigned: string;
/*Case Create Section3 fields End */

//203 new fields
public attorney1Repname: string;
public citizen: string;
public disfigurement: string;
public wagesSinceDisabled: string;
public workedWhileDisabled: string;
public stillDisabled: string;
public treatmentByEr: string;
public thirdPartyClaim: string;
public dateOfAccident: string;
public marital: string;
public dateClaim: string;

//262 fields
attorney1Repname: string;
public deceasedFirstName: string;
public deceasedMiddleName: string;
public deceasedLastName: string;
public deceasedAdrLine1: string;
public deceasedAdrLine2: string;
public deceasedAdrCity: string;
public deceasedAdrState: string;
public deceasedAdrZip: string;
public deceasedAdrCtry: string;
public placeDeathCity: string;
public placeDeathSt: string;
public placeDeathCtry: string;
public dateOfDeath: string;
public caseOfInjury: string;
public widowFirstName: string;
public widowMidName: string;
public widowLastName: string;
public widowAdrLine1: string;
public widowAdrLine2: string;
public widowAdrCity: string;
public widowAdrSt: string;
public widowAdrZip: string;
public widowAdrCountry: string;
public widowSSN: string;
public widowDateOfBirth: string;
public widowNationality: string;
public widowPhone: string;
public widowSignatureDate: string;
public childFirstName: string;
public childMidName: string;
public childLastName: string;
public childAdrLine1: string;
public childAdrLine2: string;
public childAdrCity: string;
public childAdrSt: string;
public childAdrZip: string;
public childAdrCtry: string;
public childSSN: string;
public childDateOfBirth: string;
public childNationality: string;
public dependentFirstName: string;
public dependentMidName: string;
public dependentLastName: string;
public dependentAdrLine1: string;
public dependentAdrLine2: string;
public dependentAdrCity: string;
public dependentAdrSt: string;
public dependentAdrZip: string;
public dependentAdrCtry: string;
public dependentSignatureDate: string;
public dependencyType: string;
public guardian: string;
public claimantType: string;
public dependentAge: string;
  
  
  constructor() {
    
          }
}
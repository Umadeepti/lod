import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaseCreateData }    from '../caseCreate.model';
import { PalService } from '../../pal/pal.service';
import { Response } from '@angular/http';
import {LookupService} from '../../../shared/lookup.service';
import { CasesService } from '../cases.service';

declare var jQuery: any;

export class RefData {
  constructor(public value: string) { }
}

export class CategorySubjectPair {
  constructor(public Category: string, public Subject: RefData[]) { }
}

@Component({
    selector: 'ls-form-202',
    templateUrl: './ls-form-202.component.html',
    styleUrls: ['../../../../assets/css/nav.css']
  })

  export class LsForm202Component implements OnInit {

    @Input() selectedForm: number;
    @Input() caseDocIntakeId: string;
    @Input() scannedDate: string;
    @Output() caseCreateEvent: EventEmitter<any> = new EventEmitter();
    @Output() dupCaseLetterEvent: EventEmitter<any> = new EventEmitter();
    caseCreateDataForm: FormGroup;
    caseCreateData: any;
    searchKey = '';
    searchDataList = [];
    searchAttList = [];
    searchIncCarrList = [];
    searchIncEmpList = [];
    filteredEmpList = [];
    filteredEmp2List = [];
    filteredAtty1List = [];
    filteredAtty2List = [];
    filteredAtty3List = [];
    filteredCarr1List = [];
    filteredCarr2List = [];
    elementRef;
    setDupCaseRow : Function;
    dupCaseDetail: any;
    data1: any;
    filterQuery1: string = "";
    rowsOnPage1 = 10;
    sortOrder1 = "asc";
    categoryList: CategorySubjectPair[];
    reindexStatusList: RefData[];
    subjectList: RefData[];
    paymentList: RefData[];
    settlementTypeList: RefData[];
    PartOfBodyList: RefData[];
    NatureOfInjuryList: RefData[];
    CauseOfInjuryList: RefData[];
    InjuryTypeList: RefData[];
    ExtentOfInjuryList: RefData[];
    CaseTypeList: RefData[];
    CountryList: RefData[];
    USStateList: RefData[];
    CAProvinceList: RefData[];
    MXStateList: RefData[];
    currentDate: string;
    alphaNumeric = /^[a-z\d\-_\s]+$/i; ///^[0-9a-zA-Z]+$/; 
    numeric: string = "[0-9]*";
    alpha: string = "[a-zA-Z][a-zA-Z ]+";
    loading: boolean = false;
    caseMessage: string = "";
    todaysDate: Date;

    constructor(private fb: FormBuilder,
                private palService: PalService,
                private lookupService: LookupService,
                private caseService: CasesService) {
        
        this.setDupCaseRow = function(data) {
          this.dupCaseDetails(data);
        }
        this.currentDate = this.getCurrentDateString();
        this.todaysDate = new Date();
    }

    ngOnChanges() {

      if(this.caseCreateDataForm && this.caseCreateDataForm.valid)
      {
        this.caseCreateDataForm.reset();
        this.caseCreateData = new CaseCreateData();
        this.caseCreateDataForm.controls['dateReceived'].setValue(this.scannedDate);
      }
    }

    ngOnInit() {

      this.caseCreateData = new CaseCreateData();
      this.getLookUpValues();
      //this.currentDate = this.getCurrentDateString();

      this.caseCreateDataForm = this.fb.group({
        caseNumber: this.caseDocIntakeId,
        caseForm: 'LS-202',
        dateReceived: new Date(),
        SSN: ['', [Validators.minLength(9), Validators.pattern(this.numeric)]],
        //ssn: '',
        dateSubmitted: '',
        dateOfInjury: ['', Validators.required],
        dateOfBirth: '',
        injuredLastName: ['', [Validators.required, Validators.pattern(this.alphaNumeric)]],
        injuredMidName: ['', [Validators.pattern(this.alphaNumeric)]],
        injuredFirstName: ['', [Validators.pattern(this.alphaNumeric)]],
        injPerPhoneNbr: ['', [Validators.minLength(10), Validators.pattern(this.numeric)]],
        injPerAdrLine1: ['', [Validators.pattern(this.alphaNumeric)]],
        injPerAdrLine2: ['', [Validators.pattern(this.alphaNumeric)]],
        injPerAdrCity: ['', [Validators.pattern(this.alphaNumeric)]],
        injPerAdrState: ['', [Validators.pattern(this.alpha)]],
        injPerAdrZip: ['', [Validators.pattern(this.numeric)]],
        injPerAdrCountry: ['', [Validators.required ,Validators.pattern(this.alphaNumeric)]],
        injuryType: '',
        caseType: ['', Validators.required],
        natureOfInjury: '',
        partOfBody: '',
        Employer1: ['', [Validators.required]],
        Employer2: '',
        EmpPartyId1: '',
        EmpPartyId2: '',
        EmpPartyAdr1: '',
        EmpPartyAdr2: '',
        claimantLastName: '',
        claimantFirstName: '',
        placeOfInjuryCtry: '',
        stateProvidence: '',
        extentOfInjury: '',
        claimantLN: '',
        claimantFN: '',
        claimantMN: '',
        claimantAdd1: '',
        claimantAdd2: '',
        claimantCity: '',
        claimantState: '',
        claimantZip: '',
        claimantCountry: '',
        occupation: '',
        attorney1: '',
        attPartyId1: '',
        attPartyAdr1: '',
        attorney1Rep: '',
        attorney2: '',
        attPartyId2: '',
        attPartyAdr2: '',
        attorney2Rep: '',
        attorney3: '',
        attPartyId3: '',
        attPartyAdr3: '',
        attorney3Rep: '',
        carrier: ['', [Validators.pattern(this.alphaNumeric)]],
        injuredPhone: '',
        contractingAgency: ['', [Validators.pattern(this.alphaNumeric)]],
        primeContract: ['', [Validators.pattern(this.alphaNumeric)]],
        subContract: ['', [Validators.pattern(this.alphaNumeric)]],
        sex: '',
        nationality: ['', [Validators.pattern(this.alpha)]],
        firstLostTime: '',
        firstLosDate: '',
        payStoppedDate: '',
        returnedToWork: '',
        daysWorked: '',
        dateOfKnowledge: '',
        causeOfInjury: '',
        natureOfInjuryDesc: '', 
        medicalAttn: '',
        physicianEmp: '',
        carrierName1: '',
        carrierPartyId1: '',
        carrierPartyAdr1: '',
        carrierName2: '',
        carrierPartyId2: '',
        carrierPartyAdr2: '',
        employerBusiness: '',
        employerAuthorityTitle: '',
        dateSigned: '',
        claimAct: '',
        placeOfInjuryType: '',
        causedDeath: ['', [Validators.required]],
        causedLostTime: ['', [Validators.required]],
        stoppedWorkImmediately: '',
        doingUsualWork: '',
        onPremises: '',
        placeOfInjuryStSel: '',
        dateReport: ''

      })
    }

    getLookUpValues() {

      // Org JSON Data
      this.palService.getPartyByEmployerType().subscribe((response: Response) => {
          this.searchDataList =  response.json().EMPLOYER;
      });

      this.palService.getPartyByAttorneyType().subscribe((response: Response) => {
          this.searchAttList =  response.json().ATTORNEY;
      });

      this.palService.getPartyByInsCarrType().subscribe((response: Response) => {
          this.searchIncCarrList =  response.json().INS_CARR;
      });
    
      this.lookupService.getCategoryAndSubjects().subscribe((response: Response) => {              
          this.categoryList = response.json().CategorySubjectPair;             
      });
   
      this.lookupService.getReindexReviewStatuses().subscribe((response: Response) => {              
          this.reindexStatusList = response.json().ReindexReviewStatuses;            
      });
    
      this.lookupService.getSettlementTaskType().subscribe((response: Response) => {              
          this.settlementTypeList = response.json().SettlementTaskTypes;            
      });
    
      this.lookupService.getPaymentRequiredValues().subscribe((response: Response) => {              
          this.paymentList = response.json().PaymentRequired;
      });

      this.lookupService.getStateAndCountryValues().subscribe((response: Response) => {              
          this.CountryList = response.json().countryList;   
          this.USStateList = response.json().usStateList; 
          this.CAProvinceList = response.json().caProvinceList; 
          this.MXStateList = response.json().mxStateList; 
      });

      this.lookupService.getPartOfBodyValues().subscribe((response: Response) => {              
          this.PartOfBodyList = response.json().partOfBody;            
      });

      this.lookupService.getNatureOfInjuryValues().subscribe((response: Response) => {              
          this.NatureOfInjuryList = response.json().natureOfInjury;            
      });

      this.lookupService.getCauseOfInjuryValues().subscribe((response: Response) => {              
        this.CauseOfInjuryList = response.json().injuryCauseTypes;            
      });
         
      this.lookupService.getInjuryTypeValues().subscribe((response: Response) => {              
          this.InjuryTypeList = response.json().injuryTypes;            
      });
         
      this.lookupService.getExtentOfInjuryValues().subscribe((response: Response) => {              
        this.ExtentOfInjuryList = response.json().extentOfInjury;            
      });
        
      this.lookupService.getCaseTypeValues().subscribe((response: Response) => {              
        this.CaseTypeList = response.json().caseTypes;            
      });
    }
    
    searchFilter($event) {

      console.log('user click event : ', $event.target.name);
      let searchCriteriaFilter:string="";
      this.searchKey=$event.target.name;
      let filteredList = [];
      let searchList = [];
      searchCriteriaFilter = $event.target.value;

      if($event.target.name === 'employer1'){
        //searchCriteriaFilter=this.caseCreateData.employer1;
        searchList = this.searchDataList;
      } else if($event.target.name === 'employer2'){
        //searchCriteriaFilter=this.caseCreateData.employer1;
        searchList = this.searchDataList;
      } else if($event.target.name === 'attorney1'){
      //searchCriteriaFilter=this.caseCreateData.attorney1;
        searchList = this.searchAttList;
      } else if($event.target.name === 'attorney2'){
        //searchCriteriaFilter=this.caseCreateData.attorney2;
        searchList = this.searchAttList;
      } else if($event.target.name === 'attorney3'){
        //searchCriteriaFilter=this.caseCreateData.attorney3;
        searchList = this.searchAttList;
      } else if($event.target.name === 'carrierName1'){
        //searchCriteriaFilter=this.caseCreateData.carrierName1;
        searchList = this.searchIncCarrList;
      } else if($event.target.name === 'carrierName2'){
        //searchCriteriaFilter=this.caseCreateData.carrierName2;
        searchList = this.searchIncCarrList;
      } 
      console.log('user click event search criteria : ', searchCriteriaFilter);
        
      if (searchCriteriaFilter !== "" && searchCriteriaFilter.length >2){
          filteredList = searchList.filter(function(el){
            return el.party_name.toLowerCase().indexOf(searchCriteriaFilter.toLowerCase()) > -1;
        }.bind(this));
            
      } else{
          filteredList = [];
      }
    
      if($event.target.name === 'employer1'){
          this.filteredEmpList = filteredList;
        } else if($event.target.name === 'employer2'){
          this.filteredEmp2List = filteredList;
        } else if($event.target.name === 'attorney1'){
          this.filteredAtty1List = filteredList;
        } else if($event.target.name === 'attorney2'){
          this.filteredAtty2List = filteredList;
        } else if($event.target.name === 'attorney3'){
          this.filteredAtty3List = filteredList;
        } else if($event.target.name === 'carrierName1'){
          this.filteredCarr1List = filteredList;
        } else if($event.target.name === 'carrierName2'){
          this.filteredCarr2List = filteredList;
        }
    }

    select(item) {
      console.log('selected item : ', item);
      if(this.searchKey === "employer1"){
        this.caseCreateDataForm.controls['Employer1'].setValue(item.party_name);
        this.caseCreateDataForm.controls['EmpPartyAdr1'].setValue(this.formatString(item.address_street1, item.city, item.state));
        this.caseCreateDataForm.controls['EmpPartyId1'].setValue(item.party_id);
        this.filteredEmpList=[];
      }else if(this.searchKey === "employer2"){
        this.caseCreateDataForm.controls['Employer2'].setValue(item.party_name);
        this.caseCreateDataForm.controls['EmpPartyAdr2'].setValue(item.address_street1 +" "+item.city+" "+item.state);
        this.caseCreateDataForm.controls['EmpPartyId2'].setValue(item.party_id);
        this.filteredEmp2List=[];
      }else if(this.searchKey === "attorney1"){
        this.caseCreateDataForm.controls['attorney1'].setValue(item.party_name);
        this.caseCreateDataForm.controls['attPartyAdr1'].setValue(item.address_street1 +" "+item.city+" "+item.state);
        this.caseCreateDataForm.controls['attPartyId1'].setValue(item.party_id);
        this.filteredAtty1List=[];
      }else if(this.searchKey === "attorney2"){
        this.caseCreateDataForm.controls['attorney2'].setValue(item.party_name);
        this.caseCreateDataForm.controls['attPartyAdr2'].setValue(item.address_street1 +" "+item.city+" "+item.state);
        this.caseCreateDataForm.controls['attPartyId2'].setValue(item.party_id);
        this.filteredAtty2List=[];
      }else if(this.searchKey === "attorney3"){
        this.caseCreateDataForm.controls['attorney3'].setValue(item.party_name);
        this.caseCreateDataForm.controls['attPartyAdr3'].setValue(item.address_street1 +" "+item.city+" "+item.state);
        this.caseCreateDataForm.controls['attPartyId3'].setValue(item.party_id);
        this.filteredAtty3List=[];
      }else if(this.searchKey === "carrierName1"){
        this.caseCreateDataForm.controls['carrierName1'].setValue(item.party_name);
        this.caseCreateDataForm.controls['carrierPartyAdr1'].setValue(item.address_street1 +" "+item.city+" "+item.state);
        this.caseCreateDataForm.controls['carrierPartyId1'].setValue(item.party_id);
        this.filteredCarr1List=[];
      }else if(this.searchKey === "carrierName2"){
        this.caseCreateDataForm.controls['carrierName2'].setValue(item.party_name);
        this.caseCreateDataForm.controls['carrierPartyAdr2'].setValue(item.address_street1 +" "+item.city+" "+item.state);
        this.caseCreateDataForm.controls['carrierPartyId2'].setValue(item.party_id);
        this.filteredCarr2List=[];
      }
    }

    formatString(value1, value2, value3) {
      let output: any;
      output = value1 + ' ' + value2 + ' ' + value3;
      return output;
    }

    casaValidation($event) {
      let inputSsn = $event.target.value;
      console.log('casaValidation event : ', $event);
     console.log('$event.srcElement.id event : ', $event.srcElement.id);
      if($event.srcElement.id === 'ssnData'){
        console.log("Text box Checked");
        //this.data1 = this.data;
        console.log(" SSSN Clicked ", inputSsn);
        this.palService.checkPotentialDuplicateDataEntry(inputSsn).subscribe(
              (response: Response) => {
                //this.data = response.json().DocumentList;
                this.data1 = response.json().duplicateDataList;  
                if(this.data1 && this.data1.length > 0){
                  jQuery('#remDupCase').modal('show');
               }
               }
            );
        
       
      }
      else {
        jQuery('#remindermodal').modal('hide');
        console.log("Text box Unchecked");
      }
    }

    onSubmit({ value, valid }: { value: CaseCreateData, valid: boolean }) {
      console.log(value, valid);
      this.loading = true;
      jQuery('#spinnerCasemodal').modal('show');
      let updatedCaseCreateData = this.setExtentOfInjury(value);
      if(valid)
        this.caseCreateEvent.emit(updatedCaseCreateData);
    }

    createCase(value: CaseCreateData){
      this.loading = true;
      jQuery('#spinnerCasemodal').modal('show');
     // loading: boolean = false;
      //this.processCaseCreate();
      
      this.caseCreateEvent.emit(value);
    }

    setExtentOfInjury(value: CaseCreateData) {

      let firstLostTime = value.firstLosDate !== "" ? new Date(value.firstLosDate) : "";
      let returnedToWork = value.returnedToWork !== "" ? new Date(value.returnedToWork) : "";
      
      if(value.causedDeath === 'Yes')
      {
        value.extentOfInjury = 'DEA';
        value.injuryType = 'DEA';
      }
      else if(value.causedLostTime === 'Yes' && (firstLostTime === "" || returnedToWork === ""))
        value.extentOfInjury = 'LTO4';
      else if(value.causedLostTime === 'No')
        value.extentOfInjury = 'NLT';
      else if(firstLostTime !== "" && returnedToWork !== "" && returnedToWork > firstLostTime)
      {
        let lostTime = this.dateDiffInDays(firstLostTime, returnedToWork);
        if(lostTime <= 3) { value.extentOfInjury = 'LTO3';}
        else if(lostTime > 3) {value.extentOfInjury = 'LTO4';}
        else if(lostTime === 0) {value.extentOfInjury = 'NLT';}
      }
      return value;
    }

    dateDiffInDays(date1, date2) {
      let dt1 = new Date(date1);
      let dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }

    dupCaseDetails(data: any) {
      console.log('dupCaseDetails data : ', data);
      //Make service call to retrieve the case details and pass back to UI .. use callback functions
      this.dupCaseDetail = data;
      jQuery('#remDupCase').modal('hide');
      jQuery('#remDupCaseDetail').modal('show');
    }

    dupCaseLetter(generateLetter: string) {

      let dupeCaseData: any = {
        "generateLetter": generateLetter,
        "caseNumber": this.dupCaseDetail.caseNumber,
        "caseDocIntakeId": this.caseDocIntakeId
      }
      this.dupCaseLetterEvent.emit(dupeCaseData);
      jQuery('#remDupCaseDetail').modal('hide');
    }

    dupCaseBack($event){
      jQuery('#remDupCaseDetail').modal('hide');
      jQuery('#remDupCase').modal('show');
    }

    dupCaseCancel($event){
      jQuery('#remDupCaseDetail').modal('hide');
      jQuery('#remDupCase').modal('hide');
    }

    getCurrentDateString() {

      var today = new Date();
      var dd = today.getDate()-1;
      var mm = today.getMonth()+1; //January is 0!
      var datePart: string = "";
      var monthPart: string = "";
      
      var yyyy = today.getFullYear().toString();
      if(dd<10)
        datePart = '0'+ dd.toString() ;
      else
        datePart = dd.toString();
      if(mm<10)
        monthPart='0'+mm;
      else
        monthPart = mm.toString();

      return yyyy + '-' + monthPart + '-' + datePart;
    }

    getCurrentDate() {
      
      var today = new Date();
      var dd = today.getDate()-1;
      var mm = today.getMonth()+1; //January is 0!
      var datePart: string = "";
      var monthPart: string = "";
      
      var yyyy = today.getFullYear().toString();
      if(dd<10)
        datePart = '0'+ dd.toString() ;
      else
        datePart = dd.toString();
      if(mm<10)
        monthPart='0'+mm;
      else
        monthPart = mm.toString();

      return yyyy + '-' + monthPart + '-' + datePart;
    }

    checkDateGreaterCondition(olderDate: string,newerDate: string) {

      if(newerDate === undefined)
      newerDate = this.getCurrentDate();

      let date1 = new Date(olderDate);
      let date2 = new Date(newerDate);

      return (newerDate > olderDate);
    }
  }
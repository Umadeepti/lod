import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PalService } from '../pal/pal.service';
import {LookupService} from '../../shared/lookup.service';
import { CasesService } from './cases.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, Location } from '@angular/common';
import { CaseCreateData }    from './caseCreate.model';
import { CaseIndexData }    from './caseIndex.model';
import { Response } from '@angular/http';
import { QueueService } from '../queue/queue.service';

declare var jQuery: any;

export class RefData {
  constructor(public value: string) { }
}

export class CategorySubjectPair {
  constructor(public Category: string, public Subject: RefData[]) { }
}

@Component({
  selector: 'case-case-page',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './caseCreate.html',
  styleUrls: ['../../../assets/css/nav.css']
})

export class CaseCreateComponent implements OnInit {
  
  
    id: number;
    caseDocIntakeId: string = "";
    casaStep: string = "mainStep";
    caseIndexData: CaseIndexData;
   
    casaradioValue: string;
    radioValue: string;
    selectedCategory: string = "";
    selectedSubject: string ="";
    selectedPayment: string ="";
    selectedSettlement: string ="";
    selectedReviewStatus: string ="";
    otherOptionReason: string = "";
    categoryList: CategorySubjectPair[];
    reindexStatusList: RefData[];
    subjectList: RefData[];
    paymentList: RefData[];
    settlementTypeList: RefData[];
    PartOfBodyList: RefData[];
    NatureOfInjuryList: RefData[];
    InjuryTypeList: RefData[];
    ExtentOfInjuryList: RefData[];
    CaseTypeList: RefData[];
    CountryList: RefData[];
    USStateList: RefData[];
    CAProvinceList: RefData[];
    MXStateList: RefData[];
    filteredList: any;
    data: any;
    data1: any;
    dupCaseDetail: any;
    caseCreateNow: string;
    nextDocId: string = "";
    caseCreateNextDocId: string = "";
    allCasesFlag: string = "";
    caseCreateNowStr: string = "";
    cancelCaseCreateFlag: boolean = false;
    incomingQueueNowFlag: boolean = false;
    deleteLetterRouteFlag: boolean = false;
    selectedForm: number = 0;
    ls202Form: boolean = false;
    districtOfficeSelection: string = "";
    scannedDate: string;
  
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    public rowsOnPageSet = 5;
    public docID = "12345";
    public caseMessage: string = "";
    selectedRow : Number;
    setClickedRow : Function;
    //processCaseCreate : Function;
    loading: boolean = false;
  
     public filterQuery1 = "";
    public rowsOnPage1 = 10;
    public sortBy1 = "email";
    public sortOrder1 = "asc";
    public rowsOnPageSet1 = 5;
    selectedRow1 : Number;
  
    selectedDupCase : Number;
    setDupCaseRow : Function;
    public caseCreateData;

    private processCaseCreate(){
      // IndexCaseDocuments
      this.casesService.CreateCase(this.caseCreateData, this.caseDocIntakeId ).subscribe(
          (response: Response) => {  
          console.log("processCaseCreate CASE CREATE response: " , response.json());            
          //  this.settlementTypeList = response.json(); 
          this.caseMessage =   response.json().ResponseMessage.text;   
          this.loading = false;
          
          jQuery('#spinnerCasemodal').modal('hide');
          jQuery('#createCasemodal').modal('show');
          });
    }

     // public searchCriteria = '';
     public searchKey = '';
     public searchDataList = [];
     public searchAttList = [];
     public searchIncCarrList = [];
     public searchIncEmpList = [];
     public filteredEmpList = [];
     public filteredEmp2List = [];
     public filteredAtty1List = [];
     public filteredAtty2List = [];
     public filteredAtty3List = [];
     public filteredCarr1List = [];
     public filteredCarr2List = [];
     public elementRef;

     pdfSystemID: string = '';
     
     private ProcessIndexDocToCase(){
       
       // IndexCaseDocuments
          this.casesService.IndexDocumentToCase(this.caseIndexData, this.caseIndexData.caseNumber, this.id ).subscribe(
                (response: Response) => {              
                //  this.settlementTypeList = response.json();            
                  console.log("setProcessQueueDocs INDEX response: " , response.json());
                 }
              );
       }
     
     
      private setProcessQueueDocs(districtOfficeSel: any) {
        let districtOfficeSelection = districtOfficeSel !== undefined ? districtOfficeSel : "";
        this.queueService.ProcessQueueDocument(this.caseDocIntakeId, this.casaStep, this.otherOptionReason, 'N', districtOfficeSelection).subscribe(
               (response: Response) => {              
                 //this.settlementTypeList = response.json().SettlementTaskTypes;            
                 //console.log("setProcessQueueDocs response: " , response.json().SettlementTaskTypes);
                 this.pdfSrc = "";
                 //this.router.navigate(['queue', this.nextDocId]);
                 this.location.replaceState('caseIndex')
                 this.route.params['InTakDocID'] = 0;
                 this.routeToOtherComponent();
                }
        );
      }
     
     
     
     //DELETE QUEUE With Letter function
     private setDelQueWithLetter(){
          this.queueService.ProcessQueueDocument(this.caseDocIntakeId, this.casaStep, this.otherOptionReason, 'Y', "").subscribe(
                (response: Response) => {              
                  this.settlementTypeList = response.json().SettlementTaskTypes;            
                  console.log("setDelQueWithLetter response: " , response.json().SettlementTaskTypes);
                 }
              );
       }
     //DELETE QUEUE Without Letter function
     private setDelQueWithOutLetter(){
          this.queueService.ProcessQueueDocument(this.caseDocIntakeId, this.casaStep, this.otherOptionReason, 'N', "").subscribe(
                (response: Response) => {              
                  this.settlementTypeList = response.json().SettlementTaskTypes;            
                  console.log("setDelQueWithOutLetter response: " , response.json().SettlementTaskTypes);
                 }
              );
       }
     

    constructor(  private route: ActivatedRoute,
                  private router: Router, 
                  private palService: PalService, 
                  private lookupService: LookupService,
                  private location: Location,
                  private casesService: CasesService,
                  private queueService: QueueService,
                  myElement: ElementRef) {

      this.elementRef = myElement;
      this.selectedForm = 1;
      this.setClickedRow = function(index) {
        this.docID = index;
      }
      this.setDupCaseRow = function(data) {
            //this.selectedRow = index;
        this.dupCaseDetails(data);
      }
    }

    /*
    searchFilter($event) {
      console.log('user click event : ', $event.target.name);
      let searchCriteriaFilter:string="";
      this.searchKey=$event.target.name;
      let filteredList = [];
      let searchList = [];
     if($event.target.name === 'employer1'){
        searchCriteriaFilter=this.caseCreateData.Employer1;
        searchList = this.searchDataList;
      }else if($event.target.name === 'employer2'){
        searchCriteriaFilter=this.caseCreateData.Employer2;
        searchList = this.searchDataList;
      }else if($event.target.name === 'attorney1'){
      searchCriteriaFilter=this.caseCreateData.attorney1;
      searchList = this.searchAttList;
      }else if($event.target.name === 'attorney2'){
        searchCriteriaFilter=this.caseCreateData.attorney2;
        searchList = this.searchAttList;
      }else if($event.target.name === 'attorney3'){
        searchCriteriaFilter=this.caseCreateData.attorney3;
        searchList = this.searchAttList;
      }else if($event.target.name === 'carrierName1'){
        searchCriteriaFilter=this.caseCreateData.carrierName1;
        searchList = this.searchIncCarrList;
      }else if($event.target.name === 'carrierName2'){
        searchCriteriaFilter=this.caseCreateData.carrierName2;
        searchList = this.searchIncCarrList;
      } 
      console.log('user click event search criteria : ', searchCriteriaFilter);
        
      if (searchCriteriaFilter !== "" && searchCriteriaFilter.length >2){
          filteredList = searchList.filter(function(el){
            return el.party_name.toLowerCase().indexOf(searchCriteriaFilter.toLowerCase()) > -1;
        }.bind(this));
            
      }else{
          filteredList = [];
      }
    
      if($event.target.name === 'employer1'){
          this.filteredEmpList = filteredList;
        }else if($event.target.name === 'employer2'){
          this.filteredEmp2List = filteredList;
        }else if($event.target.name === 'attorney1'){
          this.filteredAtty1List = filteredList;
        }else if($event.target.name === 'attorney2'){
          this.filteredAtty2List = filteredList;
        }else if($event.target.name === 'attorney3'){
          this.filteredAtty3List = filteredList;
        }else if($event.target.name === 'carrierName1'){
          this.filteredCarr1List = filteredList;
        }else if($event.target.name === 'carrierName2'){
          this.filteredCarr2List = filteredList;
        }
        
    } */

    /*
    select(item){
      console.log('selected item : ', item);
      if(this.searchKey === "employer1"){
        this.caseCreateData.Employer1 = item.party_name;
        this.caseCreateData.EmpPartyAdr1 = item.address_street1 +" "+item.city+" "+item.state;
        this.caseCreateData.EmpPartyId1=item.party_id;
        this.filteredEmpList=[];
      }else if(this.searchKey === "employer2"){
        this.caseCreateData.Employer2 = item.party_name;
        this.caseCreateData.EmpPartyAdr2 = item.address_street1 +" "+item.city+" "+item.state;
        this.caseCreateData.EmpPartyId2=item.party_id;
        this.filteredEmp2List=[];
      }else if(this.searchKey === "attorney1"){
        this.caseCreateData.attorney1 = item.party_name;
        this.caseCreateData.attPartyAdr1 = item.address_street1 +" "+item.city+" "+item.state;
        this.caseCreateData.attPartyId1=item.party_id;
        this.filteredAtty1List=[];
      }else if(this.searchKey === "attorney2"){
        this.caseCreateData.attorney2 = item.party_name;
        this.caseCreateData.attPartyAdr2 = item.address_street1 +" "+item.city+" "+item.state;
        this.caseCreateData.attPartyId2=item.party_id;
        this.filteredAtty2List=[];
      }else if(this.searchKey === "attorney3"){
        this.caseCreateData.attorney3 = item.party_name;
        this.caseCreateData.attPartyAdr3 = item.address_street1 +" "+item.city+" "+item.state;
        this.caseCreateData.attPartyId3 =item.party_id;
        this.filteredAtty3List=[];
      }else if(this.searchKey === "carrierName1"){
        this.caseCreateData.carrierName1 = item.party_name;
        this.caseCreateData.carrierPartyAdr1 = item.address_street1 +" "+item.city+" "+item.state;
        this.caseCreateData.carrierPartyId1 =item.party_id;
        this.filteredCarr1List=[];
      }else if(this.searchKey === "carrierName2"){
        this.caseCreateData.carrierName2 = item.party_name;
        this.caseCreateData.carrierPartyAdr2 = item.address_street1 +" "+item.city+" "+item.state;
        this.caseCreateData.carrierPartyId2 = item.party_id;
        this.filteredCarr2List=[];
      }  
    }*/

public carrierName1: string;
public carrierPartyId1: number;
public carrierPartyAdr1: string;

     
 
    handleClick(event){
      var clickedComponent = event.target;
      var inside = false;
      do {
          if (clickedComponent === this.elementRef.nativeElement) {
              inside = true;
          }
         clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);
       if(!inside){
           this.filteredList = [];
       }
    }

    ngOnInit(): void {

      this.caseCreateData = new CaseCreateData();
      this.caseDocIntakeId = "";
      this.resetFlags();
      
      this.route.params
      .subscribe(
        (params: Params) => {
          this.caseCreateNow = params['CreateNow'];
          this.caseDocIntakeId = params['InTakDocID'];
          
          if (this.caseCreateNow === 'true') {
            this.caseCreateNextDocId = params['NextDocId'];
            this.allCasesFlag = "N";
            this.caseCreateNowStr = "INCOMING";
          }
          else {
            //this.caseCreateNextDocId;
            this.allCasesFlag = "Y";
            this.caseCreateNowStr = "CASECREATE";
          }   

          if(this.nextDocId !== "") 
            this.caseDocIntakeId = this.nextDocId;
         // this.id = +params['InTakDocID'];
          this.id = 123456789;
          console.log('CaseID' , this.id);
          this.palService.getOtherTasks(this.id).subscribe(
             (response: Response) => {
               this.data = response.json().DocumentList; 
              // console.log('data from getOPSPlanPalTask servcie : ', this.data);
               //hard coding to display the 12345 pdf -- implement logic as per business rule to display the correct pdf
               this.docID = "12345";
               //this.casaStep = "mainStep";
              }
           );
        }
      );

      /* replaced by below callback method
      this.palService.lockBatchByDocID(this.caseDocIntakeId, 'CASECREATE', 'Y').subscribe(
        (response: Response) => {              
        //this.categoryList = response.json().getSharedQueueDocsOutput;             
          //console.log("categoryList response: " , this.categoryList);
          //this.pdfSystemID = response.json().getSharedQueueDetailsOutput.EXTERNAL_SYS_DOC_ID; 
          this.pdfSrc = response.json().getSharedQueueDetailsOutput.EXTERNAL_SYS_DOC_ID; 
 
          console.log('pdfSystemID', this.pdfSystemID);
          console.log('returned from pdfSystemID', this.pdfSystemID); 
         }
      );*/

      this.palService.lockBatchByDocID(this.caseDocIntakeId.toString(), this.caseCreateNowStr, this.allCasesFlag).then(data => {
        let dataArray= data || {};
        let batchData = dataArray.getSharedQueueDetailsOutput;
        this.pdfSrc = batchData[0].EXTERNAL_SYS_DOC_ID;
        this.scannedDate = batchData[0].CREATE_DTS;
        //this.dataService.setData(batchData);
        console.log('pdfSystemID', this.pdfSystemID);
        console.log('returned from pdfSystemID', this.pdfSystemID); 
        if(batchData.length > 1) {
          this.nextDocId = batchData[1].DOCUMENT_INTAKE_ID;
        }
        else {
          this.nextDocId = "";
        }
          
      });

      
          


      
 
    } //ngOnInit
/*
  // Radio Other options
    public casaNext(){
      if(this.casaradioValue==='SendDistrictOffice'){
        this.casaStep = "SendDistrictOffice";
      }else if(this.casaradioValue==='SendCaseCreate'){
        this.casaStep = "SendCaseCreate";
        console.log('radio SendCaseCreate');
      }else if(this.casaradioValue==='SendInMail'){
        this.casaStep = "SendInMail";
        console.log('radio SendInMail');
      }else if(this.casaradioValue==='ReviewClaimData'){
        this.casaStep = "ReviewClaimData";
        console.log('radio ReviewClaimData');
      }else if(this.casaradioValue==='SendSecondLevel'){
        this.casaStep = "SendSecondLevel";
        console.log('radio SendSecondLevel');
      }else if(this.casaradioValue==='DeleteDocument'){
        this.casaStep = "DeleteDocument";
        console.log('radio DeleteDocument');
      }
      console.log('casaNext button clicked : '+ this.casaStep);
    }
  */
  public change(options) {
    let item = this.categoryList.find(i => i.Category === this.selectedCategory);
    this.subjectList = item.Subject;
    this.selectedSubject="";
   }
  
    public toInt(num: string) {
        return +num;
    }

  public uppercase(value: string) {
    return value.toUpperCase();
  }  

    public sortReceivedDate = (a: any) => {
        return new Date(a.ReceivedDate);

    }    

    public sortAuthorDate = (a: any) => {
        return new Date(a.AuthorDate);

    }    

   public casaReIndexNext($event){
     console.log('casereIndex event : ', $event);
     if($event.target.value === 'Previous'){
       this.casaStep = "mainStep"; //mainStep
     }else if($event.target.value === 'UpdateApprove'){
       //this.casaStep = "mainStep"; //mainStep
       jQuery('#remPadocMdl').modal('show');
     }else if($event.target.value === 'Update'){
       this.casaStep = "mainStep"; //mainStep
     }else if($event.target.checked){
       console.log("Text box Checked");
       jQuery('#remindermodal').modal('show');
     }else{
       jQuery('#remindermodal').modal('hide');
       console.log("Text box Unchecked");
     }
   }
  

   /*
   public casaValidation($event){
     console.log('casaValidation event : ', $event);
    console.log('$event.srcElement.id event : ', $event.srcElement.id);
     if($event.srcElement.id === 'ssnData'){
       console.log("Text box Checked");
       //this.data1 = this.data;
       console.log(" SSSN Clicked ", this.caseCreateData.SSN);
       this.palService.checkPotentialDuplicateDataEntry(this.caseCreateData.SSN).subscribe(
             (response: Response) => {
               //this.data = response.json().DocumentList;
               this.data1 = response.json().duplicateDataList;  
               if(this.data1 && this.data1.length > 0){
                jQuery('#remDupCase').modal('show');
              }
              }
           );
       
      
     }else{
      jQuery('#remindermodal').modal('hide');
       console.log("Text box Unchecked");
     }
   }*/
   /*
    private dupCaseDetails(data: any) {
      //private dupCaseDetails(ssn: string){
        console.log('dupCaseDetails data : ', data);
        //Make service call to retrieve the case details and pass back to UI .. use callback functions
        this.dupCaseDetail = data;
        jQuery('#remDupCase').modal('hide');
        jQuery('#remDupCaseDetail').modal('show');
    
    }

    public dupCaseBack($event){
        jQuery('#remDupCaseDetail').modal('hide');
        jQuery('#remDupCase').modal('show');
    }

    public dupCaseCancel($event){
      jQuery('#remDupCaseDetail').modal('hide');
      jQuery('#remDupCase').modal('hide');
    }*/

    // CASE Create events
    public createCase($event){
      this.loading = true;
      jQuery('#spinnerCasemodal').modal('show');
     // loading: boolean = false;
      console.log('caseCreate Console ---------------------');
      console.log('caseCreate Console :- caseForm ',  this.caseCreateData.caseForm);
      console.log('caseCreate Console :- SSN ', this.caseCreateData.SSN);
      console.log('caseCreate Console :- caseCreateData.dateOfInjury ',  this.caseCreateData.dateOfInjury);
      console.log('caseCreate Console :- dateOfBirth ', this.caseCreateData.dateOfBirth);
      console.log('caseCreate Console :- injuredLastName ',  this.caseCreateData.injuredLastName);
      console.log('caseCreate Console :- injuredFirstName', this.caseCreateData.injuredFirstName);    
 
      this.processCaseCreate();
    }

    caseCreateEvent(caseCreateData: CaseCreateData) {

      this.caseCreateData = caseCreateData;
      this.createCase(caseCreateData);
    }

    public cancelCaseCreate($event){
      console.log('Cancel Case create going back to queue');
      this.caseCreateData = new CaseCreateData();
      this.cancelCaseCreateFlag = true;
      this.routeToOtherComponent();
    }


    public closeCaseCreateAlert(){
     
      jQuery('#createCasemodal').modal('hide');
      this.caseMessage = "";
      this.caseCreateData = new CaseCreateData();
      //this.router.navigate(['queue']);
      this.routeToOtherComponent();
    }

    resetFlags() {

      this.cancelCaseCreateFlag = false;
      this.caseCreateNow = 'false';
      this.incomingQueueNowFlag = false;
      this.deleteLetterRouteFlag = false;
    }

    routeToOtherComponent() {

      
      if(this.caseCreateNow  === 'true' && this.caseCreateNextDocId !== '')
        this.router.navigate(['caseIndex', this.caseCreateNextDocId, false, ""]);
      else if(this.caseCreateNow === 'true' && this.cancelCaseCreateFlag)
        this.router.navigate(['caseIndex', this.caseDocIntakeId, false, ""]);
      else if(this.caseCreateNow  === 'true' && this.caseCreateNextDocId === '')
        this.router.navigate(['queue/SQCaseCreate']);
      else if(this.incomingQueueNowFlag)
        this.router.navigate(['caseIndex', this.caseDocIntakeId, true, this.nextDocId]);
      else if(this.caseCreateNow  !== 'true' && this.nextDocId !== '')
        this.ngOnInit();
      else 
        this.router.navigate(['queue/SQCaseCreate']);
    }
      // Radio Other options
      public casaNext(otherOptionsForm: NgForm, value: any) {
        this.casaStep = this.radioValue;
        
        let districtOfficeSel = value.selectedIndex;

        if(this.casaStep==='DeleteDocument'){
            jQuery('#deletemodal').modal('show');
          console.log('radio DeleteDocument');
        }else if( this.casaStep==='IncomingQueueNow' ){
          this.resetFlags();
          this.incomingQueueNowFlag = true;
          this.routeToOtherComponent();
          console.log('Going to Incoming Queue Now: ', this.casaStep);
          
          //this.router.navigate(['caseIndex', this.caseDocIntakeId, true, this.nextDocId]);
        } else{
          console.log('Else Invoking SetProcessQUEUE1: ', this.casaStep);
          this.setProcessQueueDocs(districtOfficeSel);
          console.log('Else radio: ', this.casaStep);
          //this.router.navigate(['queue']);
        }
        console.log('casaNext button clicked : '+ this.casaStep);
        otherOptionsForm.reset();
        this.districtOfficeSelection = "";
      }
    
     public DelQueWithLetter(){
        this.casaStep = this.radioValue;
        console.log('Calling DELETE QUEUE : '+ this.casaStep);
        this.setDelQueWithLetter();
        jQuery('#deletemodal').modal('hide');
        //this.resetFlags();
        this.deleteLetterRouteFlag = true;
        this.routeToOtherComponent();
        //this.router.navigate(['queue']);
     }
    
    public DelQueWithOutLetter(){
        this.casaStep = this.radioValue;
        console.log('Calling DELETE OUT QUEUE : '+ this.casaStep);
        this.setDelQueWithOutLetter();
        jQuery('#deletemodal').modal('hide');
        //this.resetFlags();
        this.deleteLetterRouteFlag = true;
        this.routeToOtherComponent();
        //this.router.navigate(['queue']);
     }
    
    public DelWithCancel(){
       this.casaStep = this.radioValue;
       console.log('Calling DelWithCancel : '+ this.casaStep);
       jQuery('#deletemodal').modal('hide');
    }

    dupCaseLetterEvent(dupeCaseData: any) {

      console.log('Calling DupCase: ');
      this.setupDupCase(dupeCaseData.caseNumber, dupeCaseData.caseDocIntakeId, dupeCaseData.generateLetter);
      jQuery('#remDupCaseDetail').modal('hide');
      this.routeToOtherComponent();
    }

    setupDupCase(caseNumber: any, caseDocIntakeId: string, generateLetter: string) {

      this.casesService.ProcessDupToCase( caseNumber, caseDocIntakeId,   generateLetter).subscribe(
        (response: Response) => {
           
          console.log("setDupCaseWithLetter response: " , response.json().ResponseMessage);
          console.log("setDupCaseWithLetter Error Msg: " , response.json().ErrorMessage);
         }
      );
    }

    selectForm(value: number) {
      this.ls202Form = false;
      this.loading = true;
      this.selectedForm = value + 1;
      if(value === 1)
        this.ls202Form = true
      this.caseCreateData = undefined;
      this.loading = false;
    }
  
////////
title = 'app';
  pdfSrc: string ;
  //= 'https://owcp-test-jad.acuitys.com/alfresco/guestDownload/d/workspace/SpacesStore/9190feed-f56a-4a35-81d3-6e474067147c/Employer_PrePenalty_Of_Injury_Late_3002698_20171003153626801.pdf';
  //pdfSrc: string = 'https://owcp-dev-wmadmin.acuitys.com/PATDOC/sagManual.pdf'
  //pdfSrc: string = 'https://edms.acuitys.com/alfresco/guestDownload/d/workspace/SpacesStore/795da1eb-efd5-404b-9b25-5f0ded6b2a23/alfresco_5.2_enterprise.pdf';
  
  page: number = 1;
  rotation: number = 0;
  zoom: number = 1;
  originalSize: string = 'true';

  rotate(){
    console.log('rotate clicked -- ');
    this.rotation = this.rotation+90;
    console.log('rotate clicked value -- '+ this.rotation);
  }
  goPrevious(){
    this.page = this.page-1;
  }

  goNext(){
    this.page = this.page+1;
  }

  zoomIn(){
    this.zoom = this.zoom+0.25;
  }
  zoomOut(){
    this.zoom = this.zoom-0.25;
  }
  fit(){
    this.zoom = 1;
    this.originalSize = 'false';
    this.rotation = 0;
  }
}

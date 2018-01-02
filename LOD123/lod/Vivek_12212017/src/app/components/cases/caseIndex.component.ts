import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PalService } from '../pal/pal.service';
import { QueueService } from '../queue/queue.service';
import {LookupService} from '../../shared/lookup.service';
import { CasesService } from './cases.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, Location } from '@angular/common';
import { CaseIndexData }    from './caseIndex.model';
import { Response } from '@angular/http';
import { EmitterService } from '../../emitter.service';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
//declare var $:JQueryStatic;
declare var $:any;

export class RefData {
  
  constructor(public value: string) { }
}

export class CategorySubjectPair {
  constructor(public Category: string, public Subject: RefData[]) { }
}

@Component({
  selector: 'case-index-page',
  templateUrl: './caseIndex.html',
  styleUrls: ['../pal/pal-nav.component.css']
})
export class CaseIndexComponent implements OnInit {
  
    id: number;
    batchID: string;
    NextDocIntakeID : string;
    docIntakeID: string;
    otherOptionReason: string = "";
    casaStep: string = "mainStep";
    casaradioValue: string;
    radioValue: string;
    selectedCategory: string = "";
    selectedSubject: string ="";
    selectedPayment: string ="";
    selectedSettlement: string ="";
    selectedReviewStatus: string ="";
    categoryList: CategorySubjectPair[];
    reindexStatusList: RefData[];
    subjectList: RefData[];
    paymentList: RefData[];
    settlementTypeList: RefData[];
    documentClassList: RefData[];
    batchData: any[];
    data: any;
    currentQueueType: string = "";
    //$: any;
    //$: JQueryStatic;
    tempCaseID: string;
    
  
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    public rowsOnPageSet = 5;
    public docID = "12345";
    public caseIndexData: CaseIndexData;
    previousUrl: string;
    page: number = 1;
    rotation: number = 0;
    zoom: number = 1;
    originalSize: string = 'true';

    pdfSystemID: string = '';
    selectedRow : Number;
    setClickedRow : Function;
    title = 'app';
    pdfSrc: string = this.pdfSystemID;
    nextDocId: string = "";
    indexNowNextDocId: string = "";
    indexNow: string = "false";
    caseCreateNowFlag: boolean = false;
    deleteLetterFlag: boolean = false;
    allCasesFlag: string = "";
    indexNowStr: string = "";

    if(pdfSystemID){
      console.log('pdfSystemID', this.pdfSystemID);
      this.pdfSrc = this.pdfSystemID;
    }
  /*setProcessQueueDocs :Function;
  setDelQueWithLetter : Function;
  setDelQueWithOutLetter : Function;
   ProcessIndexDocToCase : Function;
   getNextDocFromBat: Function; */
  
  
  
  
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
      this.queueService.ProcessQueueDocument(this.id.toString(), this.casaStep, this.otherOptionReason, 'N', districtOfficeSelection).subscribe(
             (response: Response) => {              
               //this.settlementTypeList = response.json().SettlementTaskTypes;            
               //console.log("setProcessQueueDocs response: " , response.json().SettlementTaskTypes);
               this.pdfSrc = "";
               //this.router.navigate(['queue', this.nextDocId]);
               this.route.params['InTakDocID'] = 0;
               this.location.replaceState('caseIndex');
               //this.resetFlags();
               this.routeToOtherComponents();
              }
      );
    }
  
  
  
  //DELETE QUEUE With Letter function
  private setDelQueWithLetter(){
       this.queueService.ProcessQueueDocument(this.id.toString(), this.casaStep, this.otherOptionReason, 'Y', "").subscribe(
             (response: Response) => {              
               this.settlementTypeList = response.json().SettlementTaskTypes;            
               console.log("setDelQueWithLetter response: " , response.json().SettlementTaskTypes);
              }
           );
    }
  //DELETE QUEUE Without Letter function
  private setDelQueWithOutLetter(){
       this.queueService.ProcessQueueDocument(this.id.toString(), this.casaStep, this.otherOptionReason, 'N', "").subscribe(
             (response: Response) => {              
               this.settlementTypeList = response.json().SettlementTaskTypes;            
               console.log("setDelQueWithOutLetter response: " , response.json().SettlementTaskTypes);
              }
           );
    }


  private getNextDocFromBat(){
    /*this.palService.getNextDocFromBatch(this.batchID, 'INCOMING').subscribe(
      (response: Response) => {              
      console.log('Batch Next Docs', response);
        this.NextDocIntakeID = response.json().DOCUMENT_INTAKE_ID;
        console.log(' this.NextDocIntakeID',  this.NextDocIntakeID);
        //console.log('returned from pdfSystemID', this.pdfSystemID); 
       }
    );*/
    this.processDocumentList(this.nextDocId);
  }
  
    constructor(private route: ActivatedRoute,
              private router: Router, 
              private palService: PalService, 
              private lookupService: LookupService,
              private queueService: QueueService,
              private casesService: CasesService,
              private emitterService: EmitterService,
              private dataService: DataService,
              private location: Location) {
    
              this.setClickedRow = function(index){
              this.docID = index;
              this.caseIndexData = new CaseIndexData();
        }
    }

    ngOnInit(): void {
      //this.caseIndexData = CaseIndexData;
      //this.caseIndexData();
      this.caseIndexData = new CaseIndexData();
      /*this.caseIndexData.caseNumber = "";          
      this. caseIndexData.claimant = "";
      this.caseIndexData.docIntakeId = '';
      this.caseIndexData.category = "";
      this.caseIndexData.subject = "";
      this.caseIndexData.reviewStatus = "";
      this.caseIndexData.authorDate = "";
      this.caseIndexData.receivedDate = "";
      this.caseIndexData.description = "";
      this.caseIndexData.postmarkDate = "";
      this.caseIndexData.priorityFlag = "";
      this.caseIndexData.duplicateFlag = "";
      this.caseIndexData.sensitiveFlag = "";
      this.caseIndexData.docClass = ""; */
      
      this.resetFlags();
      
      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = 0;
          this.indexNow = params['IndexNow'];
          this.id = +params['InTakDocID'];

          if (this.indexNow === 'true') {
            this.indexNowNextDocId = params['NextDocId'];
            this.allCasesFlag = "N";
            this.indexNowStr = "CASECREATE";
          }
          else {
            this.allCasesFlag = "Y";
            this.indexNowStr = "INCOMING";
          }

          if(this.nextDocId !== "")
            this.id = this.toInt(this.nextDocId);
         
          console.log('InTakDocID' , this.id);
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

      /*this.palService.lockBatchByDocID(this.id.toString(), 'INCOMING', 'Y').subscribe(
        (response: Response) => {              
        //this.categoryList = response.json().getSharedQueueDocsOutput;             
          //console.log("categoryList response: " , this.categoryList);
          this.pdfSystemID = response.json().getSharedQueueDetailsOutput.EXTERNAL_SYS_DOC_ID; 
          this.pdfSrc = response.json().getSharedQueueDetailsOutput.EXTERNAL_SYS_DOC_ID; 
          this.batchID = response.json().getSharedQueueDetailsOutput.BATCH_ID;
          console.log('pdfSystemID', this.pdfSystemID);
          console.log('returned from pdfSystemID', this.pdfSystemID); 
         }
      );*/

      let newId = this.emitterService.getData();

      this.processDocumentList(this.id.toString());

      //this.caseIndexData();
     // this.lookupService.getCategoryAndSubjects();
      
      this.lookupService.getCategoryAndSubjects().subscribe(
             (response: Response) => {              
             this.categoryList = response.json().CategorySubjectPair;             
               //console.log("categoryList response: " , this.categoryList);
              }
           );
     // getReindexReviewStatuses
               this.lookupService.getReindexReviewStatuses().subscribe(
             (response: Response) => {              
             this.reindexStatusList = response.json().ReindexReviewStatuses;            
               //console.log("ReindexReviewStatuses response: " , this.reindexStatusList);
              }
           );
      
        this.lookupService.getSettlementTaskType().subscribe(
             (response: Response) => {              
               this.settlementTypeList = response.json().SettlementTaskTypes;            
               console.log("getSettlementTaskType response: " , response.json().SettlementTaskTypes);
              }
           );
      
        this.lookupService.getPaymentRequiredValues().subscribe(
             (response: Response) => {              
               this.paymentList = response.json().PaymentRequired;          
               console.log("getPaymentRequiredValues response: " , response.json().PaymentRequired);
              }
           );
      this.lookupService.getDocumentClassValues().subscribe(
            (response: Response) => {              
              this.documentClassList = response.json().docClassList;          
              console.log("getDocumentClassValues response: " , response.json().docClassList);
             }
          );
           
          
 
    } //ngOnInit

    private processDocumentList(id: string) {

      if(id) {
        this.palService.lockBatchByDocID(id.toString(), this.indexNowStr, this.allCasesFlag).then(data => {
          let dataArray= data || {};
          this.batchData = dataArray.getSharedQueueDetailsOutput;
          this.pdfSrc = this.batchData[0].EXTERNAL_SYS_DOC_ID;
          this.tempCaseID = this.batchData[0].EXTERNAL_CASE_NUMBER;
          this.currentQueueType = this.batchData[0].QUEUE_TYPE;
          //this.caseIndexData = this.batchData[0].EXTERNAL_CASE_NUMBER === 0 ? this.batchData[0].EXTERNAL_CASE_NUMBER : "";
          let nextDocFlag = this.batchData[0].Next_Doc_Flag; 
          if(nextDocFlag === 'Y')
            this.nextDocId = this.batchData[1].DOCUMENT_INTAKE_ID;
          else
            this.nextDocId = "";
            this.dataService.setData(this.batchData);
          console.log("this.tempCaseID: " , this.tempCaseID);
          if (this.tempCaseID !== '0')
          {
            this.caseIndexData.caseNumber = this.tempCaseID;
          }
        });
      }
      else {
        this.palService.lockBatchByDocID(id.toString(), 'INCOMING', 'Y').then(data => {
          let dataArray= data || {};
          this.batchData = dataArray.getSharedQueueDetailsOutput;
          this.pdfSrc = this.batchData[0].EXTERNAL_SYS_DOC_ID;
        });
      }
    }
  
// Radio Other options
    public casaNext(value: any) {
        this.casaStep = this.radioValue;
        let districtOfficeSel = value;
        
        if(this.casaStep==='DeleteDocument'){
          $('#deletemodal').modal('show');
          console.log('radio DeleteDocument');
        }
        else if( this.casaStep==='caseCreateQueue' ){
          //this.casaStep = 'caseCreate';
          console.log('Going to case Create ** New: ', this.casaStep);
          //this.setProcessQueueDocs();
          this.caseCreateNowFlag = true;
          this.routeToOtherComponents();
        }
        else {
          console.log('Else Invoking SetProcessQUEUE1: ', this.casaStep);
          this.setProcessQueueDocs(districtOfficeSel);
          //this.getNextDocFromBat();
          console.log('Next DOC iD from Queue: ', this.NextDocIntakeID);
          //this.router.navigate(['queue']);
        }
        console.log('casaNext button clicked : '+ this.casaStep);
    }

    
    routeToOtherComponents() {

      if(this.indexNow === 'true' && this.caseCreateNowFlag)
        this.router.navigate(['caseCreate',  this.id,  true,  this.indexNowNextDocId]);
      else if(this.indexNow  === 'true' && this.indexNowNextDocId === '')
        this.router.navigate(['queue/SQCaseCreate']);
      else if(this.indexNow === 'true' && !this.caseCreateNowFlag)
        this.router.navigate(['caseCreate',  this.indexNowNextDocId,  false,  ""]);
      else if(this.indexNow === 'false' && this.caseCreateNowFlag)
        this.router.navigate(['caseCreate',  this.id,  true,  this.nextDocId]);
      else if(this.nextDocId === "" && this.currentQueueType === "INCOMING")
        this.router.navigate(['/queue/SQIncDoc']);
      else if(this.nextDocId === "" && this.currentQueueType === "DISTRICT_OFFICE")
        this.router.navigate(['/queue/SQDistOff']);
      else if(this.nextDocId === "" && this.currentQueueType === "SECONDLEVEL")
        this.router.navigate(['/queue/SQNatOff']);
      else if(this.nextDocId === "" && this.currentQueueType === "CASECREATE")
        this.router.navigate(['/queue/SQIncDoc']);
      else 
        this.ngOnInit();
        //this.router.navigateByUrl('caseIndex', this.nextDocId, false, '');
      
    }

    resetFlags() {

      this.indexNow = 'false';
      this.caseCreateNowFlag = false;
      this.deleteLetterFlag = false;
    }
  
    public DelQueWithLetter(){
      this.casaStep = this.radioValue;
      console.log('Calling DELETE QUEUE : '+ this.casaStep);
      this.setDelQueWithLetter();
        $('#deletemodal').modal('hide');
      //this.router.navigate(['queue']);
      this.route.params['InTakDocID'] = 0;
      //this.resetFlags();
      this.deleteLetterFlag = true;
      this.routeToOtherComponents();
      
    }
  
    public DelQueWithOutLetter(){
      this.casaStep = this.radioValue;
      console.log('Calling DELETE OUT QUEUE : '+ this.casaStep);
      this.setDelQueWithOutLetter();
      $('#deletemodal').modal('hide');
      //this.router.navigate(['queue']);
      this.route.params['InTakDocID'] = 0;
      //this.resetFlags();
      this.deleteLetterFlag = true;
      this.routeToOtherComponents();
    }
    
    public DelWithCancel(){
      this.casaStep = this.radioValue;
      console.log('Calling DelWithCancel : '+ this.casaStep);
      $('#deletemodal').modal('hide');
      
    }
    
    
    public change(value: any) {
      let selectedIndex = value.selectedIndex;
      if(selectedIndex > 0) {
        this.subjectList = this.categoryList[selectedIndex-1].Subject
      }
      //let item = this.categoryList.find(i => i.Category === value);
      //this.subjectList = item.Subject;
      //this.caseIndexData.subject="";
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
   
    public updateReIndex(){

      this.caseIndexData.docIntakeId =  this.id.toString();
      console.log('ReIndex Console', this.caseIndexData.caseNumber);
      console.log('ReIndex Console',  this.caseIndexData.docIntakeId);
      console.log('ReIndex Console postmarkDate', this.caseIndexData.postmarkDate);
      console.log('Document ID', this.id);
        console.log('ReIndex caseIndexData.caseNumber', this.caseIndexData.caseNumber);
    
      this.ProcessIndexDocToCase();
      //this.getNextDocFromBat();
      console.log('Next DOC iD from Queue: ', this.NextDocIntakeID);
      //this.router.navigate(['queue']);
      this.pdfSrc = "";
      //this.router.navigate(['queue', this.nextDocId]);
      this.route.params['InTakDocID'] = 0;
      //this.resetFlags();
      //this.deleteLetterFlag = true;
      this.routeToOtherComponents();
    }

    public cancelReIndex(){
      console.log('ReIndex Console', this.caseIndexData.caseNumber);
      this.caseIndexData.caseNumber = "";

      this. caseIndexData.claimant = "";
      this.caseIndexData.docIntakeId = '';
      this.caseIndexData.category = "";
      this.caseIndexData.subject = "";
      this.caseIndexData.reviewStatus = "";
      this.caseIndexData.authorDate = "";
      this.caseIndexData.receivedDate = "";
      this.caseIndexData.description = "";
      this.caseIndexData.postmarkDate = "";
      this.caseIndexData.priorityFlag = "";
      this.caseIndexData.duplicateFlag = "";
      this.caseIndexData.sensitiveFlag = "";
      this.caseIndexData.docClass = "";
      this.routeToOtherComponents();
      //this.caseIndexData.caseNumber = null;
      // this.caseIndexData.postmarkDate = null;
   }

    public casaReIndexNext($event){
      console.log('casereIndex event : ', $event);
      if($event.target.value === 'Previous'){
        this.casaStep = "mainStep"; //mainStep
      }else if($event.target.value === 'UpdateApprove'){
        //this.casaStep = "mainStep"; //mainStep
        $('#remPadocMdl').modal('show');
      }else if($event.target.value === 'Update'){
        this.casaStep = "mainStep"; //mainStep
      }else if($event.target.checked){
        console.log("Text box Checked");
        $('#remindermodal').modal('show');
      }else{
        $('#remindermodal').modal('hide');
        console.log("Text box Unchecked");
      }
    }
  
   
  
////////
    
  

    // 'https://owcp-test-jad.acuitys.com/alfresco/guestDownload/d/workspace/SpacesStore/9190feed-f56a-4a35-81d3-6e474067147c/Employer_PrePenalty_Of_Injury_Late_3002698_20171003153626801.pdf';
   
    
  
  //pdfSrc: string = 'https://owcp-dev-wmadmin.acuitys.com/PATDOC/sagManual.pdf'
  //pdfSrc: string = 'https://edms.acuitys.com/alfresco/guestDownload/d/workspace/SpacesStore/795da1eb-efd5-404b-9b25-5f0ded6b2a23/alfresco_5.2_enterprise.pdf';
  
    

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

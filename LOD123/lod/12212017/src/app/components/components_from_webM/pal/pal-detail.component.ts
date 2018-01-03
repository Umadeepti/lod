import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PalService } from '/owcs/app/components/pal/pal.service';
import {LookupService} from '/owcs/app/shared/lookup.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

export class RefData {
  constructor(public value: string) { }
}

export class CategorySubjectPair {
  constructor(public Category: string, public Subject: RefData[]) { }
}

@Component({
  selector: 'pal-detail-page',
  templateUrl: '/owcs/app/components/pal/pal-detail.component.html',
  styleUrls: ['/owcs/app/components/pal/pal-nav.component.css']
})
export class PalDetailPageComponent implements OnInit {
  
  
    id: number;
    casaStep: string = "mainStep";
    casaradioValue: string;
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
  
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    public rowsOnPageSet = 5;
    public docID = "12345";
  
    selectedRow : Number;
    setClickedRow : Function;
  
    constructor(private route: ActivatedRoute,
              private router: Router, private palService: PalService, private lookupService: LookupService) {
    
    this.setClickedRow = function(index){
            this.docID = index;
        }
    }

    ngOnInit(): void {

      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];


          
          
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
      
 
}
    public casaNext(){
      
      if(this.casaradioValue==='Re-index'){
        this.casaStep = "mainStepreindex";
      }else if(this.casaradioValue==='Approved'){
        this.casaStep = "mainStepApproved";
        console.log('radio Approved selected');
      }
      console.log('casaNext button clicked : '+ this.casaStep);
    }
  
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
title = 'app';
  //pdfSrc: string = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
  pdfSrc: string = 'https://owcp-dev-wmadmin.acuitys.com/PATDOC/sagManual.pdf'
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

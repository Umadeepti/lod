
import {Component, OnInit} from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Http} from "@angular/http";
//import {RouterModule } from '@angular/router';
import {QueueService} from '/owcs/app/components/queue/queue.service';

@Component({
    selector: 'queue',
    templateUrl: '/owcs/app/components/queue/sq-caseCreate.html'
})
export class SQCaseCreateComponent implements OnInit {

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
  public rowsOnPageSet = 5;
  
  //Functions
  setCaseCreateDetail : Function;

    constructor(private http: Http, 
                private route: ActivatedRoute,
                private router: Router,
                private queueService: QueueService) {
     this.setCaseCreateDetail = function(event: any, a: any){
         console.log('Document ID : ', a.DOCUMENT_INTAKE_ID);
          console.log('Event : ', event);
     this.router.navigate(['caseCreate', a.DOCUMENT_INTAKE_ID, false, ""]);
        }
    
    }

    ngOnInit(): void {

this.queueService.fetchSharedQueue('caseCreateQueue').subscribe(
             (response: Response) => {
               this.data = response.json().getCaseCreateQueueOutput; 
             console.log('Added by Phani for test CM process  ** DEP02: ', response.json());
               //hard coding to display the 12345 pdf -- implement logic as per business rule to display the correct pdf
               //this.docID = "12345";
               //this.casaStep = "mainStep";
              }
           );
//    HTTP POST

           
}

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

  public uppercase(value: string) {
    return value.toUpperCase();
  }  

    public sortLastActionDate = (a: any) => {
        return new Date(a.CREATE_DTS);

    }    

    public sortFirstDueDate = (a: any) => {
        return new Date(a.CREATE_DTS);

    }    

    public sortLastDueDate = (a: any) => {
        return new Date(a.CREATE_DTS);

    }
  
  public batchName(a: any){
        return 'Incoming Batch: '+a.DOCUMENT_INTAKE_ID;

    }
 

}
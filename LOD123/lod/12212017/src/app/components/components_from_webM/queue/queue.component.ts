console.log("QueueComponent.ctrl");
import {Component, OnInit} from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Http} from "@angular/http";
//import {RouterModule } from '@angular/router';
import {QueueService} from '/owcs/app/components/queue/queue.service';

@Component({
    selector: 'queue',
    templateUrl: '/owcs/app/components/queue/queue.html'
})
export class QueueComponent implements OnInit {

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
  public rowsOnPageSet = 5;
  
  //Functions
  setIndexDetail : Function;

    constructor(private http: Http, 
                private route: ActivatedRoute,
                private router: Router,
                private queueService: QueueService) {
     this.setIndexDetail = function(event: any, a: any){
         console.log('Batch ID : ', a.batch_id);
          console.log('Batch Event : ', event);
         this.router.navigate(['caseIndex', a.batch_id, false, ""]);
        }
    
    }

    ngOnInit(): void {

this.queueService.fetchSharedQueue('sharedQueueBatchs').subscribe(
             (response: Response) => {
               this.data = response.json().getSharedQueueBatchOutput; 
              console.log('data from getOPSPlanPalTask servcie : ', response.json());
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
        return new Date(a.batch_start_date_time);

    }    

    public sortFirstDueDate = (a: any) => {
        return new Date(a.batch_start_date_time);

    }    

    public sortLastDueDate = (a: any) => {
        return new Date(a.batch_start_date_time);

    }
  
  public batchName(a: any){
        return 'Incomming Batch: '+a.batch_id;

    }
 

}
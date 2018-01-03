console.log("QueueComponent.ctrl");
import {Component, OnInit} from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Http} from "@angular/http";
//import {RouterModule } from '@angular/router';
import {QueueService} from '/owcs/app/components/queue/queue.service';

@Component({
    selector: 'queue',
    templateUrl: '/owcs/app/components/queue/sq-nationalOffice.html'
})
export class SQNationalOfficeComponent implements OnInit {

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
  public rowsOnPageSet = 5;
  
  //Functions
  setDocIndex : Function;

    constructor(private http: Http, 
                private route: ActivatedRoute,
                private router: Router,
                private queueService: QueueService) {
     this.setDocIndex = function(event: any, a: any){
         console.log('Document ID : ', a.DOCUMENT_INTAKE_ID);
          console.log('Event : ', event);
         this.router.navigate(['caseIndex', a.DOCUMENT_INTAKE_ID, false, ""]);
        }
    
    }

    ngOnInit(): void {

this.queueService.fetchSharedQueue('secondReviewQueue').subscribe(
             (response: Response) => {
               this.data = response.json().getSecondReviewQueueOutput; 
              console.log('data from getOPSPlanPalTask servcie : ', response.json());
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
        return 'Incomming Batch: '+a.DOCUMENT_INTAKE_ID;

    }
 

}
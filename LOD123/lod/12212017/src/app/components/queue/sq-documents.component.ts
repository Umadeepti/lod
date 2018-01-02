console.log("QueueComponent.ctrl");
import {Component, OnInit} from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Http, Response} from "@angular/http";
//import {RouterModule } from '@angular/router';
import {QueueService} from './queue.service';
import { EmitterService } from '../../emitter.service';

@Component({
    selector: 'queue',
    templateUrl: './sq-documents.html'
})
export class SQDocumentsComponent implements OnInit {

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    data: any;
    public rowsOnPageSet = 5;
  
  //Functions
    setDocIndex(event: any, a: any) {
        console.log('Document ID : ', a.DOCUMENT_INTAKE_ID);
        console.log('Event : ', event);
        let queueData: any[] = this.data || {};
        //let recIndex = queueData.findIndex(x => x.DOCUMENT_INTAKE_ID == a);
        let processBatch = a.BATCH_ID;
        
        //let processBatchArray = queueData.filter(this.filterBatchRecord, processBatch);
        let processBatchArray = this.filterBatchRecord(queueData, processBatch);

        //for(let rec of processBatchArray) {
            this.emitterService.sendData(a.DOCUMENT_INTAKE_ID);
            this.router.navigate(['caseIndex', a.DOCUMENT_INTAKE_ID, false, ""]);
        //}
    }

    constructor(private http: Http, 
                private route: ActivatedRoute,
                private router: Router,
                private queueService: QueueService,
                private emitterService: EmitterService) { }

    ngOnInit(): void {

        this.queueService.fetchSharedQueue('shareQueueDocs').subscribe(
                    (response: Response) => {
                    this.data = response.json().getSharedQueueDocsOutput; 
                    console.log('data from getOPSPlanPalTask servcie : ', response.json());
                    }
                );  
    }

    /*
    private findBatchRecord(data, id: any) { 
        return data.DOCUMENT_INTAKE_ID === id;
    }*/

    private filterBatchRecord(arr: any[], value: any) {

        let returnArr: any[] = [];
        for(let i of arr) {
            if(i.BATCH_ID === value) {
                returnArr.push(i);
            }
        }
        return returnArr;
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
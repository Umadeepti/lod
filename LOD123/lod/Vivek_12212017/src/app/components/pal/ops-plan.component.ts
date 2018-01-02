import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Http, Response} from "@angular/http";
import { PalService } from './pal.service';

@Component({
  selector: 'pal-nav-page',
  templateUrl: './ops-plan.component.html',
    styleUrls: ['../../../assets/css/nav.css'],
    encapsulation: ViewEncapsulation.None
})
  
export class OpsPlanComponent implements OnInit {


    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    public rowsOnPageSet = 5;
    data: any;
    isDataAvailable: boolean = false;

    selectedRow : Number;
    setClickedRow : Function;
    setCaseDetail : Function;
  
    constructor(private http: Http,
              private route: ActivatedRoute,
              private router: Router, private palService: PalService) {
             // private router: Router) {
    
    this.setClickedRow = function(index){
            this.selectedRow = index;
        }
      
       this.setCaseDetail = function(event: any, taskId: number){
         console.log('taskId id : ', taskId);
         this.router.navigate(['paldetail', taskId]);
        }
    }
  
 
    

    ngOnInit(): void {

      console.log('ops plan component -- Init before service call');
//    HTTP POST
       
       this.palService.getOPSPlanPalTask().subscribe(
         (response: Response) => {
           this.data = response.json().Tasks;
           console.log('data from servcie : ', this.data);
           let palData = this.data || {};
           if (palData[0].TaskData)
              this.isDataAvailable = true;
          }
       );
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
        return new Date(a.TaskData.canonicalDocument.canonical.caseDetails.lastAction);

    }    

    public sortFirstDueDate = (a: any) => {
        return new Date(a.TaskData.canonicalDocument.canonical.caseDetails.firstDueDate);

    }    

    public sortLastDueDate = (a: any) => {
        return new Date(a.TaskData.canonicalDocument.canonical.caseDetails.lastDueDate);

    }

}

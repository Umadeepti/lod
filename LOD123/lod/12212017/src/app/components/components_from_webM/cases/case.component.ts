console.log("case.component");
import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
//import {RouterModule } from '@angular/router';

@Component({
    selector: 'pal',
    templateUrl: '/owcs/app/components/cases/case.html'
})
export class CaseComponent implements OnInit {

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
  public rowsOnPageSet = 5;

    constructor(private http: Http) {}

    ngOnInit(): void {

/*
//    HTTP GET

        this.http.get("https://starwars-json-server-ewtdxbyfdz.now.sh/people")
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json(); 
                    console.log('Response: ', data);
                }, 1000);
            });
              
*/

//    HTTP POST
      var url="/rest/bc/proxy";
        var request={ "serverType":"IS",
              "url":"/rest/OWCS_PAL_UI.PalTasks.opsPlanPalTask",
              "requestMethod":"GET"
              };
              
     this.http.post(url,request)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json().Tasks; 
//                    console.log('Response: ', data);
                }, 1000);
            });
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
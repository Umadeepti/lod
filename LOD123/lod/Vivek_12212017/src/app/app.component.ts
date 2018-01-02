console.log("app.comp");

import { Component,OnInit, ElementRef, Input} from '@angular/core';
import { PalService } from './components/pal/pal.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CaseSearch} from './model/caseSearch.model';
import {Http, Response} from "@angular/http";


@Component({
selector: 'my-app',
templateUrl: './app.component.html'//,
//styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
selectedTab='pal';
userName: string;
caseSearch = new CaseSearch();

public filterQuery = "";
public rowsOnPage = 10;
public sortBy = "email";
public sortOrder = "asc";
public rowsOnPageSet = 5;
selectedRow : Number;
setClickedRow : Function;
$: any;

constructor(private http: Http,
private route: ActivatedRoute,
private router: Router, private palService: PalService, private elementRef:ElementRef) {
this.userName = this.elementRef.nativeElement.getAttribute('myUserName');

this.setClickedRow = function(cData: any){
console.log('cData from ui : ', cData);
this.$('#remDupCase').modal('hide');
this.selectedTab='casesdetail';
this.router.navigate(['casedetail', cData.caseId]);
}



}

ngOnInit() {
}

public toInt(num: string) {
return +num;
}

public uppercase(value: string) {
return value.toUpperCase();
}  

public sortReceivedDate = (a: any) => {
  return new Date(a.doi);

}    

public sortAuthorDate = (a: any) => {
  return new Date(a.dob);

}  

onSubmit(caseData) {
  console.log('form submitted data : ', caseData);
  let caseSearch = new CaseSearch();
  caseSearch.setCaseId(caseData.caseId);
  caseSearch.setSSN(caseData.case_ssn);
  caseSearch.setDOI(caseData.case_doi);
  caseSearch.setLastName(caseData.case_lname);
  caseSearch.setCaseNumber(caseData.case_number);

this.palService.searchCase(caseSearch).subscribe(
(response: Response) => {
  let data = response.json().duplicateDataList;  
  this.caseSearch = new CaseSearch();
  if(data){if(data.length==1){
    this.selectedTab='casesdetail';
    this.router.navigate(['casedetail', data[0].caseNumber]);
  }else{
    this.$('#remDupCase').modal('show');
  }};});
}

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
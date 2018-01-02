import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PalService } from '../pal/pal.service';
import { LookupService} from '../../shared/lookup.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { CaseSearch} from '../../model/caseSearch.model';
import {Http, Response} from "@angular/http";
import { DocumentFilterPipe }   from  '../../shared/document-filter.pipe';

export class RefData {
  constructor(public value: string) { }
}

export class CategorySubjectPair {
  constructor(public Category: string, public Subject: RefData[]) { }
}


@Component({
  selector: 'case-detail-page',
  templateUrl: './case-detail.component.html',
  styleUrls: ['../../../assets/css/nav.css']
})
export class CaseDetailPageComponent implements OnInit {
  
  selectedCTab: string = "cDocument";
    //id: number;
    id: string;
    caseNumber: string;
    caseDetail: any;
    data: any;
  
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    public rowsOnPageSet = 5;
  
    selectedRow : Number;

    setClickedRow(item){
                 
      this.router.navigate(['casedocuments', this.id , item.CASE_DOCUMENT_ID]);
    }

    constructor(private http: Http,
      private route: ActivatedRoute,
      private router: Router, private palService: PalService, private lookupService: LookupService) {
  
    }

    ngOnInit(): void {
      console.log('this.route info : ', this.route);
      this.route.params
      .subscribe(
        (params: Params) => {
          this.id =  params['id'];
          
          this.palService.fetchDocsByCaseID(this.id).subscribe(
             (response: Response) => {
               this.data = response.json().CaseDocuments;
              }
           );


          this.palService.getCaseDetails(this.id).subscribe(
            (response: Response) => {
              
              this.caseDetail = response.json().CaseDetails[0];
              console.log('service getCaseDetails response : ', this.caseDetail);
             }
          );

        }
      );
     // this.lookupService.getCategoryAndSubjects();
      
      
 
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

  
}

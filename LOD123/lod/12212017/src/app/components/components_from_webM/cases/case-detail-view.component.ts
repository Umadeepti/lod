import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Http, Response} from "@angular/http";
import { PalService } from '/owcs/app/components/pal/pal.service';

@Component({
  selector: 'case-detail-view',
  templateUrl: '/owcs/app/components/cases/case-detail-view.component.html',
  styleUrls: ['/owcs/app/components/pal/pal-nav.component.css']
})

export class CaseDetailViewComponent {

    selectedCTab: string = "selectedTabCaseData";
    id: string;
    data: any;
    caseDetail: any;

    constructor(private http: Http,
        private route: ActivatedRoute,
        private router: Router, private palService: PalService) {}

    ngOnInit(): void {
        console.log('this.route info : ', this.route);
        this.route.params
        .subscribe(
          (params: Params) => {
            this.id =  params['id'];
  
            this.palService.getCaseDetails(this.id).subscribe(
              (response: Response) => {
                
                this.caseDetail = response.json().CaseDetails[0];
                console.log('service getCaseDetails response : ', this.caseDetail);
               }
            );
  
          }
        );
    }

    gotoCaseDocuments() {
        this.router.navigate(['casedocuments', this.id, 0]);
    }

    gotoCaseDataView() {
        this.router.navigate(['casedetailview', this.id]);
    }
}
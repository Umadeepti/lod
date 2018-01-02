import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PalService } from '../pal/pal.service';
import { LookupService} from '../../shared/lookup.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { CaseSearch} from '../../model/caseSearch.model';
import { Response } from '@angular/http';

export class RefData {
  constructor(public value: string) { }
}

export class CategorySubjectPair {
  constructor(public Category: string, public Subject: RefData[]) { }
}


@Component({
  selector: 'case-detail-page',
  templateUrl: './case-documents.component.html',
  styleUrls: ['../pal/pal-nav.component.css']
})
export class CaseDocumentsComponent implements OnInit {
  
  selectedCTab: string = "cDocument";
    id: string;
    docId: string;
  
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    public rowsOnPageSet = 5;
    data: any;
  
    selectedRow : Number;

    setClickedRow(item:any){
      console.log('pdf path : ' , item.EXTERNAL_SYS_DOC_ID)
                 
      this.page=1;
      this.rotation=0;
      this.zoom=1;
      this.originalSize = 'false';
      this.pdfSrc=item.EXTERNAL_SYS_DOC_ID; 
    }

    constructor(private route: ActivatedRoute,
              private router: Router, private palService: PalService, private lookupService: LookupService) {
    
    this.setClickedRow = function(item:any){
            console.log('pdf path : ' , item.EXTERNAL_SYS_DOC_ID)
                       
            this.pdf=1;
            this.rotate=0;
            this.zoom=1;
            this.originalSize = 'false';
            this.pdfSrc=item.EXTERNAL_SYS_DOC_ID; 
        }
    }

    ngOnInit(): void {

      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.docId = params['id2'];
          console.log('second params passed = ', +params['id2']);
          this.palService.fetchDocsByCaseID(this.id).subscribe(
             (response: Response) => {
               this.data = response.json().CaseDocuments;
              if(this.data){
               let item = this.data.find(i => i.CASE_DOCUMENT_ID === this.docId);
               this.pdfSrc = item.EXTERNAL_SYS_DOC_ID;
              }
               //this.data1 = response.json().DocumentList;  
               console.log('data from fetchDocsByCaseID servcie : ', this.data);

              }
           );
        }
      );

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

  
////////
title = 'app';
pdfSrc: string;
  //pdfSrc: string = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
  //pdfSrc: string = 'https://owcp-dev-wmadmin.acuitys.com/PATDOC/sagManual.pdf'
  //pdfSrc: string = 'https://owcp-test-jad.acuitys.com/alfresco/guestDownload/d/workspace/SpacesStore/ad37ba01-6889-431a-9c74-b04d33f8f077/8-2_Installing_webMethods_Products.pdf';
  //pdfSrc: string = 'https://owcp-test-jad.acuitys.com/alfresco/guestDownload/d/workspace/SpacesStore/9190feed-f56a-4a35-81d3-6e474067147c/Employer_PrePenalty_Of_Injury_Late_3002698_20171003153626801.pdf';
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

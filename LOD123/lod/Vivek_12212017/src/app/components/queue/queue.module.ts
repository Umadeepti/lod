import { NgModule }      from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from '../../app-routing.module';
//import { ErrorPageComponent } from '/owcs/app/components/error-page/error-page.component';
//import { PageNotFoundComponent } from '/owcs/app/components/page-not-found/page-not-found.component';
//import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { QueueComponent }   from './queue.component';
import { SQDocumentsComponent }   from './sq-documents.component';
import { SQCaseCreateComponent }   from './sq-caseCreate.component';
import { SQDistrictOfficeComponent }   from './sq-districtOffice.component';
import { SQNationalOfficeComponent }   from './sq-nationalOffice.component';
import { QueueFilterPipe }   from './queue-filter.pipe';
//import { CaseIndexComponent }   from '/owcs/app/components/cases/caseIndex.component';
import { QueueNavPageComponent } from './queue-nav.component';

@NgModule({
  imports:      [ 
    CommonModule, 
    DataTableModule, 
    FormsModule,AppRoutingModule,
    HttpModule
  ],
  declarations: [ QueueComponent,
                  QueueFilterPipe, 
                  QueueNavPageComponent, 
                  SQDocumentsComponent,
                  SQCaseCreateComponent,
                  SQDistrictOfficeComponent ,
                  SQNationalOfficeComponent
                ],
  exports: [
  QueueComponent
  ]
})

export class QueueModule { }

import { NgModule }      from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from '../../app-routing.module';

import { PalComponent }   from './pal.component';
import { DataFilterPipe }   from './data-filter.pipe';
import { PalNavPageComponent } from './pal-nav.component';
import { PalDetailPageComponent } from './pal-detail.component';
import { OpsPlanComponent } from './ops-plan.component';
//import { ErrorPageComponent } from '../error-page/error-page.component';
//import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
//import { CaseIndexComponent }   from '../cases/caseIndex.component';
//import { CaseCreateComponent }   from '../cases/caseCreate.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
//case details
//import { CaseComponent }   from '../cases/case.component';
import { CaseModule } from '../cases/case.module';
//import { CaseDetailPageComponent } from '../cases/case-detail.component';
//import { CaseDocumentsComponent } from '../cases/case-documents.component';
import { DocumentFilterPipe }   from '../../shared/document-filter.pipe';


@NgModule({
  imports:      [ 
    CommonModule, 
    DataTableModule, 
    FormsModule,AppRoutingModule,
    HttpModule//,CaseModule
    ,PdfViewerModule
  ],
  declarations: [ DataFilterPipe,
              PalComponent,
              DocumentFilterPipe,
    //ErrorPageComponent,PageNotFoundComponent,
              PalNavPageComponent,
              OpsPlanComponent,
              PalDetailPageComponent
              //CaseComponent,
              //CaseDetailPageComponent, 
              //CaseDocumentsComponent,
              //,PdfViewerComponent//, 
              //CaseIndexComponent,
              //CaseCreateComponent 
            ],//PdfViewerComponent
  exports: [PalComponent]
})

export class PalModule { }

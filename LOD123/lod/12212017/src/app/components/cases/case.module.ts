import { NgModule }      from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from '../../app-routing.module';

import { CaseComponent }   from './case.component';
import { DataFilterPipe }   from '../../shared/data-filter.pipe';
//import { PalNavPageComponent } from '/owcs/app/components/pal/pal-nav.component';
import { CaseDetailPageComponent } from './case-detail.component';
//import { OpsPlanComponent } from '/owcs/app/components/pal/ops-plan.component';
//import { ErrorPageComponent } from '/owcs/app/components/error-page/error-page.component';
//import { PageNotFoundComponent } from '/owcs/app/components/page-not-found/page-not-found.component';
import { CaseIndexComponent }   from './caseIndex.component';
import { CaseCreateComponent }   from './caseCreate.component';
import { CaseDocumentsComponent } from './case-documents.component';
import { LsForm202Component } from './ls-forms/ls-form-202.component';
import { LsForm203Component } from './ls-forms/ls-form-203.component';
import { LsForm262Component } from './ls-forms/ls-form-262.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports:      [ 
    CommonModule, 
    DataTableModule, 
    FormsModule,AppRoutingModule,ReactiveFormsModule,
    HttpModule,
    PdfViewerModule
  ],
  declarations: [ DataFilterPipe,
    CaseComponent
    //,ErrorPageComponent,PageNotFoundComponent
    ,CaseDetailPageComponent,
    LsForm202Component,
    LsForm203Component,
    LsForm262Component,
    CaseIndexComponent,
    CaseCreateComponent,
    CaseDocumentsComponent
    //, PdfViewerComponent 
  ],//PdfViewerComponent
  exports: [CaseComponent]
})

export class CaseModule { }

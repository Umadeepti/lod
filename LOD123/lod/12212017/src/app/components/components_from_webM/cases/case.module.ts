import { NgModule }      from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from '/owcs/app/app-routing.module';

import { CaseComponent }   from '/owcs/app/components/cases/case.component';
import { DataFilterPipe }   from '/owcs/app/components/cases/data-filter.pipe';
//import { PalNavPageComponent } from '/owcs/app/components/pal/pal-nav.component';
import { CaseDetailPageComponent } from '/owcs/app/components/cases/case-detail.component';
//import { OpsPlanComponent } from '/owcs/app/components/pal/ops-plan.component';
//import { ErrorPageComponent } from '/owcs/app/components/error-page/error-page.component';
//import { PageNotFoundComponent } from '/owcs/app/components/page-not-found/page-not-found.component';
import { LsForm202Component } from '/owcs/app/components/cases/ls-forms/ls-form-202.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  imports:      [ 
    CommonModule, 
    DataTableModule, 
    FormsModule,AppRoutingModule,
    HttpModule, ReactiveFormsModule
  ],
  declarations: [ DataFilterPipe,
    CaseComponent
    //,ErrorPageComponent,PageNotFoundComponent
    ,CaseDetailPageComponent,
    LsForm202Component
    //, PdfViewerComponent 
  ],//PdfViewerComponent
  exports: [CaseComponent]
})

export class CaseModule { }

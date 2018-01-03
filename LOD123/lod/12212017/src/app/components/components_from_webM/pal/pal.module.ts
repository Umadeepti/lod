import { NgModule }      from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from '/owcs/app/app-routing.module';

import { PalComponent }   from '/owcs/app/components/pal/pal.component';
import { DataFilterPipe }   from '/owcs/app/components/pal/data-filter.pipe';
import { PalNavPageComponent } from '/owcs/app/components/pal/pal-nav.component';
import { PalDetailPageComponent } from '/owcs/app/components/pal/pal-detail.component';
import { OpsPlanComponent } from '/owcs/app/components/pal/ops-plan.component';
//import { ErrorPageComponent } from '/owcs/app/components/error-page/error-page.component';
//import { PageNotFoundComponent } from '/owcs/app/components/page-not-found/page-not-found.component';
import { CaseIndexComponent }   from '/owcs/app/components/cases/caseIndex.component';
import { CaseCreateComponent }   from '/owcs/app/components/cases/caseCreate.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
//case details
import { CaseComponent }   from '/owcs/app/components/cases/case.component';
import { CaseDetailPageComponent } from '/owcs/app/components/cases/case-detail.component';
import { CaseDocumentsComponent } from '/owcs/app/components/cases/case-documents.component';
import { DocumentFilterPipe }   from '/owcs/app/shared/document-filter.pipe';
import { LsForm202Component } from '/owcs/app/components/cases/ls-forms/ls-form-202.component';
import { LsForm203Component } from '/owcs/app/components/cases/ls-forms/ls-form-203.component';
import { LsForm262Component } from '/owcs/app/components/cases/ls-forms/ls-form-262.component';
import { LsFormLoiComponent } from '/owcs/app/components/cases/ls-forms/ls-form-loi.component';
import { LsForm201Component } from '/owcs/app/components/cases/ls-forms/ls-form-201.component';
import { LsForm208Component } from '/owcs/app/components/cases/ls-forms/ls-form-208.component';
import { LsForm207Component } from '/owcs/app/components/cases/ls-forms/ls-form-207.component';
import { CaseDetailViewComponent } from '/owcs/app/components/cases/case-detail-view.component';

@NgModule({
  imports:      [ 
    CommonModule, 
    DataTableModule, 
    FormsModule,AppRoutingModule,
    HttpModule, ReactiveFormsModule
  ],
  declarations: [ DataFilterPipe,
              PalComponent,
              DocumentFilterPipe,
    //ErrorPageComponent,PageNotFoundComponent,
              PalNavPageComponent,
              OpsPlanComponent,
              PalDetailPageComponent,
              CaseComponent,
              CaseDetailPageComponent, 
              CaseDocumentsComponent,
              PdfViewerComponent, 
              CaseIndexComponent,
              LsForm202Component,
              LsForm203Component,
              LsForm262Component,
              LsFormLoiComponent,
              LsForm201Component,
              LsForm208Component,
              LsForm207Component,
              CaseDetailViewComponent,
              CaseCreateComponent ],//PdfViewerComponent
  exports: [PalComponent]
})

export class PalModule { }

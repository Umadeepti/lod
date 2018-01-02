import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PalNavPageComponent } from './components/pal/pal-nav.component';
import { QueueNavPageComponent } from './components/queue/queue-nav.component';
import { OpsPlanComponent } from './components/pal/ops-plan.component';
//import { PalModule }   from './components/pal/pal.module';
import { PalComponent }   from './components/pal/pal.component';
import { PalDetailPageComponent } from './components/pal/pal-detail.component';
import { QueueComponent } from './components/queue/queue.component';
import { SQDocumentsComponent }   from './components/queue/sq-documents.component';
import { SQCaseCreateComponent }   from './components/queue/sq-caseCreate.component';
import { CaseIndexComponent }   from './components/cases/caseIndex.component';
import { CaseCreateComponent }   from './components/cases/caseCreate.component';
import { SQDistrictOfficeComponent }   from './components/queue/sq-districtOffice.component';
import { SQNationalOfficeComponent }   from './components/queue/sq-nationalOffice.component';
import { CaseDetailPageComponent } from './components/cases/case-detail.component';
import { CaseDocumentsComponent } from './components/cases/case-documents.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/pal', pathMatch: 'full' },
   { path: 'pal', component: PalNavPageComponent, children: [
     { path: 'opsPlan', component: OpsPlanComponent },
     { path: 'otrTask', component: PageNotFoundComponent },
     { path: 'cmr', component: PageNotFoundComponent },
     { path: 'actMail', component: PageNotFoundComponent },
     { path: 'cReferral', component: PageNotFoundComponent },
     { path: 'tellCall', component: PageNotFoundComponent },
     { path: 'medAuth', component: PageNotFoundComponent },
     { path: '', component: OpsPlanComponent, pathMatch: 'full' },
   ] },
  { path: 'paldetail/:id', component: PalDetailPageComponent },
 
 { path: 'queue', component: QueueNavPageComponent, children: [
     { path: 'SQIncBatch', component: QueueComponent },
     { path: 'SQIncDoc', component: SQDocumentsComponent },
     { path: 'SQCaseCreate', component: SQCaseCreateComponent },
     { path: 'SQDistOff', component: SQDistrictOfficeComponent },
     { path: 'SQNatOff', component: SQNationalOfficeComponent },
     { path: '', component: SQDocumentsComponent, pathMatch: 'full' },
   ] },
 { path: 'caseIndex/:InTakDocID/:IndexNow/:NextDocId', component: CaseIndexComponent },
 { path: 'caseCreate/:InTakDocID/:CreateNow/:NextDocId', component: CaseCreateComponent },
 { path: 'correspondence', component: PageNotFoundComponent },
 { path: 'appeals', component: PageNotFoundComponent },
 { path: 'payments', component: PageNotFoundComponent },
 { path: 'cases', component: PageNotFoundComponent },
 { path: 'casedetail/:id', component: CaseDetailPageComponent },
 { path: 'casedocuments/:id/:id2', component: CaseDocumentsComponent },
 { path: 'not-found', component: PageNotFoundComponent},
 { path: '**', redirectTo: '/not-found' }
 ];
 
 @NgModule({
   imports: [RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
 })
 export class AppRoutingModule {
 
 }

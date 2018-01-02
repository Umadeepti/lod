console.log("app.mod");
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PalModule }   from './components/pal/pal.module';
import { QueueModule }   from './components/queue/queue.module';
import {PalService} from './components/pal/pal.service';
import {LookupService} from './shared/lookup.service';
import {QueueService} from './components/queue/queue.service';
import {CasesService} from './components/cases/cases.service';
import { AppComponent }   from './app.component';
import { DataTableModule } from "angular2-datatable";
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CaseFilterPipe }   from './shared/case-filter.pipe';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { EmitterService } from './emitter.service';
import { DataService } from './data.service';
//import { LsForm202Component } from './components/cases/ls-forms/ls-form-202.component';
import { CaseModule } from './components/cases/case.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

export function initConfig(config: AppConfig){
  return () => config.load()
}

@NgModule({
  imports:      [BrowserModule,
                  FormsModule,
                  ReactiveFormsModule,
                  HttpModule,
                  AppRoutingModule, 
                  PalModule,
                  QueueModule ,
                  DataTableModule ,
                  CaseModule,
                  PdfViewerModule
                ],
  declarations: [ AppComponent ,
                  CaseFilterPipe,
                  ErrorPageComponent,
                  PageNotFoundComponent
                ],
   providers:   [ AppConfig,
                  { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true },
                  PalService, 
                  LookupService, 
                  QueueService, 
                  CasesService,
                  EmitterService,
                  DataService],
   exports: [ ErrorPageComponent,
              PageNotFoundComponent],
   bootstrap:    [ AppComponent ]
})

export class AppModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
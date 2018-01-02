import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs'

@Injectable()
export class EmitterService {
 
    // Observable string sources
    private subject  = new Subject<any>();
    //private getDataSource = new Subject<any>();
    
    // Observable string streams
    //sendData$ = this.subject.asObservable();
    //getData$ = this.getDataSource.asObservable();
 
    sendData(data: any) {
        this.subject.next({ object: data });
    }
 
    getData(): Observable<any> {
        return this.subject.asObservable();
    }

    clearData() {
        this.subject.next();
    }
}
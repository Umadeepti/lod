import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    
    private data: any[];

    setData(data:any[]){
        this.data = data;
    } 

    getData(){
        return this.data || [];
    }

    hasData(){
        return this.data && this.data.length;    
    }  

    /*getData(){
        // your implementation here 
    }*/
}

console.log("case-filter.pipe");
import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "caseFilter"
})

export class CaseFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>
(row.ssn && row.ssn.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.doi && row.doi.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.dob && row.dob.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.lastName && row.lastName.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.firstName && row.firstName.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.caseId && row.caseId.toLowerCase().indexOf(query.toLowerCase()) > -1) 

 );
        }

        return array;
    }
}
console.log("case-filter.pipe");
import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "documentFilter"
})

export class DocumentFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>
(row.DOCUMENT_CATEGORY_TYPE && row.DOCUMENT_CATEGORY_TYPE.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.DOCUMENT_SUBJECT_DESC && row.DOCUMENT_SUBJECT_DESC.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.DOCUMENT_STATUS_TYPE && row.DOCUMENT_STATUS_TYPE.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.CREATE_DTS && row.CREATE_DTS.toLowerCase().indexOf(query.toLowerCase()) > -1)
 );
        }

        return array;
    }
}
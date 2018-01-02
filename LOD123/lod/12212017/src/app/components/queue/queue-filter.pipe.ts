import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "queueFilter"
})
export class QueueFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>
(row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.caseNumber && 
row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.caseNumber.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.claimant.claimantName.lastName && 
row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.claimant.claimantName.lastName.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.taskType && 
row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.taskType.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.lastAction && 
row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.lastAction.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.firstDueDate && 
row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.firstDueDate.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.lastDueDate && 
row.TaskData && row.TaskData.canonicalDocument.canonical.caseDetails.lastDueDate.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
(row.TaskInfo && row.TaskInfo.lastAcceptedBy && 
row.TaskInfo && row.TaskInfo.lastAcceptedBy.toLowerCase().indexOf(query.toLowerCase()) > -1)||
                  (row.ReceivedDate && row.ReceivedDate.toLowerCase().indexOf(query.toLowerCase()) > -1)||
                (row.AuthorDate && row.AuthorDate.toLowerCase().indexOf(query.toLowerCase()) > -1)||
                (row.Category && row.Category.toLowerCase().indexOf(query.toLowerCase()) > -1)
                ||(row.Subject && row.Subject.toLowerCase().indexOf(query.toLowerCase()) > -1)
                ||(row.PAGE_NUMBER && row.PAGE_NUMBER.toLowerCase().indexOf(query.toLowerCase()) > -1)
                ||(row.REASON && row.REASON.toLowerCase().indexOf(query.toLowerCase()) > -1)
                ||(row.BATCH_ID && row.BATCH_ID.toLowerCase().indexOf(query.toLowerCase()) > -1)
                ||(row.BATCH_NAME && row.BATCH_NAME.toLowerCase().indexOf(query.toLowerCase()) > -1)
                ||(row.DOCUMENT_STATUS_TYPE && row.DOCUMENT_STATUS_TYPE.toLowerCase().indexOf(query.toLowerCase()) > -1)
                ||(row.DOCUMENT_SOURCE_NAME && row.DOCUMENT_SOURCE_NAME.toLowerCase().indexOf(query.toLowerCase()) > -1)
                ||(row.START_DATE_TIME && row.START_DATE_TIME.toLowerCase().indexOf(query.toLowerCase()) > -1)
                ||(row.CREATE_DTS && row.CREATE_DTS.toLowerCase().indexOf(query.toLowerCase()) > -1)

 );
        }

        return array;
    }
}
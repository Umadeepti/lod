import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { PalData } from '/owcs/app/components/pal/pal.model';


@Injectable()
export class QueueService {

  constructor(private http: Http) {}
  const url="/rest/bc/proxy";
  
  
  
  fetchSharedQueue(queueName:string)  {
  		let request={ "serverType":"IS",
              "url":"/rest/OWCS_PAL_UI.wsp."+queueName,
              "requestMethod":"GET"
              };
               return this.http.post(this.url,request);
          }
  
  ProcessQueueDocument(docID: string, queueName:string, reason: string, sendLetter: string, districtOfficeSelection: string)  {
       console.log('HTTP REQUEST: DOCID:'+docID+ ' QUENM ' + queueName+ 'REASON: ' + reason );
      let request={ "serverType":"IS",
              "url":"/rest/OWCS_SharedQueue.wsp.processQueue?DocumentID="+docID+"&QueueType="+queueName+"&Reason="+reason+"&sendLetter="+sendLetter+"&DistrictID="+districtOfficeSelection,
              "requestMethod":"GET"
              };
               return this.http.post(this.url,request);
          }
  /*
  fetchSharedQueueBatch()  {
  		let request={ "serverType":"IS",
              "url":"/rest/OWCS_PAL_UI.wsp.sharedQueueBatchs",
              "requestMethod":"GET"
              };
               return this.http.post(this.url,request);
          }
			var url="/rest/bc/proxy";
		    var data={ "serverType":"IS",
				      "url":"/rest/OWCS_PAL_UI.wsp.sharedQueueBatchs",
				      "requestMethod":"GET"
				      };
			$http.post(url,data)
				.then(function(response) {
					console.log("Response from SQ BATCH "+ response);
					callbackFunc(response.data.getSharedQueueBatchOutput);
				});
		},
		
		fetchSharedQueueDocs : function(callbackFunc) {
			var url="/rest/bc/proxy";
		    var data={ "serverType":"IS",
				      "url":"/rest/OWCS_PAL_UI.wsp.shareQueueDocs",
				      "requestMethod":"GET"
				      };
			$http.post(url,data)
				.then(function(response) {
					console.log("Response from SQ Docs "+ response);
					callbackFunc(response.data.getSharedQueueDocsOutput);
				});
		},
		
		fetchCaseQueueDocs : function(callbackFunc) {
			var url="/rest/bc/proxy";
		    var data={ "serverType":"IS",
				      "url":"/rest/OWCS_PAL_UI.wsp.caseCreateQueue",
				      "requestMethod":"GET"
				      };
			$http.post(url,data)
				.then(function(response) {
					console.log("Response from CASE QUEUE "+ response);
					callbackFunc(response.data.getCaseCreateQueueOutput);
				});
		},
		
		fetchDistOffQueueDocs : function(callbackFunc) {
			var url="/rest/bc/proxy";
		    var data={ "serverType":"IS",
				      "url":"/rest/OWCS_PAL_UI.wsp.distOfficeQueue",
				      "requestMethod":"GET"
				      };
			$http.post(url,data)
				.then(function(response) {
					console.log("Response from Distric Office QUEUE "+ response);
					callbackFunc(response.data.getDistOfficeQueueOutput);
				});
		},
		
		fetchSecReviewQueueDocs : function(callbackFunc) {
			var url="/rest/bc/proxy";
		    var data={ "serverType":"IS",
				      "url":"/rest/OWCS_PAL_UI.wsp.secondReviewQueue",
				      "requestMethod":"GET"
				      };
			$http.post(url,data)
				.then(function(response) {
					console.log("Response from Second Review QUEUE "+ response);
					callbackFunc(response.data.getSecondReviewQueueOutput);
				});
		},
  */
  
  //For POC all these service directly returns the response to caller component
  // change the logic to use callback option -- this is todo item
  
  
  getOtherTasks(taskId: number){
      console.log("calling service getOPSPlanPalTask for taskId : " + taskId);
        var request={ "serverType":"IS",
              "url":"/rest/OWCS_PAL_UI.OtherTasks.getOtherTasks",
              "requestMethod":"GET"
              };             
     return this.http.post(this.url,request);
  }

}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../../app.config';
//import { PalData } from '/owcs/app/components/pal/pal.model';


@Injectable()
export class QueueService {

  constructor(private http: Http, private appConfig: AppConfig) {}
  //readonly url="/rest/bc/proxy";
  //readonly url: string = "https://dev-sagis-owcs.acuitys.com";//this.appConfig.getConfig('local');
  readonly url: string = this.appConfig.getConfig('apiEndPoint');
  user: string = this.appConfig.getConfig('user');
  userName: string = this.appConfig.getConfig(this.user + 'UserId');
  password: string = this.appConfig.getConfig(this.user + 'Password');
  //readonly url="/rest/bc/proxy";
  private headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 
  					'Authorization': "Basic " + btoa(this.userName + ":" + this.password), 'Access-Control-Allow-Origin': '*'  });
  private options = new RequestOptions({ headers: this.headers });
  
  
  fetchSharedQueue(queueName:string)  {
  		let request={ "serverType":"IS",
              "url":"/rest/OWCS_PAL_UI.wsp."+queueName,
              "requestMethod":"GET"
              };
		let requestUrl = this.url + "/rest/OWCS_PAL_UI.wsp."+queueName;
		return this.http.get(requestUrl, this.options);
    }
  
  ProcessQueueDocument(docID: string, queueName:string, reason: string, sendLetter: string, districtOfficeSelection: string)  {
       	console.log('HTTP REQUEST: DOCID:'+docID+ ' QUENM ' + queueName+ 'REASON: ' + reason );
    	let request={ "serverType":"IS",
              "url":"/rest/OWCS_SharedQueue.wsp.processQueue?DocumentID="+docID+"&QueueType="+queueName+"&Reason="+reason+"&sendLetter="+sendLetter,
              "requestMethod":"GET"
              };
		let requestUrl = this.url + "/rest/OWCS_SharedQueue.wsp.processQueue?DocumentID="+docID+"&QueueType="+queueName+"&Reason="+reason+"&sendLetter="+sendLetter+"&DistrictID="+districtOfficeSelection;
		return this.http.get(requestUrl, this.options);
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
		let requestUrl = this.url + "/rest/OWCS_PAL_UI.OtherTasks.getOtherTasks";
     	return this.http.get(requestUrl, this.options);
  	}

}

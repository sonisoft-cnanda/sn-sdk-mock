import { RESTDataStore } from "../../sn_ws_data";


// export class MockRESTResponseV2 {
//   private _mock_request: MockRESTMessageV2;

//   constructor(request: MockRESTMessageV2) {
//       RESTDataStore.getInstance().addMockResponse(this);
//       this._mock_request = request;
//   }

//   getBody(): any {
//     return RESTDataStore.getInstance().mockResponseBody;
      
//   }

//   getStatusCode(): number {
//       return RESTDataStore.getInstance().mockResponseCode;
//   }

//   getRequest(): MockRESTMessageV2 {
//       return this._mock_request;
//   }
// }


// export class MockRESTMessageV2 {
//   private mockProperties: Record<string, string>;
//   private mockEccParams: Record<string, string>;
//   private mockParams: Record<string, string>;
//   private mockRequestBody: string;
//   private name: string | null = null;
//   private methodName: string | null = null;

//   private _endpoint: string;
//   public get endpoint(): string {
//     return this._endpoint;
//   }
//   public set endpoint(value: string) {
//     this._endpoint = value;
//   }

//        private _restMessageBody:string | null = null;
//       private _parameters:any[] = [];
//       private _headers = new Array().fill({name: 'session', value: '${session_id}'});
//       //private _endpoint = '${tanium_module_api_url}/gateway/graphql'; //Set from the REST Message Function definition
//       private _bodyTemplate:string | null = null;//deployMutation; //print(deployMutation);;
//     public get bodyTemplate() {
//       return this._bodyTemplate;
//     }
//     public set bodyTemplate(value) {
//       this._bodyTemplate = value;
//     }

    

//   constructor(name?: string, methodName?: string) {
//     RESTDataStore.getInstance().addMockRequest(this);
//       this.mockProperties = {};
//       this.mockEccParams = {};
//       this.mockParams = {};
//       this.mockRequestBody = '';
//       if(name)
//         this.name = name;
//       if(methodName)
//         this.methodName = methodName;

//       if(name && methodName){
//         this._bodyTemplate = RESTDataStore.getInstance().getRESTMessageTemplate(name).methods[methodName].templateBody;
//       }
//   }

//   setStringParameter =  jest.fn().mockImplementation((name:string, value:string) => {
//       this._parameters.push({name: name, value: value});
//   });

//   setStringParameterNoEscape =  jest.fn().mockImplementation((name:string, value:string) => {
//       this._parameters.push({name: name, value: value});
//   });

//   // setStringParameterNoEscape(key: string, value: string): void {
//   //     this.mockParams[key] = value;
//   // }

//   setMIDServer(value: string): void {
//       this.mockProperties["mid_server"] = value;
//   }

//   // execute(): MockRESTResponseV2 {
//   //     return new MockRESTResponseV2(this);
//   // }

//        public  execute= jest.fn().mockImplementation(() => {
//                     //Generate a body value based on the deployMutation string
//             let body = this._bodyTemplate;
            
//             this._parameters.forEach((param) => {
//                 if(body)
//                   body = body.replace('\\${' + param.name + '}', param.value);

//                 this._headers.forEach((header) => {
//                     header.value = header.value.replace('${' + param.name + '}', param.value);
//                 });
//                 this._endpoint = this._endpoint.replace('${' + param.name + '}', param.value);
//             });
//             this._restMessageBody = body;
            
            
//             let response = new MockRESTResponseV2(this);
            
//             return response;
//         });

//   executeAsync(): MockRESTResponseV2 {
//       throw new Error("Method not implemented.");
//   }

//   setHttpTimeout(timeout: number): void {
//       this.mockProperties["http_timeout"] = timeout.toString();
//   }

//   setEccParameter(param: string, value: string): void {
//       this.mockEccParams[param] = value;
//   }

//   setRequestBody(body: string): void {
//       this.mockRequestBody = body;
//   }

//   getMockProperties(): Record<string, string> {
//       return this.mockProperties;
//   }

//   getMockEccParams(): Record<string, string> {
//       return this.mockEccParams;
//   }

//   getMockParams(): Record<string, string> {
//       return this.mockParams;
//   }

//   getMockRequestBody(): string {
//       return this.mockRequestBody;
//   }
// }
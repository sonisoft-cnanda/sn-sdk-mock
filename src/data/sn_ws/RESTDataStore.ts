import { MockRestMessageV2 } from "../../@servicenow/glide/sn_ws/MockRestMessageV2";
import { MockRestResponseV2 } from "../../@servicenow/glide/sn_ws/MockRestResponseV2";
import { RestMessageTemplate } from "./RestMessageTemplate";


export class RestDataStore {
    private static _instance: RestDataStore;
  
    private _mockRequests: MockRestMessageV2[];
    private _mockResponses: MockRestResponseV2[];
    private _mockResponseBody: string;
    public get mockResponseBody(): string {
      return this._mockResponseBody;
    }
    public set mockResponseBody(value: string) {
      this._mockResponseBody = value;
    }
    private _mockResponseCode: number;
    public get mockResponseCode(): number {
      return this._mockResponseCode;
    }
    public set mockResponseCode(value: number) {
      this._mockResponseCode = value;
    }
  
    private _restMessageTemplates: Record<string, RestMessageTemplate> = {};
  
    private _hasError: boolean = false;
    public get hasError(): boolean {
      return this._hasError;
    }
    public set hasError(value: boolean) {
      this._hasError = value;
    }
  
    private constructor() {
      this._mockRequests = [];
      this._mockResponses = [];
      this._mockResponseBody = "";
      this._mockResponseCode = 200;
    }
  
    public static getInstance(): RestDataStore {
      if (!this._instance) {
        this._instance = new RestDataStore();
      }
      return this._instance;
    }
  
    public addRESTMessageTemplate(template: RestMessageTemplate) {
      this._restMessageTemplates[template.messageName] = template;
    }
  
    public getRESTMessageTemplate(messageName: string): RestMessageTemplate {
      return this._restMessageTemplates[messageName];
    }
  
    public addMockRequest(request: MockRestMessageV2) {
      this._mockRequests.push(request);
    }
  
    public getMockRequests(): MockRestMessageV2[] {
      return this._mockRequests;
    }
  
    public addMockResponse(response: MockRestResponseV2) {
      this._mockResponses.push(response);
    }
  
    public getMockResponses(): MockRestResponseV2[] {
      return this._mockResponses;
    }
  
    public clearMockResponses() {
      this._mockResponses = [];
    }
  
    public clearMockRequests() {
      this._mockRequests = [];
    }
  
    public clearRestMessageTemplates() {
      this._restMessageTemplates = {};
    }
  
    public clearMockData() {
      this.clearMockRequests();
      this.clearMockResponses();
      this.clearRestMessageTemplates();
    }
  }
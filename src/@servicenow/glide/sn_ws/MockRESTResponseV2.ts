import { RestDataStore } from "../../../data/sn_ws/RestDataStore";
import { MockRestMessageV2 } from "./MockRestMessageV2";

export class MockRestResponseV2 {
    private _mock_request: MockRestMessageV2;
    private _headers: Record<string, string> = {};
  
    constructor(request: MockRestMessageV2) {
      RestDataStore.getInstance().addMockResponse(this);
      this._mock_request = request;
    }
  
    public getBody(): any {
      return RestDataStore.getInstance().mockResponseBody;
    }
  
    public getStatusCode(): number {
      return RestDataStore.getInstance().mockResponseCode;
    }
  
    public getRequest(): MockRestMessageV2 {
      return this._mock_request;
    }
  
    public getHeaders(): Record<any, any> {
      return this._headers;
    }
  
    public getHeader(headerName: string): string {
      return this._headers[headerName];
    }
  
    public haveError(): boolean {
      return RestDataStore.getInstance().hasError;
    }
  }
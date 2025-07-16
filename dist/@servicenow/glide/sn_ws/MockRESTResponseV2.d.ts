import { MockRESTMessageV2 } from "./MockRESTMessageV2.js";
export declare class MockRESTResponseV2 {
    private _mock_request;
    private _headers;
    constructor(request: MockRESTMessageV2);
    getBody(): any;
    getStatusCode(): number;
    getRequest(): MockRESTMessageV2;
    getHeaders(): Record<any, any>;
    getHeader(headerName: string): string;
    haveError(): boolean;
}
//# sourceMappingURL=MockRESTResponseV2.d.ts.map
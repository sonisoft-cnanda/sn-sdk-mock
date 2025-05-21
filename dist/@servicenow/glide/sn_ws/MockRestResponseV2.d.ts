import { MockRestMessageV2 } from "./MockRestMessageV2.js";
export declare class MockRestResponseV2 {
    private _mock_request;
    private _headers;
    constructor(request: MockRestMessageV2);
    getBody(): any;
    getStatusCode(): number;
    getRequest(): MockRestMessageV2;
    getHeaders(): Record<any, any>;
    getHeader(headerName: string): string;
    haveError(): boolean;
}
//# sourceMappingURL=MockRestResponseV2.d.ts.map
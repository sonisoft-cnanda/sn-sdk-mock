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
export declare class MockRESTMessageV2 {
    private mockProperties;
    private mockEccParams;
    private mockParams;
    private _name;
    get name(): string | null;
    set name(value: string | null);
    private _methodName;
    get methodName(): string | null;
    set methodName(value: string | null);
    private _endpoint;
    get endpoint(): string;
    set endpoint(value: string);
    private _restMessageBody;
    private _parameters;
    get parameters(): any[];
    set parameters(value: any[]);
    private _headers;
    private _bodyTemplate;
    get bodyTemplate(): string;
    set bodyTemplate(value: string);
    constructor(name?: string, methodName?: string);
    getRequestHeader(headerName?: string): string;
    getRequestHeaders(): Record<any, any>;
    getRequestBody(): string | null;
    setRequestHeader(name: string, value: string): void;
    setStringParameter(name: string, value: string): void;
    setStringParameterNoEscape(name: string, value: string): void;
    getEndpoint(): string;
    setMIDServer(value: string): void;
    execute(): MockRESTResponseV2;
    executeAsync(): MockRESTResponseV2;
    setHttpTimeout(timeout: number): void;
    setEccParameter(param: string, value: string): void;
    setHttpMethod(method: string): void;
    setEndpoint(endpoint: string): void;
    setRequestBody(body: string): void;
    getMockProperties(): Record<string, string>;
    getMockEccParams(): Record<string, string>;
    getMockParams(): Record<string, string>;
    getMockRequestBody(): string | null;
}
export declare class RESTMessageTemplate {
    private _messageName;
    get messageName(): string;
    set messageName(value: string);
    private _methods;
    get methods(): Record<string, RESTMessageFunctionTemplate>;
    set methods(value: Record<string, RESTMessageFunctionTemplate>);
    constructor(messageName: string);
    addMethod(methodName: string, templateBody: string): void;
}
export declare class RESTMessageFunctionTemplate {
    private _methodName;
    get methodName(): string;
    set methodName(value: string);
    private _templateBody;
    get templateBody(): string;
    set templateBody(value: string);
    private _defaultEndpoint;
    constructor(methodName: string, templateBody: string);
    setDefaultEndpoint(endpoint: string): void;
    getDefaultEndpoint(): string;
}
export declare class RESTDataStore {
    private static _instance;
    private _mockRequests;
    private _mockResponses;
    private _mockResponseBody;
    get mockResponseBody(): string;
    set mockResponseBody(value: string);
    private _mockResponseCode;
    get mockResponseCode(): number;
    set mockResponseCode(value: number);
    private _restMessageTemplates;
    private _hasError;
    get hasError(): boolean;
    set hasError(value: boolean);
    private constructor();
    static getInstance(): RESTDataStore;
    addRESTMessageTemplate(template: RESTMessageTemplate): void;
    getRESTMessageTemplate(messageName: string): RESTMessageTemplate;
    addMockRequest(request: MockRESTMessageV2): void;
    getMockRequests(): MockRESTMessageV2[];
    addMockResponse(response: MockRESTResponseV2): void;
    getMockResponses(): MockRESTResponseV2[];
    clearMockResponses(): void;
    clearMockRequests(): void;
    clearRestMessageTemplates(): void;
    clearMockData(): void;
}
//# sourceMappingURL=sn_ws_data.d.ts.map
export declare class MockRESTResponseV2 {
    private _mock_request;
    private _headers;
    constructor(request: MockRESTMessageV2);
    getBody: jest.Mock<any, any, any>;
    getStatusCode: jest.Mock<any, any, any>;
    getRequest: jest.Mock<any, any, any>;
    getHeaders: jest.Mock<any, any, any>;
    getHeader: jest.Mock<any, any, any>;
    haveError: jest.Mock<any, any, any>;
}
export declare class MockRESTMessageV2 {
    private mockProperties;
    private mockEccParams;
    private mockParams;
    private name;
    private methodName;
    private _endpoint;
    get endpoint(): string;
    set endpoint(value: string);
    private _restMessageBody;
    private _parameters;
    private _headers;
    private _bodyTemplate;
    get bodyTemplate(): string;
    set bodyTemplate(value: string);
    constructor(name?: string, methodName?: string);
    getRequestHeader: jest.Mock<any, any, any>;
    getRequestHeaders: jest.Mock<any, any, any>;
    getRequestBody: jest.Mock<any, any, any>;
    setRequestHeader: jest.Mock<any, any, any>;
    setStringParameter: jest.Mock<any, any, any>;
    setStringParameterNoEscape: jest.Mock<any, any, any>;
    getEndpoint: jest.Mock<any, any, any>;
    setMIDServer: jest.Mock<any, any, any>;
    execute: jest.Mock<any, any, any>;
    executeAsync: jest.Mock<any, any, any>;
    setHttpTimeout: jest.Mock<any, any, any>;
    setEccParameter: jest.Mock<any, any, any>;
    setRequestBody: jest.Mock<any, any, any>;
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
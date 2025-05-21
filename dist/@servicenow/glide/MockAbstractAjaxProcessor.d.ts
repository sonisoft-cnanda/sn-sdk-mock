export declare class MockAbstractAjaxProcessor {
    private CALLABLE_PREFIX;
    private request;
    private responseXML;
    private gc;
    constructor(request?: any, responseXML?: any, gc?: any);
    process: jest.Mock<any, any, any>;
    newItem: jest.Mock<any, any, any>;
    getParameter: jest.Mock<any, any, any>;
    getDocument: jest.Mock<any, any, any>;
    getRootElement: jest.Mock<any, any, any>;
    getName: jest.Mock<any, any, any>;
    getValue: jest.Mock<any, any, any>;
    getType: jest.Mock<any, any, any>;
    getChars: jest.Mock<any, any, any>;
    setAnswer: jest.Mock<any, any, any>;
    setError: jest.Mock<any, any, any>;
    type: string;
}
//# sourceMappingURL=MockAbstractAjaxProcessor.d.ts.map
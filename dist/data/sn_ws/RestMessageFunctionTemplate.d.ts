export declare class RestMessageFunctionTemplate {
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
//# sourceMappingURL=RestMessageFunctionTemplate.d.ts.map
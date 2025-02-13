import { debug, error } from "console";

export class MockRESTResponseV2 {
  private _mock_request: MockRESTMessageV2;
  private _headers: Record<string, string> = {};

  constructor(request: MockRESTMessageV2) {
    RESTDataStore.getInstance().addMockResponse(this);
    this._mock_request = request;
  }

  public getBody(): any {
    return RESTDataStore.getInstance().mockResponseBody;
  }

  public getStatusCode(): number {
    return RESTDataStore.getInstance().mockResponseCode;
  }

  public getRequest(): MockRESTMessageV2 {
    return this._mock_request;
  }

  public getHeaders(): Record<any, any> {
    return this._headers;
  }

  public getHeader(headerName: string): string {
    return this._headers[headerName];
  }

  public haveError(): boolean {
    return RESTDataStore.getInstance().hasError;
  }
}

export class MockRESTMessageV2 {
  private mockProperties: Record<string, string>;
  private mockEccParams: Record<string, string>;
  private mockParams: Record<string, string>;
  private name: string | null = null;
  private methodName: string | null = null;

  private _endpoint: string;
  public get endpoint(): string {
    return this._endpoint;
  }
  public set endpoint(value: string) {
    this._endpoint = value;
  }

  private _restMessageBody: string | null = null;
  private _parameters: any[] = [];
  public get parameters(): any[] {
    return this._parameters;
  }
  public set parameters(value: any[]) {
    this._parameters = value;
  }
  
  private _headers = new Array().fill({
    name: "session",
    value: "${session_id}",
  });
  //private _endpoint = '${tanium_module_api_url}/gateway/graphql'; //Set from the REST Message Function definition
  private _bodyTemplate: string | null = null; //deployMutation; //print(deployMutation);;

  public get bodyTemplate() {
    return this._bodyTemplate;
  }
  public set bodyTemplate(value) {
    this._bodyTemplate = value;
  }

  constructor(name?: string, methodName?: string) {
    RESTDataStore.getInstance().addMockRequest(this);
    this.mockProperties = {};
    this.mockEccParams = {};
    this.mockParams = {};

    this._headers = new Array().fill({
      name: "session",
      value: "${session_id}",
    });
    if (name) this.name = name;
    if (methodName) this.methodName = methodName;

    if (name && methodName) {
      let restMessage =
        RESTDataStore.getInstance().getRESTMessageTemplate(name);

      if (restMessage) {
        debug(
          JSON.stringify(
            "RESTMessage object found in data store." + restMessage
          )
        );
        let restMessageFn = restMessage.methods[methodName];

        if (restMessageFn) {
          debug("MOCKRESTMessageV2: " + JSON.stringify(restMessageFn));

          this._bodyTemplate = restMessageFn.templateBody;
          this._endpoint = restMessageFn.getDefaultEndpoint();
        } else {
          error(
            "RESTMessageFunctionTemplate not found for " +
              name +
              "." +
              methodName
          );
        }
      } else {
        error("RESTMessageTemplate not found for " + name);
      }
    }
  }

  public getRequestHeader(headerName?: string): string {
    if (headerName) {
      let header = this._headers.find((header) => header.name === headerName);
      if (header) return header.value;
    }
    return "";
  }

  public getRequestHeaders(): Record<any, any> {
    return this._headers;
  }

  public getRequestBody(): string | null {
    return this._restMessageBody;
  }

  public setRequestHeader(name: string, value: string): void {
    this._headers.push({ name: name, value: value });
  }

  public setStringParameter(name: string, value: string): void {
    this._parameters.push({ name: name, value: value });
  }

  // setStringParameterNoEscape =  jest.fn().mockImplementation((name:string, value:string) => {
  //     this._parameters.push({name: name, value: value});
  // });

  public setStringParameterNoEscape(name: string, value: string) {
    this._parameters.push({ name: name, value: value });
  }

  public getEndpoint(): string {
    return this._endpoint;
  }

  public setMIDServer(value: string): void {
    this.mockProperties["mid_server"] = value;
  }

  public execute(): MockRESTResponseV2 {
    // Generate a body value based on the deployMutation string
    let body = this._bodyTemplate;

    this._parameters.forEach((param) => {
      if (body) body = body.replace("\\${" + param.name + "}", param.value);

      this._headers.forEach((header) => {
        header.value = header.value.replace(
          "${" + param.name + "}",
          param.value
        );
      });
      if (this._endpoint)
        this._endpoint = this._endpoint.replace(
          "${" + param.name + "}",
          param.value
        );
    });
    this._restMessageBody = body;

    let response = new MockRESTResponseV2(this);

    return response;
  }

  public executeAsync(): MockRESTResponseV2 {
    let body = this._bodyTemplate;

    this._parameters.forEach((param) => {
      if (body) body = body.replace("\\${" + param.name + "}", param.value);

      this._headers.forEach((header) => {
        header.value = header.value.replace(
          "${" + param.name + "}",
          param.value
        );
      });
      if (this._endpoint)
        this._endpoint = this._endpoint.replace(
          "${" + param.name + "}",
          param.value
        );
    });
    this._restMessageBody = body;

    let response = new MockRESTResponseV2(this);

    return response;
  }

  public setHttpTimeout(timeout: number): void {
    this.mockProperties["http_timeout"] = timeout.toString();
  }

  public setEccParameter(param: string, value: string): void {
    this.mockEccParams[param] = value;
  }

  public setHttpMethod(method: string): void {
    this.mockProperties["http_method"] = method;
  }

  public setEndpoint(endpoint: string): void {
    this._endpoint = endpoint;
  }

  public setRequestBody(body: string): void {
    this._restMessageBody = body;
  }

  getMockProperties(): Record<string, string> {
    return this.mockProperties;
  }

  getMockEccParams(): Record<string, string> {
    return this.mockEccParams;
  }

  getMockParams(): Record<string, string> {
    return this.mockParams;
  }

  getMockRequestBody(): string | null {
    return this._restMessageBody;
  }
}

export class RESTMessageTemplate {
  private _messageName: string;
  public get messageName(): string {
    return this._messageName;
  }
  public set messageName(value: string) {
    this._messageName = value;
  }

  private _methods: Record<string, RESTMessageFunctionTemplate> = {};
  public get methods(): Record<string, RESTMessageFunctionTemplate> {
    return this._methods;
  }
  public set methods(value: Record<string, RESTMessageFunctionTemplate>) {
    this._methods = value;
  }

  public constructor(messageName: string) {
    this._messageName = messageName;
  }

  public addMethod(methodName: string, templateBody: string) {
    this._methods[methodName] = new RESTMessageFunctionTemplate(
      methodName,
      templateBody
    );
  }
}

export class RESTMessageFunctionTemplate {
  private _methodName: string;
  public get methodName(): string {
    return this._methodName;
  }
  public set methodName(value: string) {
    this._methodName = value;
  }

  private _templateBody: string;
  public get templateBody(): string {
    return this._templateBody;
  }
  public set templateBody(value: string) {
    this._templateBody = value;
  }

  private _defaultEndpoint: string = "${tanium_module_api_url}/gateway/graphql";

  public constructor(methodName: string, templateBody: string) {
    this._methodName = methodName;
    this._templateBody = templateBody;
  }

  public setDefaultEndpoint(endpoint: string) {
    this._defaultEndpoint = endpoint;
  }

  public getDefaultEndpoint() {
    return this._defaultEndpoint;
  }
}

export class RESTDataStore {
  private static _instance: RESTDataStore;

  private _mockRequests: MockRESTMessageV2[];
  private _mockResponses: MockRESTResponseV2[];
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

  private _restMessageTemplates: Record<string, RESTMessageTemplate> = {};

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

  public static getInstance(): RESTDataStore {
    if (!this._instance) {
      this._instance = new RESTDataStore();
    }
    return this._instance;
  }

  public addRESTMessageTemplate(template: RESTMessageTemplate) {
    this._restMessageTemplates[template.messageName] = template;
  }

  public getRESTMessageTemplate(messageName: string): RESTMessageTemplate {
    return this._restMessageTemplates[messageName];
  }

  public addMockRequest(request: MockRESTMessageV2) {
    this._mockRequests.push(request);
  }

  public getMockRequests(): MockRESTMessageV2[] {
    return this._mockRequests;
  }

  public addMockResponse(response: MockRESTResponseV2) {
    this._mockResponses.push(response);
  }

  public getMockResponses(): MockRESTResponseV2[] {
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

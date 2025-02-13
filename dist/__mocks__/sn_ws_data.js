"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTDataStore = exports.RESTMessageFunctionTemplate = exports.RESTMessageTemplate = exports.MockRESTMessageV2 = exports.MockRESTResponseV2 = void 0;
const console_1 = require("console");
class MockRESTResponseV2 {
    constructor(request) {
        this._headers = {};
        RESTDataStore.getInstance().addMockResponse(this);
        this._mock_request = request;
    }
    getBody() {
        return RESTDataStore.getInstance().mockResponseBody;
    }
    getStatusCode() {
        return RESTDataStore.getInstance().mockResponseCode;
    }
    getRequest() {
        return this._mock_request;
    }
    getHeaders() {
        return this._headers;
    }
    getHeader(headerName) {
        return this._headers[headerName];
    }
    haveError() {
        return RESTDataStore.getInstance().hasError;
    }
}
exports.MockRESTResponseV2 = MockRESTResponseV2;
class MockRESTMessageV2 {
    get endpoint() {
        return this._endpoint;
    }
    set endpoint(value) {
        this._endpoint = value;
    }
    get parameters() {
        return this._parameters;
    }
    set parameters(value) {
        this._parameters = value;
    }
    get bodyTemplate() {
        return this._bodyTemplate;
    }
    set bodyTemplate(value) {
        this._bodyTemplate = value;
    }
    constructor(name, methodName) {
        this.name = null;
        this.methodName = null;
        this._restMessageBody = null;
        this._parameters = [];
        this._headers = new Array().fill({
            name: "session",
            value: "${session_id}",
        });
        //private _endpoint = '${tanium_module_api_url}/gateway/graphql'; //Set from the REST Message Function definition
        this._bodyTemplate = null; //deployMutation; //print(deployMutation);;
        RESTDataStore.getInstance().addMockRequest(this);
        this.mockProperties = {};
        this.mockEccParams = {};
        this.mockParams = {};
        this._headers = new Array().fill({
            name: "session",
            value: "${session_id}",
        });
        if (name)
            this.name = name;
        if (methodName)
            this.methodName = methodName;
        if (name && methodName) {
            let restMessage = RESTDataStore.getInstance().getRESTMessageTemplate(name);
            if (restMessage) {
                (0, console_1.debug)(JSON.stringify("RESTMessage object found in data store." + restMessage));
                let restMessageFn = restMessage.methods[methodName];
                if (restMessageFn) {
                    (0, console_1.debug)("MOCKRESTMessageV2: " + JSON.stringify(restMessageFn));
                    this._bodyTemplate = restMessageFn.templateBody;
                    this._endpoint = restMessageFn.getDefaultEndpoint();
                }
                else {
                    (0, console_1.error)("RESTMessageFunctionTemplate not found for " +
                        name +
                        "." +
                        methodName);
                }
            }
            else {
                (0, console_1.error)("RESTMessageTemplate not found for " + name);
            }
        }
    }
    getRequestHeader(headerName) {
        if (headerName) {
            let header = this._headers.find((header) => header.name === headerName);
            if (header)
                return header.value;
        }
        return "";
    }
    getRequestHeaders() {
        return this._headers;
    }
    getRequestBody() {
        return this._restMessageBody;
    }
    setRequestHeader(name, value) {
        this._headers.push({ name: name, value: value });
    }
    setStringParameter(name, value) {
        this._parameters.push({ name: name, value: value });
    }
    // setStringParameterNoEscape =  jest.fn().mockImplementation((name:string, value:string) => {
    //     this._parameters.push({name: name, value: value});
    // });
    setStringParameterNoEscape(name, value) {
        this._parameters.push({ name: name, value: value });
    }
    getEndpoint() {
        return this._endpoint;
    }
    setMIDServer(value) {
        this.mockProperties["mid_server"] = value;
    }
    execute() {
        // Generate a body value based on the deployMutation string
        let body = this._bodyTemplate;
        this._parameters.forEach((param) => {
            if (body)
                body = body.replace("\\${" + param.name + "}", param.value);
            this._headers.forEach((header) => {
                header.value = header.value.replace("${" + param.name + "}", param.value);
            });
            if (this._endpoint)
                this._endpoint = this._endpoint.replace("${" + param.name + "}", param.value);
        });
        this._restMessageBody = body;
        let response = new MockRESTResponseV2(this);
        return response;
    }
    executeAsync() {
        let body = this._bodyTemplate;
        this._parameters.forEach((param) => {
            if (body)
                body = body.replace("\\${" + param.name + "}", param.value);
            this._headers.forEach((header) => {
                header.value = header.value.replace("${" + param.name + "}", param.value);
            });
            if (this._endpoint)
                this._endpoint = this._endpoint.replace("${" + param.name + "}", param.value);
        });
        this._restMessageBody = body;
        let response = new MockRESTResponseV2(this);
        return response;
    }
    setHttpTimeout(timeout) {
        this.mockProperties["http_timeout"] = timeout.toString();
    }
    setEccParameter(param, value) {
        this.mockEccParams[param] = value;
    }
    setHttpMethod(method) {
        this.mockProperties["http_method"] = method;
    }
    setEndpoint(endpoint) {
        this._endpoint = endpoint;
    }
    setRequestBody(body) {
        this._restMessageBody = body;
    }
    getMockProperties() {
        return this.mockProperties;
    }
    getMockEccParams() {
        return this.mockEccParams;
    }
    getMockParams() {
        return this.mockParams;
    }
    getMockRequestBody() {
        return this._restMessageBody;
    }
}
exports.MockRESTMessageV2 = MockRESTMessageV2;
class RESTMessageTemplate {
    get messageName() {
        return this._messageName;
    }
    set messageName(value) {
        this._messageName = value;
    }
    get methods() {
        return this._methods;
    }
    set methods(value) {
        this._methods = value;
    }
    constructor(messageName) {
        this._methods = {};
        this._messageName = messageName;
    }
    addMethod(methodName, templateBody) {
        this._methods[methodName] = new RESTMessageFunctionTemplate(methodName, templateBody);
    }
}
exports.RESTMessageTemplate = RESTMessageTemplate;
class RESTMessageFunctionTemplate {
    get methodName() {
        return this._methodName;
    }
    set methodName(value) {
        this._methodName = value;
    }
    get templateBody() {
        return this._templateBody;
    }
    set templateBody(value) {
        this._templateBody = value;
    }
    constructor(methodName, templateBody) {
        this._defaultEndpoint = "${tanium_module_api_url}/gateway/graphql";
        this._methodName = methodName;
        this._templateBody = templateBody;
    }
    setDefaultEndpoint(endpoint) {
        this._defaultEndpoint = endpoint;
    }
    getDefaultEndpoint() {
        return this._defaultEndpoint;
    }
}
exports.RESTMessageFunctionTemplate = RESTMessageFunctionTemplate;
class RESTDataStore {
    get mockResponseBody() {
        return this._mockResponseBody;
    }
    set mockResponseBody(value) {
        this._mockResponseBody = value;
    }
    get mockResponseCode() {
        return this._mockResponseCode;
    }
    set mockResponseCode(value) {
        this._mockResponseCode = value;
    }
    get hasError() {
        return this._hasError;
    }
    set hasError(value) {
        this._hasError = value;
    }
    constructor() {
        this._restMessageTemplates = {};
        this._hasError = false;
        this._mockRequests = [];
        this._mockResponses = [];
        this._mockResponseBody = "";
        this._mockResponseCode = 200;
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new RESTDataStore();
        }
        return this._instance;
    }
    addRESTMessageTemplate(template) {
        this._restMessageTemplates[template.messageName] = template;
    }
    getRESTMessageTemplate(messageName) {
        return this._restMessageTemplates[messageName];
    }
    addMockRequest(request) {
        this._mockRequests.push(request);
    }
    getMockRequests() {
        return this._mockRequests;
    }
    addMockResponse(response) {
        this._mockResponses.push(response);
    }
    getMockResponses() {
        return this._mockResponses;
    }
    clearMockResponses() {
        this._mockResponses = [];
    }
    clearMockRequests() {
        this._mockRequests = [];
    }
    clearRestMessageTemplates() {
        this._restMessageTemplates = {};
    }
    clearMockData() {
        this.clearMockRequests();
        this.clearMockResponses();
        this.clearRestMessageTemplates();
    }
}
exports.RESTDataStore = RESTDataStore;
//# sourceMappingURL=sn_ws_data.js.map
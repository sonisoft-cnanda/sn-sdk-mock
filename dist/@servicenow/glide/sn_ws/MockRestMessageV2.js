"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRestMessageV2 = void 0;
const RestDataStore_1 = require("../../../data/sn_ws/RestDataStore.js");
const console_1 = require("console");
const MockRestResponseV2_1 = require("./MockRestResponseV2.js");
class MockRestMessageV2 {
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get methodName() {
        return this._methodName;
    }
    set methodName(value) {
        this._methodName = value;
    }
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
        this._name = null;
        this._methodName = null;
        this._restMessageBody = null;
        this._parameters = [];
        this._headers = new Array().fill({
            name: "session",
            value: "${session_id}",
        });
        //private _endpoint = '${tanium_module_api_url}/gateway/graphql'; //Set from the REST Message Function definition
        this._bodyTemplate = null; //deployMutation; //print(deployMutation);;
        RestDataStore_1.RestDataStore.getInstance().addMockRequest(this);
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
            let restMessage = RestDataStore_1.RestDataStore.getInstance().getRESTMessageTemplate(name);
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
        let response = new MockRestResponseV2_1.MockRestResponseV2(this);
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
        let response = new MockRestResponseV2_1.MockRestResponseV2(this);
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
exports.MockRestMessageV2 = MockRestMessageV2;
//# sourceMappingURL=MockRestMessageV2.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTMessageFunctionTemplate = void 0;
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
//# sourceMappingURL=RESTMessageFunctionTemplate.js.map
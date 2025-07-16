"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTMessageTemplate = void 0;
const RESTMessageFunctionTemplate_1 = require("./RESTMessageFunctionTemplate.js");
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
        this._methods[methodName] = new RESTMessageFunctionTemplate_1.RESTMessageFunctionTemplate(methodName, templateBody);
    }
}
exports.RESTMessageTemplate = RESTMessageTemplate;
//# sourceMappingURL=RESTMessageTemplate.js.map
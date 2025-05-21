"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestMessageTemplate = void 0;
const RestMessageFunctionTemplate_1 = require("./RestMessageFunctionTemplate.js");
class RestMessageTemplate {
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
        this._methods[methodName] = new RestMessageFunctionTemplate_1.RestMessageFunctionTemplate(methodName, templateBody);
    }
}
exports.RestMessageTemplate = RestMessageTemplate;
//# sourceMappingURL=RestMessageTemplate.js.map
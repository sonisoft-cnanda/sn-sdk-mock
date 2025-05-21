"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTableBusinessRule = void 0;
class DataTableBusinessRule {
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get method() {
        return this._brMethod;
    }
    set method(value) {
        this._brMethod = value;
    }
    get when() {
        return this._when;
    }
    set when(value) {
        this._when = value;
    }
    get type() {
        return this._brType;
    }
    set type(value) {
        this._brType = value;
    }
    constructor(name, brWhen, type, method) {
        this._name = name;
        this.method = method;
        this._when = brWhen;
        this._brType = type;
    }
}
exports.DataTableBusinessRule = DataTableBusinessRule;
//# sourceMappingURL=DataTableBusinessRule.js.map
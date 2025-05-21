"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockGlideQueryCondition = void 0;
class MockGlideQueryCondition {
    constructor() {
        this.conditions = [];
    }
    addCondition(name, oper, value) {
        this.conditions.push({ name, oper, value });
        return this;
    }
    addOrCondition(name, oper, value) {
        this.conditions.push({ name, oper, value });
        return this;
    }
    getConditions() {
        return this.conditions;
    }
}
exports.MockGlideQueryCondition = MockGlideQueryCondition;
//# sourceMappingURL=MockGlideQueryCondition.js.map
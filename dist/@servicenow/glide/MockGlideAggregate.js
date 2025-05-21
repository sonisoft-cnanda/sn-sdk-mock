"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockGlideAggregate = void 0;
const MockGlideRecord_1 = require("./MockGlideRecord.js");
class MockGlideAggregate extends MockGlideRecord_1.MockGlideRecord {
    constructor() {
        super(...arguments);
        this._groupBy = null;
        this.groupBy = jest.fn().mockImplementation((column) => {
            this.groupByVal = column;
            return this;
        });
    }
    get groupByVal() {
        return this._groupBy;
    }
    set groupByVal(value) {
        this._groupBy = value;
    }
}
exports.MockGlideAggregate = MockGlideAggregate;
//# sourceMappingURL=MockGlideAggregate.js.map
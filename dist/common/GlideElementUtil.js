"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlideElementUtil = void 0;
const MockGlideRecord_1 = require("../@servicenow/glide/MockGlideRecord.js");
const MockGlideElement_1 = require("../@servicenow/glide/MockGlideElement.js");
class GlideElementUtil {
    static createGlideElementReference(elementName, refTable, refObject) {
        const gr = new MockGlideRecord_1.MockGlideRecord(refTable);
        gr.setMockData(refObject);
        const ge = new MockGlideElement_1.MockGlideElement(elementName);
        ge.setRefRecord(gr);
        ge.setRefRecordTableName(refTable);
        return ge;
    }
    static createGlideElementReferenceForGlideRecord(elementName, record) {
        const ge = new MockGlideElement_1.MockGlideElement(elementName);
        ge.setRefRecord(record);
        ge.setRefRecordTableName(record.getTableName());
        return ge;
    }
}
exports.GlideElementUtil = GlideElementUtil;
//# sourceMappingURL=GlideElementUtil.js.map
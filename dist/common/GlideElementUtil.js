"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlideElementUtil = void 0;
const __1 = require("../index.js");
class GlideElementUtil {
    static createGlideElementReference(elementName, refTable, refObject) {
        const gr = new __1.MockGlideRecord(refTable);
        gr.setMockData(refObject);
        const ge = new __1.MockGlideElement(elementName);
        ge.setRefRecord(gr);
        ge.setRefRecordTableName(refTable);
        return ge;
    }
    static createGlideElementReferenceForGlideRecord(elementName, record) {
        const ge = new __1.MockGlideElement(elementName);
        ge.setRefRecord(record);
        ge.setRefRecordTableName(record.getTableName());
        return ge;
    }
}
exports.GlideElementUtil = GlideElementUtil;
//# sourceMappingURL=GlideElementUtil.js.map
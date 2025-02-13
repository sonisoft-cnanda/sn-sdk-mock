"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlideElementUtil = void 0;
const __mocks__1 = require("../__mocks__/index.js");
class GlideElementUtil {
    static createGlideElementReference(elementName, refTable, refObject) {
        const gr = new __mocks__1.MockGlideRecord(refTable);
        gr.setMockData(refObject);
        const ge = new __mocks__1.MockGlideElement(elementName);
        ge.setRefRecord(gr);
        ge.setRefRecordTableName(refTable);
        return ge;
    }
}
exports.GlideElementUtil = GlideElementUtil;
//# sourceMappingURL=GlideElementUtil.js.map
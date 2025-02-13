"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBUtil = void 0;
const glide_1 = require("@servicenow/glide");
class DBUtil {
    static tryParseInt(value, out) {
        let parseSuccessful = false;
        let val = null;
        try {
            val = !isNaN(Number(value)) ? parseInt(value) : null;
            if (val != null) {
                parseSuccessful = true;
                //out(true, val);
            }
        }
        catch (error) {
            val = null;
            parseSuccessful = false;
            glide_1.gs.error("Error parsing value: " + value);
        }
        out(parseSuccessful, val);
    }
}
exports.DBUtil = DBUtil;
//# sourceMappingURL=DBUtil.js.map
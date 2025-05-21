"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyTable = void 0;
class PropertyTable {
    constructor() {
        this._properties = {};
    }
    getProperty(propertyName) {
        return this._properties[propertyName];
    }
    setProperty(propertyName, value) {
        this._properties[propertyName] = value;
    }
}
exports.PropertyTable = PropertyTable;
//# sourceMappingURL=PropertyTable.js.map
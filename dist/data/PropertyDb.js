"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyDb = void 0;
const PropertyTable_1 = require("./PropertyTable.js");
class PropertyDb {
    static getInstance() {
        if (!PropertyDb._instance) {
            PropertyDb._instance = new PropertyDb();
        }
        return PropertyDb._instance;
    }
    constructor() {
        this._propertiesTable = new PropertyTable_1.PropertyTable();
    }
    getProperty(propertyName) {
        return this._propertiesTable.getProperty(propertyName);
    }
    setProperty(propertyName, value) {
        this._propertiesTable.setProperty(propertyName, value);
    }
}
exports.PropertyDb = PropertyDb;
//# sourceMappingURL=PropertyDb.js.map
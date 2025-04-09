"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyDB = void 0;
const PropertyTable_1 = require("./PropertyTable.js");
class PropertyDB {
    static getInstance() {
        if (!PropertyDB._instance) {
            PropertyDB._instance = new PropertyDB();
        }
        return PropertyDB._instance;
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
exports.PropertyDB = PropertyDB;
//# sourceMappingURL=PropertyDB.js.map
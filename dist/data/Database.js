"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const InMemoryDataTable_1 = require("./InMemoryDataTable.js");
class Database {
    constructor() {
        this._mockData = {};
    }
    static getInstance() {
        if (!Database._instance) {
            Database._instance = new Database();
        }
        return Database._instance;
    }
    static reInitialize() {
        Database._instance = new Database();
    }
    getMockData() {
        return this._mockData;
    }
    setMockData(data) {
        this._mockData = data;
    }
    addTable(tableName) {
        if (!this._mockData[tableName])
            this._mockData[tableName] = new InMemoryDataTable_1.InMemoryDataTable(tableName);
        return this._mockData[tableName];
    }
    getTable(tableName) {
        return this._mockData[tableName];
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map
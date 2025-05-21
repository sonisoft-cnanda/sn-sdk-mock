"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDataTable = void 0;
class InMemoryDataTable {
    get rows() {
        return this._rows;
    }
    set rows(value) {
        this._rows = value;
    }
    get tableName() {
        return this._tableName;
    }
    set tableName(value) {
        this._tableName = value;
    }
    get businessRules() {
        return this._businessRules;
    }
    set businessRules(value) {
        this._businessRules = value;
    }
    constructor(name) {
        this._businessRules = [];
        this._tableName = name;
        this._rows = [];
    }
    addRow(row) {
        this._rows.push(row);
    }
    addRows(rows) {
        this._rows.push(...rows);
    }
    getRows() {
        return this._rows;
    }
    setRows(rows) {
        this._rows = rows;
    }
    getRowBySysId(sysId) {
        return this._rows.find((row) => row.sys_id === sysId);
    }
    getRowByField(field, value) {
        return this._rows.find((row) => row[field] === value);
    }
    deleteRowBySysId(sysId) {
        this._rows = this._rows.filter((row) => row.sys_id !== sysId);
    }
    deleteRowByField(field, value) {
        this._rows = this._rows.filter((row) => row[field] !== value);
    }
}
exports.InMemoryDataTable = InMemoryDataTable;
//# sourceMappingURL=InMemoryDataTable.js.map
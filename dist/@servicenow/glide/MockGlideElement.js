"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockGlideElement = void 0;
class MockGlideElement {
    constructor(value) {
        this._refRecordTableName = "";
        this._value = value;
    }
    setRefRecordTableName(tableName) {
        this._refRecordTableName = tableName;
    }
    getValue() {
        return this._value;
    }
    setValue(value) {
        this._value = value;
    }
    getDisplayValue() {
        return this._value.toString();
    }
    getRefRecord() {
        return this._refRecord;
    }
    setRefRecord(record) {
        this._refRecord = record;
        this._refRecordTableName = record.getTableName();
    }
    nil() {
        return this._value === null || this._value === undefined;
    }
    changes() {
        // Implement logic to check if the value has changed
        return false;
    }
    changesFrom(value) {
        // Implement logic to check if the value has changed from the given value
        return false;
    }
    changesTo(value) {
        // Implement logic to check if the value has changed to the given value
        return false;
    }
    getBooleanValue() {
        return Boolean(this._value);
    }
    getHTMLValue() {
        return this._value.toString();
    }
    getRefTable() {
        return 'some_table'; // Adjust as needed
    }
    getRefField() {
        return 'some_field'; // Adjust as needed
    }
    getRefRecordSysId() {
        return 'some_sys_id'; // Adjust as needed
    }
    getRefRecordDisplayValue() {
        return this._value.toString();
    }
    getRefRecordValue() {
        return this._value;
    }
    getRefRecordDisplayValues() {
        return [this._value.toString()];
    }
    getRefRecordValues() {
        return [this._value];
    }
    getRefRecordVariables() {
        return {};
    }
}
exports.MockGlideElement = MockGlideElement;
//# sourceMappingURL=MockGlideElement.js.map
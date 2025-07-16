"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockGlideRecord = void 0;
const BusinessRuleRunWhen_1 = require("../../data/BusinessRuleRunWhen.js");
const Database_1 = require("../../data/Database.js");
const MockGlideElement_1 = require("./MockGlideElement.js");
const MockGlideQueryCondition_1 = require("./MockGlideQueryCondition.js");
const GlideRecordDBInit_1 = require("../../common/GlideRecordDBInit.js");
const SNTestEnvironment_1 = require("../../common/SNTestEnvironment.js");
class MockGlideRecord {
    get mockNew() {
        return this._mockNew;
    }
    set mockNew(value) {
        this._mockNew = value;
    }
    get mockQuery() {
        return this._mockQuery;
    }
    set mockQuery(value) {
        this._mockQuery = value;
    }
    get mockCurrent() {
        return this._mockCurrent;
    }
    set mockCurrent(value) {
        this._mockCurrent = value;
        if (this._mockCurrent) {
            this.initProperties();
        }
    }
    get mockIndex() {
        return this._mockIndex;
    }
    set mockIndex(value) {
        this._mockIndex = value;
    }
    get mockLimit() {
        return this._mockLimit;
    }
    set mockLimit(value) {
        this._mockLimit = value;
    }
    get data() {
        if (this._data === undefined || this._data === null) {
            this._data = [];
        }
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    set newRecord(value) {
        this._isNewRecord = value;
    }
    get conditions() {
        return this._conditions;
    }
    set conditions(value) {
        this._conditions = value;
    }
    generateGUID() {
        let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return guid;
    }
    constructor(tableName) {
        this._database = Database_1.Database.getInstance();
        this._snTestEnvironment = SNTestEnvironment_1.SNTestEnvironment.getInstance();
        this.tableProperties = new Map();
        this._mockNew = {};
        this._mockLimit = 0;
        this._isNewRecord = false;
        this._conditions = [];
        this._tableName = tableName;
        this._mockCallCount = 0;
        this._mockRecordCount = 1;
        this._mockQuery = [];
        this._mockCurrent = {};
        this._mockIndex = -1;
        this._data = [];
        this._mockNew = {};
        this.initialize();
    }
    initialize() {
        this._isNewRecord = true;
        this.mockCurrent = this._mockNew;
        this._mockNew.sys_id = this.generateGUID();
        let modulePath = this._snTestEnvironment.modulePath;
        let dbInit = new GlideRecordDBInit_1.GlideRecordDBInit(this._tableName, modulePath);
        dbInit.getTableInterfaceFromModule();
        if (dbInit.tableProperties) {
            this.tableProperties = dbInit.tableProperties;
        }
        this.tableProperties.forEach((property, name) => {
            //console.log(`  - ${name}: ${typeChecker.typeToString(typeChecker.getTypeAtLocation(property))}`);
            this.defineProperty(name);
        });
    }
    initProperties() {
        var elements = Object.getOwnPropertyNames(this._mockCurrent);
        for (var i = 0; i < elements.length; i++) {
            var strElemName = elements[i];
            this.defineProperty(strElemName);
        }
    }
    defineProperty(prop) {
        if (MockGlideRecord.prototype.hasOwnProperty(prop))
            return;
        Object.defineProperty(this, prop, {
            get: () => {
                return this.getValue(prop);
            },
            set: (value) => {
                this.setValue(prop, value);
            },
            enumerable: true,
            configurable: true
        });
    }
    isElementReferenceType(propName) {
        var isRef = Object.getPrototypeOf(this._mockCurrent[propName]) == MockGlideElement_1.MockGlideElement.prototype ? true : false;
        return isRef;
    }
    initQueryGr() {
        this._mockCurrent = {};
        this._isNewRecord = false;
        this.mockIndex = -1;
        let dbTable = this._database.getTable(this._tableName);
        if (dbTable) {
            this.data = dbTable.getRows();
            if (this.mockLimit) {
                this.data = this.data.slice(0, this.mockLimit);
            }
        }
    }
    operation() {
        return this._operation;
    }
    next() {
        this._mockIndex++;
        if (this._mockIndex >= this.data.length) {
            return false;
        }
        this.mockCurrent = this.data[this._mockIndex];
        return true;
    }
    get(sysId) {
        this.initQueryGr();
        this._isNewRecord = false;
        this.mockCurrent = this.data.find((record) => record.sys_id === sysId);
        if (this._mockCurrent) {
            this.mockIndex = this.data.indexOf(this.mockCurrent);
        }
        return this.mockCurrent;
    }
    isNewRecord() {
        return this._isNewRecord;
    }
    addEncodedQuery(query) {
        this._isNewRecord = false;
        this._mockQuery.push(query);
    }
    addActiveQuery(...args) {
        this._isNewRecord = false;
        let q = "active=true";
        this._mockQuery.push(q);
    }
    addNotNullQuery(name) {
        this._isNewRecord = false;
        let q = `${name}!=NULL`;
        this._mockQuery.push(q);
    }
    addNullQuery(fieldName) {
        this._isNewRecord = false;
        const condition = new MockGlideQueryCondition_1.MockGlideQueryCondition();
        condition.addCondition(fieldName, 'NULL', null);
        this._conditions.push(condition);
        return condition;
    }
    addQuery(name, oper, value) {
        this._isNewRecord = false;
        const condition = new MockGlideQueryCondition_1.MockGlideQueryCondition();
        condition.addCondition(name, oper, value);
        this._conditions.push(condition);
        return condition;
    }
    query() {
        this.initQueryGr();
    }
    deleteMultiple() {
        return this;
    }
    insert() {
        if (this._mockNew) {
            let dbTable = this._database.addTable(this._tableName);
            if (dbTable) {
                this.getBusinessRules(BusinessRuleRunWhen_1.BusinessRuleRunWhen.BEFORE).forEach((br) => {
                    if (br.type.insert) {
                        br.method.call(this, this);
                    }
                });
                this._operation = "insert";
                let id = this._mockNew.sys_id;
                dbTable.addRow(this._mockNew);
                this._mockNew = null;
                this.get(id);
                this.getBusinessRules(BusinessRuleRunWhen_1.BusinessRuleRunWhen.AFTER).forEach((br) => {
                    if (br.type.insert) {
                        br.method.call(this, this);
                    }
                });
                return this.mockCurrent.sys_id;
            }
        }
        return null;
    }
    getBusinessRules(when) {
        let dbTable = this._database.getTable(this._tableName);
        if (dbTable) {
            return dbTable.businessRules.filter((br) => br.when == when);
        }
        return [];
    }
    update() {
        const record = this.mockCurrent;
        if (record) {
            record._mockUpdated = true;
        }
        this._operation = "update";
        return record.sys_id || 'mockSysId';
    }
    setLimit(limit) {
        this.mockLimit = limit;
    }
    setValue(column, value) {
        this.mockCurrent[column] = new MockGlideElement_1.MockGlideElement(value);
        if (this._mockNew)
            this._mockNew[column] = new MockGlideElement_1.MockGlideElement(value);
        //this[column] = new MockGlideElement(value);
    }
    getValue(column) {
        //if (this.mockCurrent[column] instanceof MockGlideElement) {
        return this.mockCurrent[column].getValue();
        //}
        //return this.mockCurrent[column] ?? null;
    }
    getElement(column) {
        let mockElement;
        if (this.mockCurrent[column]) {
            if (this.mockCurrent[column] instanceof MockGlideElement_1.MockGlideElement) {
                mockElement = this.mockCurrent[column];
            }
            else {
                mockElement = new MockGlideElement_1.MockGlideElement(this.mockCurrent[column]);
                mockElement.setRefRecord(this.mockCurrent[column]);
            }
            return mockElement;
        }
        return null;
    }
    getUniqueValue() {
        return this.getValue('sys_id');
    }
    isValidField() {
        return true;
    }
    isValidRecord() {
        return true;
    }
    isValid() {
        return true;
    }
    getTableName() {
        return this._tableName;
    }
    getRecordClassName() {
        return this._tableName;
    }
    getRowCount() {
        return this.data.length;
    }
    hasNext() {
        return this.mockIndex < this._data.length - 1;
    }
    addRecord(record) {
        this.data.push(record);
    }
    reset() {
        this.mockIndex = -1;
    }
    setMockData(data) {
        this.data = data;
    }
    getMockData() {
        return this._data;
    }
}
exports.MockGlideRecord = MockGlideRecord;
//# sourceMappingURL=MockGlideRecord.js.map
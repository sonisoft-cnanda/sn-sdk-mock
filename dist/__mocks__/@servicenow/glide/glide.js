"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAbstractAjaxProcessor = exports.mockGs = exports.MockGlideTime = exports.MockGlideDateTime = exports.GlideDateTime = exports.GlideTime = exports.GlideDate = exports.gs = exports.MockGlideElement = exports.GlideRecord = exports.MockGlideAggregate = exports.MockGlideRecord = exports.MockGlideQueryCondition = exports.MockGlideSystem = exports.MockEventQueue = exports.MockPropertyDB = exports.MockPropertyTable = exports.Database = exports.InMemoryDataTable = exports.DataTableBusinessRule = exports.BusinessRuleRunType = exports.BRRunWhen = exports.MOCKED_PROPERTIES = void 0;
exports.newMockGlideDateTime = newMockGlideDateTime;
exports.newMockGlideSystem = newMockGlideSystem;
const parseISO_1 = require("date-fns/parseISO");
const DBUtil_1 = require("../../../common/DBUtil.js");
const console_1 = require("console");
exports.MOCKED_PROPERTIES = {
    'x_taniu_tan_core.tanium_api_endpoint': 'https://my.tanium.instance/api/v2/',
    'x_taniu_tan_core.tanium_module_api_url': 'https://my.tanium.instance/products/',
    'x_taniu_tan_core.mid_server': 'my-mid-server',
    'x_taniu_tan_core.tanium_username': 'user.name',
    'x_taniu_tan_core.tanium_password': 'tanium_password$1',
    'x_taniu_tan_core.tanium_api_token': 'my-api-token',
    'x_taniu_tan_core.track_direct_connect_actions': 'false',
    'x_taniu_tan_core.identify_endpoint_by_field': 'Serial or FQDN',
    'x_taniu_tan_core.Log Tanium Actions': 'true',
    'x_taniu_tan_core.default_deployment_duration_hrs': '24'
};
const originalModule = jest.requireActual("@servicenow/glide");
var BRRunWhen;
(function (BRRunWhen) {
    BRRunWhen[BRRunWhen["BEFORE"] = 10] = "BEFORE";
    BRRunWhen[BRRunWhen["AFTER"] = 20] = "AFTER";
    BRRunWhen[BRRunWhen["ASYNC"] = 30] = "ASYNC";
})(BRRunWhen || (exports.BRRunWhen = BRRunWhen = {}));
class BusinessRuleRunType {
}
exports.BusinessRuleRunType = BusinessRuleRunType;
class DataTableBusinessRule {
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get method() {
        return this._brMethod;
    }
    set method(value) {
        this._brMethod = value;
    }
    get when() {
        return this._when;
    }
    set when(value) {
        this._when = value;
    }
    get type() {
        return this._brType;
    }
    set type(value) {
        this._brType = value;
    }
    constructor(name, brWhen, type, method) {
        this._name = name;
        this.method = method;
        this._when = brWhen;
        this._brType = type;
    }
}
exports.DataTableBusinessRule = DataTableBusinessRule;
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
            this._mockData[tableName] = new InMemoryDataTable(tableName);
        return this._mockData[tableName];
    }
    getTable(tableName) {
        return this._mockData[tableName];
    }
}
exports.Database = Database;
class MockPropertyTable {
    constructor() {
        this.getProperty = jest.fn().mockImplementation((propertyName) => {
            return this._properties[propertyName];
        });
        this.setProperty = jest.fn().mockImplementation((propertyName, value) => {
            this._properties[propertyName] = value;
        });
        this._properties = {};
    }
}
exports.MockPropertyTable = MockPropertyTable;
class MockPropertyDB {
    static getInstance() {
        if (!MockPropertyDB._instance) {
            MockPropertyDB._instance = new MockPropertyDB();
        }
        return MockPropertyDB._instance;
    }
    constructor() {
        this.getProperty = jest.fn().mockImplementation((propertyName) => {
            return this._propertiesTable.getProperty(propertyName);
        });
        this.setProperty = jest.fn().mockImplementation((propertyName, value) => {
            this._propertiesTable.setProperty(propertyName, value);
        });
        this._propertiesTable = new MockPropertyTable();
    }
}
exports.MockPropertyDB = MockPropertyDB;
class MockEventQueue {
    static getInstance() {
        if (!MockEventQueue._instance) {
            MockEventQueue._instance = new MockEventQueue();
        }
        return MockEventQueue._instance;
    }
    eventQueue(eventName, instance, parm1, parm2, queue) {
    }
}
exports.MockEventQueue = MockEventQueue;
class MockGlideSystem {
    get data() {
        return this._data;
    }
    constructor() {
        this.getProperty = jest.fn().mockImplementation((propertyName) => {
            return MockPropertyDB.getInstance().getProperty(propertyName);
            //return MOCKED_PROPERTIES[propertyName];
        });
        this.setProperty = jest.fn().mockImplementation((propertyName, value) => {
            //MOCKED_PROPERTIES[propertyName] = value;
            MockPropertyDB.getInstance().setProperty(propertyName, value);
        });
        this.log = jest.fn().mockImplementation((message) => {
            console.log(message);
        });
        this.importXML = jest.fn().mockImplementation((xml) => {
            return xml;
        });
        this.getUserName = jest.fn().mockImplementation(() => {
            return 'admin';
        });
        this.getSystemId = jest.fn().mockImplementation(() => {
            return 'admin';
        });
        this.error = jest.fn().mockImplementation((msg) => {
            (0, console_1.error)(msg);
        });
        this.warn = jest.fn().mockImplementation((msg) => {
            (0, console_1.warn)(msg);
        });
        this.debug = jest.fn().mockImplementation((msg) => {
            (0, console_1.debug)(msg);
        });
        this.info = jest.fn().mockImplementation((msg) => {
            (0, console_1.log)(msg);
        });
        this.eventQueue = jest.fn().mockImplementation((eventName, instance, parm1, parm2, queue) => {
        });
        this.urlEncode = jest.fn().mockImplementation((value) => {
            return encodeURIComponent(value);
        });
        this._data = Database.getInstance().addTable('sys_properties');
    }
    nil(value) {
        return !value;
    }
    include(name) {
        return "";
    }
}
exports.MockGlideSystem = MockGlideSystem;
class MockGlideQueryCondition {
    constructor() {
        this.conditions = [];
    }
    addCondition(name, oper, value) {
        this.conditions.push({ name, oper, value });
        return this;
    }
    addOrCondition(name, oper, value) {
        this.conditions.push({ name, oper, value });
        return this;
    }
    getConditions() {
        return this.conditions;
    }
}
exports.MockGlideQueryCondition = MockGlideQueryCondition;
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
        this._database = Database.getInstance();
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
                if (this.isElementReferenceType(prop)) {
                    return this.getElement(prop);
                }
                else {
                    return this.getValue(prop);
                }
            },
            set: (value) => {
                this.setValue(prop, value);
            },
            enumerable: true,
            configurable: true
        });
    }
    isElementReferenceType(propName) {
        var isRef = Object.getPrototypeOf(this._mockCurrent[propName]) == MockGlideElement.prototype ? true : false;
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
        const condition = new MockGlideQueryCondition();
        condition.addCondition(fieldName, 'NULL', null);
        this._conditions.push(condition);
        return condition;
    }
    addQuery(name, oper, value) {
        this._isNewRecord = false;
        const condition = new MockGlideQueryCondition();
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
                this.getBusinessRules(BRRunWhen.BEFORE).forEach((br) => {
                    if (br.type.insert) {
                        br.method.call(this, this);
                    }
                });
                this._operation = "insert";
                let id = this._mockNew.sys_id;
                dbTable.addRow(this._mockNew);
                this._mockNew = null;
                this.get(id);
                this.getBusinessRules(BRRunWhen.AFTER).forEach((br) => {
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
        this.mockCurrent[column] = value;
        this[column] = new MockGlideElement(value);
    }
    getValue(column) {
        return this.mockCurrent[column] ?? null;
    }
    getElement(column) {
        let mockElement;
        if (this.mockCurrent[column]) {
            if (this.mockCurrent[column] instanceof MockGlideElement) {
                mockElement = this.mockCurrent[column];
            }
            else {
                mockElement = new MockGlideElement(this.mockCurrent[column]);
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
class MockGlideAggregate extends MockGlideRecord {
    constructor() {
        super(...arguments);
        this._groupBy = null;
        this.groupBy = jest.fn().mockImplementation((column) => {
            this.groupByVal = column;
            return this;
        });
    }
    get groupByVal() {
        return this._groupBy;
    }
    set groupByVal(value) {
        this._groupBy = value;
    }
}
exports.MockGlideAggregate = MockGlideAggregate;
class GlideRecord extends MockGlideRecord {
}
exports.GlideRecord = GlideRecord;
class MockGlideElement {
    constructor(value) {
        this._refRecordTableName = "";
        this.setRefRecordTableName = jest.fn().mockImplementation((tableName) => { this._refRecordTableName = tableName; });
        this.getValue = jest.fn().mockImplementation(() => {
            return this._value;
        });
        this.setValue = jest.fn().mockImplementation((value) => {
            this._value = value;
        });
        this.getDisplayValue = jest.fn().mockImplementation(() => {
            return this._value.toString();
        });
        this.getRefRecord = jest.fn().mockImplementation(() => {
            // if(!this._refRecord && this._refRecordTableName){
            //     this._refRecord = new GlideRecord(this._refRecordTableName);
            // }
            // } else if(!this._refRecord){
            //     this._refRecord = {
            //         sys_id: this._value,
            //         getUniqueValue: ()=>this._value
            //     } as MockGlideRecord
            // }
            return this._refRecord;
        });
        this.setRefRecord = jest.fn().mockImplementation((record) => {
            this._refRecord = record;
            this._refRecordTableName = record.getTableName();
        });
        this.nil = jest.fn().mockImplementation(() => {
            return this._value === null || this._value === undefined;
        });
        this.changes = jest.fn().mockImplementation(() => {
            // Implement logic to check if the value has changed
            return false;
        });
        this.changesFrom = jest.fn().mockImplementation((value) => {
            // Implement logic to check if the value has changed from the given value
            return false;
        });
        this.changesTo = jest.fn().mockImplementation((value) => {
            // Implement logic to check if the value has changed to the given value
            return false;
        });
        this.getBooleanValue = jest.fn().mockImplementation(() => {
            return Boolean(this._value);
        });
        this.getHTMLValue = jest.fn().mockImplementation(() => {
            return this._value.toString();
        });
        this.getRefTable = jest.fn().mockImplementation(() => {
            return 'some_table'; // Adjust as needed
        });
        this.getRefField = jest.fn().mockImplementation(() => {
            return 'some_field'; // Adjust as needed
        });
        this.getRefRecordSysId = jest.fn().mockImplementation(() => {
            return 'some_sys_id'; // Adjust as needed
        });
        this.getRefRecordDisplayValue = jest.fn().mockImplementation(() => {
            return this._value.toString();
        });
        this.getRefRecordValue = jest.fn().mockImplementation(() => {
            return this._value;
        });
        this.getRefRecordDisplayValues = jest.fn().mockImplementation(() => {
            return [this._value.toString()];
        });
        this.getRefRecordValues = jest.fn().mockImplementation(() => {
            return [this._value];
        });
        this.getRefRecordVariables = jest.fn().mockImplementation(() => {
            return {};
        });
        this._value = value;
    }
}
exports.MockGlideElement = MockGlideElement;
exports.gs = {
    setProperty: jest.fn(),
    getProperty: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    urlEncode: jest.fn(x => x),
    nil: jest.fn((value) => { return !value; }), // boooo
};
class GlideDate {
    constructor(date) {
        this._mockDate = date ?? new Date();
    }
    getByFormat(format) {
        const date = this._mockDate;
        switch (format) {
            case 'yyyy':
                return date.getFullYear().toString();
            case 'MM':
                return (date.getMonth() + 1).toString().padStart(2, '0');
            case 'dd':
                return date.getDate().toString().padStart(2, '0');
            default:
                return date.toISOString();
        }
    }
}
exports.GlideDate = GlideDate;
class GlideTime {
    constructor(ms) {
        this._mockDate = ms ? new Date(ms) : new Date();
        return this;
    }
    getByFormat(format) {
        const date = this._mockDate;
        switch (format) {
            case 'HH':
                return date.getHours().toString().padStart(2, '0');
            case 'mm':
                return date.getMinutes().toString().padStart(2, '0');
            case 'ss':
                return date.getSeconds().toString().padStart(2, '0');
            default:
                return date.toISOString();
        }
    }
}
exports.GlideTime = GlideTime;
class GlideDateTime {
    get _mockDateMs() {
        return +this._mockDate;
    }
    constructor(dateString) {
        this._mockDate = dateString ? new Date(dateString) : new Date();
        return this;
    }
    addDays(days) { }
    add(ms) {
        this._mockDate = new Date(this._mockDate.getTime() + ms);
    }
    getDate() {
        return new GlideDate(this._mockDate);
    }
    getTime() {
        return new GlideTime(this._mockDate.getMilliseconds());
    }
}
exports.GlideDateTime = GlideDateTime;
class MockGlideDateTime {
    get dateInstance() {
        return this._dateInstance;
    }
    set dateInstance(value) {
        this._dateInstance = value;
    }
    constructor(dt) {
        this.getTime = jest.fn().mockImplementation(() => {
            return new MockGlideTime(this.dateInstance);
        });
        this.getDate = jest.fn().mockImplementation(() => {
            return new GlideDate(this.dateInstance);
        });
        this.getNumericValue = jest.fn().mockImplementation(() => {
            return this.dateInstance.getTime();
        });
        this.getYearLocalTime = jest.fn(() => this.dateInstance.getFullYear());
        this.getMonthLocalTime = jest.fn(() => this.dateInstance.getMonth() + 1);
        this.getDayOfMonthLocalTime = jest.fn(() => this.dateInstance.getDate());
        this.getYearUTC = jest.fn(() => this.dateInstance.getUTCFullYear());
        this.getMonthUTC = jest.fn(() => this.dateInstance.getUTCMonth() + 1);
        this.getDayOfMonthUTC = jest.fn(() => this.dateInstance.getUTCDate());
        this.addDays = jest.fn();
        this.addSeconds = jest.fn((val) => {
            this.dateInstance.setSeconds(this.dateInstance.getSeconds() + val);
        });
        this.add = jest.fn((val) => {
            this.dateInstance.setTime(this.dateInstance.getTime() + val);
        });
        this.toString = jest.fn(() => {
            // const zonedDate = toZonedTime(_dt, 'UTC');
            // const formattedDate = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.000'Z'");
            // return formattedDate; 
            //toString in ServiceNow does not return the ISO String
            return this.dateInstance.toISOString();
        });
        if (dt == undefined || !dt) {
            this._dateInstance = new Date(Date.now());
        }
        else {
            DBUtil_1.DBUtil.tryParseInt(dt?.toString(), (isParsed, value) => {
                if (isParsed != undefined && isParsed) {
                    this._dateInstance = new Date();
                    this._dateInstance.setUTCMilliseconds(value);
                }
                else {
                    this._dateInstance = (dt == undefined || !dt) ? new Date(Date.now()) : (0, parseISO_1.parseISO)(dt.toString());
                }
            });
        }
    }
}
exports.MockGlideDateTime = MockGlideDateTime;
function newMockGlideDateTime(dt) {
    const instance = new MockGlideDateTime(dt);
    const OriginalGlideDateTime = originalModule.GlideDateTime;
    const _originalInstance = new OriginalGlideDateTime(dt);
    return Object.assign(Object.create(_originalInstance), instance);
    // return new GlideDateTime(dt);
}
class MockGlideTime {
    get dateInstance() {
        return this._dateInstance;
    }
    set dateInstance(value) {
        this._dateInstance = value;
    }
    constructor(dt) {
        this.getByFormat = jest.fn((val) => {
            switch (val) {
                case "yyyy-MM-dd HH:mm:ss":
                    return this.dateInstance.toISOString();
                case "yyyy":
                    return this._dateInstance.getUTCFullYear().toString();
                case "MM":
                    return (this._dateInstance.getUTCMonth() + 1).toString().padStart(2, '0');
                case "dd":
                    return this._dateInstance.getUTCDate().toString().padStart(2, '0');
                case "HH":
                    return this.dateInstance.getUTCHours().toString().padStart(2, '0');
                case "mm":
                    return this.dateInstance.getUTCMinutes().toString().padStart(2, '0');
                case "ss":
                    return this.dateInstance.getUTCSeconds().toString().padStart(2, '0');
            }
        });
        this._dateInstance = dt;
    }
}
exports.MockGlideTime = MockGlideTime;
function newMockGlideSystem() {
    return new MockGlideSystem();
}
exports.mockGs = new MockGlideSystem();
class MockAbstractAjaxProcessor {
    constructor(request, responseXML, gc) {
        this.process = jest.fn().mockImplementation(() => {
            return "";
        });
        this.newItem = jest.fn().mockImplementation((name) => {
            return {};
        });
        this.getParameter = jest.fn().mockImplementation((name) => {
            return "";
        });
        this.getDocument = jest.fn().mockImplementation(() => {
            return {};
        });
        this.getRootElement = jest.fn().mockImplementation(() => {
            return {};
        });
        this.getName = jest.fn().mockImplementation(() => {
            return "";
        });
        this.getValue = jest.fn().mockImplementation(() => {
            return "";
        });
        this.getType = jest.fn().mockImplementation(() => {
            return "";
        });
        this.getChars = jest.fn().mockImplementation(() => {
            return "";
        });
        this.setAnswer = jest.fn().mockImplementation((value) => {
            // Do nothing
        });
        this.setError = jest.fn().mockImplementation((error) => {
            // Do nothing
        });
        this.type = "";
        this.CALLABLE_PREFIX = "";
        this.request = request;
        this.responseXML = responseXML;
        this.gc = gc;
    }
}
exports.MockAbstractAjaxProcessor = MockAbstractAjaxProcessor;
//# sourceMappingURL=glide.js.map
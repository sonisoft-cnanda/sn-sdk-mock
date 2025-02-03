"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAbstractAjaxProcessor = exports.mockGs = exports.MockGlideTime = exports.MockGlideDateTime = exports.GlideDateTime = exports.GlideTime = exports.GlideDate = exports.gs = exports.MockGlideElement = exports.GlideRecord = exports.MockGlideRecord = exports.MockGlideQueryCondition = exports.MockGlideSystem = exports.MockEventQueue = exports.MockPropertyDB = exports.MockPropertyTable = exports.Database = exports.InMemoryDataTable = exports.MOCKED_PROPERTIES = void 0;
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
    constructor(name) {
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
        this.nil = jest.fn((value) => !value);
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
        this._data = Database.getInstance().addTable('sys_properties');
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
    // public get isNewRecord(): boolean {
    //     return this._isNewRecord;
    // }
    set newRecord(value) {
        this._isNewRecord = value;
    }
    ;
    get sys_id() {
        return this._sys_id;
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
        //private _currentRecord: number;
        //private _properties: Record<string, any>;
        this._isNewRecord = false;
        this._sys_id = this.generateGUID();
        this._conditions = [];
        this.initialize = jest.fn().mockImplementation(() => {
            this._isNewRecord = true;
            // this._mockRecords.push({});
            // this._mockIndex++;
        });
        this.next = jest.fn().mockImplementation(() => {
            this._mockIndex++;
            if (this._mockIndex >= this.data.length) {
                return false;
            }
            this._mockCurrent = this.data[this.mockIndex];
            return true;
        });
        this.get = jest.fn().mockImplementation((sysId) => {
            this.initQueryGr();
            (0, console_1.log)(sysId);
            this._isNewRecord = false;
            (0, console_1.log)("Data length: " + this.data.length);
            // if(this.data.length == 1){
            //     log("Data length is 1");
            //     this._mockCurrent = this.data[0];
            //     this.mockIndex = 0;
            //     return this._mockCurrent
            // }
            this._mockCurrent = this.data.find((record) => record.sys_id === sysId);
            if (this._mockCurrent) {
                this.mockIndex = this.data.indexOf(this._mockCurrent);
            }
            return this._mockCurrent;
        });
        this.isNewRecord = jest.fn().mockImplementation(() => {
            return this.isNewRecord;
        });
        this.addEncodedQuery = jest.fn().mockImplementation((query) => {
            this._isNewRecord = false;
            this._mockQuery.push(query);
        });
        this.addActiveQuery = jest.fn().mockImplementation((...args) => {
            this._isNewRecord = false;
            let q = "active=true";
            this._mockQuery.push(q);
        });
        // addQuery = jest.fn().mockImplementation((...args: any[]) => {
        //     this._isNewRecord = false;
        //     let q = "";
        //     if (args.length === 3 || args.length === 1) {
        //         q = args.join('');
        //     } else if (args.length == 2) {
        //         q = args.join("=");
        //     }
        //     this._mockQuery.push(q);
        // });
        this.addQuery = jest.fn().mockImplementation((name, oper, value) => {
            this._isNewRecord = false;
            const condition = new MockGlideQueryCondition();
            condition.addCondition(name, oper, value);
            this._conditions.push(condition);
            return condition;
        });
        this.query = jest.fn().mockImplementation(() => {
            this.initQueryGr();
        });
        this.deleteMultiple = jest.fn().mockImplementation(() => {
            return this;
        });
        this.insert = jest.fn().mockImplementation(() => {
            if (this._mockNew) {
                let dbTable = this._database.getTable(this._tableName);
                if (dbTable) {
                    let id = this._mockNew.sys_id;
                    dbTable.addRow(this._mockNew);
                    this._mockNew = null;
                    this.get(id);
                }
            }
            this._operation = "insert";
            return this.sys_id || null;
        });
        this.update = jest.fn().mockImplementation(() => {
            const record = this._mockCurrent;
            if (record) {
                record._mockUpdated = true;
            }
            this._operation = "update";
            return record.sys_id || 'mockSysId';
        });
        this.setLimit = jest.fn().mockImplementation((limit) => {
            this.mockLimit = limit;
        });
        this.setValue = jest.fn().mockImplementation((column, value) => {
            this._mockCurrent[column] = value;
            this[column] = new MockGlideElement(value); // hacky glideelement replacement for now
            //this._properties[column] = value;
        });
        this.getValue = jest.fn().mockImplementation((column) => {
            return this._mockCurrent[column] ?? null;
        });
        this.getElement = jest.fn().mockImplementation((column) => {
            if (this._mockCurrent[column]) {
                return new MockGlideElement(this._mockCurrent[column]);
                //return this._mockCurrent[column];
            } //else{
            //     this._mockCurrent[column] = new MockGlideElement(null);
            // }
            return null;
        });
        this.getUniqueValue = jest.fn().mockImplementation(() => {
            return this.sys_id;
        });
        this.isValidField = jest.fn().mockImplementation(() => {
            return true;
        });
        this.isValidRecord = jest.fn().mockImplementation(() => {
            return true;
        });
        this.isValid = jest.fn().mockImplementation(() => {
            return true;
        });
        this.getTableName = jest.fn().mockImplementation(() => {
            return this._tableName;
        });
        this.getRecordClassName = jest.fn().mockImplementation(() => {
            return this._tableName;
        });
        this.getRowCount = jest.fn().mockImplementation(() => {
            return this.data.length;
        });
        this.hasNext = jest.fn().mockImplementation(() => {
            return this.mockIndex < this._data.length - 1;
        });
        this.addRecord = jest.fn().mockImplementation((record) => {
            this.data.push(record);
        });
        this.reset = jest.fn().mockImplementation(() => {
            this.mockIndex = -1;
        });
        // Additional methods to manipulate mock data
        this.setMockData = jest.fn().mockImplementation((data) => {
            this.data = data;
        });
        this.getMockData = jest.fn().mockImplementation(() => {
            return this._data;
        });
        this._tableName = tableName;
        this._mockCallCount = 0;
        this._mockRecordCount = 1;
        this._mockQuery = [];
        //this._mockRecords = [];
        this._mockCurrent = {};
        this._mockIndex = -1;
        this._data = [];
        //this._currentRecord = -1;
        //this._properties = {};
        this.initialize();
    }
    initQueryGr() {
        this._mockCurrent = {};
        this._isNewRecord = false;
        //this.data.push({});
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
}
exports.MockGlideRecord = MockGlideRecord;
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
            if (!this._refRecord && this._refRecordTableName) {
                this._refRecord = new GlideRecord(this._refRecordTableName);
            }
            else if (!this._refRecord) {
                this._refRecord = {
                    sys_id: this._value,
                    getUniqueValue: () => this._value
                };
            }
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
                    return this._dateInstance.getUTCFullYear();
                case "MM":
                    return this._dateInstance.getUTCMonth() + 1;
                case "dd":
                    return this._dateInstance.getUTCDate();
                case "HH":
                    return this.dateInstance.getUTCHours();
                case "mm":
                    return this.dateInstance.getUTCMinutes();
                case "ss":
                    return this.dateInstance.getUTCSeconds();
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
import { parseISO } from "date-fns/parseISO";
import { DBUtil } from "../../../common/DBUtil";

import { log, error, debug, warn } from "console";

export const MOCKED_PROPERTIES = {
    'x_taniu_tan_core.tanium_api_endpoint': 'https://my.tanium.instance/api/v2/',
    'x_taniu_tan_core.tanium_module_api_url': 'https://my.tanium.instance/products/',
    'x_taniu_tan_core.mid_server': 'my-mid-server',
    'x_taniu_tan_core.tanium_username': 'user.name',
    'x_taniu_tan_core.tanium_password': 'tanium_password$1',
    'x_taniu_tan_core.tanium_api_token': 'my-api-token',
    'x_taniu_tan_core.track_direct_connect_actions': 'false',
    'x_taniu_tan_core.identify_endpoint_by_field': 'Serial or FQDN',
    'x_taniu_tan_core.Log Tanium Actions': 'true',
    'x_taniu_tan_core.default_deployment_duration_hrs' : '24'
}

const originalModule = jest.requireActual("@servicenow/glide");

export enum BRRunWhen {
    BEFORE = 10,
    AFTER = 20,
    ASYNC = 30,
}

export class BusinessRuleRunType{

    public insert:boolean;
    public update:boolean;
    public delete:boolean;
    public query:boolean;

}

export class DataTableBusinessRule{
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    private _brMethod: Function;
    public get method(): Function {
        return this._brMethod;
    }
    public set method(value: Function) {
        this._brMethod = value;
    }

    private _when:number;

    public get when(): number {
        return this._when;
    }

    public set when(value: number) {
        this._when = value;
    }

    private _brType:BusinessRuleRunType;
    public get type(): BusinessRuleRunType {
        return this._brType;
    }
    public set type(value: BusinessRuleRunType) {
        this._brType = value;
    }

    constructor(name:string, brWhen:BRRunWhen, type:BusinessRuleRunType, method:Function){
        this._name = name;
        this.method = method;
        this._when = brWhen;
        this._brType = type;
    }    
}

export class InMemoryDataTable{
    private _rows: Record<string, any>[];
    public get rows(): Record<string, any>[] {
        return this._rows;
    }
    public set rows(value: Record<string, any>[]) {
        this._rows = value;
    }
    private _tableName: string;
    public get tableName(): string {
        return this._tableName;
    }
    public set tableName(value: string) {
        this._tableName = value;
    }

    private _businessRules: DataTableBusinessRule[] = [];

    public get businessRules(): DataTableBusinessRule[] {
        return this._businessRules;
    }

    public set businessRules(value: DataTableBusinessRule[]) {
        this._businessRules = value;
    }

    constructor(name: string){
        this._tableName = name;
        this._rows = [];
    }

    public addRow(row:Record<string,any>){
        this._rows.push(row);
    }

    public getRows(){
        return this._rows;
    }

    public setRows(rows:Record<string,any>[]){
        this._rows = rows;
    }


    public getRowBySysId(sysId:string){
        return this._rows.find((row) => row.sys_id === sysId);
    }

    public getRowByField(field:string,value:string){
        return this._rows.find((row) => row[field] === value);
    }

    public deleteRowBySysId(sysId:string){
        this._rows = this._rows.filter((row) => row.sys_id !== sysId);
    }

    public deleteRowByField(field:string,value:string){
        this._rows = this._rows.filter((row) => row[field] !== value);
    }

}

export class Database{
   private static _instance:Database;
   public static getInstance():Database{
         if(!Database._instance){
              Database._instance = new Database();
         }
         return Database._instance;
    }

    public static reInitialize(){
        Database._instance = new Database();
    }

    private _mockData:Record<string,InMemoryDataTable> = {};

    public getMockData():Record<string,InMemoryDataTable>{
        return this._mockData;
    }

    private setMockData(data:Record<string,InMemoryDataTable>){
        this._mockData = data;
    }

    public addTable(tableName:string) : InMemoryDataTable{
        if(!this._mockData[tableName])
           this._mockData[tableName] = new InMemoryDataTable(tableName);

        return  this._mockData[tableName];
    }

    public getTable(tableName:string){
        return this._mockData[tableName];
    }
}

export class MockPropertyTable{
    private _properties: Record<string, any>;

    public constructor(){
        this._properties = {};
    }

    public getProperty = jest.fn().mockImplementation((propertyName: string) => {
        return this._properties[propertyName];
    });

    public setProperty = jest.fn().mockImplementation((propertyName: string, value: string) => {
        this._properties[propertyName] = value;
    });
}

export class MockPropertyDB{
    private static _instance:MockPropertyDB;
    public static getInstance():MockPropertyDB{
          if(!MockPropertyDB._instance){
            MockPropertyDB._instance = new MockPropertyDB();
          }
          return MockPropertyDB._instance;
     }

     private _propertiesTable:MockPropertyTable;

     public constructor(){
        this._propertiesTable = new MockPropertyTable();
    }

     public getProperty = jest.fn().mockImplementation((propertyName: string) => {
        return this._propertiesTable.getProperty(propertyName);
    });

    public setProperty = jest.fn().mockImplementation((propertyName: string, value: string) => {
        this._propertiesTable.setProperty(propertyName, value);
    });
}

export class MockEventQueue{
    private static _instance:MockEventQueue;

    public static getInstance():MockEventQueue{
        if(!MockEventQueue._instance){
            MockEventQueue._instance = new MockEventQueue();
        }
        return MockEventQueue._instance;
    }

    private _queue:[];

    
    public eventQueue(eventName:string, instance:GlideRecord, parm1:string, parm2:string, queue:string) : void{

    }

}

export class MockGlideSystem {
    private _data:InMemoryDataTable;
    public get data(): InMemoryDataTable {
        return this._data;
    }


    public constructor() {
        this._data = Database.getInstance().addTable('sys_properties');
    }


    public getProperty = jest.fn().mockImplementation((propertyName: string) => {
        return MockPropertyDB.getInstance().getProperty(propertyName);
        //return MOCKED_PROPERTIES[propertyName];
    });

    public setProperty = jest.fn().mockImplementation((propertyName: string, value: string) => {
        //MOCKED_PROPERTIES[propertyName] = value;
        MockPropertyDB.getInstance().setProperty(propertyName, value);
    });

    public log = jest.fn().mockImplementation((message: string) => {
        console.log(message);
    });

    public importXML = jest.fn().mockImplementation((xml: string) => {
        return xml;
    });

    public getUserName = jest.fn().mockImplementation(() => {
        return 'admin';
    });


    public getSystemId = jest.fn().mockImplementation(() => {
        return 'admin';
    });

    public nil(value: unknown) {
        return !value;
    }

    error=  jest.fn().mockImplementation((msg:string) => {
       error(msg);
    });
    warn=  jest.fn().mockImplementation((msg:string) => {
        warn(msg);
    });
    debug= jest.fn().mockImplementation((msg:string) => {
        debug(msg);
    });
    info= jest.fn().mockImplementation((msg:string) => {
        log(msg);
    });
  
    eventQueue= jest.fn().mockImplementation((eventName:string, instance:GlideRecord, parm1:string, parm2:string, queue:string | object ) => {

    });

    urlEncode = jest.fn().mockImplementation((value:string) => {
        return encodeURIComponent(value);
    });

    include(name:string){
        return "";
    }

}

export class MockGlideQueryCondition {
    private conditions: { name?: string; oper?: string; value?: any }[] = [];

    addCondition(name?: string, oper?: string, value?: any): MockGlideQueryCondition {
        this.conditions.push({ name, oper, value });
        return this;
    }

    addOrCondition(name?: string, oper?: string, value?: any): MockGlideQueryCondition {
        this.conditions.push({ name, oper, value });
        return this;
    }

    getConditions(): { name?: string; oper?: string; value?: any }[] {
        return this.conditions;
    }
}


export class MockGlideRecord {
    public _database: Database = Database.getInstance();

    private _mockNew: any = {};
    public get mockNew(): any {
        return this._mockNew;
    }
    public set mockNew(value: any) {
        this._mockNew = value;
    }

    private _tableName: string;
    private _mockQuery: unknown[];
    public get mockQuery(): unknown[] {
        return this._mockQuery;
    }
    public set mockQuery(value: unknown[]) {
        this._mockQuery = value;
    }
    private _mockCallCount: number;
    private _mockRecordCount: number;
    private _mockCurrent: Record<string, any>;
    public get mockCurrent(): Record<string, any> {
        return this._mockCurrent;
    }
    public set mockCurrent(value: Record<string, any>) {
        this._mockCurrent = value;
        if (this._mockCurrent) {
            this.initProperties();
        }
    }
    private _mockIndex: number;
    public get mockIndex(): number {
        return this._mockIndex;
    }
    public set mockIndex(value: number) {
        this._mockIndex = value;
    }
    private _mockLimit: number = 0;
    public get mockLimit(): number {
        return this._mockLimit;
    }
    public set mockLimit(value: number) {
        this._mockLimit = value;
    }

    private _operation: string;

    private _data: any[];
    public get data(): any[] {
        if (this._data === undefined || this._data === null) {
            this._data = [];
        }
        return this._data;
    }
    public set data(value: any[]) {
        this._data = value;
    }

    private _isNewRecord: boolean = false;
    public set newRecord(value: boolean) {
        this._isNewRecord = value;
    }

    private _conditions: MockGlideQueryCondition[] = [];
    public get conditions(): MockGlideQueryCondition[] {
        return this._conditions;
    }
    public set conditions(value: MockGlideQueryCondition[]) {
        this._conditions = value;
    }

    generateGUID() {
        let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return guid;
    }

    public constructor(tableName: string) {
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
        if (MockGlideRecord.prototype.hasOwnProperty(prop)) return;

        Object.defineProperty(this, prop, {
            get: () => {
                if (this.isElementReferenceType(prop)) {
                    return this.getElement(prop);
                } else {
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
        let dbTable: InMemoryDataTable = this._database.getTable(this._tableName);
        if (dbTable) {
            this.data = dbTable.getRows();
            if (this.mockLimit) {
                this.data = this.data.slice(0, this.mockLimit);
            }
        }
    }

    public operation() {
        return this._operation;
    }

    public next() {
        this._mockIndex++;
        if (this._mockIndex >= this.data.length) {
            return false;
        }
        this.mockCurrent = this.data[this._mockIndex];
        return true;
    }

    public get(sysId: string) {
        this.initQueryGr();
        this._isNewRecord = false;
        this.mockCurrent = this.data.find((record) => record.sys_id === sysId);
        if (this._mockCurrent) {
            this.mockIndex = this.data.indexOf(this.mockCurrent);
        }
        return this.mockCurrent;
    }

    public isNewRecord() {
        return this._isNewRecord;
    }

    public addEncodedQuery(query: string) {
        this._isNewRecord = false;
        this._mockQuery.push(query);
    }

    public addActiveQuery(...args: any[]) {
        this._isNewRecord = false;
        let q: string = "active=true";
        this._mockQuery.push(q);
    }

    public addNotNullQuery(name: string) {
        this._isNewRecord = false;
        let q: string = `${name}!=NULL`;
        this._mockQuery.push(q);
    }

    public addNullQuery(fieldName: string) {
        this._isNewRecord = false;
        const condition = new MockGlideQueryCondition();
        condition.addCondition(fieldName, 'NULL', null);
        this._conditions.push(condition);
        return condition;
    }

    public addQuery(name?: string, oper?: string, value?: any) {
        this._isNewRecord = false;
        const condition = new MockGlideQueryCondition();
        condition.addCondition(name, oper, value);
        this._conditions.push(condition);
        return condition;
    }

    public query() {
        this.initQueryGr();
    }

    public deleteMultiple() {
        return this;
    }

    public insert() {
        if (this._mockNew) {
            let dbTable: InMemoryDataTable = this._database.addTable(this._tableName);
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

    private getBusinessRules(when:BRRunWhen) {
        let dbTable: InMemoryDataTable = this._database.getTable(this._tableName);
        if (dbTable) {
            return dbTable.businessRules.filter((br) => br.when == when);
        }
        return [];
    }


    public update() {
        const record = this.mockCurrent;
        if (record) {
            record._mockUpdated = true;
        }
        this._operation = "update";
        return record.sys_id || 'mockSysId';
    }

    public setLimit(limit: number) {
        this.mockLimit = limit;
    }

    public setValue(column: string, value: string) {
        this.mockCurrent[column] = value;
        this[column] = new MockGlideElement(value);
    }

    public getValue(column: string) {
        return this.mockCurrent[column] ?? null;
    }

    public getElement(column: string) {
        let mockElement: MockGlideElement;
        if (this.mockCurrent[column]) {
            if (this.mockCurrent[column] instanceof MockGlideElement) {
                mockElement = this.mockCurrent[column];
            } else {
                mockElement = new MockGlideElement(this.mockCurrent[column]);
                mockElement.setRefRecord(this.mockCurrent[column]);
            }
            return mockElement;
        }
        return null;
    }

    public getUniqueValue() {
        return this.getValue('sys_id');
    }

    public isValidField() {
        return true;
    }

    public isValidRecord() {
        return true;
    }

    public isValid() {
        return true;
    }

    public getTableName() {
        return this._tableName;
    }

    public getRecordClassName() {
        return this._tableName;
    }

    public getRowCount() {
        return this.data.length;
    }

    public hasNext() {
        return this.mockIndex < this._data.length - 1;
    }

    public addRecord(record: any) {
        this.data.push(record);
    }

    public reset() {
        this.mockIndex = -1;
    }

    public setMockData(data: any[]) {
        this.data = data;
    }

    public getMockData() {
        return this._data;
    }
}
export class MockGlideAggregate extends MockGlideRecord{

    private _groupBy:string = null;
    public get groupByVal():string{
        return this._groupBy;
    }
    public set groupByVal(value:string){
        this._groupBy = value;
    }

    groupBy = jest.fn().mockImplementation((column: string) => {
        this.groupByVal = column;
        return this;
    });
}

export class GlideRecord extends MockGlideRecord{}

export class MockGlideElement {
    private _value: any;
    private _refRecordTableName:string = "";
    private _refRecord:GlideRecord;

    constructor(value: any) {
        this._value = value;
    }

    setRefRecordTableName = jest.fn().mockImplementation((tableName:string) => { this._refRecordTableName = tableName; });

    getValue = jest.fn().mockImplementation(() => {
        return this._value;
    });

    setValue = jest.fn().mockImplementation((value: any) => {
        this._value = value;
    });

    getDisplayValue = jest.fn().mockImplementation(() => {
        return this._value.toString();
    });

    getRefRecord = jest.fn().mockImplementation(() => {
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

    setRefRecord = jest.fn().mockImplementation((record:GlideRecord) => {
        this._refRecord = record;
        this._refRecordTableName = record.getTableName();
    });

    nil = jest.fn().mockImplementation(() => {
        return this._value === null || this._value === undefined;
    });

    changes = jest.fn().mockImplementation(() => {
        // Implement logic to check if the value has changed
        return false;
    });

    changesFrom = jest.fn().mockImplementation((value: any) => {
        // Implement logic to check if the value has changed from the given value
        return false;
    });

    changesTo = jest.fn().mockImplementation((value: any) => {
        // Implement logic to check if the value has changed to the given value
        return false;
    });

    getBooleanValue = jest.fn().mockImplementation(() => {
        return Boolean(this._value);
    });

    getHTMLValue = jest.fn().mockImplementation(() => {
        return this._value.toString();
    });

    getRefTable = jest.fn().mockImplementation(() => {
        return 'some_table'; // Adjust as needed
    });

    getRefField = jest.fn().mockImplementation(() => {
        return 'some_field'; // Adjust as needed
    });

    getRefRecordSysId = jest.fn().mockImplementation(() => {
        return 'some_sys_id'; // Adjust as needed
    });

    getRefRecordDisplayValue = jest.fn().mockImplementation(() => {
        return this._value.toString();
    });

    getRefRecordValue = jest.fn().mockImplementation(() => {
        return this._value;
    });

    getRefRecordDisplayValues = jest.fn().mockImplementation(() => {
        return [this._value.toString()];
    });

    getRefRecordValues = jest.fn().mockImplementation(() => {
        return [this._value];
    });

    getRefRecordVariables = jest.fn().mockImplementation(() => {
        return {};
    });
}


export const gs = {
    setProperty: jest.fn(),
    getProperty: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    urlEncode:jest.fn(x=>x),
    nil: jest.fn((value:unknown)=>{ return !value }),// boooo
}

export class GlideDate {
    _mockDate: Date
    constructor(date?:Date){
        this._mockDate = date ?? new Date()
    }
    getByFormat(format:string) {
        const date = this._mockDate
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

export class GlideTime{
    _mockDate: Date
    constructor(ms?:number){
        this._mockDate = ms ? new Date(ms) : new Date()
        return this
    }

    getByFormat(format:string) {
        const date = this._mockDate
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

export class GlideDateTime {
    _mockDate: Date
    get _mockDateMs():number{
        return +this._mockDate
    }

    constructor(dateString?: string){
        this._mockDate = dateString ? new Date(dateString) : new Date()
        return this
    }
    addDays(days:number){}
    add(ms:number){
        this._mockDate = new Date(this._mockDate.getTime() + ms)
    }
    getDate(){
        return new GlideDate(this._mockDate)
    }
    getTime(){
        return new GlideTime(this._mockDate.getMilliseconds())
    }
}

export class MockGlideDateTime{

    private _dateInstance: Date;
    public get dateInstance(): Date {
        return this._dateInstance;
    }
    public set dateInstance(value: Date) {
        this._dateInstance = value;
    }

    public constructor(dt?:string | number | null){

        if(dt == undefined || !dt){
            this._dateInstance = new Date(Date.now());
        }else{
            DBUtil.tryParseInt(dt?.toString(), (isParsed:boolean, value:number | undefined) => {
                if(isParsed != undefined && isParsed){
                    this._dateInstance = new Date();
                    this._dateInstance.setUTCMilliseconds(value as unknown as number);
                }else{
                    this._dateInstance = (dt == undefined || !dt) ? new Date(Date.now()) : parseISO(dt.toString());
                }
            });
    
        }

    }

    getTime = jest.fn().mockImplementation(() => {
        return new MockGlideTime(this.dateInstance);
    });
    getDate = jest.fn().mockImplementation(() => {
        return new GlideDate(this.dateInstance);
    });
    getNumericValue= jest.fn().mockImplementation(() => {
        return this.dateInstance.getTime();
    } )
    getYearLocalTime= jest.fn(() => this.dateInstance.getFullYear())
    getMonthLocalTime= jest.fn(() => this.dateInstance.getMonth() + 1)
    getDayOfMonthLocalTime= jest.fn(() => this.dateInstance.getDate())
    getYearUTC= jest.fn(() => this.dateInstance.getUTCFullYear())
    getMonthUTC= jest.fn(() => this.dateInstance.getUTCMonth() + 1)
    getDayOfMonthUTC= jest.fn(() => this.dateInstance.getUTCDate())
    addDays= jest.fn()
    addSeconds= jest.fn((val:number) => {
        this.dateInstance.setSeconds(this.dateInstance.getSeconds() + val);
    })
    add= jest.fn((val:number) => {
        this.dateInstance.setTime(this.dateInstance.getTime() + val);
    })
    toString =  jest.fn(() => {
        // const zonedDate = toZonedTime(_dt, 'UTC');
        
        // const formattedDate = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.000'Z'");
        
        // return formattedDate; 
        //toString in ServiceNow does not return the ISO String
        return this.dateInstance.toISOString();
        
    })
} 

export function newMockGlideDateTime(dt?:string | number | null):GlideDateTime{
    const instance:MockGlideDateTime = new MockGlideDateTime(dt);
    const OriginalGlideDateTime = originalModule.GlideDateTime;
    const _originalInstance = new OriginalGlideDateTime(dt);
    return Object.assign(Object.create(_originalInstance), instance);
    // return new GlideDateTime(dt);
}

export class MockGlideTime{

    private _dateInstance: Date;
    public get dateInstance(): Date {
        return this._dateInstance;
    }
    public set dateInstance(value: Date) {
        this._dateInstance = value;
    }

    public constructor(dt:Date){
        this._dateInstance = dt;
    }

    getByFormat =  jest.fn((val:string) => {
        
        switch(val){
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
    })
}

export function newMockGlideSystem() : MockGlideSystem{
    return new MockGlideSystem();
}


export const mockGs = new MockGlideSystem();


export class MockAbstractAjaxProcessor {
    private CALLABLE_PREFIX: string;
    private request: any;
    private responseXML: any;
    private gc: any;

    constructor(request?: any, responseXML?: any, gc?: any) {
        this.CALLABLE_PREFIX = "";
        this.request = request;
        this.responseXML = responseXML;
        this.gc = gc;
    }

    public process = jest.fn().mockImplementation(() => {
        return "";
    });

    public newItem = jest.fn().mockImplementation((name: string) => {
        return {};
    });

    public getParameter = jest.fn().mockImplementation((name: string) => {
        return "";
    });

    public getDocument = jest.fn().mockImplementation(() => {
        return {};
    });

    public getRootElement = jest.fn().mockImplementation(() => {
        return {};
    });

    public getName = jest.fn().mockImplementation(() => {
        return "";
    });

    public getValue = jest.fn().mockImplementation(() => {
        return "";
    });

    public getType = jest.fn().mockImplementation(() => {
        return "";
    });

    public getChars = jest.fn().mockImplementation(() => {
        return "";
    });

    public setAnswer = jest.fn().mockImplementation((value: string) => {
        // Do nothing
    });

    public setError = jest.fn().mockImplementation((error: string) => {
        // Do nothing
    });

    type: string = "";
}
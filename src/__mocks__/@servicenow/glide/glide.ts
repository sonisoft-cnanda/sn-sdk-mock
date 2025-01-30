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

    public nil = jest.fn((value: unknown) => !value);

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
   // private _mockRecords: Record<string, any>[];
    private _mockCurrent: Record<string, any>;
    public get mockCurrent(): Record<string, any> {
        return this._mockCurrent;
    }
    public set mockCurrent(value: Record<string, any>) {
        this._mockCurrent = value;
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

    private _data: any[];
    public get data(): any[] {
        if(this._data === undefined || this._data === null ){
            this._data = [];
        }  
        return this._data;
    }
    public set data(value: any[]) {
        this._data = value;
    }
    //private _currentRecord: number;
    //private _properties: Record<string, any>;

    private _isNewRecord: boolean = false;
    // public get isNewRecord(): boolean {
    //     return this._isNewRecord;
    // }
    public set newRecord(value: boolean) {
        this._isNewRecord = value;
    }

    private _sys_id: string = this.generateGUID(); ;
    public get sys_id(){
        return this._sys_id;
    }

    private _conditions:MockGlideQueryCondition[] = [];
    public get conditions():MockGlideQueryCondition[]{
        return this._conditions;
    }
    public set conditions(value:MockGlideQueryCondition[]){
        this._conditions = value;
    }

    generateGUID() {
        let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
        return guid;
      }

    private _mockNew:any = {};
    public get mockNew():any{
        return this._mockNew;
    }
    public set mockNew(value:any){
        this._mockNew = value;
    }

    public constructor(tableName: string) {
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

    initialize = jest.fn().mockImplementation(() => {
        this._isNewRecord = true;
        this._mockCurrent = this._mockNew;
        this._mockNew.sys_id = this.generateGUID();
        this._sys_id = this._mockNew.sys_id;
    });

    initQueryGr(){
       
        this._mockCurrent = {};
   
        this._isNewRecord = false;
        //this.data.push({});
        this.mockIndex = -1;

        let dbTable:InMemoryDataTable = this._database.getTable(this._tableName);
        if(dbTable){
            this.data = dbTable.getRows();
            if(this.mockLimit){
                this.data = this.data.slice(0,this.mockLimit);
            }
        }
    }

    public next = jest.fn().mockImplementation(() => {
        this._mockIndex++;
        if (this._mockIndex >= this.data.length) {
            return false;
        }
        this._mockCurrent = this.data[this.mockIndex];
        this._sys_id = this._mockCurrent.sys_id;
        return true;
    });

    public get = jest.fn().mockImplementation((sysId: string) => {
        this.initQueryGr();
       log(sysId);
        this._isNewRecord = false;
        log("Data length: " + this.data.length);
        // if(this.data.length == 1){
        //     log("Data length is 1");
        //     this._mockCurrent = this.data[0];
        //     this.mockIndex = 0;
        //     return this._mockCurrent
        // }

        this._mockCurrent = this.data.find((record) => record.sys_id === sysId);
        if(this._mockCurrent){
            this.mockIndex = this.data.indexOf(this._mockCurrent);
            this._sys_id = this._mockCurrent.sys_id;
        }
        return this._mockCurrent;
    });

    public isNewRecord = jest.fn().mockImplementation(() => {
        return this.isNewRecord;
    });

    public addEncodedQuery = jest.fn().mockImplementation((query:string) => {
        this._isNewRecord = false;
        this._mockQuery.push(query);
    });

    public addActiveQuery = jest.fn().mockImplementation((...args: any[]) => {
        this._isNewRecord = false;
       let q:string = "active=true";
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

    public addQuery = jest.fn().mockImplementation((name?: string, oper?: string, value?: any) => {
        this._isNewRecord = false;
        const condition = new MockGlideQueryCondition();
        condition.addCondition(name, oper, value);
        this._conditions.push(condition);
        return condition;
    });

    public query = jest.fn().mockImplementation(() => {
         this.initQueryGr();
      
    });

    public deleteMultiple = jest.fn().mockImplementation(() => {
        return this;
    });

    public insert = jest.fn().mockImplementation(() => {
        if(this._mockNew){

            let dbTable:InMemoryDataTable = this._database.getTable(this._tableName);
            if(dbTable){
                let id = this._mockNew.sys_id;
                dbTable.addRow(this._mockNew);
                this._mockNew = null;
                this.get(id);
            }
        }

        return this.sys_id || null;
    });

    public update = jest.fn().mockImplementation(() => {
        const record = this._mockCurrent;
        if (record) {
            record._mockUpdated = true;
        }
        return record.sys_id || 'mockSysId';
    });

    public setLimit = jest.fn().mockImplementation((limit: number) => {
        this.mockLimit = limit;
        return null;
    });

    setValue = jest.fn().mockImplementation((column: string, value: string) => {
        this._mockCurrent[column] = value;
        this[column] = value; // hacky glideelement replacement for now
        //this._properties[column] = value;
    });

    getValue = jest.fn().mockImplementation((column: string) => {
        return this._mockCurrent[column] ?? null;
    });

    getElement = jest.fn().mockImplementation((column: string) => {
        if(this._mockCurrent[column]){
            return this._mockCurrent[column];
        } //else{
        //     this._mockCurrent[column] = new MockGlideElement(null);
        // }

        return null;
    });

    getUniqueValue = jest.fn().mockImplementation(() => {
        return this.sys_id;
    });

    isValidField = jest.fn().mockImplementation(() => {
        return true;
    });

    isValidRecord = jest.fn().mockImplementation(() => {
        return true;
    });

    isValid = jest.fn().mockImplementation(() => {
       
        return true;
    });

    getTableName = jest.fn().mockImplementation(() => {
        return this._tableName;
    });

    getRecordClassName = jest.fn().mockImplementation(() => {
        return this._tableName;
    });

    getRowCount = jest.fn().mockImplementation(() => {
        return this.data.length;
    });

    hasNext = jest.fn().mockImplementation(() => {
        return this.mockIndex < this._data.length - 1;
    });

    addRecord = jest.fn().mockImplementation((record: any) => {
        this.data.push(record);
    });

    reset = jest.fn().mockImplementation(() => {
        this.mockIndex = -1;
    });

    // Additional methods to manipulate mock data
    setMockData = jest.fn().mockImplementation((data: any[]) => {
        this.data = data;
    });

    getMockData = jest.fn().mockImplementation(() => {
        return this._data;
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
        if(!this._refRecord){
            this._refRecord = new GlideRecord(this._refRecordTableName);
        }
        return  this._refRecord; 
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
                return  this.dateInstance.toISOString();
            case "yyyy":
                return  this._dateInstance.getUTCFullYear();
            case "MM":
                return  this._dateInstance.getUTCMonth() + 1;
            case "dd":
                return  this._dateInstance.getUTCDate();
            case "HH":
                return this.dateInstance.getUTCHours();
            case "mm":
                return this.dateInstance.getUTCMinutes();
            case "ss":
                return this.dateInstance.getUTCSeconds();   
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
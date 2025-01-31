export declare const MOCKED_PROPERTIES: {
    'x_taniu_tan_core.tanium_api_endpoint': string;
    'x_taniu_tan_core.tanium_module_api_url': string;
    'x_taniu_tan_core.mid_server': string;
    'x_taniu_tan_core.tanium_username': string;
    'x_taniu_tan_core.tanium_password': string;
    'x_taniu_tan_core.tanium_api_token': string;
    'x_taniu_tan_core.track_direct_connect_actions': string;
    'x_taniu_tan_core.identify_endpoint_by_field': string;
    'x_taniu_tan_core.Log Tanium Actions': string;
    'x_taniu_tan_core.default_deployment_duration_hrs': string;
};
export declare class InMemoryDataTable {
    private _rows;
    get rows(): Record<string, any>[];
    set rows(value: Record<string, any>[]);
    private _tableName;
    get tableName(): string;
    set tableName(value: string);
    constructor(name: string);
    addRow(row: Record<string, any>): void;
    getRows(): Record<string, any>[];
    setRows(rows: Record<string, any>[]): void;
    getRowBySysId(sysId: string): Record<string, any>;
    getRowByField(field: string, value: string): Record<string, any>;
    deleteRowBySysId(sysId: string): void;
    deleteRowByField(field: string, value: string): void;
}
export declare class Database {
    private static _instance;
    static getInstance(): Database;
    static reInitialize(): void;
    private _mockData;
    getMockData(): Record<string, InMemoryDataTable>;
    private setMockData;
    addTable(tableName: string): InMemoryDataTable;
    getTable(tableName: string): InMemoryDataTable;
}
export declare class MockPropertyTable {
    private _properties;
    constructor();
    getProperty: any;
    setProperty: any;
}
export declare class MockPropertyDB {
    private static _instance;
    static getInstance(): MockPropertyDB;
    private _propertiesTable;
    constructor();
    getProperty: any;
    setProperty: any;
}
export declare class MockEventQueue {
    private static _instance;
    static getInstance(): MockEventQueue;
    private _queue;
    eventQueue(eventName: string, instance: GlideRecord, parm1: string, parm2: string, queue: string): void;
}
export declare class MockGlideSystem {
    private _data;
    get data(): InMemoryDataTable;
    constructor();
    getProperty: any;
    setProperty: any;
    log: any;
    importXML: any;
    getUserName: any;
    getSystemId: any;
    nil: any;
    error: any;
    warn: any;
    debug: any;
    info: any;
    eventQueue: any;
}
export declare class MockGlideQueryCondition {
    private conditions;
    addCondition(name?: string, oper?: string, value?: any): MockGlideQueryCondition;
    addOrCondition(name?: string, oper?: string, value?: any): MockGlideQueryCondition;
    getConditions(): {
        name?: string;
        oper?: string;
        value?: any;
    }[];
}
export declare class MockGlideRecord {
    _database: Database;
    private _tableName;
    private _mockQuery;
    get mockQuery(): unknown[];
    set mockQuery(value: unknown[]);
    private _mockCallCount;
    private _mockRecordCount;
    private _mockCurrent;
    get mockCurrent(): Record<string, any>;
    set mockCurrent(value: Record<string, any>);
    private _mockIndex;
    get mockIndex(): number;
    set mockIndex(value: number);
    private _mockLimit;
    get mockLimit(): number;
    set mockLimit(value: number);
    private _operation;
    private _data;
    get data(): any[];
    set data(value: any[]);
    private _isNewRecord;
    set newRecord(value: boolean);
    private _sys_id;
    get sys_id(): string;
    private _conditions;
    get conditions(): MockGlideQueryCondition[];
    set conditions(value: MockGlideQueryCondition[]);
    generateGUID(): string;
    private _mockNew;
    get mockNew(): any;
    set mockNew(value: any);
    constructor(tableName: string);
    initialize: any;
    initQueryGr(): void;
    operation(): string;
    next: any;
    get: any;
    isNewRecord: any;
    addEncodedQuery: any;
    addActiveQuery: any;
    addQuery: any;
    query: any;
    deleteMultiple: any;
    insert: any;
    update: any;
    setLimit: any;
    setValue: any;
    getValue: any;
    getElement: any;
    getUniqueValue: any;
    isValidField: any;
    isValidRecord: any;
    isValid: any;
    getTableName: any;
    getRecordClassName: any;
    getRowCount: any;
    hasNext: any;
    addRecord: any;
    reset: any;
    setMockData: any;
    getMockData: any;
}
export declare class GlideRecord extends MockGlideRecord {
}
export declare class MockGlideElement {
    private _value;
    private _refRecordTableName;
    private _refRecord;
    constructor(value: any);
    setRefRecordTableName: any;
    getValue: any;
    setValue: any;
    getDisplayValue: any;
    getRefRecord: any;
    setRefRecord: any;
    nil: any;
    changes: any;
    changesFrom: any;
    changesTo: any;
    getBooleanValue: any;
    getHTMLValue: any;
    getRefTable: any;
    getRefField: any;
    getRefRecordSysId: any;
    getRefRecordDisplayValue: any;
    getRefRecordValue: any;
    getRefRecordDisplayValues: any;
    getRefRecordValues: any;
    getRefRecordVariables: any;
}
export declare const gs: {
    setProperty: any;
    getProperty: any;
    error: any;
    debug: any;
    warn: any;
    urlEncode: any;
    nil: any;
};
export declare class GlideDate {
    _mockDate: Date;
    constructor(date?: Date);
    getByFormat(format: string): string;
}
export declare class GlideTime {
    _mockDate: Date;
    constructor(ms?: number);
    getByFormat(format: string): string;
}
export declare class GlideDateTime {
    _mockDate: Date;
    get _mockDateMs(): number;
    constructor(dateString?: string);
    addDays(days: number): void;
    add(ms: number): void;
    getDate(): GlideDate;
    getTime(): GlideTime;
}
export declare class MockGlideDateTime {
    private _dateInstance;
    get dateInstance(): Date;
    set dateInstance(value: Date);
    constructor(dt?: string | number | null);
    getTime: any;
    getNumericValue: any;
    getYearLocalTime: any;
    getMonthLocalTime: any;
    getDayOfMonthLocalTime: any;
    getYearUTC: any;
    getMonthUTC: any;
    getDayOfMonthUTC: any;
    addDays: any;
    addSeconds: any;
    toString: any;
}
export declare function newMockGlideDateTime(dt?: string | number | null): GlideDateTime;
export declare class MockGlideTime {
    private _dateInstance;
    get dateInstance(): Date;
    set dateInstance(value: Date);
    constructor(dt: Date);
    getByFormat: any;
}
export declare function newMockGlideSystem(): MockGlideSystem;
export declare const mockGs: MockGlideSystem;
export declare class MockAbstractAjaxProcessor {
    private CALLABLE_PREFIX;
    private request;
    private responseXML;
    private gc;
    constructor(request?: any, responseXML?: any, gc?: any);
    process: any;
    newItem: any;
    getParameter: any;
    getDocument: any;
    getRootElement: any;
    getName: any;
    getValue: any;
    getType: any;
    getChars: any;
    setAnswer: any;
    setError: any;
    type: string;
}
//# sourceMappingURL=glide.d.ts.map
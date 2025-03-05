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
    getProperty: jest.Mock<any, any, any>;
    setProperty: jest.Mock<any, any, any>;
}
export declare class MockPropertyDB {
    private static _instance;
    static getInstance(): MockPropertyDB;
    private _propertiesTable;
    constructor();
    getProperty: jest.Mock<any, any, any>;
    setProperty: jest.Mock<any, any, any>;
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
    getProperty: jest.Mock<any, any, any>;
    setProperty: jest.Mock<any, any, any>;
    log: jest.Mock<any, any, any>;
    importXML: jest.Mock<any, any, any>;
    getUserName: jest.Mock<any, any, any>;
    getSystemId: jest.Mock<any, any, any>;
    nil: jest.Mock<boolean, [value: unknown], any>;
    error: jest.Mock<any, any, any>;
    warn: jest.Mock<any, any, any>;
    debug: jest.Mock<any, any, any>;
    info: jest.Mock<any, any, any>;
    eventQueue: jest.Mock<any, any, any>;
    urlEncode: jest.Mock<any, any, any>;
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
    private _mockNew;
    get mockNew(): any;
    set mockNew(value: any);
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
    private _conditions;
    get conditions(): MockGlideQueryCondition[];
    set conditions(value: MockGlideQueryCondition[]);
    generateGUID(): string;
    constructor(tableName: string);
    initialize: jest.Mock<any, any, any>;
    initProperties(): void;
    defineProperty(prop: any): void;
    isElementReferenceType(propName: any): boolean;
    initQueryGr(): void;
    operation(): string;
    next: jest.Mock<any, any, any>;
    get: jest.Mock<any, any, any>;
    isNewRecord: jest.Mock<any, any, any>;
    addEncodedQuery: jest.Mock<any, any, any>;
    addActiveQuery: jest.Mock<any, any, any>;
    addNotNullQuery: jest.Mock<any, any, any>;
    addNullQuery: jest.Mock<any, any, any>;
    addQuery: jest.Mock<any, any, any>;
    query: jest.Mock<any, any, any>;
    deleteMultiple: jest.Mock<any, any, any>;
    insert: jest.Mock<any, any, any>;
    update: jest.Mock<any, any, any>;
    setLimit: jest.Mock<any, any, any>;
    setValue: jest.Mock<any, any, any>;
    getValue: jest.Mock<any, any, any>;
    getElement: jest.Mock<any, any, any>;
    getUniqueValue: jest.Mock<any, any, any>;
    isValidField: jest.Mock<any, any, any>;
    isValidRecord: jest.Mock<any, any, any>;
    isValid: jest.Mock<any, any, any>;
    getTableName: jest.Mock<any, any, any>;
    getRecordClassName: jest.Mock<any, any, any>;
    getRowCount: jest.Mock<any, any, any>;
    hasNext: jest.Mock<any, any, any>;
    addRecord: jest.Mock<any, any, any>;
    reset: jest.Mock<any, any, any>;
    setMockData: jest.Mock<any, any, any>;
    getMockData: jest.Mock<any, any, any>;
}
export declare class MockGlideAggregate extends MockGlideRecord {
    private _groupBy;
    get groupByVal(): string;
    set groupByVal(value: string);
    groupBy: jest.Mock<any, any, any>;
}
export declare class GlideRecord extends MockGlideRecord {
}
export declare class MockGlideElement {
    private _value;
    private _refRecordTableName;
    private _refRecord;
    constructor(value: any);
    setRefRecordTableName: jest.Mock<any, any, any>;
    getValue: jest.Mock<any, any, any>;
    setValue: jest.Mock<any, any, any>;
    getDisplayValue: jest.Mock<any, any, any>;
    getRefRecord: jest.Mock<any, any, any>;
    setRefRecord: jest.Mock<any, any, any>;
    nil: jest.Mock<any, any, any>;
    changes: jest.Mock<any, any, any>;
    changesFrom: jest.Mock<any, any, any>;
    changesTo: jest.Mock<any, any, any>;
    getBooleanValue: jest.Mock<any, any, any>;
    getHTMLValue: jest.Mock<any, any, any>;
    getRefTable: jest.Mock<any, any, any>;
    getRefField: jest.Mock<any, any, any>;
    getRefRecordSysId: jest.Mock<any, any, any>;
    getRefRecordDisplayValue: jest.Mock<any, any, any>;
    getRefRecordValue: jest.Mock<any, any, any>;
    getRefRecordDisplayValues: jest.Mock<any, any, any>;
    getRefRecordValues: jest.Mock<any, any, any>;
    getRefRecordVariables: jest.Mock<any, any, any>;
}
export declare const gs: {
    setProperty: jest.Mock<any, any, any>;
    getProperty: jest.Mock<any, any, any>;
    error: jest.Mock<any, any, any>;
    debug: jest.Mock<any, any, any>;
    warn: jest.Mock<any, any, any>;
    urlEncode: jest.Mock<any, [x: any], any>;
    nil: jest.Mock<boolean, [value: unknown], any>;
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
    getTime: jest.Mock<any, any, any>;
    getDate: jest.Mock<any, any, any>;
    getNumericValue: jest.Mock<any, any, any>;
    getYearLocalTime: jest.Mock<number, [], any>;
    getMonthLocalTime: jest.Mock<number, [], any>;
    getDayOfMonthLocalTime: jest.Mock<number, [], any>;
    getYearUTC: jest.Mock<number, [], any>;
    getMonthUTC: jest.Mock<number, [], any>;
    getDayOfMonthUTC: jest.Mock<number, [], any>;
    addDays: jest.Mock<any, any, any>;
    addSeconds: jest.Mock<void, [val: number], any>;
    add: jest.Mock<void, [val: number], any>;
    toString: jest.Mock<string, [], any>;
}
export declare function newMockGlideDateTime(dt?: string | number | null): GlideDateTime;
export declare class MockGlideTime {
    private _dateInstance;
    get dateInstance(): Date;
    set dateInstance(value: Date);
    constructor(dt: Date);
    getByFormat: jest.Mock<string, [val: string], any>;
}
export declare function newMockGlideSystem(): MockGlideSystem;
export declare const mockGs: MockGlideSystem;
export declare class MockAbstractAjaxProcessor {
    private CALLABLE_PREFIX;
    private request;
    private responseXML;
    private gc;
    constructor(request?: any, responseXML?: any, gc?: any);
    process: jest.Mock<any, any, any>;
    newItem: jest.Mock<any, any, any>;
    getParameter: jest.Mock<any, any, any>;
    getDocument: jest.Mock<any, any, any>;
    getRootElement: jest.Mock<any, any, any>;
    getName: jest.Mock<any, any, any>;
    getValue: jest.Mock<any, any, any>;
    getType: jest.Mock<any, any, any>;
    getChars: jest.Mock<any, any, any>;
    setAnswer: jest.Mock<any, any, any>;
    setError: jest.Mock<any, any, any>;
    type: string;
}
//# sourceMappingURL=glide.d.ts.map
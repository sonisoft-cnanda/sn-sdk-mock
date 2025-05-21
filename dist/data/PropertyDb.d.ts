export declare class PropertyDb {
    private static _instance;
    static getInstance(): PropertyDb;
    private _propertiesTable;
    constructor();
    getProperty(propertyName: string): any;
    setProperty(propertyName: string, value: string): void;
}
//# sourceMappingURL=PropertyDb.d.ts.map
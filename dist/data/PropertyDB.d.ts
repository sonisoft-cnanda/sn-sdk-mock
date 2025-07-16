export declare class PropertyDB {
    private static _instance;
    static getInstance(): PropertyDB;
    private _propertiesTable;
    constructor();
    getProperty(propertyName: string): any;
    setProperty(propertyName: string, value: string): void;
}
//# sourceMappingURL=PropertyDB.d.ts.map
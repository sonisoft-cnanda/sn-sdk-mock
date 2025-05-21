import { InMemoryDataTable } from "./InMemoryDataTable.js";
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
//# sourceMappingURL=Database.d.ts.map
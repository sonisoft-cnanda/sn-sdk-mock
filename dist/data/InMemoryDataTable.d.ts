import { DataTableBusinessRule } from "./DataTableBusinessRule.js";
export declare class InMemoryDataTable {
    private _rows;
    get rows(): Record<string, any>[];
    set rows(value: Record<string, any>[]);
    private _tableName;
    get tableName(): string;
    set tableName(value: string);
    private _businessRules;
    get businessRules(): DataTableBusinessRule[];
    set businessRules(value: DataTableBusinessRule[]);
    constructor(name: string);
    addRow(row: Record<string, any>): void;
    addRows(rows: Record<string, any>[]): void;
    getRows(): Record<string, any>[];
    setRows(rows: Record<string, any>[]): void;
    getRowBySysId(sysId: string): Record<string, any>;
    getRowByField(field: string, value: string): Record<string, any>;
    deleteRowBySysId(sysId: string): void;
    deleteRowByField(field: string, value: string): void;
}
//# sourceMappingURL=InMemoryDataTable.d.ts.map
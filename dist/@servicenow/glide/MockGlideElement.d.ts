import { GlideRecord } from "@servicenow/glide";
import { MockGlideRecord } from "./MockGlideRecord.js";
export declare class MockGlideElement {
    private _value;
    private _refRecordTableName;
    private _refRecord;
    constructor(value: any);
    setRefRecordTableName(tableName: string): void;
    getValue(): any;
    setValue(value: any): void;
    getDisplayValue(): string;
    getRefRecord(): MockGlideRecord;
    setRefRecord(record: GlideRecord): void;
    nil(): boolean;
    changes(): boolean;
    changesFrom(value: any): boolean;
    changesTo(value: any): boolean;
    getBooleanValue(): boolean;
    getHTMLValue(): string;
    getRefTable(): string;
    getRefField(): string;
    getRefRecordSysId(): string;
    getRefRecordDisplayValue(): string;
    getRefRecordValue(): any;
    getRefRecordDisplayValues(): string[];
    getRefRecordValues(): any[];
    getRefRecordVariables(): Record<string, any>;
}
//# sourceMappingURL=MockGlideElement.d.ts.map
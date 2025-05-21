import { GlideRecord } from "@servicenow/glide";
import { InMemoryDataTable } from "../../data/InMemoryDataTable.js";
export declare class MockGlideSystem {
    private _data;
    get data(): InMemoryDataTable;
    constructor();
    getProperty(propertyName: string): any;
    setProperty(propertyName: string, value: string): void;
    log(message: string): void;
    importXML(xml: string): string;
    getUserName(): string;
    getSystemId(): string;
    nil(value: unknown): boolean;
    error(msg: string): void;
    warn(msg: string): void;
    debug(msg: string): void;
    info(msg: string): void;
    eventQueue(eventName: string, instance: GlideRecord, parm1: string, parm2: string, queue: string | object): void;
    urlEncode(value: string): string;
    include(name: string): string;
}
export declare function newMockGlideSystem(): MockGlideSystem;
export declare const mockGs: MockGlideSystem;
export declare const gs: MockGlideSystem;
//# sourceMappingURL=MockGlideSystem.d.ts.map
import { GlideRecord } from "@servicenow/glide";
export declare class EventQueue {
    private static _instance;
    static getInstance(): EventQueue;
    private _queue;
    eventQueue(eventName: string, instance: GlideRecord, parm1: string, parm2: string, queue: string): void;
}
//# sourceMappingURL=EventQueue.d.ts.map
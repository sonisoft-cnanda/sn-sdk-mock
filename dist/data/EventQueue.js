"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventQueue = void 0;
class EventQueue {
    static getInstance() {
        if (!EventQueue._instance) {
            EventQueue._instance = new EventQueue();
        }
        return EventQueue._instance;
    }
    eventQueue(eventName, instance, parm1, parm2, queue) {
    }
}
exports.EventQueue = EventQueue;
//# sourceMappingURL=EventQueue.js.map
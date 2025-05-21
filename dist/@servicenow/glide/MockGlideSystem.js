"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gs = exports.mockGs = exports.MockGlideSystem = void 0;
exports.newMockGlideSystem = newMockGlideSystem;
const console_1 = require("console");
const Database_1 = require("../../data/Database.js");
const PropertyDb_1 = require("../../data/PropertyDb.js");
class MockGlideSystem {
    get data() {
        return this._data;
    }
    constructor() {
        this._data = Database_1.Database.getInstance().addTable('sys_properties');
    }
    getProperty(propertyName) {
        return PropertyDb_1.PropertyDb.getInstance().getProperty(propertyName);
    }
    setProperty(propertyName, value) {
        PropertyDb_1.PropertyDb.getInstance().setProperty(propertyName, value);
    }
    log(message) {
        console.log(message);
    }
    importXML(xml) {
        return xml;
    }
    getUserName() {
        return 'admin';
    }
    getSystemId() {
        return 'admin';
    }
    nil(value) {
        return !value;
    }
    error(msg) {
        (0, console_1.error)(msg);
    }
    warn(msg) {
        (0, console_1.warn)(msg);
    }
    debug(msg) {
        (0, console_1.debug)(msg);
    }
    info(msg) {
        (0, console_1.log)(msg);
    }
    eventQueue(eventName, instance, parm1, parm2, queue) {
        // Implement event queue logic if needed
    }
    urlEncode(value) {
        return encodeURIComponent(value);
    }
    include(name) {
        return "";
    }
}
exports.MockGlideSystem = MockGlideSystem;
function newMockGlideSystem() {
    return new MockGlideSystem();
}
exports.mockGs = new MockGlideSystem();
exports.gs = exports.mockGs;
//# sourceMappingURL=MockGlideSystem.js.map
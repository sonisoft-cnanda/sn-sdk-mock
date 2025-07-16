"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockGlideDateTime = void 0;
exports.newMockGlideDateTime = newMockGlideDateTime;
const MockGlideDate_1 = require("./MockGlideDate.js");
const MockGlideTime_1 = require("./MockGlideTime.js");
const parseISO_1 = require("date-fns/parseISO");
const DBUtil_1 = require("../../common/DBUtil.js");
class MockGlideDateTime {
    get dateInstance() {
        return this._dateInstance;
    }
    set dateInstance(value) {
        this._dateInstance = value;
    }
    constructor(dt) {
        this.getTime = jest.fn().mockImplementation(() => {
            return new MockGlideTime_1.MockGlideTime(this.dateInstance);
        });
        this.getDate = jest.fn().mockImplementation(() => {
            return new MockGlideDate_1.MockGlideDate(this.dateInstance);
        });
        this.getNumericValue = jest.fn().mockImplementation(() => {
            return this.dateInstance.getTime();
        });
        this.getYearLocalTime = jest.fn(() => this.dateInstance.getFullYear());
        this.getMonthLocalTime = jest.fn(() => this.dateInstance.getMonth() + 1);
        this.getDayOfMonthLocalTime = jest.fn(() => this.dateInstance.getDate());
        this.getYearUTC = jest.fn(() => this.dateInstance.getUTCFullYear());
        this.getMonthUTC = jest.fn(() => this.dateInstance.getUTCMonth() + 1);
        this.getDayOfMonthUTC = jest.fn(() => this.dateInstance.getUTCDate());
        this.addDays = jest.fn();
        this.addSeconds = jest.fn((val) => {
            this.dateInstance.setSeconds(this.dateInstance.getSeconds() + val);
        });
        this.add = jest.fn((val) => {
            this.dateInstance.setTime(this.dateInstance.getTime() + val);
        });
        this.toString = jest.fn(() => {
            // const zonedDate = toZonedTime(_dt, 'UTC');
            // const formattedDate = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.000'Z'");
            // return formattedDate; 
            //toString in ServiceNow does not return the ISO String
            return this.dateInstance.toISOString();
        });
        if (dt == undefined || !dt) {
            this._dateInstance = new Date(Date.now());
        }
        else {
            DBUtil_1.DBUtil.tryParseInt(dt?.toString(), (isParsed, value) => {
                if (isParsed != undefined && isParsed) {
                    this._dateInstance = new Date();
                    this._dateInstance.setUTCMilliseconds(value);
                }
                else {
                    this._dateInstance = (dt == undefined || !dt) ? new Date(Date.now()) : (0, parseISO_1.parseISO)(dt.toString());
                }
            });
        }
    }
}
exports.MockGlideDateTime = MockGlideDateTime;
function newMockGlideDateTime(dt) {
    const originalModule = jest.requireActual("@servicenow/glide");
    const instance = new MockGlideDateTime(dt);
    const OriginalGlideDateTime = originalModule.GlideDateTime;
    const _originalInstance = new OriginalGlideDateTime(dt);
    return Object.assign(Object.create(_originalInstance), instance);
    // return new GlideDateTime(dt);
}
//# sourceMappingURL=MockGlideDateTime.js.map
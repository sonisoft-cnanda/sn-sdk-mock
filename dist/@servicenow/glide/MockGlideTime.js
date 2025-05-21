"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockGlideTime = void 0;
class MockGlideTime {
    get dateInstance() {
        return this._dateInstance;
    }
    set dateInstance(value) {
        this._dateInstance = value;
    }
    constructor(dt) {
        this.getByFormat = jest.fn((val) => {
            switch (val) {
                case "yyyy-MM-dd HH:mm:ss":
                    return this.dateInstance.toISOString();
                case "yyyy":
                    return this._dateInstance.getUTCFullYear().toString();
                case "MM":
                    return (this._dateInstance.getUTCMonth() + 1).toString().padStart(2, '0');
                case "dd":
                    return this._dateInstance.getUTCDate().toString().padStart(2, '0');
                case "HH":
                    return this.dateInstance.getUTCHours().toString().padStart(2, '0');
                case "mm":
                    return this.dateInstance.getUTCMinutes().toString().padStart(2, '0');
                case "ss":
                    return this.dateInstance.getUTCSeconds().toString().padStart(2, '0');
            }
        });
        this._dateInstance = dt;
    }
}
exports.MockGlideTime = MockGlideTime;
//# sourceMappingURL=MockGlideTime.js.map
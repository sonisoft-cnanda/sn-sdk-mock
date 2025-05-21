"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockGlideDate = void 0;
class MockGlideDate {
    constructor(date) {
        this._mockDate = date ?? new Date();
    }
    getByFormat(format) {
        const date = this._mockDate;
        switch (format) {
            case 'yyyy':
                return date.getFullYear().toString();
            case 'MM':
                return (date.getMonth() + 1).toString().padStart(2, '0');
            case 'dd':
                return date.getDate().toString().padStart(2, '0');
            default:
                return date.toISOString();
        }
    }
}
exports.MockGlideDate = MockGlideDate;
//# sourceMappingURL=MockGlideDate.js.map
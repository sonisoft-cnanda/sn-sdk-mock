"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRestResponseV2 = void 0;
const RestDataStore_1 = require("../../../data/sn_ws/RestDataStore.js");
class MockRestResponseV2 {
    constructor(request) {
        this._headers = {};
        RestDataStore_1.RestDataStore.getInstance().addMockResponse(this);
        this._mock_request = request;
    }
    getBody() {
        return RestDataStore_1.RestDataStore.getInstance().mockResponseBody;
    }
    getStatusCode() {
        return RestDataStore_1.RestDataStore.getInstance().mockResponseCode;
    }
    getRequest() {
        return this._mock_request;
    }
    getHeaders() {
        return this._headers;
    }
    getHeader(headerName) {
        return this._headers[headerName];
    }
    haveError() {
        return RestDataStore_1.RestDataStore.getInstance().hasError;
    }
}
exports.MockRestResponseV2 = MockRestResponseV2;
//# sourceMappingURL=MockRestResponseV2.js.map
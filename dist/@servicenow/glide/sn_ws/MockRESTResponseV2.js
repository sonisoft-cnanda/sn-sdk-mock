"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRESTResponseV2 = void 0;
const RESTDataStore_1 = require("../../../data/sn_ws/RESTDataStore.js");
class MockRESTResponseV2 {
    constructor(request) {
        this._headers = {};
        RESTDataStore_1.RESTDataStore.getInstance().addMockResponse(this);
        this._mock_request = request;
    }
    getBody() {
        return RESTDataStore_1.RESTDataStore.getInstance().mockResponseBody;
    }
    getStatusCode() {
        return RESTDataStore_1.RESTDataStore.getInstance().mockResponseCode;
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
        return RESTDataStore_1.RESTDataStore.getInstance().hasError;
    }
}
exports.MockRESTResponseV2 = MockRESTResponseV2;
//# sourceMappingURL=MockRESTResponseV2.js.map
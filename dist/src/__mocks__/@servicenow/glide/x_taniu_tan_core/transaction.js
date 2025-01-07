"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTransactionBuilder = exports.MockTransaction = void 0;
const glide_1 = require("../glide.js");
jest.mock('@servicenow/glide', () => {
    return {
        GlideRecord: jest.fn().mockImplementation((tableName) => new glide_1.MockGlideRecord(tableName)),
        gs: {
            nil: jest.fn((value) => !value),
            debug: jest.fn(),
            error: jest.fn()
        }
    };
});
class MockTransaction {
    constructor() {
        this.requestBody = jest.fn();
        this.responseBody = jest.fn();
        this.requestHeaders = jest.fn();
        this.responseHeaders = jest.fn();
        this.endpoint = jest.fn();
        this.httpMethod = jest.fn();
        this.statusCode = jest.fn();
        this.outboundHttpRequest = jest.fn();
        this.lookupOutboundHttpTransactionRecord = jest.fn();
        this.save = jest.fn();
    }
}
exports.MockTransaction = MockTransaction;
class MockTransactionBuilder {
    constructor() {
        this.withHttpRequestBody = jest.fn();
        this.withResponseBody = jest.fn();
        this.withRequestHeaders = jest.fn();
        this.withResponseHeaders = jest.fn();
        this.withEndpoint = jest.fn();
        this.withHttpMethod = jest.fn();
        this.withStatusCode = jest.fn();
        this.build = jest.fn().mockReturnValue(new MockTransaction());
    }
}
exports.MockTransactionBuilder = MockTransactionBuilder;
// jest.mock('../../src/server/common/transaction/Transaction', () => {
//     return {
//         Transaction: jest.fn().mockImplementation(() => {
//             return {
//                 requestBody: '',
//                 responseBody: '',
//                 requestHeaders: '',
//                 responseHeaders: '',
//                 endpoint: '',
//                 httpMethod: '',
//                 statusCode: 200,
//                 outboundHttpRequest: '',
//                 lookupOutboundHttpTransactionRecord: jest.fn(),
//                 save: jest.fn()
//             };
//         })
//     };
// });
// jest.mock('../../src/server/common/transaction/TransactionBuilder', () => {
//     return {
//         TransactionBuilder: jest.fn().mockImplementation(() => {
//             return {
//                 withHttpRequestBody: jest.fn().mockReturnThis(),
//                 withResponseBody: jest.fn().mockReturnThis(),
//                 withRequestHeaders: jest.fn().mockReturnThis(),
//                 withResponseHeaders: jest.fn().mockReturnThis(),
//                 withEndpoint: jest.fn().mockReturnThis(),
//                 withHttpMethod: jest.fn().mockReturnThis(),
//                 withStatusCode: jest.fn().mockReturnThis(),
//                 build: jest.fn().mockReturnValue(new Transaction())
//             };
//         })
//     };
// });
//# sourceMappingURL=transaction.js.map
import { GlideRecord, gs } from '@servicenow/glide';
import { MockGlideRecord } from '../glide';

jest.mock('@servicenow/glide', () => {
    return {
        GlideRecord: jest.fn().mockImplementation((tableName: string) => new MockGlideRecord(tableName)),
        gs: {
            nil: jest.fn((value: unknown) => !value),
            debug: jest.fn(),
            error: jest.fn()
        }
    };
});


export class MockTransaction {
    requestBody = jest.fn();
    responseBody = jest.fn();
    requestHeaders = jest.fn();
    responseHeaders = jest.fn();
    endpoint = jest.fn();
    httpMethod = jest.fn();
    statusCode = jest.fn();
    outboundHttpRequest = jest.fn();
    lookupOutboundHttpTransactionRecord = jest.fn();
    save = jest.fn();

    
}

export class MockTransactionBuilder {
    withHttpRequestBody = jest.fn();
    withResponseBody = jest.fn();
    withRequestHeaders = jest.fn();
    withResponseHeaders = jest.fn();
    withEndpoint = jest.fn();
    withHttpMethod = jest.fn();
    withStatusCode = jest.fn();
    build = jest.fn().mockReturnValue(new MockTransaction());
}



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
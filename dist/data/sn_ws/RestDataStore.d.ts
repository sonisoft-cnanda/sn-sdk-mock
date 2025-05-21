import { MockRestMessageV2 } from "../../@servicenow/glide/sn_ws/MockRestMessageV2.js";
import { MockRestResponseV2 } from "../../@servicenow/glide/sn_ws/MockRestResponseV2.js";
import { RestMessageTemplate } from "./RestMessageTemplate.js";
export declare class RestDataStore {
    private static _instance;
    private _mockRequests;
    private _mockResponses;
    private _mockResponseBody;
    get mockResponseBody(): string;
    set mockResponseBody(value: string);
    private _mockResponseCode;
    get mockResponseCode(): number;
    set mockResponseCode(value: number);
    private _restMessageTemplates;
    private _hasError;
    get hasError(): boolean;
    set hasError(value: boolean);
    private constructor();
    static getInstance(): RestDataStore;
    addRESTMessageTemplate(template: RestMessageTemplate): void;
    getRESTMessageTemplate(messageName: string): RestMessageTemplate;
    addMockRequest(request: MockRestMessageV2): void;
    getMockRequests(): MockRestMessageV2[];
    addMockResponse(response: MockRestResponseV2): void;
    getMockResponses(): MockRestResponseV2[];
    clearMockResponses(): void;
    clearMockRequests(): void;
    clearRestMessageTemplates(): void;
    clearMockData(): void;
}
//# sourceMappingURL=RestDataStore.d.ts.map
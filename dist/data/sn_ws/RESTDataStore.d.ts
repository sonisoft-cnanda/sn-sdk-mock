import { MockRESTMessageV2 } from "../../@servicenow/glide/sn_ws/MockRESTMessageV2.js";
import { MockRESTResponseV2 } from "../../@servicenow/glide/sn_ws/MockRESTResponseV2.js";
import { RESTMessageTemplate } from "./RESTMessageTemplate.js";
export declare class RESTDataStore {
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
    static getInstance(): RESTDataStore;
    addRESTMessageTemplate(template: RESTMessageTemplate): void;
    getRESTMessageTemplate(messageName: string): RESTMessageTemplate;
    addMockRequest(request: MockRESTMessageV2): void;
    getMockRequests(): MockRESTMessageV2[];
    addMockResponse(response: MockRESTResponseV2): void;
    getMockResponses(): MockRESTResponseV2[];
    clearMockResponses(): void;
    clearMockRequests(): void;
    clearRestMessageTemplates(): void;
    clearMockData(): void;
}
//# sourceMappingURL=RESTDataStore.d.ts.map
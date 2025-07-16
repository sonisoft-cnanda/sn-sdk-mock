"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTDataStore = void 0;
class RESTDataStore {
    get mockResponseBody() {
        return this._mockResponseBody;
    }
    set mockResponseBody(value) {
        this._mockResponseBody = value;
    }
    get mockResponseCode() {
        return this._mockResponseCode;
    }
    set mockResponseCode(value) {
        this._mockResponseCode = value;
    }
    get hasError() {
        return this._hasError;
    }
    set hasError(value) {
        this._hasError = value;
    }
    constructor() {
        this._restMessageTemplates = {};
        this._hasError = false;
        this._mockRequests = [];
        this._mockResponses = [];
        this._mockResponseBody = "";
        this._mockResponseCode = 200;
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new RESTDataStore();
        }
        return this._instance;
    }
    addRESTMessageTemplate(template) {
        this._restMessageTemplates[template.messageName] = template;
    }
    getRESTMessageTemplate(messageName) {
        return this._restMessageTemplates[messageName];
    }
    addMockRequest(request) {
        this._mockRequests.push(request);
    }
    getMockRequests() {
        return this._mockRequests;
    }
    addMockResponse(response) {
        this._mockResponses.push(response);
    }
    getMockResponses() {
        return this._mockResponses;
    }
    clearMockResponses() {
        this._mockResponses = [];
    }
    clearMockRequests() {
        this._mockRequests = [];
    }
    clearRestMessageTemplates() {
        this._restMessageTemplates = {};
    }
    clearMockData() {
        this.clearMockRequests();
        this.clearMockResponses();
        this.clearRestMessageTemplates();
    }
}
exports.RESTDataStore = RESTDataStore;
//# sourceMappingURL=RESTDataStore.js.map
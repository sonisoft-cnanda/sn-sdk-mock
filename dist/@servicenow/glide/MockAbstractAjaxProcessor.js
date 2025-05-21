"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAbstractAjaxProcessor = void 0;
class MockAbstractAjaxProcessor {
    constructor(request, responseXML, gc) {
        this.process = jest.fn().mockImplementation(() => {
            return "";
        });
        this.newItem = jest.fn().mockImplementation((name) => {
            return {};
        });
        this.getParameter = jest.fn().mockImplementation((name) => {
            return "";
        });
        this.getDocument = jest.fn().mockImplementation(() => {
            return {};
        });
        this.getRootElement = jest.fn().mockImplementation(() => {
            return {};
        });
        this.getName = jest.fn().mockImplementation(() => {
            return "";
        });
        this.getValue = jest.fn().mockImplementation(() => {
            return "";
        });
        this.getType = jest.fn().mockImplementation(() => {
            return "";
        });
        this.getChars = jest.fn().mockImplementation(() => {
            return "";
        });
        this.setAnswer = jest.fn().mockImplementation((value) => {
            // Do nothing
        });
        this.setError = jest.fn().mockImplementation((error) => {
            // Do nothing
        });
        this.type = "";
        this.CALLABLE_PREFIX = "";
        this.request = request;
        this.responseXML = responseXML;
        this.gc = gc;
    }
}
exports.MockAbstractAjaxProcessor = MockAbstractAjaxProcessor;
//# sourceMappingURL=MockAbstractAjaxProcessor.js.map
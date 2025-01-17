"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockConnection = exports.MockConnectionModel = void 0;
const glide_1 = require("@servicenow/glide");
const x_taniu_tan_core_1 = require("@servicenow/glide/x_taniu_tan_core");
class MockConnectionModel extends x_taniu_tan_core_1.ConnectionModel {
    constructor() {
        super();
        this.record = new glide_1.GlideRecord("x_taniu_tan_core_connection");
        this.record.setValue("type", x_taniu_tan_core_1.ConnectionType.SECOPS_PARAMETER_CONNECTION);
    }
}
exports.MockConnectionModel = MockConnectionModel;
class MockConnection extends x_taniu_tan_core_1.ConnectionBase {
    configureAuthForRESTMessageTest(rMessage) {
        this.configureConnection(rMessage);
        return true;
    }
    getConnectionType() {
        return x_taniu_tan_core_1.ConnectionType.SECOPS_PARAMETER_CONNECTION;
    }
    findConnectionRecord() {
        return new MockConnectionModel();
    }
    configureConnection(wsRestMessage) {
        wsRestMessage.setStringParameterNoEscape('tanium_module_api_url', this.taniumApiModule);
        wsRestMessage.setStringParameterNoEscape('session_id', this.taniumApiToken);
        wsRestMessage.setStringParameterNoEscape('tanium_api_url', this.taniumApiEndpoint);
    }
    get connectionRecord() {
        return new MockConnectionModel();
    }
    constructor() {
        super();
        this.taniumApiModule = "https://taas-api.tanium.com/plugin/products/module";
        this.taniumApiToken = "test-token";
        this.taniumApiEndpoint = "https://taas-api.tanium.com";
    }
}
exports.MockConnection = MockConnection;
//# sourceMappingURL=connection.js.map
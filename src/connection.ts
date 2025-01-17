

export class MockConnectionModel extends ConnectionModel{
    public constructor(){
        super();
        this.record = new GlideRecord("x_taniu_tan_core_connection");
        this.record.setValue("type", ConnectionType.SECOPS_PARAMETER_CONNECTION);
    }



}

export class MockConnection extends ConnectionBase implements IConnection {
    protected configureAuthForRESTMessageTest(rMessage: RESTMessageV2): boolean {
       this.configureConnection(rMessage);
       return true;
    }
    public getConnectionType(): ConnectionType {
        return ConnectionType.SECOPS_PARAMETER_CONNECTION;
    }
    protected findConnectionRecord(): IConnectionModel {
       return new MockConnectionModel();
    }
    configureConnection(wsRestMessage: RESTMessageV2): void {
        wsRestMessage.setStringParameterNoEscape('tanium_module_api_url', this.taniumApiModule);
        wsRestMessage.setStringParameterNoEscape('session_id', this.taniumApiToken);
        wsRestMessage.setStringParameterNoEscape('tanium_api_url', this.taniumApiEndpoint);
    }

    public get connectionRecord() : IConnectionModel {
        return new MockConnectionModel();
    }

    constructor() {
        super();
         this.taniumApiModule = "https://taas-api.tanium.com/plugin/products/module";
         this.taniumApiToken = "test-token";
         this.taniumApiEndpoint = "https://taas-api.tanium.com";

    }

}

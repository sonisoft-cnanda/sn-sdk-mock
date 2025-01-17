import { RESTMessageV2 } from '@servicenow/glide/sn_ws';
import { ConnectionBase, ConnectionModel, ConnectionType, IConnection, IConnectionModel } from '@servicenow/glide/x_taniu_tan_core';
export declare class MockConnectionModel extends ConnectionModel implements IConnectionModel {
    constructor();
}
export declare class MockConnection extends ConnectionBase implements IConnection {
    protected configureAuthForRESTMessageTest(rMessage: RESTMessageV2): boolean;
    getConnectionType(): ConnectionType;
    protected findConnectionRecord(): IConnectionModel;
    configureConnection(wsRestMessage: RESTMessageV2): void;
    get connectionRecord(): IConnectionModel;
    constructor();
}
//# sourceMappingURL=connection.d.ts.map
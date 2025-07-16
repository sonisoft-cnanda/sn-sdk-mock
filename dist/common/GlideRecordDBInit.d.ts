import * as ts from 'typescript';
export declare class GlideRecordDBInit {
    private tableName;
    private modulePath;
    private tableInterfaceNode;
    tableProperties: Map<string, ts.TypeElement>;
    constructor(tableName: string, modulePath?: string);
    getTableInterfaceFromModule(): void;
    static initializeGlideRecordDBTypes(modulePath: any, interfaceName: any): Promise<any>;
    private getInterfaceProperties;
    traverse(node: ts.Node): void;
    static importInterface(modulePath: string, exportName: string): Promise<any>;
    getSourceFile(modulePath: string): any;
    private processFile;
    getAllInterfaceProperties(node: ts.InterfaceDeclaration, typeChecker: ts.TypeChecker, properties?: Map<string, ts.TypeElement>): Map<string, ts.TypeElement>;
}
//# sourceMappingURL=GlideRecordDBInit.d.ts.map
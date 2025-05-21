export declare function initSNTestEnvironment(glideDeclarationUseRoot?: boolean, glideDeclarationPath?: string, glideDeclarationFileName?: string): void;
export declare class SNTestEnvironment {
    private static instance;
    private glideDeclarationUseRoot;
    private glideDeclarationPath;
    private glideDeclarationFileName;
    modulePath: string;
    private constructor();
    static getInstance(): SNTestEnvironment;
    init(glideDeclarationUseRoot?: boolean, glideDeclarationPath?: string, glideDeclarationFileName?: string): void;
    private getAppRootDir;
}
//# sourceMappingURL=SNTestEnvironment.d.ts.map
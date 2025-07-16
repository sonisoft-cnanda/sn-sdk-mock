import { RESTMessageFunctionTemplate } from "./RESTMessageFunctionTemplate.js";
export declare class RESTMessageTemplate {
    private _messageName;
    get messageName(): string;
    set messageName(value: string);
    private _methods;
    get methods(): Record<string, RESTMessageFunctionTemplate>;
    set methods(value: Record<string, RESTMessageFunctionTemplate>);
    constructor(messageName: string);
    addMethod(methodName: string, templateBody: string): void;
}
//# sourceMappingURL=RESTMessageTemplate.d.ts.map
import { RestMessageFunctionTemplate } from "./RestMessageFunctionTemplate.js";
export declare class RestMessageTemplate {
    private _messageName;
    get messageName(): string;
    set messageName(value: string);
    private _methods;
    get methods(): Record<string, RestMessageFunctionTemplate>;
    set methods(value: Record<string, RestMessageFunctionTemplate>);
    constructor(messageName: string);
    addMethod(methodName: string, templateBody: string): void;
}
//# sourceMappingURL=RestMessageTemplate.d.ts.map
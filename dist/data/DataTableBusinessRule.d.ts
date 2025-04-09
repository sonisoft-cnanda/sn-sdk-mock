import { BusinessRuleRunType } from "./BusinessRuleRunType.js";
import { BusinessRuleRunWhen } from "./BusinessRuleRunWhen.js";
export declare class DataTableBusinessRule {
    private _name;
    get name(): string;
    set name(value: string);
    private _brMethod;
    get method(): Function;
    set method(value: Function);
    private _when;
    get when(): number;
    set when(value: number);
    private _brType;
    get type(): BusinessRuleRunType;
    set type(value: BusinessRuleRunType);
    constructor(name: string, brWhen: BusinessRuleRunWhen, type: BusinessRuleRunType, method: Function);
}
//# sourceMappingURL=DataTableBusinessRule.d.ts.map
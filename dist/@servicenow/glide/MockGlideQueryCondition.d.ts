export declare class MockGlideQueryCondition {
    private conditions;
    addCondition(name?: string, oper?: string, value?: any): MockGlideQueryCondition;
    addOrCondition(name?: string, oper?: string, value?: any): MockGlideQueryCondition;
    getConditions(): {
        name?: string;
        oper?: string;
        value?: any;
    }[];
}
//# sourceMappingURL=MockGlideQueryCondition.d.ts.map
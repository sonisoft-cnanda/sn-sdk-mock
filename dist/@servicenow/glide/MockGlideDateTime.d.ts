import { GlideDateTime } from "@servicenow/glide";
export declare class MockGlideDateTime {
    private _dateInstance;
    get dateInstance(): Date;
    set dateInstance(value: Date);
    constructor(dt?: string | number | null);
    getTime: jest.Mock<any, any, any>;
    getDate: jest.Mock<any, any, any>;
    getNumericValue: jest.Mock<any, any, any>;
    getYearLocalTime: jest.Mock<number, [], any>;
    getMonthLocalTime: jest.Mock<number, [], any>;
    getDayOfMonthLocalTime: jest.Mock<number, [], any>;
    getYearUTC: jest.Mock<number, [], any>;
    getMonthUTC: jest.Mock<number, [], any>;
    getDayOfMonthUTC: jest.Mock<number, [], any>;
    addDays: jest.Mock<any, any, any>;
    addSeconds: jest.Mock<void, [val: number], any>;
    add: jest.Mock<void, [val: number], any>;
    toString: jest.Mock<string, [], any>;
}
export declare function newMockGlideDateTime(dt?: string | number | null): GlideDateTime;
//# sourceMappingURL=MockGlideDateTime.d.ts.map
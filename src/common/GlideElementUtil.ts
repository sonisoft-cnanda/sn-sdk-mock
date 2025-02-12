import { MockGlideElement, MockGlideRecord } from "../__mocks__";


export class GlideElementUtil {

    public static createGlideElementReference(elementName:string, refTable:string, refObject) : MockGlideElement{
        const gr = new MockGlideRecord(refTable);
        gr.setMockData(refObject);
        
        const ge = new MockGlideElement(elementName);

        ge.setRefRecord(gr);
        ge.setRefRecordTableName(refTable);


        

        return ge;

    }
}
import { PropertyTable } from "./PropertyTable";

export class PropertyDb{
    private static _instance:PropertyDb;
    public static getInstance():PropertyDb{
          if(!PropertyDb._instance){
            PropertyDb._instance = new PropertyDb();
          }
          return PropertyDb._instance;
     }

     private _propertiesTable:PropertyTable;

     public constructor(){
        this._propertiesTable = new PropertyTable();
    }

     
    public getProperty(propertyName: string): any {
        return this._propertiesTable.getProperty(propertyName);
    }

    public setProperty(propertyName: string, value: string): void {
        this._propertiesTable.setProperty(propertyName, value);
    }
}
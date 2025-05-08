import { RestMessageFunctionTemplate } from "./RestMessageFunctionTemplate";

export class RestMessageTemplate {
    private _messageName: string;
    public get messageName(): string {
      return this._messageName;
    }
    public set messageName(value: string) {
      this._messageName = value;
    }
  
    private _methods: Record<string, RestMessageFunctionTemplate> = {};
    public get methods(): Record<string, RestMessageFunctionTemplate> {
      return this._methods;
    }
    public set methods(value: Record<string, RestMessageFunctionTemplate>) {
      this._methods = value;
    }
  
    public constructor(messageName: string) {
      this._messageName = messageName;
    }
  
    public addMethod(methodName: string, templateBody: string) {
      this._methods[methodName] = new RestMessageFunctionTemplate(
        methodName,
        templateBody
      );
    }
  }
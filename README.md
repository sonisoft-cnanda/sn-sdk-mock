# sn-sdk-mock


This library provides mocked versions of ServiceNow Glide API's that can be used in Jest.  It has been used and tested in Jest but may work in other testing libraries as well.

The library is used to be able to test ServiceNow JS Modules and Script Includes on your local computer during development or in a CICD pipeline.

## Usage:

### Script Includes


```
const { MockGlideRecord, MockGlideSystem, Database, DataTableBusinessRule, BRRunWhen, BusinessRuleRunType, initSNRhinoEnvironment, BusinessRuleRunWhen } = require('sn-sdk-mock');
const { expect, it, describe, beforeEach } = require('@jest/globals');

initSNRhinoEnvironment();


describe("SPOSiteDataParser", () => {
    let tblSiteImport;
    let tblGroupImport;
    let tblSiteGroupUserImport;

    beforeEach(() => {
        Database.reInitialize();

         tblSiteImport = Database.getInstance().addTable(SITE_IMPORT_TABLE);
        
         tblGroupImport = Database.getInstance().addTable(SITE_GROUP_IMPORT_TABLE);

            tblSiteGroupUserImport = Database.getInstance().addTable(SITE_GROUP_USER_IMPORT_TABLE);
        
        jest.spyOn(GlideDigest.prototype, 'getMD5Base64').mockImplementation((val) => {
            const hash = crypto.createHash('md5').update(val).digest('base64');
            return hash;
        });

    
    });
});


```
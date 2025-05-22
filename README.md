# sn-sdk-mock


This library provides mocked versions of ServiceNow Glide API's that can be used in Jest.  It has been used and tested in Jest but may work in other testing libraries as well.

The library is used to be able to test ServiceNow JS Modules and Script Includes on your local computer during development or in a CICD pipeline.

### Note:
This library requires you to reference the @servicenow/glide library that is available on github vs the one on NPM for the time being. The reason for this is that you will most likely see errors, even when mocking objects, that objects are not defined.  This is due to the original @servicenow/glide library only containing type definitions and no implementations.  The github version has stubbed out implementations of those objects which allows mocking to work properly.

@servicenow/glide Github: https://github.com/sonisoft-cnanda/servicenow-glide

The @servicenow/glide library can be referenced directly from github from a package.json in devDependencies:

"@servicenow/glide": "git://github.com/sonisoft-cnanda/servicenow-glide",

## Usage:

### Script Includes


```
const { initSnRhinoEnvironment, initSNTestEnvironment } = require('sn-sdk-mock');
//Initializes the global objects with many of the default objects, such as GlideSystem, gs, GlideRecord. This should be expanded in the future.
initSnRhinoEnvironment();
//Initializes the test environment based on your script location. This uses the @types/servicenow/glide.server.d.ts that is created in a project from running now-sdk dependencies to load the list of tables and table columns. This is used when a new GlideRecord (MockGlideRecord) is created in order to set the properties list on the MockGlideRecord object.
initSNTestEnvironment();

const { MockGlideRecord, MockGlideSystem, Database, DataTableBusinessRule, BRRunWhen, BusinessRuleRunType, BusinessRuleRunWhen } = require('sn-sdk-mock');
const { expect, it, describe, beforeEach } = require('@jest/globals');



const IncidentHelper = require('../src/includes/sys_script_include/IncidentHelper.server.js');


jest.mock("@servicenow/glide", () => ({ 
    GlideRecord: jest.fn().mockImplementation(() => {
        return new MockGlideRecord();
    }),
    GlideSystem: jest.fn().mockImplementation(() => {
        let mockGs = jest.requireActual('sn-sdk-mock').mockGs;
        return mockGs;
    }),
    gs: jest.fn().mockImplementation(() => {
        let mockGs = jest.requireActual('sn-sdk-mock').mockGs;
        return mockGs;
    
    }),
}));

describe("IncidentUtil", () => {
    let tblIncident;

    beforeEach(() => {
        Database.reInitialize();

         tblIncident = Database.getInstance().addTable('incident');
        
    });


    it('createIncident should create new incident', () => {
        const incidentData = {
            short_description: 'Test Incident',
            description: 'This is a test incident',
            caller_id: 'test_user',
            category: 'hardware',
            subcategory: 'printer',
            priority: 1
        };

        let insertQuery = jest.spyOn(MockGlideRecord.prototype, 'insert');

        

        const incidentHelper = new IncidentHelper();
        const incidentSysId = incidentHelper.createIncident(incidentData);

        expect(insertQuery).toHaveBeenCalled();
        expect(incidentSysId).toBeDefined();
          let rows = tblIncident.getRows();
        expect(rows.length).toBe(1);
        var gr = new GlideRecord('incident');
        gr.get(incidentSysId);
      
        expect(gr.short_description).toBe('Test Incident');
        //expect(tblIncident.getRow(incidentSysId).short_description).toBe('Test Incident');
    });
});


```

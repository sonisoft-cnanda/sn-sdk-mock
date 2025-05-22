# sn-sdk-mock


This library provides mocked versions of ServiceNow Glide API's that can be used in Jest.  It has been used and tested in Jest but may work in other testing libraries as well.

The library is used to be able to test ServiceNow JS Modules and Script Includes on your local computer during development or in a CICD pipeline.

## Usage:

### Script Includes


```
const { initSnRhinoEnvironment, initSNTestEnvironment } = require('sn-sdk-mock');
initSnRhinoEnvironment();
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

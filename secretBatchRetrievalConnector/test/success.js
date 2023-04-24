"use strict";
exports.__esModule = true;
var tmrm = require("azure-pipelines-task-lib/mock-run");
var path = require("path");
var fs_1 = require("fs");
var file = fs_1.readFileSync(path.join(__dirname, '..', 'test/apikey.txt'), 'utf-8');
var taskPath = path.join(__dirname, '..', 'index.js');
var tmr = new tmrm.TaskMockRunner(taskPath);
var endpointId = "ConjurService";
tmr.setInput(endpointId, endpointId);
process.env['ENDPOINT_URL_' + endpointId] = "https://conjur-server";
process.env["ENDPOINT_DATA_" + endpointId + "_" + 'conjuraccount'.toUpperCase()] = 'myaccount';
process.env["ENDPOINT_DATA_" + endpointId + "_" + 'conjurusername'.toUpperCase()] = 'admin';
process.env["ENDPOINT_DATA_" + endpointId + "_" + 'conjurapikey'.toUpperCase()] = file.replace(/\s/g, '');
tmr.setInput('secretsyml', path.join(__dirname, '..', 'test/test-secrets.yml'));
tmr.run();

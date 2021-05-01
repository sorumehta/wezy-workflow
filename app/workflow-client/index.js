
//test workflow
const {listener} = require('../workflow/actionTypes/webhook')

listener({params: {workflow_name: "test"}, request: {body: {hello: "whats up billy boy eh"}}})

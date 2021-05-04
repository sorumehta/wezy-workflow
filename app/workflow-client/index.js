
//test workflow
const {listener} = require('../workflow/triggerTypes/webhook')

listener({params: {workflow_name: "test"}, request: {body: {hello: "whats up billy boy, eh?", email_to: "soru.mehta@outlook.com"}, headers: {}}})
    .then(result => {
        console.log("result returned:")
        console.log(JSON.stringify(result, null, 2))
    })

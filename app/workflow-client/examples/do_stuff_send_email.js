const workflow = {
    "actions": {
        "send_email_to_customer":{
            "type":"email",
            "parameters":{
                "to":"__get_contact_details.data.email",
                "from":"assistant@sandpipernlu.com",
                "subject":"A new correspondence has been added by agent"
            }
        },
        "send_email_to_agent":{
            "type":"email",
            "parameters":{
                "to":"soru.mehta@outlook.com",
                "from":"assistant@sandpipernlu.com",
                "subject":"New message has been added to your case by the customer"
            }
        },
        "create_new_correspondence":{
            "type":"create_correspondence",
            "parameters":{
                "content":"__post_new_correspondence.data.content",
                "account_id":"__post_new_correspondence.account_id",
                "case_id":"__post_new_correspondence.data.case_id",
                "channel_id": "__post_new_correspondence.data.channel_id",
                "is_incoming": "__post_new_correspondence.data.is_incoming"
            }
        },

        "get_contact_details":{
            "type":"get_contact",
            "parameters":{
                "contact_id":"__post_new_correspondence.data.contact_id",
                "account_id":"__post_new_correspondence.account_id"
            }
        },
        "post_data_to_crm":{
            "type":"http",
            "parameters":{
                "url":"http://localhost:7890/users",
                "data":"__post_new_correspondence.data",
                "method":"post"
            }
        },
        "IF":{
            "type": "condition",
            "parameters":{
                "condition": {
                    "type": "boolean",
                    "value1": "__post_new_correspondence.data.is_incoming",
                    "value2": true
                }
            }
        }
    },
    "trigger":{
        "name": "new_correspondence_trigger",
        "next":"post_new_correspondence",
        "type":"webhook",
        "run_type":"immediate"
    },
    "links": {

        "send_email_to_customer":{
            "next":null
        },
        "send_email_to_agent":{
            "next":null
        },
        "printNoEmail":{
            "next": null
        },
        "post_new_correspondence":{
            "next":"get_contact_details"
        },
        "get_contact_details": {
            "next":"create_new_correspondence"
        },
        "create_new_correspondence":{
            "next":"post_data_to_crm"
        },
        "post_data_to_crm":{
            "next":"IF"
        },
        "IF": [
            {"next": "send_email_to_agent"},{"next": "send_email_to_customer"}
        ]
    },
    "is_active": true
}

module.exports = workflow
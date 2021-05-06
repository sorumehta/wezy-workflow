const workflow = {
    "actions": [
        {
            "name": "send_email",
            "type": "email",
            "config":{
                "from": "soru.mehta@gmail.com",
                "to": "__start.email_to",
                "subject": "By the order of peaky blinders",
                "text": "__start.hello"
            }
        },
        {
            "name":"send_http_to_customer",
            "type":"http",
            "config":{
                "url":"http://localhost:7890/customer",
                "data":"__start.hello",
                "method":"post",
                "params": "whatevs",
                "headers": "yo mum"
            }
        },
        {
            "name":"send_http_to_agent",
            "type":"http",
            "config":{
                "url":"http://localhost:7890/agent",
                "data":"__start.hello",
                "method":"post",
                "params": "whatevs",
                "headers": "yo mum"
            }
        },

        {
            "name":"post_data_to_crm",
            "type":"function",
            "config":{
                "return_val": "send_to_agent"
            }
        },
        {
            "name":"IF",
            "type": "condition",
            "config":{
                "condition": {
                    "type": "boolean",
                    "value1": "__post_data_to_crm.result",
                    "value2": "send to customer"

                }
            }
        }
    ],
    "triggers":[
        {
            "name": "webhook_sync_trigger",
            "type":"webhook",
            "is_async": false
        },
        {
            "name": "cron_async_trigger",
            "type": "cron",
            "is_async": true
        }
    ],
    "links": {
        "start":{
            "next": "post_data_to_crm"
        },
        "send_http_to_customer":{
            "next":"send_email"
        },
        "send_email": {
            "next": "nil"
        },
        "send_http_to_agent":{
            "next":"nil"
        },
        "post_data_to_crm":{
            "next":"IF"
        },
        "IF":
            {
                "next_t": "send_http_to_agent",
                "next_f": "send_http_to_customer"
            },

    },
    "is_active": true
}


module.exports = workflow

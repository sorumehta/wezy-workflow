
require('dotenv').config()
//console.log(`aws id: ${process.env.AWS_ACCESS_KEY_ID}`)

let nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");

// configure AWS SDK
const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: process.env.AWS_REGION
});

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: { ses, aws },
});


// send some mail

const sendEmail = (args) => {
    return new Promise((resolve, reject) => {
        console.log("data.to: ", args.data.to);
        transporter.sendMail(
            {
                ...args.data,
                ses: {
                    // optional extra arguments for SendRawEmail
                    Tags: [
                        {
                            Name: "sandpiper",
                            Value: "assistant_mail",
                        },
                    ],
                },
            },
            (err, info) => {
                if(err){
                    console.log("ERROR")
                    console.log(err)
                    reject(err)
                } else{
                    console.log(info.envelope);
                    console.log(info.messageId);
                    resolve(info.messageId)
                }
            }
        );
    });
};

module.exports = { sendEmail };

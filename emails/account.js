const sgMail = require("@sendgrid/mail");

const sendGridAPIKey = process.env.SENDGRID_API_KEY;
console.log(sendGridAPIKey);

sgMail.setApiKey(sendGridAPIKey);


const sendEnquiryEmail = (name , email , subject , message)=>{
    sgMail.send({
        to : "dhruvkhanna38@gmail.com" , 
        from :"ahuja.bhavat123@gmail.com",
        subject : subject, 
        text:`Hi! Dhruv, You have a new enquiry from ${name}.
        Email: ${email}
        Message: ${message}`
    });
}

// sgMail.send({
//     to : "dhruvk.me.16@nsit.net.in" , 
//     from: "dhruvkhanna38@gmail.com",
//     subject : "This is my first mail", 
//     text : "Hi!"
// });

module.exports = {sendEnquiryEmail};
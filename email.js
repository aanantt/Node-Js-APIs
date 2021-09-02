const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

 

module.exports = (email, token) =>{
    const link = `http://localhost:3000/verify/${token}`;
    var mailOptions = {
        from: '',
        to: email,
        subject: 'Email Verification',
        html: `<h1>Click on Link to verify</h1><a href = ${link} target="_blank">Link</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



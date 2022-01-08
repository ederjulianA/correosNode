const nodemailer = require('nodemailer');



var mailOptions = {
    from: 'thumano.flc2@gmail.com',
    to: 'ederalvarez2091057@gmail.com',
    subject: 'Prueba Mail desde Node',
    text: 'Prueba de envio de email',
    html: "<p> <strong> No responder</strong> </p>",
    attachments: [
        {   // file on disk as an attachment
            filename: 'Facturaventa_259272_20211210121153.pdf',
            path: 'http://149.28.254.208:8080/MantisWeb20apps/temporal/Facturaventa_259272_20211210121153.pdf' // stream this file
        }
    ]
};

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
       port: 465,
       secure: true,
    auth: {
        user: 'thumano.flc2@gmail.com',
        pass: 'HUMANO2021$'
    }
});


transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
       // res.send(500, err.message);
    } else {
        console.log("Email sent");
        //res.status(200).jsonp(req.body);
    }
});
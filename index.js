const express = require("express");
const nodemailer = require('nodemailer');
const app = express();
app.use(
    express.urlencoded({
      extended: true
    })
  )
  app.use(express.json());
const port = 3000;

var respuesta;
app.post("/correo", (req, res) =>{
  const { email, password,archivo,destino, asunto,mensaje,copiacorreo } = req.query;
  let parametros = req.body;
  console.log(mensaje);

  if(email && password && destino && archivo, asunto,mensaje){
    var mailOptions = {
        from: email,//'thumano.flc2@gmail.com',
        to: destino,//'ederalvarez2091057@gmail.com',
        subject: asunto,//'Desprendible de nomina',
        cc: [copiacorreo],
       // text: mensaje,//'Desprendible de nomina',
        html: mensaje,
       attachments: parametros
       /* attachments: [
            {   // file on disk as an attachment
                filename: 'desprendible_de_nomina.pdf',
                path: archivo // stream this file
            }
        ]*/
    };
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
           port: 465,
           secure: true,
        auth: {
            user: email,//'thumano.flc2@gmail.com',
            pass: password//'HUMANO2021$'
        }
    });
    transporter.sendMail(mailOptions, function(error, info){

        if (error){
            console.log(error);
            respuesta = {"estado":0,"respuesta":"ERROR ENVIANDO EMAIL ","error":error,archivo,"email":email,
            "password":password,
            "destino":destino,
            "archivo":archivo};
        } else {
            
            respuesta = {"estado":1,"respuesta":"email enviado ","info":info};
        } 
        
    });
         
    res.json(respuesta);
  }else{
      res.json({
        "estado":0,
        "respuesta":"Debe enviar todos los parametros",
        "email":email,
        "password":password,
        "destino":destino,
        "archivo":archivo
      });
  }
});



app.listen(port, () =>{
  console.log("My port: " + port);
});


   

   

   
    



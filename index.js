const express = require("express");
const res = require("express/lib/response");
const nodemailer = require('nodemailer');
const app = express();
//nuevo cambio
app.use(
    express.urlencoded({
      extended: true,
      limit: '50mb'
    })
  )
  app.use(express.json({limit: '50mb'}));
//const port = 3000;

var respuesta;
app.get("/", (req,res)=>{
  res.send('hello world');
});
app.post("/correo", (req, res) =>{
  const { email, password,archivo,destino,mensaje,copiacorreo } = req.query;
  let parametros = req.body.sdtAdj;
  let varHtml    = req.body.msgMail;
  let asunto     = req.body.asunto;
  let att        = JSON.parse(parametros);
  //let nuevosParm = parametros.replace('"', "'", 'g');//.replace(/['"]+/g, '!')
  console.log(att);
  console.log(varHtml);
 

  if(email && password && destino  ){
    var mailOptions = {
        from: email,//'thumano.flc2@gmail.com',
        to: destino,//'ederalvarez2091057@gmail.com',
        subject: asunto,//'Desprendible de nomina',
        cc: [copiacorreo],
       // text: mensaje,//'Desprendible de nomina',
        html: varHtml,//mensaje,
       attachments: att
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
            res.json(respuesta);
        } else {
            
            respuesta = {"estado":1,"respuesta":"email enviado ","info":info};
            res.json(respuesta);
        } 
        
    });
     
    
    //res.json(respuesta);
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

const PORT = process.env.PORT || 3100;


/*app.listen(PORT, () =>{
  console.log("My port: " + PORT);
});*/

app.listen(process.env.PORT || 3100, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


   

   

   
    



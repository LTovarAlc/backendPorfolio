// server.js

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configuración del transporte del correo (nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configuración del contenido del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "luis.tovar.alc@gmail.com",
      subject: "Nuevo mensaje de contacto",
      text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`,
    };

    // Envío del correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).send("Error al enviar el correo");
      } else {
        console.log("Correo enviado: " + info.response);
        res.status(200).send("Correo enviado correctamente");
      }
    });
  } catch (error) {
    console.error("Error general:", error);
    res.status(500).send("Error general en el servidor" + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});

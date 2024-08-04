const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

router.post('api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Guardar en la base de datos
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Configuración de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptionsToYou = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
    };

    const mailOptionsToUser = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Copia de tu mensaje de contacto: ${subject}`,
      text: `Hola ${name},\n\nHemos recibido tu mensaje y nos pondremos en contacto contigo pronto. Aquí tienes una copia de tu mensaje:\n\n${message}\n\nSaludos,\nEquipo de Soporte`
    };

    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToUser);

    res.status(200).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.' });
  }
});

module.exports = router;



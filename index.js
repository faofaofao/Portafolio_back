const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // Asegúrate de que FRONTEND_URL esté configurado en tu .env
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use('api/contact', require('./routes/contact')); // Asegúrate de que la ruta sea correcta

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





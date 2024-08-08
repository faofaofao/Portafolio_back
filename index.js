const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB().then(() => {
  console.log('Conexión a la base de datos exitosa');
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});
// Middleware
app.use(express.json());

// Configuración de CORS



// URL del frontend en Vercel
const allowedOrigins = [`${FRONTEND_URL}`,'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'], // Permitir solo solicitudes GET y POST
  credentials: true, // Habilitar el envío de cookies y cabeceras de autorización
};

app.use(cors(corsOptions));

// Health check endpoint
app.get('/healthcheck', (req, res) => {
  res.status(200).send('ok');
});

// Rutas
app.use('/api', require('./routes/contact'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





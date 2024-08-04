const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Configuración de CORS
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Health check endpoint
app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Rutas
app.use('/api', require('./routes/contact'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





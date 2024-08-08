// // server/pages/api/contact.js
// import axios from 'axios';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const response = await axios.post(`${process.env.FRONTEND_URL}/api/contact`, req.body);
//       res.status(response.status).json(response.data);
//     } catch (error) {
//       res.status(error.response ? error.response.status : 500).json({ message: 'Error al enviar el mensaje', error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Método no permitido' });
//   }
// }



import dotenv from 'dotenv';
import { crearTicket, NuevoTicket } from './services/mikrowisp/api';

// Cargar variables de entorno
dotenv.config();

// Función de prueba
async function testTicketCreation() {
  try {
    console.log('Testing Ticket Creation...');
    console.log('MIKROWISP_API_URL:', process.env.MIKROWISP_API_URL);
    console.log('MIKROWISP_TOKEN length:', process.env.MIKROWISP_TOKEN ? process.env.MIKROWISP_TOKEN.length : 0);
    
    // Verificar si el token está disponible
    if (!process.env.MIKROWISP_TOKEN) {
      throw new Error('MIKROWISP_TOKEN no está configurado en las variables de entorno');
    }
    
    // Formato YYYY-MM-DD
    const today = new Date();
    const formattedDate = today.getFullYear() + '-' + 
                         String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                         String(today.getDate()).padStart(2, '0');
    
    // Datos de prueba según la estructura correcta de la API
    const ticketData: NuevoTicket = {
      token: process.env.MIKROWISP_TOKEN,
      idcliente: 2,
      dp: 1,
      asunto: 'Ticket de prueba - NodeJS',
      contenido: 'Este es un ticket de prueba creado desde Node.js',
      fechavisita: formattedDate,
      turno: 'TARDE',
      agendado: 'PAGINA WEB',
      solicitante: 'Test User'
    };
    
    console.log('Datos del ticket a crear:', ticketData);
    
    // Crear ticket
    const result = await crearTicket(ticketData);
    
    console.log('Resultado de la creación del ticket:');
    console.log(JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('Error en la prueba de creación de ticket:', error);
    throw error;
  }
}

// Ejecutar la prueba
testTicketCreation()
  .then(() => {
    console.log('Prueba completada con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('La prueba falló:', error);
    process.exit(1);
  }); 
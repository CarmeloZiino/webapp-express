//importazione del pacchetto mysql2
import mysql from 'mysql2';  


// Creo la connessione al DB
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',  
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootroot',
  database: process.env.DB_NAME,
});

//Avvio la connessione e ne gestisco gli errori
connection.connect((err) => {
  if (err) throw err;

  console.log('Connessione al DB avvenuta con successo');
});


//Esporto la connessione per usarla in altri file
export default connection;

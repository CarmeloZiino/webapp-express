// Import Pacchetti

import express from 'express';

// Imposto express e la porta del server

const app = express();
const port = process.env.SERVER_PORT || 3000; //se process.env non è definita, allora si attiva la porta 3000

// Importo il Routers

import movieRouter from './routers/movieRouter.js';

// Importo la funzione che applica il middleware a tutte le richieste
import setImagePath from './middlewares/setImagePath.js';


app.use( express.static('public') ) //middleware per gestire asset statici

app.use( express.json() ) //middleware per gestire le informazioni del body

// Middleware per gestire le immagini
app.use(setImagePath);

// Router Movie

app.use (' /movies' , movieRouter)

// Attivo del server
app.listen(port, () => {
  console.log(`Server Movie in funzione sulla porta: ${port}`);
});
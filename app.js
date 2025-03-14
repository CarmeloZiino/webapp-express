// Import Pacchetti

import express from 'express';

// Imposto express e la porta del server

const app = express();
const port = 3000;

//Importo il Routers

import movieRouter from './routers/movieRouter.js';

//Router Movie

app.use (' /movies' , movieRouter)

//attivo del server
app.listen(port, () => {
  console.log(`Server Movie in funzione sulla porta: ${port}`);
});
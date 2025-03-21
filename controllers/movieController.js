import connection from "../data/db.js";

function index(req, res) {
  //per mostrare la lista di tutti i film
  const imagePath = "http://localhost:3000/img/movie/movies_cover/"; //percorso per gestire immagini

  const sql = "SELECT * FROM movies"; //prende tutti i film dal DB

  connection.query(sql, (err, results) => {
    //esegue la query per ottenre il film
    if (err)
      //se c'è un errore risponde con status 500, se no restituisce i film in json
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });

    const movies = results.map((m) => {
      return {
        ...m,
        image: imagePath + m.image, // Concatenazione del nome immagine con il percorso completo
      };
    });

    res.json(movies);
  });
}

function show(req, res) {
  //per mostrare i dettagli di un singolo film + recensioni
  const { id } = req.params; //estrae l'id del film dalla richiesta

  // const movieSql = "SELECT * FROM movies WHERE id= ?";

  const movieSql = `
      SELECT M.*, ROUND( AVG(R.vote)) AS average_vote
      FROM movies M
      LEFT JOIN reviews R
      ON R.movie_id = M.id
      WHERE M.id = ?`;

  const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?"; //Cerca le recensioni di QUEL film

  connection.query(movieSql, [id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Errore lato server SHOW function",
      });

    if (results.length === 0)
      return res.status(404).json({
        error: "Movie not found",
      });

    const movie = results[0];

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err)
        return res.status(500).json({
          error: "Errore lato server SHOW function",
        });

      // movie.reviews = reviewsResults;
      // res.json(movie);

      res.json({
        ...movie,
        image: req.imagePath + movie.image,
        average_vote: parseInt(movie.average_vote),
        reviews: reviewsResults
      });
    });
  });
}

function destroy(req, res) {
  // emilina un film dal database
  const { id } = req.params; //prende l'id del film

  const sql = "DELETE FROM movie WHERE id = ?"; //comando sql per cancellare il film

  connection.query(sql, [id], (err) => {
    //esegue l'operazione nel database
    if (err)
      return res.status(500).json({
        error: "Errore lato server DESTROY function",
      });

    res.sendStatus(204);
  });
}

function storeReview(req, res) {
  //recupero l'id
  const { id } = req.params;

  //recupero informazioni dal body
  const { text, name, vote } = req.body;

  //preparo la query
  const sql =
    "INSERT INTO reviews (text , name, vote, movie_id) VALUES (?, ?, ?, ?)";

  // eseguo la query

  connection.query(sql, [text, name, vote, id], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Database Errore StoreReview" });

    res.status(201);
    res.json({ message: "review Added", id: results.insertId });
  });
}

function store(req,res){
  //recuparare le info da req.body
  const { title, director, abstract} = req.body

  const imageName = `${req.file.filename}`

  const sql = "INSERT INTO movies (title, director, image, abstract) VALUES (?,?,?,?)"

  connection.query( sql, [title, director, imageName, abstract], (err, results) => {
      if(err) return res.status(500).json({
          error: 'Database Errore Store'
      })

      res.status(201).json({
          status: "success",
          message: "Film creato con successo",
          id: results.insertId
      }
      )
  })

}

export { index, show, destroy, storeReview, store };

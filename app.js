const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://mongodb:27017/musicdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Definir el modelo de datos para canciones
const Song = mongoose.model('Song', {
  title: String,
  artist: String,
});

app.get('/', async (req, res) => {
  try {
    const songs = await Song.find({});
    res.render('index', { songs });
  } catch (err) {
    console.error(err);
  }
});


app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const { title, artist } = req.body;
  const song = new Song({ title, artist });
  song.save().then(() => {
    console.log('New song created!');
    res.redirect('/'); // Redirige al usuario a la lista de canciones después del guardado exitoso.
  }).catch((error) => {
    console.error('Error creating song:', error);
    res.status(500).send('Error al crear la canción.'); // Devuelve una respuesta de error al usuario.
  });
});

app.listen(port, () => {
  console.log(`Servidor web en ejecución en http://localhost:${port}`);
});


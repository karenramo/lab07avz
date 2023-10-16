const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost:27017/songs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Definir el modelo de datos
const Song = mongoose.model('Song', {
  title: String,
  artist: String,
  image: 
});

// Rutas
app.get('/', (req, res) => {
    Song.find({}, (err, songs) => {
        if (err) {
          console.error(err);
        }
        res.render('index', { songs });
      });
  
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
    const { title, artist } = req.body;
    const song = new Song({ title, artist });
    song.save().then(() => {
      console.log('New song created!');
      res.redirect('/songs'); // Redirige al usuario a la lista de canciones después del guardado exitoso.
    }).catch((error) => {
      console.error('Error creating song:', error);
      res.status(500).send('Error al crear la canción.'); // Devuelve una respuesta de error al usuario.
    });
  });
  
app.get('/songs', (req, res) => {
  Song.find({}, (err, songs) => {
    if (err) {
      console.error(err);
    }
    res.render('songs', { songs });
  });
});

app.listen(port, () => {
  console.log(`Servidor web en ejecución en http://localhost:${port}`);
});

const express = require('express');
const app = express();
const routes = require('./routes');
const db = require('./models');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Gestión de Usuarios y Roles');
});

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar la base de datos:', error);
    });
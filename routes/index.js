const express = require('express');
const router = express.Router();

const rolController = require('../controllers/rolController');
const usuarioController = require('../controllers/usuarioController');

// Rutas Roles
router.post('/roles', rolController.create);
router.get('/roles', rolController.list);

// Rutas Usuarios
router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.list);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.delete);

module.exports = router;
const { Rol } = require('../models');

module.exports = {

    async create(req, res) {
        try {
            const { nombre } = req.body;
            const rol = await Rol.create({ nombre });
            res.status(201).json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    async list(req, res) {
        try {
            const roles = await Rol.findAll();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
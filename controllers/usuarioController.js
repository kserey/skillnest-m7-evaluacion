const { Usuario, Rol, sequelize } = require('../models');

module.exports = {

    async create(req, res) {

        const t = await sequelize.transaction();

        try {
            const { nombre, correo, password, rolId } = req.body;


            const rolExiste = await Rol.findByPk(rolId, { transaction: t });
            if (!rolExiste) {
                throw new Error('El Rol especificado no existe');
            }

            const usuario = await Usuario.create(
                { nombre, correo, password, rolId },
                { transaction: t }
            );

            await t.commit();
            
            res.status(201).json(usuario);

        } catch (error) {

            await t.rollback();
            res.status(400).json({ error: error.message });
        }
    },


    async list(req, res) {
        try {
            const usuarios = await Usuario.findAll({
                include: [{ 
                    model: Rol,
                    as: 'rol',
                    attributes: ['nombre'] 
                }]
            });
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, correo } = req.body;
            
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            await usuario.update({ nombre, correo });
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await Usuario.destroy({
                where: { id: id }
            });

            if (eliminado) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
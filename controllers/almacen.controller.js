//controlador almacen

const { response } = require('express');
const Almacen = require('../models/almacen.model');

const getAlmacen = async(req, res = response) => {

    const almacenes = await Almacen.find()
        .populate('usuario', 'nombre')
        .populate('bodega', 'nombre')


    res.json({
        ok: true,
        almacenes: almacenes
    })
}
const crearAlmacen = async(req, res = response) => {

    //console.log(req.body);
    const { direccion, nombre } = req.body;

    try {

        const existeDireccion = await Almacen.findOne({ email });
        if (existeDireccion) {
            return res.status(400).json({
                ok: false,
                msg: 'La direccion ya ha sido registrada'
            });
        }

        //creamos un objeto de la clase model Almacen
        const almacen = new Almacen(req.body);

        //indicamos a mongoose que registre al nuevo Almacen en la bd
        await almacen.save();


        res.json({
            ok: true,
            almacen
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarAlmacen = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const almacen = await Proveedor.findById(id);

        if (!almacen) {
            return res.status(404).json({
                ok: true,
                msg: 'Almacen no encontrado por id',
            });
        }

        const cambiosAlmacen = {
            ...req.body,
            usuario: uid
        }

        const almacenActualizado = await Almacen.findByIdAndUpdate(id, cambiosAlmacen, { new: true });


        res.json({
            ok: true,
            almacen: almacenActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar datos del almacen, consulte con el administrador'
        })
    }

}
const eliminarAlmacen = async(req, res = response) => {

    const id = req.params.id;

    try {

        const almacen = await Proveedor.findById(id);

        if (!almacen) {
            return res.status(404).json({
                ok: true,
                msg: 'Almacen no encontrado por id',
            });
        }

        await Almacen.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Almacen borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'El Almacen no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getAlmacen,
    crearAlmacen,
    actualizarAlmacen,
    eliminarAlmacen

}
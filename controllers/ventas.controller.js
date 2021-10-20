//controlador ventas

const { response } = require('express');

const Ventas = require('../models/venta.model')

const getVentas = async(req, res = response) => {

    const ventas = await Ventas.find()
        .populate('usuario', 'nombre')
        .populate('producto', 'nombre')

    res.json({
        ok: true,
        ventas
    })
}
const crearVentas = async(req, res = response) => {

    const uid = req.uid;
    const ventas = new Ventas({
        usuario: uid,
        ...req.body
    });

    try {

        const ventasDB = await ventas.save();

        res.json({
            ok: true,
            ventas: ventasDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar la venta, consulte con el administrador'
        })
    }

}
const actualizarVentas = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const ventas = await Ventas.findById(id);

        if (!ventas) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta no encontrada mediante su id',
            });
        }

        const cambiosVentas = {
            ...req.body,
            usuario: uid
        }

        const ventasActualizado = await Ventas.findByIdAndUpdate(id, cambiosVentas, { new: true });


        res.json({
            ok: true,
            factura: ventasActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar la venta, consulte con el administrador'
        })
    }

}
const eliminarVentas = async(req, res = response) => {

    const id = req.params.id;

    try {

        const ventas = await Ventas.findById(id);

        if (!ventas) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta no encontrada mediante su id asignada',
            });
        }

        await Ventas.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'La venta fue eliminada correctamente de la BD'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar la venta consulte con el administrador'
        })
    }
}


module.exports = {
    getVentas,
    crearVentas,
    actualizarVentas,
    eliminarVentas

}
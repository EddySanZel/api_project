//controlador bodega

const { response } = require('express');

const Bodega = require('../models/bodega.model');
const getBodega = async(req, res = response) => {

    const bodegas = await Bodega.find()

    res.json({
        ok: true,
        bodegas: bodegas
    })
}
const crearBodega = async(req, res = response) => {

    const uid = req.uid;
    const bodega = new Bodega({
        usuario: uid,
        ...req.body
    });


    try {

        const bodegaDB = await bodega.save();


        res.json({
            ok: true,
            bodega: bodegaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear esta bodega, consulte con su administrador'
        })
    }


}
const actualizarBodega = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const bodega = await Bodega.findById(id);

        if (!bodega) {
            return res.status(404).json({
                ok: true,
                msg: 'Bodega no encontrada segun el id',
            });
        }

        const cambiosBodega = {
            ...req.body,
            usuario: uid
        }

        const bodegaActualizado = await Bodega.findByIdAndUpdate(id, cambiosBodega, { new: true });


        res.json({
            ok: true,
            ciudad: bodegaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar información de la bodega, consulte con su administrador'
        })
    }

}
const eliminarBodega = async(req, res = response) => {

    const id = req.params.id;

    try {

        const bodega = await Bodega.findById(id);

        if (!bodega) {
            return res.status(404).json({
                ok: true,
                msg: 'Bodega no encontrada por el id consultado',
            });
        }

        await Bodega.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Bodega borrada de la BD'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Esta bodega no puede eliminarse, consulte con su administrador'
        })
    }

}
module.exports = {
    getBodega,
    crearBodega,
    actualizarBodega,
    eliminarBodega

}
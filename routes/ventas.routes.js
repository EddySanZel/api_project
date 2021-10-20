/*
path: /api/ventas/ 
*/


const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getVentas,
    crearVentas,
    eliminarVentas,
    actualizarVentas
} = require('../controllers/ventas.controller');


const router = Router();

router.get('/', validarJWT, getVentas);

router.post('/', [
        validarJWT,
        check('tipoventas', 'El tipo de venta es obligatoria').not().isEmpty(),
        check('cantidadventas', 'La cantidad de la venta es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    crearVentas);
router.put('/:id', [
        validarJWT,
        check('tipoventas', 'El tipo de venta es obligatoria').not().isEmpty(),
        check('cantidadventas', 'La cantidad de la venta es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    actualizarVentas);
router.delete('/:id', validarJWT, eliminarVentas);

module.exports = router;
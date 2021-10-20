/*
    ciudad
    ruta: '/api/bodega/'
*/

const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getBodega,
    crearBodega,
    actualizarBodega,
    eliminarBodega

} = require('../controllers/bodega.controller');

const router = Router();

router.get('/', validarJWT, getBodega)
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        check('direccion', 'La dirección es obligatoria').not().isEmpty(),
        check('ciudad', 'La ciudad es necesaria para el registro').not().isEmpty(),
        validarCampos
    ],
    crearBodega
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        check('direccion', 'La dirección es obligatoria').not().isEmpty(),
        check('ciudad', 'La ciudad es necesaria').not().isEmpty(),
        validarCampos
    ],
    actualizarBodega
);
router.delete('/:id', validarJWT, eliminarBodega);
module.exports = router;
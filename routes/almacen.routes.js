/*
    Path: /api/almacen/
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getAlmacen,
    crearAlmacen,
    actualizarAlmacen,
    eliminarAlmacen

} = require('../controllers/almacen.controller');

const router = Router();

router.get('/', validarJWT, getAlmacen);
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('ciudad', 'La ciudad es obligatoria').isEmail(),
        validarCampos,
    ],
    crearAlmacen
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('ciudad', 'La ciudad es obligatoria').isEmail(),
        validarCampos,
    ],
    actualizarAlmacen
);
router.delete('/:id', validarJWT, eliminarAlmacen);

module.exports = router;
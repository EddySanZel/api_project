/*
    Clientes
    ruta: '/api/clientes/'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getClientes,
    crearClientes,
    actualizarClientes,
    eliminarCliente

} = require('../controllers/clientes.controller')

const router = Router();

router.get('/', validarJWT, getClientes);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del cliente es necesario').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('producto', 'El id del producto debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearClientes
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del cliente es necesario').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    actualizarClientes);

router.delete('/:id', validarJWT, eliminarCliente);


module.exports = router;
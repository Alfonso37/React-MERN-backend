/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
        '/new', 
        [ // middlewares
            check('name','El nombre esobligatorio').not().isEmpty(),
            check('email','El email esobligatorio').isEmail(),
            check('password','El password debe de ser de 6 caracteres').isLength({ min: 6 }),
            validarCampos
        ], 
        crearUsuario );

router.post(
    '/', 
    [
        check('email','El email esobligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario );


router.get('/renew', validarJWT, revalidarToken );


module.exports = router;
/*
    Rutas:
    /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

// Todas tienen que pasar por validación del JWT
// Todas las rutas que estén bajo la validación del Jason Web Tokens están protegidas
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos );


//Crear un nuevo evento
router.post('/', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
     crearEvento);


//Actualizar  evento
 router.put('/:id', actualizarEvento);


//Borrar  evento
router.delete('/:id', eliminarEvento);


module.exports = router;
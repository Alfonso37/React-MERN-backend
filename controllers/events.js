const {response} = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res = response ) => {

    const eventos = await Evento.find()
                            .populate('user','name');

    res.status(201).json(
    {
        ok: true,
        eventos
    })

}

const crearEvento = async(req, res = response ) => {

    const evento = new Evento( req.body );

    try {
        
        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    res.status(201).json(
        {
            ok: true,
            msg: 'creando un evento'
        }
    )

}


const actualizarEvento = async(req, res = response ) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById( eventoId )

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = { ...req.body, user: req.uid }

        // El último parámetro me va a retornar los datos nuevos
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}


const eliminarEvento = async (req, res = response ) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById( eventoId )

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            })
        }

        // El último parámetro me va a retornar los datos nuevos
        const eventoEliminado = await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getEventos, 
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
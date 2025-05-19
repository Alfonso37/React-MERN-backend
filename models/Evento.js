const { Schema, model, models } = require('mongoose');

const EventoSchema = Schema({
    
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})


// Con esta función estoy renombrando _id por id y quitando el campo __v
// pero esto solo es en mi esquema mas no en la base de datos
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Evento', EventoSchema);

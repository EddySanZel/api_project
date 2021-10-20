const { Schema, model } = require('mongoose');

const BodegaSchema = Schema({
    Nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },

}, { collection: 'bodegas' });
BodegaSchema.method('toJSON', function() {
        const { __v, ...object } = this.toObject();
        return object;
    })
    //Se ha creado el schema, ahora necesitamos implementar el modelo
module.exports = model('Bodega', BodegaSchema);
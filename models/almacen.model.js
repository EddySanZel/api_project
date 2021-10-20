const { Schema, model, SchemaTypes } = require('mongoose');

//Definicion del esquema para la coleccion de ALMACEN

const AlmacenSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false

    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    bodega: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Bodega'
    }
}, { collection: 'almacenes' });
//Configuracion opcional para cambiar el _id por uid
//Este cambio es solo para fines visuales, la bd permanece con _id
AlmacenSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo.
//Por defecto moongose creara en mongodb un documento en plural: usuarios
module.exports = model('Almacen', AlmacenSchema);
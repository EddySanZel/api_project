const { Schema, model, SchemaTypes } = require('mongoose');

// Definicion del esquema para la coleccion de Productos

const ProductoSchema = Schema({
        nombre: {
            type: String,
            required: true
        },
        precio: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        usuario: {
            require: true,
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        ventas: {
            type: Schema.Types.ObjectId,
            ref: 'Ventas',
            required: true
        }


    }, { collection: 'productos' })
    //se utiliza collection para indicar el nombre como queremos que se cree 
    //la coleccion en la base de datos

//Este cambio es solo para fines visuales, la bd permanece con _id
ProductoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo.
//Por defecto moongose creara en mongodb un documento en plural: usuarios
module.exports = model('Producto', ProductoSchema);
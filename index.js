const express = require('express'); //sintaxis de importacion en nodejs
require('dotenv').config();
const { dbConection } = require('./config/database')
const cors = require('cors');


//Crear el servidor express
const app = express();

//Configurar CORS

app.use(cors());

app.use(express.json());

// Estableciendo conexion a la BD
dbConection();
//console.log(process.env);

//Rutas de la API Proyectos
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
//app.use('/api/investigadores', require('./routes/investigadores.routes'));

app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/almacen', require('./routes/almacen.routes'));
app.use('/api/bodega', require('./routes/bodega.routes'))

//Codigo para desplegar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor desplegado en el puerto: ' + process.env.PORT)
})
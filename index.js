const express = require('express');
const app = express();
//configuración del servidor
app.set('port', process.env.PORT || 3000)
// Middlewares funciones que se ejecutan antes de que lleguen a las fucnionalidades delas rutas
app.use(express.json());

//rutas--> enpoints
app.use(require('./rutas/usuarios'));
app.use(require('./rutas/productos'));
app.use(require('./rutas/pedidos'));
//iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});



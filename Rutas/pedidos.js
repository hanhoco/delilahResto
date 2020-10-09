const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretkey = 'hanhoco';
const mysqlConnection = require('../basedatos.js');

//get
router.get('/pedidos', verificarToken, (req, res) =>{
    console.log("estoy aqui");
    jwt.verify(req.token, secretkey, (err, authData) => {
        console.log(authData);

        if(authData.user.rol==="cliente"){

            const query = "SELECT * FROM Pedidos_has_Productos, Pedidos, delilahResto.Productos, Usuarios where Pedidos_has_Productos.Pedidos_idpedidos=Pedidos.idpedidos and Pedidos_has_Productos.Productos_idProductos=Productos.idProductos and Pedidos.Usuarios_idusuarios=Usuarios.idusuarios and Usuarios.email='"+authData.user.email+"'"
            
            mysqlConnection.query(query, (err, rows, fields) =>{
                if(!err) {
                    res.json(rows);
                }else{
                    console.log(err);
                }
            });
        }else{
            const queryadmin = "SELECT * FROM Pedidos_has_Productos, Pedidos, delilahResto.Productos, Usuarios where Pedidos_has_Productos.Pedidos_idpedidos=Pedidos.idpedidos and Pedidos_has_Productos.Productos_idProductos=Productos.idProductos and Pedidos.Usuarios_idusuarios=Usuarios.idusuarios"

            mysqlConnection.query(queryadmin, (err, rows, fields) =>{
                if(!err) {
                    res.json(rows);
                }else{
                    console.log(err);
                }
            });
        }
    });
});

// post

router.post('/pedidos/', verificarToken, async(req, res) =>{
    try{
        jwt.verify(req.token, secretkey, (err, authData) => {
            const {fechaHora, estadoOrden, tipoPago,valorTotal, Usuarios_idusuarios, Productos_idProductos}=req.body;
            const query = "INSERT INTO Pedidos (fechaHora, estadoOrden, tipoPago, valorTotal,Usuarios_idusuarios)" +` VALUES ('${fechaHora}', '${estadoOrden}', '${tipoPago}', ${valorTotal},${Usuarios_idusuarios})`;

            mysqlConnection.query(query, (err, res) =>{
            if(!err) {
                let idPedido = res.insertId;
                console.log("exitoso inserción pedidos", idPedido);

                Productos_idProductos.forEach(productos => {
                    const query3 = "INSERT INTO Pedidos_has_Productos (Pedidos_idpedidos, Productos_idProductos)" +` VALUES (${idPedido}, ${productos})`;
                    mysqlConnection.query(query3, (err, rows, fields) =>{
                        if(!err) {
                            console.log("exitoso");
                        }else{
                            console.log(err);
                        }
                    });
                });
            }else{
                console.log(err);
            }
            });
        });
    }catch(error){
        console.log(error);
        res.status(400);
        res.json({
            message: "No se puede crear pedido"
        });
    }

});


//modificar 

router.put('/pedidos/:idpedidos', verificarToken, async(req, res) =>{
    try{
        jwt.verify(req.token, secretkey, (err, authData) => {
            if(authData.user.rol==="admin"){
                
                const {idpedidos, fechaHora, estadoOrden, tipoPago,valorTotal, Usuarios_idusuarios}=req.body;
                
                const id=req.params.idpedidos;
                
                const query = "UPDATE Pedidos SET idpedidos = ?, fechaHora = ?, estadoOrden = ?, tipoPago = ?, valortTotal = ?,Usuarios_idusuarios = ? WHERE idpedidos = ?";

                mysqlConnection.query(query, [parseint(idpedidos), fechaHora, estadoOrden, tipoPago, parseint(valorTotal), parseInt(Usuarios_idusuarios)], (err, res) =>{
                    if(!err) {
                        console.log("exitoso");
                    }else{
                        console.log(err);
                    }
                });
            }
        });
    }catch(error){
        console.log(error);
        res.status(400);
        res.json({
            message: "No se puede crear pedido"
        });
    }

});

//borrar un producto de un Pedido
router.delete('/pedidos/', verificarToken , async(req, res) =>{
    try{
        jwt.verify(req.token, secretkey, (err, authData) => {
            console.log(authData);
            if(authData.user.rol==="admin"){
                const {pedidos_idpedidos, productos_idproductos}=req.body
                mysqlConnection.query("DELETE FROM Pedidos_has_Productos WHERE pedidos_idpedidos ='"+pedidos_idpedidos+"'and productos_idproductos='"+productos_idproductos+"'", (err, res) =>{
                    if(!err) {                
                        console.log("producto borrado exitosamente");
                    }else{
                        console.log(err);
                    }
                });
            }else{
                console.log("no tienes permisos para borrar pedido")
            }
        });
    }catch(error){
        console.log(error);
        res.status(400);
        res.json({
            message: "No se puede eliminar pedido"
        });
    }

});





//verificarToken
function verificarToken(req, res, next){
    //Get auth header value
    const bearerHeader=req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        req.token = bearerHeader;
        next();
    }else{
        //Forbidden
        res.sendStatus(403);
    }
}

module.exports = router;
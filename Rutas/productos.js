const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); //jwt
const secretkey = 'hanhoco';
const mysqlConnection = require('../basedatos.js');


//get
router.get('/productos', (req, res) =>{
    mysqlConnection.query('SELECT * FROM productos', (err, rows, fields) =>{
        if(!err) {
            res.json(rows);
        }else{
            console.log(err);
        }
    });

});

// post - crear producto

router.post('/productos/', verificarToken, async(req, res) =>{
    try{
        jwt.verify(req.token, secretkey, (err, authData) => {
            console.log(authData);
            if(authData.user.rol==="admin"){
                const {idproductos, nombrePlato, precio, descripcion}=req.body;
                const query = "INSERT INTO productos (idproductos, nombrePlato, precio, descripcion)" +
                ` VALUES (${idproductos}, '${nombrePlato}', ${precio}, '${descripcion}')`;
                mysqlConnection.query(query, (err, rows, fields) =>{
                    if(!err) {
                        console.log("exitoso");
                    }else{
                        console.log(err);
                    }
                });
            }else{
                console.log("no tienes permisos para crear producto")
            }
        });
    }catch(error){
        console.log(error);
        res.status(400);
        res.json({
            message: "No se puede crear producto"
        });
    }
});

//modificar producto
router.put('/productos/:idproductos', verificarToken , async(req, res) =>{
    try{
        jwt.verify(req.token, secretkey, (err, authData) => {
            console.log(authData);
            if(authData.user.rol==="admin"){
                const {nombrePlato, precio, descripcion}=req.body;
                const id=req.params.idproductos;
                console.log(nombrePlato, precio, descripcion,id)
                //validar campos req.body y definir if
                //
                const query = "UPDATE productos SET nombrePlato = ?, precio = ?, descripcion = ? WHERE idproductos = ?";
                mysqlConnection.query(query, [nombrePlato, parseInt(precio), descripcion, parseInt(id)], (err, res) =>{
                    if(!err) {                
                        console.log("exitoso");
                    }else{
                        console.log(err);
                    }
                });
            }else{
                console.log("no tienes permisos para modificar producto")
            }
        });
    }catch(error){
        console.log(error);
        res.status(400);
        res.json({
            message: "No se puede modificar producto"
        });
    }

});


/* 
//eliminar
router.delete('/productos/:idproductos', verificarToken , async(req, res) =>{
    try{
        jwt.verify(req.token, secretkey, (err, authData) => {
            console.log(authData);
            if(authData.user.rol==="admin"){
                const {nombrePlato, precio, descripcion}=req.body;
                const id=req.params.idproductos;
                mysqlConnection.query("DELETE FROM productos WHERE idproductos ='"+id+"'", (err, res) =>{
                    if(!err) {                
                        console.log("borrado exitoso");
                    }else{
                        console.log(err);
                    }
                });
            }else{
                console.log("no tienes permisos para borrar producto")
            }
        });
    }catch(error){
        console.log(error);
        res.status(400);
        res.json({
            message: "No se puede eliminar producto"
        });
    }

}); */

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

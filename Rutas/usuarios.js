const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretkey = 'hanhoco';

const mysqlConnection = require('../basedatos.js');

//get
router.get('/usuarios', verificarToken, (req, res) =>{
    jwt.verify(req.token, secretkey, (err, authData) => {
        if (err) {
            console.log(err)
            res.sendStatus(403);
        } else {
            console.log(authData);
            if(authData.user.rol==="cliente"){
                console.log('ENTRE')
                mysqlConnection.query("SELECT * FROM Usuarios where email='"+authData.user.email+"'", (err, rows) =>{
                    if(!err) {
                        res.json(rows);
                    }else{
                        res.json({ error: err});
                    }
                });

            }else{
                mysqlConnection.query('SELECT * FROM usuarios', (err, rows) =>{
                    if(!err) {
                        res.json(rows);
                    }else{
                        res.json({ error: err});
                    }
                });

            }
        }
    });
});

// post - crear
router.post('/usuarios', async(req, res) =>{
    try{
        const {idusuarios, nombreApellido, email, telefono, direccion, contraseña, rol, usuario, numeroDocumento}=req.body;
        const query = "INSERT INTO Usuarios (idusuarios, nombreApellido, email, telefono, direccion, contraseña, rol, usuario, numeroDocumento)" +
        ` VALUES (${idusuarios}, '${nombreApellido}', '${email}', ${telefono}, '${direccion}', '${contraseña}', '${rol}', '${usuario}', ${numeroDocumento})`;
        mysqlConnection.query(query, (err, rows, fields) =>{
            if(!err) {
                console.log("exitoso");
            }else{
                console.log(err);
            }
        });

    }catch(error){
        console.log(error);
        res.status(400);
        res.json({
            message: "No se puede crear usuario"
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


//login
router.post('/login',(req, res)=>{
    // Mock user
    //const {email, contrasena}=req.body
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    const query ="SELECT * FROM Usuarios WHERE email='"+email+"' and contraseña='"+contrasena+"'";
    mysqlConnection.query(query, (err, rows, fields) =>{
        if(!err) {
            console.log("consulta exitoso", rows.length);
            if (rows.length !== 0) {
                const user = {
                    email: email,
                    rol: rows[0].rol
                }
                jwt.sign({user:user}, secretkey, (err, token) => {
                    console.log('TOken', token)
                    res.json({
                        token:token
                    });
                });
            }
            else {
                res.json({
                    error: 'Wrong login data'
                })
            }
        }else{
            console.log(err);
        }
    });
});


//modificar 
router.put('/usuarios/:idusuarios', async(req, res) =>{
    try{
        const {nombreApellido, email, telefono, direccion, contraseña, rol, usuario, numeroDocumento}=req.body;
        const id=req.params.idusuarios;
        //validar campos req.body y definir if
        //
        const query = "UPDATE Usuarios SET nombreApellido = ?, email = ?, telefono = ?, direccion = ?, contraseña = ?, rol = ?, usuario = ?, numeroDocumento = ? WHERE idusuarios = ?";
        mysqlConnection.query(query, [nombreApellido, email, telefono, direccion, contraseña, rol, parseInt(id), usuario, numeroDocumento], (err, res) =>{
            if(!err) {
                console.log("exitoso");
            }else{
                console.log(err);
            }
        });

    }catch(error){
        console.log(error);
        res.status(400);
        res.json({
            message: "No se puede crear modifica usuario"
        });
    }

});

module.exports = router;

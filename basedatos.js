const mysql=require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6789370922',
    database: 'delilahResto'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return; 
    } else {
        console.log('Base de datos conectada');
    }

});

module.exports = mysqlConnection;
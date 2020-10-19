CONFIGURACIÓN DEL SERVIDOR

Instalar express and mysql
                               npm install express mysql

INSTRUCCIONES Y ARCHIVOS PARA PODER TENER LA ESTRUCTURA BASE DE LA BASE DE DATOS 
1. Correr el script delilahResto.sql para la creación de la base de datos.
2. Revisar archivo basedatos.js donde encontrará información necesaria para realizar la conexión a la base de datos.

CÓMO INICIAR EL SERVIDOR 
Para iniciar la aplicación se debe navegar con la terminal hasta el directorio en el que se encuentra el proyecto y ejecutar el siguiente comando:

node index.js

después de ejecutarlo el servidor estará corriendo en http://localhost:3000/

/////////////// Colección Postman Disponible /////////////
           delilahResto.postman_collection.json
/////////////////////////////////////////////////////////


END POINTS

I.	Pedidos.js

### Requiere toquen
•	[Get] localhost:3000/pedidos
Resumen: Muestra todos los pedidos realizados por los usuarios
parámetros: NA

•	[Post] localhost:3000/pedidos
Resumen: Crea pedidos
Parámetros: fechaHora, estadoOrden, tipoPago, valorTotal, Usuarios_idusuarios, Productos_idProductos
Ejemplo: 
{
   "fechaHora":"2020-10-08 22:00:00",
   "estadoOrden":"nuevo", 
   "tipoPago":"credito",
   "valorTotal":"50000",
   "Usuarios_idusuarios": "7",
   "Productos_idProductos":[1,2]
}

•	[Put] localhost:3000/pedidos/:idpedidos
Resumen: Actualiza pedido
Parámetros: fechaHora, estadoOrden, tipoPago, valorTotal, Usuarios_idusuarios, Productos_idProductos


•	[Put] localhost:3000/pedidos/estado/:idpedidos
Resumen: Actualiza estado de pedido
Parámetros:Token, estadoOrden, idpedidos
Ejemplo: 
{
    "estadoOrden":"en Preparacion"
}


•	[Delete] localhost:3000/pedidos/
Resumen: elimina un producto de un pedido
Parámetros: pedidos_idpedidos, productos_idproductos
Ejemplo: 
{
   "pedidos_idpedidos":"26", 
   "productos_idproductos":"2"
}


II.	Productos.js

### No Requiere toquen
•	[Get] localhost:3000/productos
Resumen: Muestra todos los productos de la carta
parámetros: NA

### Requiere toquen
•	[Post] localhost:3000/productos
Resumen: Crea productos
Parámetros: idproductos, nombrePlato, precio, descripcion
Ejemplo: 
{
    "idproductos":"2",
    "nombrePlato":"pasta",
    "precio":"10000",
    "descripcion":"bolonesa con mucha salsa y adicion de verduras"
}


•	[Put] localhost:3000/productos/idproductos
Resumen: actualiza un producto existente
parámetros: idproductos, nombrePlato, precio, descripcion

Ejemplo: 
{
    "idproductos":"2",
    "nombrePlato":"pasta",
    "precio":"10000",
    "descripcion":"bolonesa con mucha salsa y adicion de verduras"
}


III.	Usuarios.js

### Requiere toquen
•	[Get] localhost:3000/usuarios
Resumen: Muestra datos de usuario
parámetros: NA

•	[Post] localhost:3000/usuarios
Resumen: Crea usuarios
parámetros: 
Ejemplo: 
{
    "idusuarios":"9", 
    "nombreApellido":"carden hooker bryan", 
    "email":"chooker@gmail.com", 
    "telefono":"51259", 
    "direccion":"cabanas altamar", 
    "contraseña":"15241", 
    "rol":"cliente", 
    "usuario":"chooker", 
    "numeroDocumento":"15241402"
}

•	[Put] localhost:3000/idusuarios
Resumen: actualiza un usuario existente
parámetros: nombreApellido, email, telefono, direccion, contraseña, rol, usuario, numeroDocumento
Ejemplo: 
{
    "nombreApellido":"carden hooker bryan", 
    "email":"chooker@gmail.com", 
    "telefono":"51259", 
    "direccion":"cabanas altamar", 
    "contraseña":"15241", 
    "rol":"cliente", 
    "usuario":"chooker", 
    "numeroDocumento":"15241402"
}

•	[Post] localhost:3000/login 
Resumen: generador de tokens de usuarios
parámetros: email, contraseña
Ejemplo: 
{
    "email": "hanhoco@gmail.com",
    "contrasena": "12345"
}






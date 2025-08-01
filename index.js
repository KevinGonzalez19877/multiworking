const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const app = express();
 let conexion = mysql.createConnection({
    host: "sql207.byethost12.com",
    user:   "b12_39602109",
    password: "cenicient9",
    database: "b12_39602109_miapp"
});
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de almacenamiento para guardar en imagenes/usuario
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "imagenes/usuarios/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.get("/", function (req, res) {
    res.render("registro");
});

app.post("/validar", upload.single("fotodeperfil"), function (req, res) {
    const datos = req.body;
    const archivo = req.file;
    console.log(datos);
    console.log(archivo);



    let nombres = datos.nombres;
    let apellidos = datos.apellidos;
    let edad = datos.edad;
    let telefono = datos.telefono;
    let ubicacion = datos.ubicacion;
    let sexo = datos.sexo;
    let fotodeperfil = archivo ?"imagenes/usuarios"+ archivo.filename : null; // Verifica si se subió una foto de perfil
    let correo = datos.correo;
    let contrasena = datos.contrasena;
   


    let verificarquenohayacorreoexistente= "SELECT * FROM usuarios WHERE correo = '"+correo+"'";
    conexion.query(verificarquenohayacorreoexistente, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.length > 0) {
            // Si ya existe un usuario con ese correo, redirige a la página de registro
            res.render("registro", { mensaje: "El correo ya está registrado." });
        } else {
           let registrar = "INSERT INTO usuarios (nombres, apellidos, edad, telefono, ubicacion, sexo, fotodeperfil, correo, contrasena) VALUES ('"+nombres+"','"+apellidos+"','"+edad+"','"+telefono+"','"+ubicacion+"','"+sexo+"','"+fotodeperfil+"','"+correo+"','"+contrasena+"')";
conexion.query(registrar,function(error){
if (error) {
    throw error;
}else{

}
});

        }
    });


});

app.listen(3600, function () {
    console.log("Server is running on port 3600");
});

const fs = require('fs');

//primero leemos el archivo.txt
function leer(ruta, cb){
    fs.readFile(ruta, (err, data)=>{
        cb(console.log(data.toString()));
    })
}

leer(`${__dirname}/archivo.txt`, console.log()); //Sintaxis ES6

//Segundo escribimos el archivo1.txt creandolo
function escribir(ruta, contenido, cb){
    fs.writeFile(ruta, contenido, function(err){
        if (err){
            console.log("No se ha podido escribir", err);
        }else{
            console.log("Se ha escrito correctamente");
        }
    })
}
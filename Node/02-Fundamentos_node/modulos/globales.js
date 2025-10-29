//this === global = true

//mostrar algo en consola:
// console.log();

//mostrar error en consola:
// console.error();

//ejecutar codigo despues de un intervalo de tiempo
// setTimeout(()=>{});

//ejecutar un codigo cada intervalo de tiempo:
// setInterval(()=>{});

//da prioridad de ejecucion a una funcion asincrona:
//setImmediate(()=>{})

// console.log(setInterval)

let i = 0;

let intervalo = setInterval(()=>{
    console.log("Hola");
    if ( i === 3 ){
        clearInterval(intervalo);   //detenemos la funcion
    }
    i++;

}, 1000);

setImmediate(()=>{
    console.log("Saludo inmediato");
    
})

//require();

console.log(__filename);

global.miVariable = "variable global"
console.log(miVariable);

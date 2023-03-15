
//constantes y funciones para dar comienzo a la cotizacion pidiendo datos por Prompt mediante click en button "cotizar"
const cotiza = document.getElementById('cotiza');

cotiza.addEventListener('click', cotizar);

function calcularPrecioPeso(productos) {
    for(i=0;i<productos.length;i++) {
        if(productos[i].peso <= 5){
            productos[i].precioPeso = 0;
        } else if (productos[i].peso > 5 && productos[i].peso <= 10){
            productos[i].precioPeso = 100;
        } else {
            productos[i].precioPeso = 200;
        }
    }
}

function calcularPrecioDimension(productos) {
    for(i=0;i<productos.length;i++) {
        switch(productos[i].dimension) {
            case "chico":
                productos[i].precioDimension = 0;
                break;
            case "mediano":
                productos[i].precioDimension = 100;
                break;
            case "grande":
                productos[i].precioDimension = 200;
                break;
            default:
                productos[i].precioDimension = 0;
                break;
        }
    };
}

function calcularPrecioZona(productos) {
    for(i=0;i<productos.length;i++) {
        switch(productos[i].destino) {
            case "zona1":
                productos[i].precioZona = 0;
                break;
            case "zona2":
                productos[i].precioZona = 250;
                break;
            case "zona3":
                productos[i].precioZona = 450;
                break;
            default:
                productos[i].precioZona = 0;
                break;
        }
    };
}

//funcion para realizar la simulacion 
function cotizar() {
    //declaracion de variables para la simulacion
    let productos = [];
    let cantidad = Number(prompt("Cuántos paquetes desea enviar? (minimo 2 paquetes)"));
    while(isNaN(cantidad) || cantidad < 2) {
        if (isNaN(cantidad)) {
            cantidad = prompt("El valor ingresado no es un número. Ingrese cantidad de pedidos.")
        } else  if (cantidad < 2) {
            cantidad = prompt("El mínimo es de 2 envios. Ingrese cantidad de pedidos.")
        }
    }
    cantidadPaquetes = cantidad;

    //bucles para ingresar por prompt envios a cotizar 
    do {
        let obj = {};
        let nombre1 = prompt("Ingresá nombre de producto " + (productos.length + 1).toString());
        obj.nombre = nombre1;
        
        let dimension1 = prompt("Ingresá tamaño de paquete entre: chico (15x15), mediano (30x30) o grande (50x50)");
        while(dimension1 != "chico" && dimension1 != "mediano" && dimension1 != "grande"){
            dimension1 = prompt("Ingresaste un valor incorrecto. Ingresa tamaño de paquete entre: 'chico', 'mediano' o 'grande'.");
        }
        obj.dimension = dimension1;
        
        let peso1 = prompt("Ingresá peso aproximado, peso maximo: 20kg por paquete.");

        while(isNaN(peso1) || peso1 > 20) {
            if (isNaN(peso1)) {
                peso1 = prompt("El valor ingresado no es un número. Ingrese peso del paquete.")
            } else  if (peso1 > 20) {
                peso1 = prompt("El peso máximo es de 20kg. Ingrese peso del paquete.")
            }
        }

        let destino1 = prompt("Ingresá destino de envio: zona1, zona2 o zona3");
        while(destino1 != "zona1" && destino1 != "zona2" && destino1 != "zona3")
        destino1 = prompt("Ingresaste una zona incorrecta. Ingresá un valor entre: 'zona1', 'zona2' o 'zona3'")

        obj.peso = peso1;
        obj.destino = destino1;
        obj.precioBase = 500,
        obj.precioDimension=0,
        obj.precioZona=0,
        obj.precioTotal=0;

        productos.push(obj)
    } while (productos.length != cantidadPaquetes);

    calcularPrecioPeso(productos);
    calcularPrecioDimension(productos);
    calcularPrecioZona(productos);

    //bucle for para sumar el total de cada producto
    for(i=0;i<productos.length;i++){
        productos[i].precioTotal = productos[i].precioBase + productos[i].precioDimension + productos[i].precioZona + productos[i].precioPeso;
    };
    console.log(productos);


    //bucle for para sumar todos los precios de los productos y hacer un precio final
    let precioFinal = 0;
    for(i=0;i<productos.length;i++){
        precioFinal = precioFinal + productos[i].precioTotal;
    };

    console.log("El precio final por todos sus envios es de " + "$" + precioFinal);

    alert("El precio final por todos sus envios es de " + "$" + precioFinal + ". Para mas información leer la consola.")
}

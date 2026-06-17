//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito)
{
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

//--- Funcion que actualiza el contador de productos en el carrito ---//
function actualizarContadorCarrito()
{
    let carrito = obtenerCarrito();

    document.getElementById("cantidad-carrito").textContent = carrito.length;
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let producto = elementoClickeado.parentElement;

    let nombre = producto.querySelector(".nombre-producto").textContent;
    let precio = producto.querySelector(".precio-producto").textContent;
    

    let carrito = obtenerCarrito();

    let productoExistente = carrito.find(item => item.nombre === nombre);

    console.log(carrito);
    console.log(productoExistente);

    if (productoExistente)
    {
        productoExistente.cantidad++;
    }
    else
    {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);

    
    alert(`Un/una: ${nombre} fue agregado al carrito`);
}


function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let producto = elementoClickeado.parentElement;

    let nombre = producto.querySelector(".nombre-producto").textContent;

    let carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("No hay ningún producto guardado en el carrito");
        return;
    }

    let index = carrito.findIndex(item => item.nombre === nombre);

    if (index === -1) {
        alert(`No hay más ${nombre} en el carrito`);
        return;
    }

    carrito[index].cantidad--;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1); // Se elimina del array por completo
        guardarCarrito(carrito);
        alert(`Se eliminó por completo ${nombre} del carrito`); // Muestra que se borró
    } else {
        guardarCarrito(carrito);
        alert(`Un/una: ${nombre} fue eliminado del carrito`); // REQUISITO 2i (alert de decremento)
    }
}

//--- Funcion para ordenar productos de mayor a menor precio ---//
function ordenarMayorAMenor(e)
{
    let seccion = e.target.closest("section");

    let listado = seccion.querySelector("ul");

    let productos = Array.from(listado.children);

    productos.sort((a, b) =>
    {
        let precioA = parseInt(
            a.querySelector(".precio-producto").textContent.replace("$", "")
        );

        let precioB = parseInt(
            b.querySelector(".precio-producto").textContent.replace("$", "")
        );

        return precioB - precioA;
    });

    productos.forEach(producto =>
    {
        listado.appendChild(producto);
    });
}

function ordenarMenorAMayor(e)
{
    let seccion = e.target.closest("section");

    let listado = seccion.querySelector("ul");

    let productos = Array.from(listado.children);

    productos.sort((a, b) =>
    {
        let precioA = parseInt(
            a.querySelector(".precio-producto").textContent.replace("$", "")
        );

        let precioB = parseInt(
            b.querySelector(".precio-producto").textContent.replace("$", "")
        );

        return precioA - precioB;
    });

    productos.forEach(producto =>
    {
        listado.appendChild(producto);
    });
}


//--- Funcion para mostrar/ocultar las calorías de las hamburguesas ---//
function toggleCalorias(e)
{
    let producto = e.target.parentElement;

    let calorias = producto.querySelector(".calorias-producto");

    if(calorias)
    {
        if(calorias.style.display === "none")
        {
            calorias.style.display = "block";
        }
        else
        {
            calorias.style.display = "none";
        }
    }
}
//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");
    const botonesOrdenarMayor = document.querySelectorAll(".btn-ordenar-mayor");
    const botonesOrdenarMenor = document.querySelectorAll(".btn-ordenar-menor");
    const botonesCalorias = document.querySelectorAll(".btn-calorias");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
    botonesOrdenarMayor.forEach(btn => btn.addEventListener("click", ordenarMayorAMenor));
    botonesOrdenarMenor.forEach(btn => btn.addEventListener("click", ordenarMenorAMayor));
    botonesCalorias.forEach(btn => btn.addEventListener("click", toggleCalorias));

    // Actualizar el contador al cargar la página
    actualizarContadorCarrito();
});

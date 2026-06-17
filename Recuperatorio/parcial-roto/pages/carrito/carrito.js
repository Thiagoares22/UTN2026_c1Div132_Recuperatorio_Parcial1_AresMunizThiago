// Funcion que obtiene el carrito guardado en LocalStorage
function obtenerCarrito() 
{
    // Convierte el texto JSON en un array de objetos
    // Si no existe "carrito", devuelve un array vacío
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Funcion que carga los productos en la tabla
function cargarProductosCarrito() 
{
    // Obtener la tabla del HTML
    let tabla = document.getElementById("tabla-carrito");

    // Obtener productos guardados
    let carrito = obtenerCarrito();

    // Variable para acumular el total final
    let total = 0;

    // Recorrer cada producto del carrito
    carrito.forEach(producto =>
    {
        // Crear una nueva fila <tr>
        let fila = document.createElement("tr");

        // Agregar las columnas con los datos del producto
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
        `;

        // Agregar la fila a la tabla
        tabla.appendChild(fila);

        // Sumar al total:
        // cantidad * precio del producto
        total += parseInt(producto.precio.replace("$", "")) * producto.cantidad;
    });

    // Mostrar el total final en el h2
    document.getElementById("valor-final").innerHTML =
        `El valor final a pagar es de: $${total}`;
}

// Funcion para limpiar el carrito
function limpiarCarrito() 
{
    // Elimina el carrito del LocalStorage
    localStorage.removeItem("carrito");

    // Mostrar mensaje
    alert("El carrito se Limpio");

    // Recargar la página
    location.reload();
}

// Asociar evento al botón cuando carga la página
window.addEventListener("DOMContentLoaded", () =>
{
    // Cargar productos automáticamente
    cargarProductosCarrito();

    // Asociar evento click al botón limpiar
    document
        .querySelector(".btn-limpiar-carrito")
        .addEventListener("click", limpiarCarrito);
});
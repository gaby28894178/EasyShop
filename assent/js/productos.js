 // Ejemplo de productos predefinidos
 const productos = [
    { id: 1, nombre: "Producto 1", descripcion: "Descripción del Producto 1", stock: 10, precio: 100,
     urlImagen: "https://cdn.pixabay.com/photo/2024/08/19/02/29/orange-8979311_1280.jpg" , cantidad: 1},
    { id: 2, nombre: "Producto 2", descripcion: "Descripción del Producto 2", stock: 5, precio: 222,
     urlImagen: "https://cdn.pixabay.com/photo/2024/08/19/02/29/orange-8979311_1280.jpg",cantidad:1 },
    { id: 3, nombre: "Producto 3", descripcion: "Descripción del Producto 3", stock: 0, precio: 300, 
    urlImagen: "https://cdn.pixabay.com/photo/2024/08/19/02/29/orange-8979311_1280.jpg",cantidad:1 }
];

// Guardar productos en localStorage
localStorage.setItem('productos', JSON.stringify(productos));

// Recuperar productos de localStorage
const productosGuardados = JSON.parse(localStorage.getItem('productos'));

// Recuperar el carrito de localStorage o inicializar uno vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];



// Función para mostrar productos en tarjetas
function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta border p-4 m-2 rounded shadow';

        tarjeta.innerHTML = `
            <img src="${producto.urlImagen}" alt="${producto.nombre}" class="h-64 w-full object-cover">
            <h2 class="text-lg font-bold">${producto.nombre}</h2>
            <p class="text-gray-600">${producto.descripcion}</p>
            <p class="font-semibold">$${producto.precio}</p>
            <p class="text-red-500">Stock: ${producto.stock}</p>
            <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="añadirAlCarrito(${producto.id})">Añadir al carrito</button>
        `;

        contenedor.appendChild(tarjeta);
    });
    actualizarContador(); // Actualiza el contador de items
}

// Función para añadir un producto al carrito
function añadirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto); // Agrega el producto al carrito
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en localStorage
        // alert(`${producto.nombre} ha sido añadido al carrito!`);
        Swal.fire({
            title: '¡Producto Agregado!',
            text: 'El producto ha sido agregado a tu carrito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 5000 // Cierra automáticamente después de 3 segundos
        });
        actualizarContador();
    }
}

// Función para actualizar el contador del carrito
function actualizarContador() {
const contador = document.getElementById('contador');
let totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0); // Sumar las cantidades
contador.innerText = totalItems; // Mostrar total de items en el carrito
}


// Mostrar productos al cargar la página
if (productosGuardados) {
mostrarProductos(productosGuardados);
} else {
mostrarProductos(productos);
}

actualizarContador();
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarCarrito() {
    const contenedor = document.getElementById('contenedor-carrito');
    contenedor.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement('div');
        item.className = 'border p-4 m-2 rounded shadow bg-white flex justify-between items-center';
        item.innerHTML = `
            <div>
                <h2 class="text-lg font-bold">${producto.nombre}</h2>
                <p class="text-blue-600">${producto.descripcion}</p>
                <p class="font-semibold"><span class="text-lg font-bold text-yellow-300"> Sub - Total ...  </span><span class="text-lg font-bold text-green-500">  $${producto.precio} x  <span id="cantidad-${index}"></span> ${producto.cantidad} = $ ${producto.cantidad * producto.precio}</span></p>
            </div>
            <div class="flex items-center">
                <button onclick="decrementarCantidad(${index})" class="bg-red-500 text-white px-2 py-1 rounded">-</button>
                <button onclick="incrementarCantidad(${index})" class="bg-blue-500 text-white px-2 py-1 rounded ml-1 mr-1">+</button>
                <button onclick="eliminarProducto(${index})" class="bg-gray-400 text-white px-2 py-1 rounded ml-2">Eliminar</button>
            </div>
        `;

        contenedor.appendChild(item);
        total += producto.precio * producto.cantidad; 
        totalItems += producto.cantidad; 
    });
    
    const totalElement = document.getElementById('total');
    totalElement.innerText = `Total: $${total}`;

    const contador = document.getElementById('contador');
    contador.innerText = totalItems; 
}

function incrementarCantidad(index) {
    carrito[index].cantidad++;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function decrementarCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire({
        title: 'Se eliminará',
        text: 'El producto ha sido eliminado de tu carrito.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        timer: 3000
    });
    mostrarCarrito();
}

document.getElementById('pagar-btn').onclick = function() {
    Swal.fire({
        title: '¡Pago completado!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    }).then(() => {
        generarFactura(); 
    });
};

document.getElementById('imprimir-btn').onclick = function() {
    generarFactura();
};

function generarFactura() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Factura", 10, 10);
    doc.text("Cliente: Juan Pérez", 10, 20);
    let y = 30;

    carrito.forEach(producto => {
        doc.text(`${producto.nombre} - ${producto.cantidad} x $${producto.precio}`, 10, y);
        y += 10;
    });

    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    doc.text(`Total: $${total}`, 10, y + 10);

    doc.save("factura.pdf");
}

mostrarCarrito();
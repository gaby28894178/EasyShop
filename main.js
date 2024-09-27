const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Cierra el menú al redimensionar
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // Cambia 768 por el ancho que determines para pantallas medianas
        mobileMenu.classList.add('hidden'); // Asegúrate de que el menú esté oculto
    }
});

 // También ocultar el menú al hacer clic en un enlace del menú móvil
 mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
});

 // Recuperar el carrito de localStorage
 let carrito = JSON.parse(localStorage.getItem('carrito')) || [];     

 // Función para mostrar los productos del carrito
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
         totalItems += producto.cantidad; // Sumar cantidad de productos
     });
     
     const totalElement = document.getElementById('total');
     totalElement.innerText = `Total: $${total}`;

     // Actualizar el contador con el total de productos
     const contador = document.getElementById('contador');
     contador.innerText = totalItems; // Mostrar total de items en el carrito
 }

 // Funciones para incrementar, decrementar y eliminar productos
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
         title: '¡Proceder a pagar!',
         icon: 'info',
         confirmButtonText: 'Aceptar',
     });
 };

 document.getElementById('ver-factura').onclick = function() {



     Swal.fire({
         title: '¡se esta generando la factura!',
         icon: 'info',
         confirmButtonText: 'Aceptar',
     }).then((result)=>{
         if(result.isConfirmed){
             window.location.href ='contacto.html';
         }
     });



 };


 // Mostrar el carrito al cargar la página
 mostrarCarrito();
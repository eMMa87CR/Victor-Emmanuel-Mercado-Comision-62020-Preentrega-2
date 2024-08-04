class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}
class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    vaciar() {
        this.productos = [];
    }
}

const productos = [
    new Producto("Paracetamol", 100),
    new Producto("Ibuprofeno", 150),
    new Producto("Amoxicilina", 200),
    new Producto("Aspirina", 50),
    new Producto("Loratadina", 80),
    new Producto("Insulina", 500),
    new Producto("Metformina", 300),
    new Producto("Omeprazol", 120)
];

const carrito = new Carrito();

function mostrarProductos() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '<h2>Productos Disponibles</h2>';
    
    productos.forEach((producto, index) => {
        const productoElement = document.createElement('div');
        productoElement.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
        `;
        productosDiv.appendChild(productoElement);
    });
}

function agregarAlCarrito(index) {
    carrito.agregarProducto(productos[index]);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    listaCarrito.innerHTML = '';
    
    carrito.productos.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
    });
    
    totalCarrito.textContent = carrito.calcularTotal();
}

function eliminarDelCarrito(index) {
    carrito.eliminarProducto(index);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function realizarCompra() {
    if (carrito.productos.length === 0) {
        alert("No hay productos en el carrito para comprar.");
    } else {
        alert(`Compra realizada con éxito. Total: $${carrito.calcularTotal()}`);
        carrito.vaciar();
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito.productos));
}

function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        const productosGuardados = JSON.parse(carritoGuardado);
        productosGuardados.forEach(producto => {
            carrito.agregarProducto(new Producto(producto.nombre, producto.precio));
        });
        actualizarCarrito();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    cargarCarritoDeLocalStorage();
    document.getElementById('realizar-compra').addEventListener('click', realizarCompra);
});
class Producto {
    constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = 0;
    }
  }
  
  class Carrito {
    constructor() {
      this.productos = [];
    }
  
    agregarProducto(producto) {
      const existente = this.productos.find((p) => p.nombre === producto.nombre);
      if (existente) {
        existente.cantidad++;
      } else {
        producto.cantidad = 1;
        this.productos.push(producto);
      }
    }
  
    eliminarProducto(nombre) {
      const index = this.productos.findIndex((p) => p.nombre === nombre);
      if (index !== -1) {
        if (this.productos[index].cantidad > 1) {
          this.productos[index].cantidad--;
        } else {
          this.productos.splice(index, 1);
        }
      }
    }
  
    calcularTotal() {
      return this.productos.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );
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
    new Producto("Omeprazol", 120),
  ];
  
  const carrito = new Carrito();
  
  function mostrarProductos() {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = "<h2>Productos Disponibles</h2>";
  
    productos.forEach((producto, index) => {
      const productoElement = document.createElement("div");
      productoElement.className = "producto";
      productoElement.innerHTML = `
        <p>${producto.nombre} - $${producto.precio}</p>
        <button class="agregar" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
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
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
  
    listaCarrito.innerHTML = "";
  
    carrito.productos.forEach((producto) => {
      const li = document.createElement("li");
      li.className = "item-carrito";
      li.innerHTML = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} 
        <button class="eliminar" onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>`;
      listaCarrito.appendChild(li);
    });
  
    totalCarrito.textContent = `Total: $${carrito.calcularTotal()}`;
  }
  
  function eliminarDelCarrito(nombre) {
    carrito.eliminarProducto(nombre);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }
  
  function realizarCompra() {
    if (carrito.productos.length === 0) {
      alert("No hay productos en el carrito para comprar.");
    } else {
      alert(`Compra realizada con éxito. Total: $${carrito.calcularTotal()}. Muchas gracias por su compra.`);
      carrito.vaciar();
      actualizarCarrito();
      guardarCarritoEnLocalStorage();
    }
  }
  
  function vaciarCarrito() {
    carrito.vaciar();
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }
  
  function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito.productos));
  }
  
  function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      const productosGuardados = JSON.parse(carritoGuardado);
      productosGuardados.forEach((producto) => {
        const prod = new Producto(producto.nombre, producto.precio);
        prod.cantidad = producto.cantidad;
        carrito.agregarProducto(prod);
      });
      actualizarCarrito();
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
      mostrarProductos();
      cargarCarritoDeLocalStorage();
      agregarEventListeners();
  });
  
  function agregarEventListeners() {
      document.getElementById("realizar-compra").addEventListener("click", realizarCompra);
      document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
  }
  
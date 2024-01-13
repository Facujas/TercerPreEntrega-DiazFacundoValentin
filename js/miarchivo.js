let saldo = 5000;
let carrito = [];

function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    mostrarMensaje(document.getElementById('resultado'), `"${producto}" ha sido añadido al carrito.`);
    actualizarCarrito();
}

function comprarProducto(producto, precio) {
    const resultadoDiv = document.getElementById('resultado');

    if (saldo >= precio) {
        saldo -= precio;
        actualizarSaldo();
        mostrarMensaje(resultadoDiv, `¡Gracias por comprar "${producto}" por $${precio}! Tu saldo actual: $${saldo}`);
    } else {
        mostrarMensaje(resultadoDiv, `No tienes saldo suficiente para comprar "${producto}". Tu saldo actual: $${saldo}`);
    }
}

function comprarDesdeCarrito() {
    const resultadoDiv = document.getElementById('resultado');
    
    if (carrito.length === 0) {
        mostrarMensaje(resultadoDiv, "El carrito está vacío. Añade productos antes de comprar.");
    } else {
        let totalCarrito = carrito.reduce((total, item) => total + item.precio, 0);

        if (saldo >= totalCarrito) {
            saldo -= totalCarrito;
            carrito = [];
            actualizarSaldo();
            actualizarCarrito();
            mostrarMensaje(resultadoDiv, `¡Gracias por tu compra! Productos del carrito comprados. Tu saldo actual: $${saldo}`);
        } else {
            mostrarMensaje(resultadoDiv, "No tienes saldo suficiente para comprar todos los productos del carrito.");
        }
    }
}


function mostrarMensaje(elemento, mensaje) {
    console.log(mensaje);
    elemento.innerHTML = mensaje;
}

function actualizarSaldo() {
    const saldoNumero = document.getElementById('saldoNumero');
    saldoNumero.textContent = saldo;
}

function actualizarCarrito() {
    const productosCarritoDiv = document.getElementById('productosCarrito');
    productosCarritoDiv.innerHTML = '';

    if (carrito.length > 0) {
        productosCarritoDiv.innerHTML = carrito.map(item => `${item.producto} - $${item.precio}`).join("<br>");
    }
}

function generarFactura() {
    const facturaDiv = document.getElementById('factura');
    const horaCompraDiv = document.getElementById('horaCompra');
    const productosCompradosDiv = document.getElementById('productosComprados');
    const totalGastadoDiv = document.getElementById('totalGastado');

    const fechaActual = new Date();
    const horaCompra = `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

    const productosComprados = carrito.map(item => `${item.producto} - $${item.precio}`);
    const totalGastado = carrito.reduce((total, item) => total + item.precio, 0);

    horaCompraDiv.innerHTML = `Hora de la compra: ${horaCompra}`;
    productosCompradosDiv.innerHTML = `Productos comprados:<br>${productosComprados.join("<br>")}`;
    totalGastadoDiv.innerHTML = `Total gastado: $${totalGastado.toFixed(2)}`;

    facturaDiv.style.display = 'block';
}
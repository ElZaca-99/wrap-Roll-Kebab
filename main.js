/* =========================================
 1 . FUNCIONES DE AYUDA (HELPERS)                  *
 ========================================= */

/**
 * Crea un objeto de producto estandarizado.
 * @param {string} nombre - Nombre del producto.
 * @param {string} descripcion - Descripción breve (puede estar vacía).
 * @param {Array} items - Array de variantes y precios.
 */
function crearProducto(nombre, descripcion, items) {
  return {
    nombre: nombre,
    descripcion: descripcion,
    items: items
  };
}

/**
 * Aumenta el precio de todos los items de un array en una cantidad fija.
 * Maneja la conversión de coma a punto para el cálculo matemático en JS.
 * @param {Array} itemsOriginales - Lista de [nombre, precio].
 * @param {number} incremento - Cantidad a sumar (ej: 0.50).
 */
function aumentarPrecios(itemsOriginales, incremento) {
  return itemsOriginales.map(function(item) {
    // 1. Reemplaza coma por punto para poder sumar
    // 2. Suma el incremento
    // 3. Formatea a 2 decimales
    // 4. Vuelve a reemplazar punto por coma para la visualización en España
    const precioNumerico = parseFloat(item[1].replace(",", "."));
    const nuevoPrecio = (precioNumerico + incremento).toFixed(2).replace(".", ",");

    return [item[0], nuevoPrecio];
  });
}

/* =========================================
 2 . ESTRUCTURA DE DATOS DEL MENÚ                  *
 ========================================= */
const menuData = {
  "Menús": {
    productos: [
      crearProducto("Menú kebab", "Kebab en pan de pita, patatas y Coca-Cola", [["Ternera o pollo", "7,50"], ["Mixto", "8,00"], ["Solo carne*", "8,50"], ["Mixto solo carne*", "9,00"]]),
      crearProducto("Menú dürüm", "Dürüm en pan de tortita, patatas y Coca-Cola", aumentarPrecios([["Ternera o pollo", "7,50"], ["Mixto", "8,00"], ["Solo carne*", "8,50"], ["Mixto solo carne*", "9,00"]], 0.5)),
      crearProducto("Menú lamacun", "Lamacun enrollado, patatas y Coca-Cola", aumentarPrecios([["Ternera o pollo", "7,50"], ["Mixto", "8,00"], ["Solo carne*", "8,50"], ["Mixto solo carne*", "9,00"]], 1.0)),
      crearProducto("Menú plato", "Plato con patatas, ensalada y Coca-Cola", aumentarPrecios([["Ternera o pollo", "7,50"], ["Mixto", "8,00"], ["Solo carne*", "8,50"], ["Mixto solo carne*", "9,00"]], 1.5)),
      crearProducto("Otros menús", "Con patatas y Coca-Cola", [["Alitas", "7,50"], ["Nuggets", "7,50"], ["Tiras de pollo", "7,50"], ["Hamburguesa", "7,50"]])
    ],
    nota: "*Solo carne: ternera o pollo. Con queso de cabra, +0,50 €."
  },
  "Kebab": {
    productos: [
      crearProducto("Kebab", "Pan de pita, carne, ensalada y salsas", [["Ternera o pollo", "4,90"], ["Mixto", "5,00"], ["Con queso", "6,00"], ["Doble de carne", "6,00"], ["Solo carne (sin verdura)", "6,00"], ["Falafel", "5,00"]])
    ]
  },
  "Dürum": {
    productos: [
      crearProducto("Dürüm", "Carne enrollada en pan de tortita, ensalada y salsas", [["Ternera o pollo", "5,00"], ["Mixto", "5,50"], ["Doble de carne", "6,00"], ["Con queso de cabra", "6,00"], ["Falafel", "5,00"], ["Solo carne", "6,00"], ["Con patatas dentro", "6,50"]])
    ]
  },
  "Lamacun": {
    productos: [
      crearProducto("Lamacun", "Lamacun enrollado con ensalada y salsas", [["Ternera o pollo", "6,00"], ["Mixto", "6,00"], ["Con queso", "6,50"], ["Doble de carne", "7,00"], ["Solo carne", "6,50"], ["Con patatas dentro", "7,00"]])
    ]
  },
  "Platos": {
    productos: [
      crearProducto("Platos", "Con pan y salsas", [["Kebab con patatas", "8,00"], ["Mixto con patatas", "8,50"], ["Kebab con arroz", "8,50"], ["Solo carne con patatas", "8,50"], ["Solo carne con arroz", "9,00"], ["Plato de la casa", "9,50"], ["Plato especial", "10,00"]]),
      crearProducto("Pedrata", "Patatas con carne", [["Ternera o pollo", "4,00"], ["Mixto", "4,50"], ["Doble ternera o pollo", "5,50"], ["Doble mixto", "6,00"]])
    ],
    nota: "Plato de la casa: carne, ensalada, patatas y arroz. Plato especial: añade falafel y queso. Sin verdura, +1 €. Pedrata con pan de pita, +0,80 €."
  },
  "Raciones": {
    productos: [
      crearProducto("Raciones", "Para compartir", [["Alitas de pollo (6 ud.)", "4,50"], ["Nuggets de pollo (6 ud.)", "4,50"], ["Tiras de pollo (4 ud.)", "4,50"], ["Falafel (6 ud.)", "4,50"], ["Arroz blanco", "3,00"], ["Patatas fritas", "2,50"], ["Patatas fritas grandes", "4,00"]]),
      crearProducto("Hamburguesa de ternera", "", [["Sola", "4,00"], ["Completa (lechuga, tomate, cebolla, queso y salsas)", "5,00"]]),
      crearProducto("Ensalada", "Lechuga, tomate, cebolla, zanahoria, lombarda y queso de cabra", [["Ensalada", "4,00"]])
    ]
  },
  "Bebidas": {
    productos: [
      crearProducto("Bebidas", "", [["Agua pequeña", "1,50"], ["Agua 1 l", "2,00"], ["Cerveza 33 cl (San Miguel, Heineken)", "1,90"], ["Coca-Cola 33 cl (normal, zero)", "1,90"], ["Nestea 33 cl", "1,90"], ["Aquarius naranja o limón 33 cl", "1,90"], ["Fanta naranja 33 cl", "1,90"], ["Sprite 33 cl", "1,90"], ["Coca-Cola 2 l", "3,50"]])
    ]
  }
};

/* =========================================
 3 . REFERENCIAS AL DOM (ELEMENTOS HTML)           *
 ========================================= */
const tabsContainer = document.getElementById("tabs");
const gridContainer = document.getElementById("grid");
const noteElement = document.getElementById("note");

/* =========================================
 4 . LÓGICA DE RENDERIZADO (MOSTRAR MENÚ)          *
 ========================================= */
function mostrarCategoria(categoria) {
  // 1. Actualizar estado visual de las pestañas (accesibilidad ARIA)
  Array.prototype.forEach.call(tabsContainer.children, function(boton) {
    boton.setAttribute("aria-selected", boton.textContent === categoria);
  });

  // 2. Generar el HTML de las tarjetas de productos
  const datosCategoria = menuData[categoria];

  gridContainer.innerHTML = datosCategoria.productos.map(function(producto) {
    // Usamos plantillas de texto (template literals) para mayor claridad
    const descripcionHTML = producto.descripcion ? `<p class="d">${producto.descripcion}</p>` : '';

    const itemsHTML = producto.items.map(function(item) {
      return `<li><span>${item[0]}</span><b>${item[1]} €</b></li>`;
    }).join("");

    return `
    <div class="card">
    <h3>${producto.nombre}</h3>
    ${descripcionHTML}
    <ul>${itemsHTML}</ul>
    </div>
    `;
  }).join("");

  // 3. Mostrar la nota inferior si existe para esta categoría
  noteElement.textContent = datosCategoria.nota || "";
}

/* =========================================
 5 . INICIALIZACIÓN DE LA PÁGINA                   *
 ========================================= */
// Generar dinámicamente los botones de las pestañas
Object.keys(menuData).forEach(function(nombreCategoria) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.setAttribute("role", "tab");
  boton.textContent = nombreCategoria;

  // Al hacer clic, llamar a la función mostrando esta categoría
  boton.onclick = function() {
    mostrarCategoria(nombreCategoria);
  };

  tabsContainer.appendChild(boton);
});

// Cargar la primera categoría por defecto al abrir la página
mostrarCategoria("Menús");

/* =========================================
 6 . HORARIO DE APERTURA                           *
 ========================================= */
// Horario de la ficha de Google. Formato 24 h: ["12:00", "00:30"] = abre a las 12:00 y cierra a las 00:30.
// Si cierra pasada la medianoche, pon la hora del día siguiente (00:30, 01:30...).
// Si un día está cerrado, deja tramos: [].
const horario = [
  { dia: "Lunes",     tramos: [["12:00", "00:30"]] },
{ dia: "Martes",    tramos: [["12:00", "00:30"]] },
{ dia: "Miércoles", tramos: [["12:00", "00:30"]] },
{ dia: "Jueves",    tramos: [["12:00", "00:30"]] },
{ dia: "Viernes",   tramos: [["12:00", "01:30"]] },
{ dia: "Sábado",    tramos: [["12:00", "01:30"]] },
{ dia: "Domingo",   tramos: [["12:00", "00:30"]] }
];

// Convierte "12:30" en minutos desde las 00:00 (750)
function aMinutos(hora) {
  const partes = hora.split(":");
  return parseInt(partes[0], 10) * 60 + parseInt(partes[1], 10);
}

// Hora actual en España, aunque el visitante esté en otra zona horaria
function ahoraEnEspana() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
}

function estaAbierto() {
  const ahora = ahoraEnEspana();
  const hoy = (ahora.getDay() + 6) % 7;   // 0 = lunes ... 6 = domingo
  const ayer = (hoy + 6) % 7;
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();

  // Tramos de hoy (si cierra pasada la medianoche, sigue abierto hasta el final del día)
  const abiertoHoy = horario[hoy].tramos.some(function(t) {
    const abre = aMinutos(t[0]);
    const cierra = aMinutos(t[1]);
    return cierra > abre ? (minutos >= abre && minutos < cierra) : (minutos >= abre);
  });

  // Tramos de ayer que terminan pasada la medianoche
  const abiertoPorAyer = horario[ayer].tramos.some(function(t) {
    const abre = aMinutos(t[0]);
    const cierra = aMinutos(t[1]);
    return cierra <= abre && minutos < cierra;
  });

  return abiertoHoy || abiertoPorAyer;
}

const horarioElement = document.getElementById("hours");
const abiertoElement = document.getElementById("open-now");
const indiceHoy = (ahoraEnEspana().getDay() + 6) % 7;

horarioElement.innerHTML = horario.map(function(d, i) {
  const horas = d.tramos.length
  ? d.tramos.map(function(t) { return t[0] + " - " + t[1]; }).join(" · ")
  : "Cerrado";
  return `<li${i === indiceHoy ? ' class="today"' : ''}><span>${d.dia}</span><b>${horas}</b></li>`;
}).join("");

const abierto = estaAbierto();
abiertoElement.textContent = abierto ? "Abierto ahora" : "Cerrado ahora";
abiertoElement.classList.add(abierto ? "si" : "no");

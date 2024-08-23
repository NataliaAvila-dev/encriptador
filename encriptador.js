//Elementos del DOM
const d = document;
const textArea = d.querySelector(".form__input");
const imagenMuneco = d.querySelector(".result__img");
const loaderCircle = d.querySelector(".loader");
const resultadoTitulo = d.querySelector(".result__title");
const resultadoText = d.querySelector(".result__text");
const botonEncriptar = d.querySelector("#encriptar-btn");
const botonDesencriptar = d.querySelector("#desencriptar-btn");
const botonCopiar = d.querySelector(".result__btn");

// Elementos del modal
const modal = d.getElementById("modal");
const modalMessage = d.getElementById("modal-message");
const acceptText = d.getElementById("modal-accept");

// Claves para encriptar y desencriptar
const llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

// Función para convertir a minúsculas y quitar acentos
function convertirMinusculasSinAcentos(texto) {
  return texto
    .toLowerCase()
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .replace(/[^a-z\s]/g, ""); 
}

// Aplicar la función mientras el usuario escribe
textArea.addEventListener("input", () => {
  textArea.value = convertirMinusculasSinAcentos(textArea.value);
});

//Función para encriptar
function encriptarMensaje(mensaje) {
  let mensajeEncriptado = "";
  let i = 0;

  while (i < mensaje.length) {
    let letra = mensaje[i];
    let encriptada = letra;
    let encontrada = false;
    let j = 0;

    while (j < llaves.length && !encontrada) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1];
        encontrada = true; // Se ha encontrado una coincidencia
      }
      j++;
    }

    mensajeEncriptado += encriptada;
    i++;
  }

  return mensajeEncriptado;
}


//Función para desencriptar
function desencriptarMensaje(mensaje) {
  let i = 0;
  
  while (i < llaves.length) {
    mensaje = mensaje.replace(new RegExp(llaves[i][1], "g"), llaves[i][0]);
    i++;
  }

  return mensaje;
}



// Ocultar elementos dinámicamente
textArea.addEventListener("input", () => {
  imagenMuneco.style.display = "none";
  loaderCircle.classList.remove("hidden");
  resultadoTitulo.textContent = "Esperando entrada...";
  resultadoText.textContent = "";
});

// Mostrar el modal
function mostrarModal(mensaje) {
  modalMessage.textContent = mensaje;
  modal.classList.add("show");
}

// Cerrar el modal cuando se haga clic en el texto "Aceptar"
acceptText.addEventListener("click", () => {
  modal.classList.remove("show");
});



// Función del botón encriptar
botonEncriptar.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textArea.value.trim();
  if (mensaje === "") {
    mostrarModal("Debe ingresar un texto para poder comenzar.");
  } else {
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadoText.textContent = mensajeEncriptado;
    textArea.value = "";
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El resultado es:";
  }
});

// Función del botón desencriptar
botonDesencriptar.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textArea.value.trim();
  if (mensaje === "") {
    mostrarModal("Debe ingresar un texto para poder comenzar.");
  } else {
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoText.textContent = mensajeDesencriptado;
    textArea.value = "";
    resultadoTitulo.textContent = "El resultado es:";
    botonCopiar.classList.remove("hidden");
  }
});

// Función del botón copiar
botonCopiar.addEventListener("click", () => {
  let textoCopiado = resultadoText.textContent;
  navigator.clipboard.writeText(textoCopiado).then(() => {
    imagenMuneco.style.display = "block";
    loaderCircle.classList.add("hidden");
    resultadoTitulo.textContent = "El texto se copió";
    botonCopiar.classList.add("hidden");
    resultadoText.textContent = "";

    // Después de 3 segundos, volver a mostrar el mensaje original
    setTimeout(() => {
      resultadoTitulo.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
    }, 3000);
  });
});










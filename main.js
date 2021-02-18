"use strict";
/**********
 * DATOS
 **********/
var cuentas = [
  { nombre: "Hiromi", saldo: 200, password: "helloworld" },
  { nombre: "Manuel", saldo: 290, password: "l33t" },
  { nombre: "Luis", saldo: 67, password: "123" },
];

// Limites de la cuenta
const limiteCta = { minimo: 10, maximo: 990 };

// Variable de espacio
const space = "&nbsp;";

/* SELECCION DE ELEM. DOM  */
// Botones Left / Right
let btnsLeft = document.querySelectorAll(".left-item");
let btnsRight = document.querySelectorAll(".right-item");
// Botones Indiv
let bl1 = document.getElementById("btn-l-1");
let bl2 = document.getElementById("btn-l-2");
let bl3 = document.getElementById("btn-l-3");
let br1 = document.getElementById("btn-r-1");
let br2 = document.getElementById("btn-r-2");
let br3 = document.getElementById("btn-r-3");
// Text Top
const primary = document.getElementById("primary-txt");
const secondary = document.getElementById("secondary-txt");
// Div Input & Msg
const container = document.getElementById("input-container");
const msgBox = document.querySelector(".message");
let input;

/* Función que limpia los botones */
function cleanBtns(selector) {
  for (let i = 0; i < selector.length; i++) {
    // Limpia los li
    selector[i].innerHTML = space;
    // CLona los elementos en su lugar eliminando el Listener
    let newEl = selector[i].cloneNode(true);
    selector[i].parentNode.replaceChild(newEl, selector[i]);
  }
  /* RESELECCIONA LOS BOTONES CLONADOS */
  // Botones Left / Right
  btnsLeft = document.querySelectorAll(".left-item");
  btnsRight = document.querySelectorAll(".right-item");
  // Botones Indiv
  bl1 = document.getElementById("btn-l-1");
  bl2 = document.getElementById("btn-l-2");
  bl3 = document.getElementById("btn-l-3");
  br1 = document.getElementById("btn-r-1");
  br2 = document.getElementById("btn-r-2");
  br3 = document.getElementById("btn-r-3");
}

function removeInput() {
  input = document.querySelector(".input");
  if (container.contains(input)) {
    container.removeChild(input);
  }
}

/* Función Inicio */
function init() {
  primary.innerHTML = "Elije tu cuenta";
  secondary.innerHTML = space;
  msgBox.innerHTML = "";
  cleanBtns(btnsLeft);
  cleanBtns(btnsRight);
  for (let i = 0; i < btnsRight.length; i++) {
    btnsRight[i].innerHTML = cuentas[i].nombre;
    btnsRight[i].addEventListener("click", (e) => {
      selectAccount(e.target.innerHTML, i);
    });
  }
  removeInput();
}

/* Función Seleccionar Cuenta y pedir password */
function selectAccount(accountName, index) {
  // Cambiar texto
  primary.innerHTML = "¡Bienvenid@ " + accountName + "!";
  secondary.innerHTML = "Ingresa tu password";
  // Limpia Botones
  cleanBtns(btnsRight);
  // Crea el input de password
  let passInput = document.createElement("input");
  passInput.type = "password";
  passInput.classList.add("input");
  container.prepend(passInput);
  // Crea el boton de ingresar
  br3.innerHTML = "Ingresar";
  br3.addEventListener("click", () => {
    checkPass(passInput, index);
  });
  // Crea botón de atras
  bl3.innerHTML = "Atrás";
  bl3.addEventListener("click", init);
}

/* Función Checa si el password es correcto */
function checkPass(input, index) {
  // Checa si esta vacio primero
  if (input.value !== "") {
    if (cuentas[index].password === input.value) {
      displayMenu(index);
    } else {
      msgBox.innerHTML = "";
      msgBox.innerHTML =
        '<img src="assets/forbidden_2.svg" alt="Error">Password incorrecto';
    }
  } else {
    msgBox.innerHTML = "";
    msgBox.innerHTML =
      '<img src="assets/forbidden_2.svg" alt="Error">Ingrese un password';
  }
  // Vacia el input
  input.value = "";
}

/* Muestra el menú */
function displayMenu(i) {
  primary.innerHTML = space;
  secondary.innerHTML = "Seleccione una opción";
  msgBox.innerHTML = "";
  removeInput();
  cleanBtns(btnsLeft);
  cleanBtns(btnsRight);
  // Botón Salir
  bl2.innerHTML = "Salir";
  bl2.addEventListener("click", init);
  // Botón Consultar Saldo
  bl3.innerHTML = "Consultar Saldo";
  bl3.addEventListener("click", () => {
    // Invocar función Saldo
    saldo(i);
  });
  // Botón Depositar
  br2.innerHTML = "Depositar";
  br2.addEventListener("click", () => {
    // Invocar función Deposito
    update(i, true);
  });
  // Botón Retirar
  br3.innerHTML = "Retirar";
  br3.addEventListener("click", () => {
    // Invocar función Retiro
    update(i, false);
  });
}

/* Función Consulta de Saldo */
function saldo(index) {
  primary.innerHTML = "$ " + cuentas[index].saldo;
  primary.classList.add("amount");
  secondary.innerHTML = "Balance";
  cleanBtns(btnsLeft);
  cleanBtns(btnsRight);
  // Botón Salir
  bl2.innerHTML = "Salir";
  bl2.addEventListener("click", () => {
    primary.classList.remove("amount");
    init();
  });
  // Botón Regresar
  bl3.innerHTML = "Regresar";
  bl3.addEventListener("click", () => {
    primary.classList.remove("amount");
    displayMenu(index);
  });
}

/* Función Deposito: TRUE / Retiro: FALSE */
function update(index, boolean) {
  primary.innerHTML = space;
  secondary.innerHTML = `Ingrese el monto a ${
    boolean ? "depositar" : "retirar"
  }`;
  cleanBtns(btnsLeft);
  cleanBtns(btnsRight);
  // Botón Salir
  bl2.innerHTML = "Salir";
  bl2.addEventListener("click", init);
  // Botón Regresar
  bl3.innerHTML = "Regresar";
  bl3.addEventListener("click", () => {
    displayMenu(index);
  });
  // Crea el input de numero
  let numInput = document.createElement("input");
  numInput.type = "number";
  numInput.classList.add("input");
  container.prepend(numInput);
  // Botón DEPOSITAR
  br3.innerHTML = `Confirmar ${boolean ? "deposito" : "retiro"}`;
  br3.addEventListener("click", () => {
    // Confirma que sea un número
    if (numInput.value !== "") {
      msgBox.innerHTML = "";
      // Confirma que no se pase del límite
      let validator = boolean
        ? cuentas[index].saldo + Number(numInput.value) <= limiteCta.maximo
        : cuentas[index].saldo - Number(numInput.value) >= limiteCta.minimo;
      if (validator) {
        boolean
          ? (cuentas[index].saldo += Number(numInput.value))
          : (cuentas[index].saldo -= Number(numInput.value));
        primary.innerHTML = "Nuevo Balance: $" + cuentas[index].saldo;
        secondary.innerHTML = `${boolean ? "Depositaste" : "Retiraste"}: ${
          numInput.value
        }`;
        numInput.value = "";
      } else {
        msgBox.innerHTML = "";
        if (boolean) {
          msgBox.innerHTML =
            '<img src="assets/lock.svg" alt="Error">Excede el máx';
        } else {
          msgBox.innerHTML =
            '<img src="assets/caution.svg" alt="Error">Sobrepasa el monto minimo';
        }
      }
    } else {
      msgBox.innerHTML = "";
      msgBox.innerHTML =
        '<img src="assets/forbidden_2.svg" alt="Error">Debe ser un número';
    }
  });
}

window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM Ready");
  init();
});

//
//  Logica Registro
//
//

const inputSignupNombre = document.querySelector("#signup-nombre");
const inputSignupApellido = document.querySelector("#signup-apellido");
const inputSignupEmail = document.querySelector("#signup-email");
const inputSignupContrasenna = document.querySelector("#signup-contrasenna");
const inputSignupContrasennaVerificada = document.querySelector(
  "#signup-contrasenna-verificada"
);
const errorMensaje = document.querySelector("#singup-error");
const botonSignup = document.querySelector("#signup-boton");

// funcion para activar o desactivar el boton
function toggleBoton(activado) {
  // Es boton vuelve a su estado original ( que se pueda hacer click )
  if (activado) {
    botonSignup.removeAttribute("disabled");
    botonSignup.innerText = "Ingresar";
  } else {
    // Si el boton se desactiva, no se puede hacer click
    botonSignup.setAttribute("disabled", "disabled");
    botonSignup.innerText = "Espere...";
  }
}

// agregando evento a los inputs para que si hay error desapareza
document.querySelectorAll("#signup input").forEach((nodo) => {
  nodo.addEventListener("keypress", () => {
    if (errorMensaje.textContent.length > 0) {
      errorMensaje.innerText = "";
    }
  });
});

// ------------------------------------------
// agregando evento al boton de enviar
botonSignup.addEventListener("click", function (e) {
  // Bloqueando el evento por defecto
  e.preventDefault();

  // desactivar el boton
  toggleBoton(false);

  // variable control de error
  let error = false;

  // validando que no hay campos vacios
  document.querySelectorAll("#signup input").forEach((nodo) => {
    if (nodo.value.length === 0 || nodo.value === " ") {
      errorMensaje.innerText = "Faltan datos que completar.";
      error = true; // si hay error, entonces es true
    }
  });

  // validando que las contraseñas sean iguales
  if (inputSignupContrasenna.value !== inputSignupContrasennaVerificada.value) {
    errorMensaje.innerText = "Las contraseñas no coinciden.";
    error = true; // si hay error, entonces es true
  }

  // si no hay errores sigo con el codigo que registra el usuario
  if (!error) {
    usuarios
      .registrar(
        inputSignupNombre.value,
        inputSignupApellido.value,
        inputSignupEmail.value,
        inputSignupContrasenna.value
      )
      .then((response) => {
        // si llego aca y no redirecciono, es que la api no creo el usurio
        errorMensaje.innerText = response;
      })
      .catch((error) => alert(error)); // si llego aca, es que hay un error la conectar con la api
  }

  // reactivando el boton nuevamente
  toggleBoton(true);
});

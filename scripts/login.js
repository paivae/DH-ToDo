//
//  Logica Login
//
//

// 

// boton de enviar del form
const botonEnviar = document.querySelector("#botonEnviar");

function toggleBoton(activado) {
  // Es boton vuelve a su estado original ( que se pueda hacer click )
  if (activado) {
    botonEnviar.removeAttribute("disabled");
    botonEnviar.innerText = "Ingresar";
  } else {
    // Si el boton se desactiva, no se puede hacer click
    botonEnviar.setAttribute("disabled", "disabled");
    botonEnviar.innerText = "Espere...";
  }
}

botonEnviar.addEventListener("click", function (e) {
  // Cancelar en envio del formulario
  e.preventDefault();

  // Desactivar boton al hacer click
  toggleBoton(false);

  //Obtener campos del formulario
  const inputEmail = document.querySelector("#inputEmail").value;
  const inputPassword = document.querySelector("#inputPassword").value;
  const errorMensaje = document.querySelector("#errorMsg");

  // llamo a la constante usuario definida en api.js
  usuarios
    .login(inputEmail, inputPassword)
    .then((response) => {
      // si no se redirecciona la pagina, muestro el error del porque
      errorMensaje.innerText = response;
    })
    .catch((error) => {
      // si se rompre la aplciacion muestro el error
      alert(error);
    });

  // Activar el boton para hacer click
  setTimeout(() => {
    toggleBoton(true);
  }, 2000);
});

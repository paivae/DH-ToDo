window.addEventListener("load", function () {
  /* -------------------------------------------------------------------------- */
  /*                              logica del login                              */
  /* -------------------------------------------------------------------------- */

  const formulario = this.document.forms[0];
  const inputEmail = this.document.querySelector("#inputEmail");
  const inputPassword = this.document.querySelector("#inputPassword");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log(inputEmail.value);
    console.log(inputPassword.value);

    localStorage.setItem("dhusername", inputEmail.value);

    window.location.href = "mis-tareas.html";
  });
});

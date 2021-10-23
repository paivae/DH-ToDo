//
//  LLamadas a la API
//
//

const URLAPI = "https://ctd-todo-api.herokuapp.com/v1";

const usuarios = {
  registrar: (nombre, apellido, correo, contrasenna) => {
    fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"firstName":"${nombre}","lastName":"${apellido}","email":"${correo}","password":"${contrasenna}"}`,
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("jwt", response.jwt);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  login: (correo, contrasenna) => {
    return new Promise((resolve, reject) => {
      fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"email":"${correo}","password":"${contrasenna}"}`,
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.jwt) {
            localStorage.setItem("jwt", response.jwt);
            window.location.href = "mis-tareas.html";
          } else {
            resolve(response);
          }
        })
        .catch((err) => {
          reject("Fallo la aplicacion, lo sentimos.");
        });
    });
  },
  obtenerDatos: () => {
    let jwt = localStorage.getItem("jwt");

    fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
      method: "GET",
      headers: {
        Authorization: jwt,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

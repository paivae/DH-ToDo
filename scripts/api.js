//
//  LLamadas a la API
//
//

const URLAPI = "https://ctd-todo-api.herokuapp.com/v1";

const usuarios = {
  registrar: (nombre, apellido, correo, contrasenna) => {
    return new Promise((resolve, reject) => {
      fetch(`${URLAPI}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"firstName":"${nombre}","lastName":"${apellido}","email":"${correo}","password":"${contrasenna}"}`,
      })
        .then((response) => response.json())
        .then((response) => {
          // cuerpo formateado
          if (response.jwt) {
            // si recibo el token
            localStorage.setItem("jwt", response.jwt);
            window.location.href = "mis-tareas.html";
          } else {
            // si recibo algun otro tipo de error
            resolve(response);
          }
        })
        .catch((err) => reject("Fallo la aplicacion, lo sentimos."));   // si el servidor no esta disponible
    });
  },
  login: (correo, contrasenna) => {
    return new Promise((resolve, reject) => {
      fetch(`${URLAPI}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"email":"${correo}","password":"${contrasenna}"}`,
      })
        .then((response) => response.json())
        .then((response) => {
          // cuerpo formateado
          if (response.jwt) {
            // si recibo el token
            localStorage.setItem("jwt", response.jwt);
            window.location.href = "mis-tareas.html";
          } else {
            // si recibo algun otro tipo de error
            resolve(response);
          }
        })
        .catch((err) => reject("Fallo la aplicacion, lo sentimos."));   // si el servidor no esta disponible
    });
  },
  obtenerDatos: () => {
    let jwt = localStorage.getItem("jwt");

    fetch(`${URLAPI}/users/getMe`, {
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

//
//  LLamadas a la API
//
//

const URLAPI = "https://ctd-todo-api.herokuapp.com/v1";

const usuarios = {
  //
  //  metodo crear un nuevo usuario
  //  @param String nombre
  //  @param String apellido
  //  @param String correo
  //  @param String contrasenna
  //  @return Promise
  //
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
        .catch((err) => reject("Fallo la aplicacion, lo sentimos.")); // si el servidor no esta disponible
    });
  },
  //
  //  metodo para validar un usuario
  //  @param String correo
  //  @param String contrasenna
  //  @return Promise
  //
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
        .catch((err) => reject("Fallo la aplicacion, lo sentimos.")); // si el servidor no esta disponible
    });
  },
  //
  //  metodo para obtener los datos de un usuario desde su jwt
  //  @return Promise
  //
  obtenerDatos: () => {
    return new Promise((resolve, reject) => {
      let jwt = localStorage.getItem("jwt");

      fetch(`${URLAPI}/users/getMe`, {
        method: "GET",
        headers: {
          Authorization: jwt,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (typeof response === "object") {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((err) => {
          alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
        });
    });
  },
};

const tareas = {
  //
  // metodo para agregar una nueva tarea
  // @param Object description
  //  @return Promise
  //
  agregar: (descripcion) => {
    // Agrega una nueva tarea
    return new Promise((resolve, reject) => {
      fetch(`${URLAPI}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: `{"description":"${descripcion}","completed":false}`,
      })
        .then((response) => response.json())
        .then((response) => {
          // si la tarea se creo correctamente
          if (typeof response === "object") {
            resolve(response);
          } else {
            // si la aplicacion devuelve otro status code
            reject(response);
          }
        })
        .catch((err) => {
          alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
        });
    });
  },
  //
  // metodo para listar todas las tareas
  //  @return Promise
  //
  listado: () => {
    return new Promise((resolve, reject) => {
      fetch(`${URLAPI}/tasks`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // si trajo todas las tareas
          if (typeof response === "object") {
            resolve(response);
          } else {
            // si la aplicacion devuelve otro status code
            reject(response);
          }
        })
        .catch((err) => {
          alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
        });
    });
  },
  //
  //  metodo para completar una tarea
  //  @param String idTarea
  //  @return Promise
  //
  completar: (idTarea) => {
    return new Promise((resolve, reject) => {
      fetch(`${URLAPI}/tasks/${idTarea}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: '{"completed": true}',
      })
        .then((response) => response.json())
        .then((response) => {
          // si se actualizo correctamente
          if (typeof response === "object") {
            resolve(response);
          } else {
            // si la aplicacion devuelve otro status code
            reject(response);
          }
        })
        .catch((err) => {
          alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
        });
    });
  },
  //
  //  metodo para pasar una tarea que esta completa a pendiente
  //  @param String idTarea
  //  @return Promise
  //
  descompletar: (idTarea) => {
    return new Promise((resolve, reject) => {
      fetch(`${URLAPI}/tasks/${idTarea}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: '{"completed": false}',
      })
        .then((response) => response.json())
        .then((response) => {
          // si se actualizo correctamente
          if (typeof response === "object") {
            resolve(response);
          } else {
            // si la aplicacion devuelve otro status code
            reject(response);
          }
        })
        .catch((err) => {
          alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
        });
    });
  },
  //
  //  metodo para eliminar una tarea
  //  @param String idTarea
  //  @return Promise
  //
  eliminar: (idTarea) => {
    return new Promise((resolve, reject) => {
      fetch(`${URLAPI}/tasks/${idTarea}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          // Si la api respinde con el codido 200
          // no hago response.json() por que no necesito el cuerpo
          if (response.status === 200) {
            resolve("ok");
          } else {
            // si no sale bien el borrar una tarea, quiero obtener el mensaje de error
            response.json();
          }
        })
        .then((response) => {
          // envio el mensaje de error al usuario
          reject(response);
        })
        .catch((err) => {
          alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
        });
    });
  },
};

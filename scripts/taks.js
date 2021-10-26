//
//  Logica Mis tareas
//
//

// DOM
const tareasUsername = document.querySelector("#username");
const panelTareasPendientes = document.querySelector("#tareas-pendientes");
const panelTareasTerminadas = document.querySelector("#tareas-terminadas");
const panelSkeleton = document.querySelector("#skeleton");
const inputNuevaTarea = document.querySelector("#nuevaTarea");
const botonTareaAgregar = document.querySelector("#tarea-boton-agregar");
const botonCerrarSesion = document.querySelector("#closeApp");

// validando el token guardado en localstorage
usuarios
  .obtenerDatos()
  .then((response) => {
    // Cambiando el nombre del usuario
    tareasUsername.innerText = response.firstName;
    // busco las tareas
    buscarTareas();
  })
  .catch((error) => {
    // si el token es incorrecto o no exites, lo envio a la pagina de inicio
    window.location.href = "index.html";
  });

// funcion para buscar la lista de tareas
function buscarTareas() {
  tareas.listado().then((response) => {
    // variables
    let tareasCompletas = "";
    let tareasIncompletas = "";

    // filtrando las tareas por completas o incompletas
    response.forEach((tarea) => {
      let fecha = new Date(tarea.createdAt);

      if (tarea.completed) {
        tareasCompletas += `<li class="tarea">
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">Creada: ${fecha.toLocaleDateString()}</p>
        </div>
      </li>`;
      } else {
        tareasIncompletas += `<li class="tarea">
        <div class="not-done" tareaid="${tarea.id}"></div>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">Creada: ${fecha.toLocaleDateString()}</p>
        </div>
      </li>`;
      }
    });

    // Eliminando skeleton
    panelSkeleton.remove();
    // Añadiendo el contendio al HTML
    panelTareasPendientes.innerHTML = tareasIncompletas;
    panelTareasTerminadas.innerHTML = tareasCompletas;

    // agregando eventos a los botones de completar tareas
    document.querySelectorAll(".not-done").forEach((nodo) => {
      nodo.addEventListener("click", function (e) {
        completarTarea(e.target.attributes.getNamedItem("tareaid").value);
      });
    });
  });
}

// funcion para completar la tarea
function completarTarea(tareaID) {
  tareas
    .completar(tareaID)
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "Tarea completada correctamente!",
      });
      buscarTareas();
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Tarea no completada",
        text: error,
      });
    });
}

// evento para agregar una tarea
botonTareaAgregar.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputNuevaTarea.value.length === 0 || inputNuevaTarea.value === " ") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El titulo de la tarea no puede estar vacio.",
    });
  } else {
    // si se valida el titulo de la tarea, se carga por la api
    tareas
      .agregar(inputNuevaTarea.value)
      .then((response) => {
        // si la tarea se cargo correctamente, borro el formulario
        inputNuevaTarea.value = "";
        // actualizo la lista de tareas
        buscarTareas();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Tarea no creada",
          text: error,
        });
      });
  }
});

// cerrar sesion
botonCerrarSesion.addEventListener("click", function (e) {
  // elimino el token
  localStorage.removeItem("jwt");
  // vuelvo al index
  window.location.href = "index.html";
});

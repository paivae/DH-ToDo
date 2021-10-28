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

// funciones para mostrar mensajes de exito o error
function popupExito(mensaje) {
  Swal.fire({
    icon: "success",
    title: "Exito",
    text: mensaje,
  });
}

function popupError(mensaje) {
  Swal.fire({
    icon: "error",
    title: "Algo salio mal",
    text: mensaje,
  });
}

//
// validando el token guardado en localstorage
//
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

//
// evento para agregar una tarea
//
botonTareaAgregar.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputNuevaTarea.value.length === 0 || inputNuevaTarea.value === " ") {
    popupError("El titulo de la tarea no puede estar vacio.");
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
        popupError(error);
      });
  }
});

//
// funcion para buscar la lista de tareas
//
function buscarTareas() {
  tareas.listado().then((response) => {
    // variables para guardar el html de las tareas
    let tareasCompletas = "";
    let tareasIncompletas = "";

    // filtrando las tareas por completas o incompletas
    response.forEach((tarea) => {
      let fecha = new Date(tarea.createdAt);

      if (tarea.completed) {
        tareasCompletas += `<li class="tarea">
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
         
          <!-- Parte nueva para agregar botones de acciones en tareas cerradas, la parte nueva no lleva la fecha( se elimino )-->
          <div>
            <button><i tareaid="${tarea.id}" class="fas fa-undo-alt change boton-reabrir"></i></button>
            <button><i tareaid="${tarea.id}" class="far fa-trash-alt boton-borrar"></i></button>
          </div>
          <!-- Fin de parte nueva -->
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

    // agregando eventos al boton para reabrir tarea
    document.querySelectorAll(".boton-reabrir").forEach((nodo) => {
      nodo.addEventListener("click", function (e) {
        reabrirTarea(e.target.attributes.getNamedItem("tareaid").value);
      });
    });

    // agregando eventos al boton para eliminar una tarea
    document.querySelectorAll(".boton-borrar").forEach((nodo) => {
      nodo.addEventListener("click", function (e) {
        eliminarTarea(e.target.attributes.getNamedItem("tareaid").value);
      });
    });
  });
}

//
// funcion para completar la tarea
//
function completarTarea(tareaID) {
  tareas
    .completar(tareaID)
    .then((response) => {
      popupExito("Tarea completada correctamente!");
      buscarTareas();
    })
    .catch((error) => {
      popupError(error);
    });
}

//
// funcion para reabrir una tarea
//
function reabrirTarea(tareaID) {
  tareas
    .descompletar(tareaID)
    .then((response) => {
      popupExito("La tarea se movio a pendientes.");
      buscarTareas();
    })
    .catch((error) => {
      popupError(error);
    });
}

//
// funcion para elimnar una tarea
//
function eliminarTarea(tareaID) {
  tareas
    .eliminar(tareaID)
    .then((response) => {
      popupExito("La tarea se elimino correctamente.");
      buscarTareas();
    })
    .catch((error) => {
      popupError(error);
    });
}

//
// cerrar sesion
//
botonCerrarSesion.addEventListener("click", function (e) {
  // elimino el token
  localStorage.removeItem("jwt");
  // vuelvo al index
  window.location.href = "index.html";
});

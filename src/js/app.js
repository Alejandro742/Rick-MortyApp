//clase que se encarga de la petición get mediante fetch a la api
class API {
  //constructor para declarar cómo buscar el objeto (personaje)
  constructor(personaje) {
    this.personaje = personaje;
  }
  getPersonaje() {
    return this.personaje;
  }
  //método que hace la petición get
  async traerPersonaje() {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${this.personaje}`
    );
    const data = await res.json();
    return data;
  }
}

//escucha del evento submit
const form = document
  .querySelector("#form-personaje")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    //obtener valor del form
    const personaje = document.getElementById("name").value;
    //verifica si no se mandó un string vacío
    if (personaje === "") {
      //se obtiene el div donde irá el mensaje de error
      const mensaje_error = document.getElementById("mensaje-error");

      //se añaden las clases de alerta de bootstrap
      mensaje_error.classList.add(
        "alert",
        "alert-danger",
        "fntsz-secundary",
        "p-2",
        "mb-2",
        "mt-2"
      );

      // se inserta el mensaje al div de error
      mensaje_error.innerHTML = "Campo Vacíos";
      //settimeout para que el mensaje desaparezca a los 3.5 segundos
      setTimeout(() => {
        mensaje_error.classList.remove(
          "alert",
          "alert-danger",
          "fntsz-secundary",
          "p-2",
          "mb-2",
          "mt-2"
        );
        mensaje_error.innerHTML = "";
      }, 3500);
    } else {
      // se establece un instancia de la clase API para hacer la consulta GET
      const query = new API(personaje.trim());
      query
        .traerPersonaje()
        .then((data) => {
          //hacer un objeto con el personaje extraido
          const personaje = {
            name: data.results[0].name,
            status: data.results[0].status,
            species: data.results[0].species,
            image: data.results[0].image,
          };
          //div contenedor de la data del personaje
          const personaje_card = document.getElementById("personaje-card");

          //crear etiqueta imagen para la foto del personaje
          const img = document.createElement("img");
          img.src = personaje.image;
          img.setAttribute("id", "personaje_imagen");

          //verifica si hay una imagen existente de la busqueda anterior
          if (document.getElementById("personaje_imagen") !== null) {
            //si ya hay una imagen entonce elimina ese nodo
            personaje_card.removeChild(
              document.getElementById("personaje_imagen")
            );
          }
          //agrega la etiqueta img
          personaje_card.appendChild(img);

          //agrega los datos del personaje al div
          document.getElementById("nombre-span").innerHTML = personaje.name;
          document.getElementById("estado-span").innerHTML = personaje.status;
          document.getElementById("especie-span").innerHTML = personaje.species;
        })
        .catch((e) => {
          //se obtiene el div donde irá el mensaje de error
          const mensaje_error = document.getElementById("mensaje-error");

          //se añaden las clases de alerta de bootstrap
          mensaje_error.classList.add(
            "alert",
            "alert-danger",
            "fntsz-secundary",
            "p-2",
            "mb-2",
            "mt-2"
          );

          // se inserta el mensaje al div de error
          mensaje_error.innerHTML = "Personaje no encontrado";
          //settimeout para que el mensaje desaparezca a los 3.5 segundos
          setTimeout(() => {
            mensaje_error.classList.remove(
              "alert",
              "alert-danger",
              "fntsz-secundary",
              "p-2",
              "mb-2",
              "mt-2"
            );
            mensaje_error.innerHTML = "";
          }, 3500);

          console.error("Error: " + new Error(e));
        });
    }
  });

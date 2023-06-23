window.onload = () => {
    const qs = (selector) => document.querySelector(selector);

    let $title = qs("#title");
    let $rating = qs("#rating");
    let $awards = qs("#awards");
    let $release_date = qs("#release_date");
    let $length = qs("#length");
    let $genre_id = qs('#genre_id');
    let $movieId = qs("#movieId");
    let $modificar = qs(".botonModificar");
    let $agregar = qs(".botonAgregar");
    let $borrar = qs(".botonBorrar");

    let id = prompt("Para editar una película, ingrese el ID. De lo contrario, cancele y cree una nueva película.");

    if (id) {
        fetch(`http://localhost:3031/api/movies/${id}`)
            .then((response) => response.json())
            .then((data) => {
                let movie = data.data;
                let fecha = new Date(movie.release_date);
                $movieId.value = movie.id;
                $title.value = movie.title;
                $rating.value = movie.rating;
                $awards.value = movie.awards;
                $release_date.value = fecha.toISOString().substring(0, 10);
                $length.value = movie.length;
                $genre_id.value = movie.genre_id;
            })
            .catch((error) => {
                console.log(error);
                alert("Error al obtener los datos de la película");
            });
    }

    $modificar.addEventListener("click", () => {
        let updatedData = {
            title: $title.value,
            rating: $rating.value,
            awards: $awards.value,
            release_date: $release_date.value,
            length: $length.value,
            genre_id: $genre_id.value
        };

        let settings = {
            method: "PUT",
            body: JSON.stringify(updatedData),
            headers: { "Content-Type": "application/json" }
        };

        let url = `http://localhost:3031/api/movies/update/${$movieId.value}`;

        fetch(url, settings)
            .then((response) => response.json())
            .then(() => {
                alert("Película modificada");
            })
            .catch((error) => {
                console.log(error);
                alert("Error al modificar la película");
            });
    });

    $agregar.addEventListener("click", () => {
        let updatedData = {
            title: $title.value,
            rating: $rating.value,
            awards: $awards.value,
            release_date: $release_date.value,
            length: $length.value,
            genre_id: $genre_id.value
        };

        let settings = {
            method: "POST",
            body: JSON.stringify(updatedData),
            headers: { "Content-Type": "application/json" }
        };

        let url = `http://localhost:3031/api/movies/create`;

        fetch(url, settings)
            .then((response) => response.json())
            .then(() => {
                alert("Película creada");
                if (response.ok) {
                    window.location.href = "/home.html";
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Error al crear la película");
            });
    });

    $borrar.addEventListener("click", () => {
 
        let url = `http://localhost:3031/api/movies/delete/${id}`

        let settings = {
            method: "DELETE",
            headers: {"Content-Type" : "application/json"}
        }

        fetch(url, settings)
            .then((response => console.log(response)))
            .then(() => alert("Película borrada"))
            if (response.ok) {
                window.location.href = "/home.html";
          }
    })
}
window.onload = () => {
  let app = document.getElementById("root");
  let container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  let favorite = JSON.parse(localStorage.getItem("favoriteMovies"));

  if (favorite === null || favorite.length === 0) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const message = document.createElement("p");
    message.textContent = "Aún no hay películas favoritas";

    container.appendChild(card);
    card.appendChild(message);
  } else {
    const fetchMovieDetails = (movieId) => {
      fetch(`http://localhost:3031/api/movies/${movieId}`)
        .then((response) => response.json())
        .then((movie) => {
          const card = document.createElement("div");
          card.setAttribute("class", "card");

          const h1 = document.createElement("h1");
          h1.textContent = movie.title;

          const p = document.createElement("p");
          p.textContent = `Rating: ${movie.rating}`;

          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${movie.length}`;

          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
          if (movie.genre !== null) {
            const genero = document.createElement("p");
            genero.textContent = `Género: ${movie.genre.name}`;
            card.appendChild(genero);
          }
          card.appendChild(duracion);
        });
    };

    favorite.forEach((movieId) => {
      fetchMovieDetails(movieId);
    });
  }
};

window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);


  fetch("http://localhost:3031/api/movies")
    .then((response) => response.json())
    .then((peliculas) => {

      let data = peliculas.data;

      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const starIcon = document.createElement("i");
        starIcon.setAttribute("class", "fa-regular fa-star");
        starIcon.setAttribute("data-movieID", movie.id)

        h1.appendChild(starIcon);

        starIcon.addEventListener("click", () => {
          const movieId = starIcon.getAttribute("data-movieID");
          const movieTitle = movie.title;
          const movieRating = movie.rating;
          const movieLength = movie.length;

          const favoriteMovie = {
            id: movieId,
            title: movieTitle,
            rating: movieRating,
            length: movieLength,
          };

          let favoriteMovies = [];

          const storedFavoriteMovies = localStorage.getItem("favoriteMovies");
          if (storedFavoriteMovies) {
            favoriteMovies = JSON.parse(storedFavoriteMovies);
          }

          const movieIndex = favoriteMovies.findIndex(
            (movie) => movie.id === favoriteMovie.id
          );

          if (movieIndex === -1) {
            favoriteMovies.push(favoriteMovie);
            starIcon.classList.add("star-selected");
          } else {
            favoriteMovies.splice(movieIndex, 1);
            starIcon.classList.remove("star-selected");
          }

          localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
        });

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
      });
    })
};

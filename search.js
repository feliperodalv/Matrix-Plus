"use strict";

import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";

export function search() {
  const searchWrapper = document.querySelector("[search-wrapper]");
  const searchField = document.querySelector("[search-field]");

  const searchResultModal = document.createElement("div");
  searchResultModal.classList.add("search-modal");
  document.querySelector("main").appendChild(searchResultModal);

  let searchTimeout;

  searchField.addEventListener("input", function () {
    const query = searchField.value.trim();

    if (!query) {
      searchResultModal.classList.remove("active");
      searchWrapper.classList.remove("searching");
      clearTimeout(searchTimeout);
      return;
    }

    searchWrapper.classList.add("searching");
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function () {
      fetchDataFromServer(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}&page=1&include_adult=false&language=pt-BR`,
        function ({ results: movieList }) {
          searchWrapper.classList.remove("searching");
          searchResultModal.classList.add("active");
          searchResultModal.innerHTML = ""; // Limpa resultados antigos

          searchResultModal.innerHTML = `
            <p class="label">Resultados para</p>
            <h1 class="heading">${query}</h1>
            <div class="movie-list">
              <div class="grid-list"></div>
            </div>
          `;

          for (const movie of movieList) {
            const movieCard = createMovieCard(movie);
            searchResultModal.querySelector(".grid-list").appendChild(movieCard);
          }
        }
      );
    }, 500);
  });
}

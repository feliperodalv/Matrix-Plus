"use strict";

// Add event on multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  for (const elem of elements) elem.addEventListener(eventType, callback);
};

// Toggle search box in mobile device || small screen
const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function () {
  searchBox.classList.toggle("active");
});

// store movieID in `LocalStorage` when you click any card
const getMovieDetail = function (movieId) {
  window.localStorage.setItem("movieId", String(movieId));
};

const getMovieList = function (urlParam, genreName) {
  window.localStorage.setItem("urlParam", urlParam);
  window.localStorage.setItem("genreName", genreName);
};

const logoutButton = document.getElementById('logout-btn');

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // Se o usuário está logado, mostra o botão logout
    logoutButton.style.display = 'flex';
  }
});

logoutButton.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.href = "login.html"; // Redireciona para tela de login após logout
    })
    .catch(error => {
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao sair da conta.");
    });
});

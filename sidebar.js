"use strict";

import { api_key, fetchDataFromServer } from "./api.js";

export function sidebar() {
  const genreList = {};

  // Busca os gêneros traduzidos
  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=pt-BR`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }
      genreLink(); // Gera os links de gêneros
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `
    <div class="sidebar-list">
      <p class="title">Gênero</p>
    </div>

    <div class="sidebar-list">
      <p class="title">Global</p>

      ${createLanguageLinks()}
    </div>

    <div class="sidebar-footer">
      <p class="copyright">
        © 2025 <a href="#" target="_blank">Felipe & Fernando</a>
      </p>
      <img src="./assets/images/tmdb-logo.png" width="130" height="17" alt="tmdb logo" />
    </div>
  `;

  // Cria os links de gênero dinamicamente
  const genreLink = function () {
    const genreContainer = sidebarInner.querySelectorAll(".sidebar-list")[0];

    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.href = "./movie-list.html";
      link.setAttribute("menu-close", "");
      link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
      link.textContent = genreName;
      genreContainer.appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    if (!sidebar.querySelector(".sidebar-inner")) {
      sidebar.appendChild(sidebarInner);
    }
    toggleSidebar(sidebar);
  };

  // Controla o toggle do menu lateral
  const toggleSidebar = function (sidebar) {
    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]");

    addEventOnElements(sidebarTogglers, "click", function () {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    addEventOnElements(sidebarClose, "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };
}

// Gera os links por idioma original
function createLanguageLinks() {
  const languages = [
    { code: "af", label: "Africâner", flag: "🇿🇦" },
    { code: "ar", label: "Árabe", flag: "🇸🇦" },
    { code: "es", label: "Espanhol", flag: "🇪🇸" },
    { code: "hy", label: "Armênio", flag: "🇦🇲" },
    { code: "de", label: "Alemão", flag: "🇩🇪" },
    { code: "zh", label: "Chinês", flag: "🇨🇳" },
    { code: "ko", label: "Coreano", flag: "🇰🇷" },
    { code: "da", label: "Dinamarquês", flag: "🇩🇰" },
    { code: "fr", label: "Francês", flag: "🇫🇷" },
    { code: "he", label: "Hebraico", flag: "🇮🇱" },
    { code: "hi", label: "Hindi", flag: "🇮🇳" },
    { code: "id", label: "Indonésio", flag: "🇮🇩" },
    { code: "en", label: "Inglês", flag: "🇺🇸" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "ja", label: "Japonês", flag: "🇯🇵" },
    { code: "no", label: "Norueguês", flag: "🇳🇴" },
    { code: "pl", label: "Polonês", flag: "🇵🇱" },
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "ru", label: "Russo", flag: "🇷🇺" },
    { code: "sv", label: "Sueco", flag: "🇸🇪" },
    { code: "sw", label: "Suaíli", flag: "🇰🇪" },
    { code: "tr", label: "Turco", flag: "🇹🇷" },
    { code: "zu", label: "Zulu", flag: "🇿🇦" }
  ];

  return languages.map(({ code, label, flag }) => {
    return `<a href="./movie-list.html" menu-close class="sidebar-link"
      onclick='getMovieList("with_original_language=${code}", "${label}")'>
      ${flag} ${label}
    </a>`;
  }).join("\n");
}

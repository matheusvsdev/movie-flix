// Constantes para URLs
const URL_FILMES = "http://localhost:8080/movies";
const URL_SERIES = "http://localhost:8080/series";
const URL_CATEGORIAS = "http://localhost:8080/genres";

// Função que verifica se o backend está disponível
async function isBackendAvailable() {
  try {
    const response = await fetch(URL_CATEGORIAS);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Inicializa o dropdown do usuário
function initializeUserDropdown() {
  const userIcon = document.getElementById("user-icon");
  const dropdownMenu = document.getElementById("dropdown-menu");

  userIcon.addEventListener("click", function () {
    toggleDropdownVisibility(dropdownMenu);
  });

  // Fechar o dropdown se clicar fora dele
  document.addEventListener("click", function (event) {
    if (
      !userIcon.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.style.display = "none";
    }
  });
}

// Inicializa o dropdown de categorias
function initializeCategoryDropdown() {
  const categories = document.getElementById("list-categories");
  const dropdownCategories = document.getElementById("dropdown-categories");

  categories.addEventListener("click", function () {
    toggleDropdownVisibility(dropdownCategories);
  });

  document.addEventListener("click", function (event) {
    if (
      !categories.contains(event.target) &&
      !dropdownCategories.contains(event.target)
    ) {
      dropdownCategories.style.display = "none";
    }
  });
}

// Alterna a visibilidade de um dropdown
function toggleDropdownVisibility(dropdown) {
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

// Inicializa o botão de modo escuro/claro
function initializeDarkModeToggle() {
  const darkModeToggle = document.getElementById("light-mode-toggle");
  darkModeToggle.innerHTML = '<i class="fa-solid fa-toggle-off"></i>';

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      darkModeToggle.innerHTML = '<i class="fa-solid fa-toggle-on"></i>';
    } else {
      darkModeToggle.innerHTML = '<i class="fa-solid fa-toggle-off"></i>';
    }
  });
}

// Inicializa os links de categorias e navegação suave
function initializeCategoryLinks() {
  document.querySelectorAll(".dropdown-categories a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      // Navegação suave
      targetElement.scrollIntoView({ behavior: "smooth" });

      // Fecha o dropdown após a navegação
      const dropdownCategories = document.getElementById("dropdown-genres");
      dropdownCategories.style.display = "none";
    });
  });
}

// Busca categorias do backend e atualiza o dropdown
async function fetchCategories() {
  const response = await fetch(URL_CATEGORIAS);
  const categories = await response.json();
  const dropdown = document.getElementById("dropdown-categories");

  categories.forEach((category, index) => {
    const link = document.createElement("a");
    link.href = `#${index + 1}`; // Usamos o índice + 1 para corresponder aos IDs numéricos das seções
    link.id = `link-${index + 1}`;
    link.textContent = category.description;
  });
}

// Carrega filmes de uma categoria específica ou todos os filmes se categoryId for nulo
function carregarFilmes(
  section,
  categoryId,
  page,
  pageSize,
  listId,
  prevButton,
  nextButton
) {
  const url = categoryId
    ? `${URL_FILMES}?categoryId=${categoryId}&page=${page}&size=${pageSize}`
    : `${URL_FILMES}?page=${page}&size=${pageSize}`;

  console.log(`Loading movies from URL: ${url}`);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const filmesList = document.getElementById(listId);
      filmesList.innerHTML = ""; // Limpa a lista atual

      data.content.forEach((movie) => {
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
                    <img src="${movie.imgUrl}" alt="${movie.title}" />
                    <h3>${movie.title}</h3>
                    <button id="assistir-${movie.id}" class="assistir-button">Assistir</button>
                  `;
        filmesList.appendChild(li);

        // Adiciona evento de click ao botão Assistir
        document
          .getElementById(`assistir-${movie.id}`)
          .addEventListener("click", function () {
            searchMovieById(movie.id);
          });
      });

      // Atualiza o total de páginas no elemento section
      section.dataset.totalPages = data.totalPages;
      console.log(`Total Pages: ${data.totalPages}`);

      updateNavigationButtons(prevButton, nextButton, page, data.totalPages); // Atualiza os botões de navegação
    })
    .catch((error) => console.error("Erro ao carregar filmes:", error));
}

// Carrega séries de uma categoria específica ou todas as séries se categoryId for nulo
function carregarSeries(
  section,
  categoryId,
  page,
  pageSize,
  listId,
  prevButton,
  nextButton
) {
  const url = categoryId
    ? `${URL_SERIES}?categoryId=${categoryId}&page=${page}&size=${pageSize}`
    : `${URL_SERIES}?page=${page}&size=${pageSize}`;

  console.log(`Loading series from URL: ${url}`);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const seriesList = document.getElementById(listId);
      seriesList.innerHTML = ""; // Limpa a lista atual

      data.content.forEach((serie) => {
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
                    <img src="${serie.imgUrl}" alt="${serie.title}" />
                    <h3>${serie.title}</h3>
                    <button id="assistir-${serie.id}" class="assistir-button">Assistir</button>
                  `;
        seriesList.appendChild(li);
      });

      // Atualiza o total de páginas no elemento section
      section.dataset.totalPages = data.totalPages;
      console.log(`Total Pages: ${data.totalPages}`);

      updateNavigationButtons(prevButton, nextButton, page, data.totalPages); // Atualiza os botões de navegação
    })
    .catch((error) => console.error("Erro ao carregar séries:", error));
}

// Inicializa as seções de filmes
function initializeMovieSections() {
  const sections = document.querySelectorAll("section:not(.series)");

  sections.forEach((section) => {
    const categoryId = section.id === "filmes" ? null : section.id; // Verifica se é a seção de "Filmes"
    const listId = section.querySelector("ul").id;
    const prevButton = section.querySelector(".prev-button");
    const nextButton = section.querySelector(".next-button");

    // Armazena a página atual e total de páginas no elemento section
    section.dataset.currentPage = 0;
    section.dataset.totalPages = 0;

    const pageSize = 5; // Mostra 5 filmes por página

    carregarFilmes(
      section,
      categoryId,
      0,
      pageSize,
      listId,
      prevButton,
      nextButton
    );

    prevButton.addEventListener("click", () => {
      scrollListLeft(
        section,
        categoryId,
        listId,
        pageSize,
        prevButton,
        nextButton
      );
    });

    nextButton.addEventListener("click", () => {
      scrollListRight(
        section,
        categoryId,
        listId,
        pageSize,
        prevButton,
        nextButton
      );
    });
  });
}

// Inicializa as seções de filmes
function initializeSerieSections() {
  const sections = document.querySelectorAll("section.series");

  sections.forEach((section) => {
    const categoryId = section.id === "series" ? null : section.id; // Verifica se é a seção de "Filmes"
    const listId = section.querySelector("ul").id;
    const prevButton = section.querySelector(".prev-button");
    const nextButton = section.querySelector(".next-button");

    // Armazena a página atual e total de páginas no elemento section
    section.dataset.currentPage = 0;
    section.dataset.totalPages = 0;

    const pageSize = 5; // Mostra 5 séries por página

    carregarSeries(
      section,
      categoryId,
      0,
      pageSize,
      listId,
      prevButton,
      nextButton
    );

    prevButton.addEventListener("click", () => {
      scrollListLeft(
        section,
        categoryId,
        listId,
        pageSize,
        prevButton,
        nextButton
      );
    });

    nextButton.addEventListener("click", () => {
      scrollListRight(
        section,
        categoryId,
        listId,
        pageSize,
        prevButton,
        nextButton
      );
    });
  });
}

// Scroll para a esquerda
function scrollListLeft(
  section,
  categoryId,
  listId,
  pageSize,
  prevButton,
  nextButton
) {
  let currentPage = parseInt(section.dataset.currentPage, 10);
  let totalPages = parseInt(section.dataset.totalPages, 10);

  if (currentPage > 0) {
    currentPage--;
  } else {
    currentPage = totalPages - 1; // Vai para a última página
  }
  console.log(`Prev clicked, currentPage: ${currentPage}`);

  section.dataset.currentPage = currentPage;

  if (section.classList.contains("series")) {
    carregarSeries(
      section,
      categoryId,
      currentPage,
      pageSize,
      listId,
      prevButton,
      nextButton
    );
  } else {
    carregarFilmes(
      section,
      categoryId,
      currentPage,
      pageSize,
      listId,
      prevButton,
      nextButton
    );
  }
}

// Scroll para a direita
function scrollListRight(
  section,
  categoryId,
  listId,
  pageSize,
  prevButton,
  nextButton
) {
  let currentPage = parseInt(section.dataset.currentPage, 10);
  let totalPages = parseInt(section.dataset.totalPages, 10);

  if (currentPage < totalPages - 1) {
    currentPage++;
  } else {
    currentPage = 0; // Volta para a primeira página
  }
  console.log(`Next clicked, currentPage: ${currentPage}`);

  section.dataset.currentPage = currentPage;

  if (section.classList.contains("series")) {
    carregarSeries(
      section,
      categoryId,
      currentPage,
      pageSize,
      listId,
      prevButton,
      nextButton
    );
  } else {
    carregarFilmes(
      section,
      categoryId,
      currentPage,
      pageSize,
      listId,
      prevButton,
      nextButton
    );
  }
}

// Atualiza os botões de navegação
function updateNavigationButtons(
  prevButton,
  nextButton,
  currentPage,
  totalPages
) {
  if (currentPage === 0) {
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }

  if (currentPage >= totalPages - 1) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
}

// Adiciona um evento de click ao ícone da lupa
document
  .getElementById("magnifying-glass")
  .addEventListener("click", function () {
    // Esconde todas as seções
    document.querySelectorAll("section").forEach(function (section) {
      section.style.display = "none";
    });

    // Cria a seção de resultados da pesquisa se ela não existir
    let searchSection = document.getElementById("search-results");
    if (!searchSection) {
      searchSection = document.createElement("section");
      searchSection.id = "search-results";
      searchSection.innerHTML = `
        <div class="search-bar">
          <input type="text" id="search-input" placeholder="Pesquisar..." />
        </div>
        <ul id="search-results-list" class="list"></ul>
      `;
      document.querySelector("main").appendChild(searchSection);
    }

    // Mostra a seção de resultados da pesquisa
    searchSection.style.display = "block";

    // Adiciona um evento de keyup ao input de pesquisa
    document
      .getElementById("search-input")
      .addEventListener("keyup", function () {
        searchMovies();
        searchSeries();
      });
  });

// Função que faz a requisição ao endpoint de pesquisa e exibe os resultados
function searchMovies() {
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value.trim();
  if (searchQuery === "") return;

  const url = `${URL_FILMES}?title=${searchQuery}&page=0&size=4`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const searchResultsList = document.getElementById("search-results-list");
      searchResultsList.innerHTML = "";

      data.content.forEach((movie) => {
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
            <img src="${movie.imgUrl}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <button id="assistir-${movie.id}">Assistir</button>
          `;
        searchResultsList.appendChild(li);

        // Adiciona evento de click ao botão Assistir
        document
          .getElementById(`assistir-${movie.id}`)
          .addEventListener("click", function () {
            searchMovieById(movie.id);
          });
      });
    })
    .catch((error) => console.error("Erro ao pesquisar filmes:", error));
}

// Função que faz a requisição ao endpoint de pesquisa e exibe os resultados
function searchSeries() {
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value.trim();
  if (searchQuery === "") return;

  const url = `${URL_SERIES}?title=${searchQuery}&page=0&size=4`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const searchResultsList = document.getElementById("search-results-list");
      searchResultsList.innerHTML = "";

      data.content.forEach((serie) => {
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
            <img src="${serie.imgUrl}" alt="${serie.title}" />
            <h3>${movie.title}</h3>
            <button id="assistir-${serie.id}">Assistir</button>
          `;
        searchResultsList.appendChild(li);

        // Adiciona evento de click ao botão Assistir
        document
          .getElementById(`assistir-${serie.id}`)
          .addEventListener("click", function () {
            searchMovieById(movie.id);
          });
      });
    })
    .catch((error) => console.error("Erro ao pesquisar filmes:", error));
}

// Função que faz a requisição ao endpoint de pesquisa por ID e exibe o filme
function searchMovieById(id) {
  const url = `${URL_FILMES}/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((movie) => {
      // Esconde todas as seções
      document.querySelectorAll("section").forEach(function (section) {
        section.style.display = "none";
      });

      // Cria a seção do filme se ela não existir
      let movieSection = document.getElementById("movie-details");
      if (!movieSection) {
        movieSection = document.createElement("section");
        movieSection.id = "movie-details";
        movieSection.className = "movie-details";
        movieSection.innerHTML = `
          <img src="${movie.imgUrl}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>${movie.description}</p>
          <span>${movie.duration} minutos de duração</span>
          <div id="video-player" style="display: none;">
            <iframe id="video-iframe" width="100%" height="360" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <button id="start-button">Assistir</button>
          <button id="back-button">Voltar</button>
        `;
        document.querySelector("main").appendChild(movieSection);
      } else {
        // Atualiza a seção do filme se já existir
        movieSection.querySelector("img").src = movie.imgUrl;
        movieSection.querySelector("img").alt = movie.title;
        movieSection.querySelector("h3").textContent = movie.title;
        movieSection.querySelector("p").textContent = movie.description;
        movieSection.querySelector("#video-iframe").src = movie.videoUrl.replace("watch?v=", "embed/");
      }

      // Mostra a seção do filme
      movieSection.style.display = "block";

      // Adiciona evento de click ao botão Assistir
      document
        .getElementById("start-button")
        .addEventListener("click", function () {
          const videoUrl = movie.videoUrl.replace("watch?v=", "embed/");
          document.getElementById("video-iframe").src = videoUrl;
          document.getElementById("video-player").style.display = "block";
        });

      // Adiciona evento de click ao botão Voltar
      document.getElementById("back-button").addEventListener("click", function () {
        // Remove a seção do filme
        document.getElementById("movie-details").remove();

        // Mostra todas as seções
        document.querySelectorAll("section").forEach(function (section) {
          section.style.display = "block";
        });

        // Rola a página para o topo
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    })
    .catch((error) => console.error("Erro ao pesquisar filme:", error));
}

// Função que faz a requisição ao endpoint de pesquisa e exibe os resultados
function searchMovies() {
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value.trim();
  if (searchQuery === "") return;

  const url = `${URL_FILMES}?title=${searchQuery}&page=0&size=4`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const searchResultsList = document.getElementById("search-results-list");
      searchResultsList.innerHTML = "";

      data.content.forEach((movie) => {
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
            <img src="${movie.imgUrl}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <button id="assistir-search-${movie.id}">Assistir</button>
          `;
        searchResultsList.appendChild(li);

        // Adiciona evento de click ao botão Assistir
        document
          .getElementById(`assistir-search-${movie.id}`)
          .addEventListener("click", function () {
            searchMovieById(movie.id);
          });
      });
    })
    .catch((error) => console.error("Erro ao pesquisar filmes:", error));
}

// Função de click para Séries ou Filmes
document.querySelectorAll(".dropdown-categories a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Redireciona para a URL do link clicado
    const href = link.getAttribute("href");
    window.location.href = href;
  });
});

// Verifica se o backend está disponível antes de carregar as seções e os botões de navegação
isBackendAvailable().then((available) => {
  if (available) {
    // Carrega as seções e os botões de navegação
    initializeUserDropdown();
    initializeCategoryDropdown();
    initializeDarkModeToggle();
    initializeCategoryLinks();
    fetchCategories();
    initializeMovieSections();
    initializeSerieSections();
  } else {
    // Esconde todas as seções e os botões de navegação
    document.querySelectorAll("section").forEach((section) => {
      section.style.display = "none";
    });
    document.getElementById("dropdown-menu").style.display = "none";
    document.getElementById("dropdown-categories").style.display = "none";
    document.getElementById("light-mode-toggle").style.display = "none";
    document.getElementById("magnifying-glass").style.display = "none";
  }
});

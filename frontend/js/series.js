// Constantes para URLs
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
      const dropdownCategories = document.getElementById("dropdown-categories");
      dropdownCategories.style.display = "none";
    });
  });
}

// Busca categorias do backend e atualiza o dropdown
async function fetchCategories() {
  const response = await fetch(URL_CATEGORIAS);
  const categories = await response.json();
  const dropdown = document.getElementById("dropdown-categories");

  // IDs das categorias não exibidas
  const categoriasIgnoradas = [4, 6, 7, 8];

  categories.forEach((category, index) => {
    // Verifica se a categoria está na lista de ignoradas
    if (!categoriasIgnoradas.includes(category.id)) {
      const link = document.createElement("a");
      link.href = `#${index + 1}`; // Usamos o índice + 1 para corresponder aos IDs numéricos das seções
      link.id = `link-${index + 1}`;
      link.textContent = category.description;
      dropdown.appendChild(link);
    }
  });
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
                    <button id="start-button">Assistir</button>
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

// Inicializa as seções de séries
function initializeSerieSections() {
  const sections = document.querySelectorAll("section");

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

  carregarSeries(
    section,
    categoryId,
    currentPage,
    pageSize,
    listId,
    prevButton,
    nextButton
  );
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

  carregarSeries(
    section,
    categoryId,
    currentPage,
    pageSize,
    listId,
    prevButton,
    nextButton
  );
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
        searchSeries();
      });
  });

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
            <h3>${serie.title}</h3>
            <button>Assistir</button>
          `;
        searchResultsList.appendChild(li);
      });
    })
    .catch((error) => console.error("Erro ao pesquisar séries:", error));
}

// Verifica se o backend está disponível antes de carregar as seções e os botões de navegação
isBackendAvailable().then((available) => {
  if (available) {
    // Carrega as seções e os botões de navegação
    initializeUserDropdown();
    initializeCategoryDropdown();
    initializeDarkModeToggle();
    initializeCategoryLinks();
    fetchCategories();
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

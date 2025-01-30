document.addEventListener("DOMContentLoaded", function () {
  initializeUserDropdown();
  initializeCategoryDropdown();
  initializeDarkModeToggle();
  initializeCategoryLinks();
  fetchCategories();
  initializeMovieSections();
});

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
  const response = await fetch("http://localhost:8080/genres");
  const categories = await response.json();
  const dropdown = document.getElementById("dropdown-categories");

  categories.forEach((category, index) => {
    const link = document.createElement("a");
    link.href = `#${index + 1}`; // Usamos o índice + 1 para corresponder aos IDs numéricos das seções
    link.id = `link-${index + 1}`;
    link.textContent = category.description;
    dropdown.appendChild(link);
  });
}

// Inicializa as seções de filmes com base nas categorias
function initializeMovieSections() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const categoryId = section.id === "filmes" ? null : section.id; // Verifica se é a seção de "Filmes"
    const listId = section.querySelector("ul").id;
    const prevButton = section.querySelector(".prev-button");
    const nextButton = section.querySelector(".next-button");

    // Armazena a página atual e total de páginas no elemento section
    section.dataset.currentPage = 0;
    section.dataset.totalPages = 0;

    const pageSize = 5; // Mostra 5 filmes por página

    loadMovies(
      section,
      categoryId,
      0, // Página inicial
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

// Carrega filmes de uma categoria específica ou todos os filmes se categoryId for nulo
function loadMovies(
  section,
  categoryId,
  page,
  pageSize,
  listId,
  prevButton,
  nextButton
) {
  const url = categoryId
    ? `http://localhost:8080/list/${categoryId}?page=${page}&size=${pageSize}`
    : `http://localhost:8080/list?page=${page}&size=${pageSize}`;

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
                    <button>Assistir</button>
                  `;
        filmesList.appendChild(li);
      });

      // Atualiza o total de páginas no elemento section
      section.dataset.totalPages = data.totalPages;
      console.log(`Total Pages: ${data.totalPages}`);

      updateNavigationButtons(prevButton, nextButton, page, data.totalPages); // Atualiza os botões de navegação
    })
    .catch((error) => console.error("Erro ao carregar filmes:", error));
}

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
  loadMovies(
    section,
    categoryId,
    currentPage,
    pageSize,
    listId,
    prevButton,
    nextButton
  );
}

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
  loadMovies(
    section,
    categoryId,
    currentPage,
    pageSize,
    listId,
    prevButton,
    nextButton
  );
}

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

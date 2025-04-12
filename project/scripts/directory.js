const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#display");

let companies = [];

// Load JSON from external file
fetch('data/places.json')
  .then(response => response.json())
  .then(data => {
    companies = data;
    renderGrid(); // default
  });

gridButton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
  renderGrid();
});

listButton.addEventListener("click", () => {
  display.classList.add("list");
  display.classList.remove("grid");
  renderList();
});

function renderGrid() {
  display.innerHTML = "";
  companies.forEach(company => {
    const section = document.createElement("section");
    section.className = "participant";
    section.innerHTML = `
      <h3>${company.name}</h3>
      <img class="part" src="${company.image}" alt="${company.name} logo" loading="lazy" width="100">
      <p><a href="${company.website}" target="_blank">Visit Website</a></p>
    `;
    display.appendChild(section);
  });
}

function renderList() {
  display.innerHTML = "";
  companies.forEach(company => {
    const section = document.createElement("section");
    section.className = "participant-list";
    section.innerHTML = `
        <h3 class="list-title">${company.name}</h3>
        <div class="list-card">
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Website:</strong> <a class="a-list" href="${company.website}">${company.website}</a></p>
        </div>
      
    `;
    display.appendChild(section);
  });
}

const filterType = document.querySelector("#filter-type");
const filterValue = document.querySelector("#filter-value");
const filterButton = document.querySelector("#filter-button");
const clearButton = document.querySelector("#clear-filter");

// Populate second dropdown when a category is selected
filterType.addEventListener("change", () => {
  const selectedCategory = filterType.value;
  const filtered = companies.filter(company => company.category === selectedCategory);

  const options = filtered
    .map(company => `<option value="${company.name}">${company.name}</option>`)
    .join("");

  filterValue.innerHTML = `
    <option disabled selected>Choose a place</option>
    <option value="all">All</option>
    ${options}
  `;
});

// Apply filter
filterButton.addEventListener("click", () => {
  const category = filterType.value;
  const name = filterValue.value;

  if (!category || !name) return;

  const filteredCompanies = name === "all"
    ? companies.filter(company => company.category === category)
    : companies.filter(company => company.category === category && company.name === name);

  display.innerHTML = "";
  filteredCompanies.forEach(company => {
    const section = document.createElement("section");
    section.className = display.classList.contains("grid") ? "participant" : "participant-list";
    section.innerHTML = display.classList.contains("grid")
      ? `
        <h3>${company.name}</h3>
        <img class="part" src="${company.image}" alt="${company.name} logo" loading="lazy" width="100">
        <p><a href="${company.website}" target="_blank">Visit Website</a></p>
      `
      : `
        <h3 class="list-title">${company.name}</h3>
        <div class="list-card">
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Website:</strong> <a class="a-list" href="${company.website}">${company.website}</a></p>
        </div>
      `;
    display.appendChild(section);
  });
});

// Clear filters
clearButton.addEventListener("click", () => {
  filterType.selectedIndex = 0;
  filterValue.innerHTML = "";
  renderGrid(); // or renderList() if you want to preserve current view
});
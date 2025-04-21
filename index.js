const cardTemplate = function (country) {
  return `<div class="card">
               <img id="flag-image" src="${country.flags.svg}" alt="flag of ${country.name.common}" />
              <h1 class="center">${country.name.common}</h1>
            </div>`;
};

const countriesNode = document.getElementById("countries");

const filterSelect = document.createElement("select");
filterSelect.innerHTML = `<option value="all">🌍 Todos los continentes</option>`;
document.body.insertBefore(filterSelect, countriesNode);

let allCountries = [];

fetch("https://restcountries.com/v3.1/all")
  .then(function (response) {
    return response.json();
  })
  .then(function (countries) {
    allCountries = countries
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
      .slice(0, 150);
    countries;

    const continents = [...new Set(allCountries.map((c) => c.continents[0]))];
    continents.forEach((continent) => {
      const option = document.createElement("option");
      option.value = continent;
      option.textContent = continent;
      filterSelect.appendChild(option);
    });

    renderCountries(allCountries);
  });

function renderCountries(countries) {
  countriesNode.innerHTML = "";
  countries.forEach(function (country) {
    countriesNode.innerHTML += cardTemplate(country);
  });
}
filterSelect.addEventListener("change", function () {
  const selected = this.value;
  const filteredCountries =
    selected === "all"
      ? allCountries
      : allCountries.filter((c) => c.continents[0] === selected);

  renderCountries(filteredCountries);
});
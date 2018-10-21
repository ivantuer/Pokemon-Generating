class PokemonList {
  constructor() {
    this.i = 0;
  }
  fetchPokemons() {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => response.json())
      .then(response => this.generateLink(response.results));
  }

  generateLink(pokemon) {
    document.body.innerHTML = "";
    let pokemonList = pokemon.slice(this.i, this.i + 10);

    const container = document.createElement("div");
    container.id = "container";

    pokemonList.forEach(element => {
      var arr = element.url.split("/");
      var hash = arr[arr.length - 2];
      var link = document.createElement("a");

      link.innerHTML = element.name;
      link.href = "pokemon/index.html#" + hash;
      container.appendChild(link);
    });
    container.appendChild(this.createButtons(pokemon));
    document.body.appendChild(container);
  }

  createButtons(pokemon) {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    const pageNumber = document.createElement("p");
    prevButton.innerText = "<-";
    nextButton.innerText = "->";
    pageNumber.innerText = this.i / 10;
    prevButton.onclick = () => {
      this.i = this.i >= 10 ? this.i - 10 : this.i;
      this.generateLink(pokemon);
    };

    nextButton.onclick = () => {
      this.i = this.i + 10;
      this.generateLink(pokemon);
    };

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(pageNumber);
    buttonContainer.appendChild(nextButton);
    return buttonContainer;
  }
}

const Pokemon = new PokemonList();
Pokemon.fetchPokemons();

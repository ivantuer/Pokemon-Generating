class Pokemon {
  constructor() {
    this.query = window.location.hash.split("#")[1];
    this.mainContainer = document.createElement("div");
    this.container = document.createElement("div");
    this.nameAndAbilities = document.createElement("div");
    this.nameAndAbilities.className = "pokemon__name-and-abilities";
    this.container.className = "pokemon";
    document.body.appendChild(this.mainContainer);
  }

  fetchPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + this.query + "/")
      .then(response => response.json())
      .then(response => {
        this.generatePokemon(response);
      });
  }
  generatePokemon(pokemon) {
    this.container.appendChild(this.generateImg(pokemon));
    this.nameAndAbilities.appendChild(this.generateName(pokemon));
    this.nameAndAbilities.appendChild(this.generateAbilities(pokemon));
    this.container.appendChild(this.nameAndAbilities);
    this.mainContainer.appendChild(this.container);
    this.mainContainer.appendChild(this.generateStats(pokemon));
  }
  generateImg(pokemon) {
    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    return img;
  }
  generateName(pokemon) {
    const name = document.createElement("h2");
    name.innerText = pokemon.name;
    return name;
  }

  generateAbilities(pokemon) {
    const abilsContainer = document.createElement("div"),
      abilities = document.createElement("div"),
      abilitiesHeader = document.createElement("h4");
    abilities.className = "pokemon__abilities";
    abilsContainer.className = "pokemon__header-and-abilities";
    abilsContainer.appendChild(abilitiesHeader);
    abilitiesHeader.innerText = "abilities";
    pokemon.abilities.forEach(element => {
      const ability = document.createElement("p");
      ability.className = "ability";
      ability.innerText = element.ability.name;
      abilities.appendChild(ability);
    });
    abilsContainer.appendChild(abilities);
    return abilsContainer;
  }
  generateStats(pokemon) {
    const statsContainer = document.createElement("div");
    statsContainer.className = "stats";
    pokemon.stats.forEach(e => {
      const oneStat = document.createElement("div"),
        statName = document.createElement("p"),
        statProp = document.createElement("p");
      statName.innerText = e.stat.name + ":";
      statName.classList = "stat-name";
      statProp.classList = "stat-prop";
      statProp.innerText = e.base_stat;
      oneStat.appendChild(statName);
      oneStat.appendChild(statProp);
      statsContainer.appendChild(oneStat);
    });

    return statsContainer;
  }
}

const MyPokemon = new Pokemon();
MyPokemon.fetchPokemon();

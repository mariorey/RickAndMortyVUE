<template>
  <header class="header">
    <img alt="Rick and Morty character search" class="logo" src="./assets/logo.png"/>
    <div class="header__toggleCharacters">
      <button class="toggleCharacters" v-bind:class="{ 'enabled': !toggle }" value="characters" v-on:click="toggleCharacters">CHARACTERS</button>
      <button class="toggleCharacters" v-bind:class="{ 'enabled': toggle }" value="episodes" v-on:click="toggleCharacters">EPISODES</button>
    </div>
    <SearchInput v-on:textInput="search"/>
  </header>
  <div class="container" v-bind:class="{ 'disabled': toggle }">
    <aside class="facets">
      <h2 class="filtersTitle">Filters</h2>
      <FilterList filter-type="STATUS" v-bind:filters-collection="statusFilters"
                  v-bind:status-filter-activated="statusFilterActivated"
                  v-on:button-clicked="clickButton($event,'status')">
      </FilterList>
      <FilterList filter-type="GENDER" v-bind:filters-collection="genderFilters"
                  v-on:button-clicked="clickButton($event, 'gender')">
      </FilterList>
    </aside>
    <main>
      <BaseGrid>
        <TransitionGroup name="grid">
          <Card v-for="character in characters" v-bind:key="character.id" v-bind:character="character"/>
        </TransitionGroup>
      </BaseGrid>
    </main>
  </div>
  <div class="episodesContainer" v-bind:class="{ 'disabled': !toggle }">
    <Episodes v-bind:toggle="toggle" v-bind:query="currentQuery" v-bind:filter-active="seasonFilterActivated">
      <FilterList class="seasonFilters" filter-type="SEASON" v-bind:filters-collection='seasons'
                  v-on:button-clicked="clickButton($event, 'season')">
      </FilterList>
    </Episodes>
  </div>
  <footer class="footerInfo"> Created by <a class="gitHubLink" href="https://github.com/mariorey"> Mario Rey</a>
  </footer>
</template>
<script lang="js">
import Card from './components/Card.vue'
import Filter from "@/components/Filter.vue";
import BaseGrid from "@/components/BaseGrid.vue";
import SearchInput from "@/components/SearchInput.vue";
import ClearButton from "@/components/ClearButton.vue";
import FilterList from "@/components/FilterList.vue";
import Episodes from "@/components/Episodes.vue";

export default {
  components: {Episodes, FilterList, ClearButton, Filter, Card, BaseGrid, SearchInput},
  data() {
    return {
      characters: [],
      seasons: ['S01', 'S02', 'S03', 'S04', 'S05'],
      statusFilterActivated: '',
      genderFilterActivated: '',
      seasonFilterActivated: '',
      currentQuery: '',
      statusFilters: ['Alive', 'Dead', 'Unknown'],
      toggle: false,
    };
  },
  mounted() {
    this.initialLoad()
  },
  computed: {
    genderFilters() {
      return this.characters?.reduce((filters, character) => filters.add(character.gender), new Set()) ?? [];
    },

  },
  methods: {

    search(event) {
      const query = event.target.value;
      this.currentQuery = query;
      clearTimeout(this.searchTimer);

      this.searchTimer = setTimeout(() => {
        fetch('https://rickandmortyapi.com/api/character/?name=' + query)
            .then(response => response.json())
            .then(data => {
              this.characters = data.results;
            });
      }, 1000);
    },

    initialLoad() {
      const query = '';
      fetch('https://rickandmortyapi.com/api/character/?name=' + query)
          .then(response => response.json())
          .then(data => {
            this.characters = data.results;
          })
    },

    clickButton(buttonValue, filterType) {

      if (filterType === 'status') {
        this.statusFilterActivated === buttonValue ? this.statusFilterActivated = '' : this.statusFilterActivated = buttonValue
        this.visibleCharacters()
      } else if (filterType === 'gender') {
        this.genderFilterActivated === buttonValue ? this.genderFilterActivated = '' : this.genderFilterActivated = buttonValue
        this.visibleCharacters()
      } else if (filterType === 'season') {
        this.seasonFilterActivated === buttonValue ? this.seasonFilterActivated = '' : this.seasonFilterActivated = buttonValue
      }
    },

    visibleCharacters() {
      fetch('https://rickandmortyapi.com/api/character/?name=' + this.currentQuery + '&status=' + this.statusFilterActivated + '&gender=' + this.genderFilterActivated)
          .then(response => response.json())
          .then(data => {
            this.characters = data.results;
          })
      return this.characters
    },

    toggleCharacters(event) {
      this.toggle = event.target.value !== 'characters';
    },


  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 1em;

  &__toggleCharacters {
    color: dimgrey;
    display: flex;

    justify-content: center;
    border-radius: 0;
  }
}

.logo {
  width: 40vw;
  margin: 0 auto;
}

.facets {
  margin-left: 20px;
  margin-right: -30px;
}

.filter:hover {
  font-weight: 600;
  cursor: pointer;
}

.toggleCharacters {
  font-size: 1em;
  cursor: pointer;
  border-style: none;
  background: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;

}

.enabled {
  font-weight: 600;
}


.container {
  display: flex;
  font-family: 'Arial', sans-serif;
}

.episodesContainer {
  display: flex;
}

.disabled {
  display: none;
}

@media only screen and (max-width: 830px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
  .facets {
    display: flex;
    margin: 0;
  }
  .filtersTitle {
    display: none;
  }
  .logo {
    width: 80vw;
  }

}

.footerInfo {
  display: flex;
  height: 100px;
  background: lightgrey;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  text-transform: uppercase;
}

.gitHubLink {
  margin-left: 3px;
  color: black;
}

.grid-enter-active,
.grid-leave-active {
  transition: all .5s ease;
  transition-delay: .1s;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(.5);
}
</style>

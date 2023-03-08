<template>
  <header class="header">
    <img alt="Rick and Morty character search" class="logo" src="./assets/logo.png"/>
    <SearchInput v-on:textInput="search"/>
  </header>
  <div class="container">
    <aside class="facets">
      <h2 class="filtersTitle">Filters</h2>
      <ul class="filters">
        <li class="filters__label"><span>Status</span></li>
        <li v-for="filter in statusFilters" v-bind:key="filter">
          <Filter filter-type="statusFilter" v-bind:filter="filter"
                  v-on:clickButton="clickButton(filter,'status')">
          </Filter>
        </li>
      </ul>
      <ul class="filters">
        <li class="filters__label"><span>Gender</span></li>
        <li v-for="filter in genderFilters" v-bind:key="filter">
          <Filter filter-type="genderFilter" v-bind:filter="filter"
                  v-on:clickButton="clickButton(filter,'gender')">
          </Filter>
        </li>
      </ul>
    </aside>
    <main>
      <BaseGrid>
        <Card v-for="character in characters" v-bind:key="character.id" v-bind:character="character"/>
      </BaseGrid>
    </main>
  </div>
  <footer class="footerInfo"> Created by <a class="gitHubLink" href="https://github.com/mariorey"> Mario Rey</a></footer>
</template>
<script lang="js">
import Card from './components/Card.vue'
import Filter from "@/components/Filter.vue";
import BaseGrid from "@/components/BaseGrid.vue";
import SearchInput from "@/components/SearchInput.vue";
import ClearButton from "@/components/ClearButton.vue";

export default {
  components: {ClearButton, Filter, Card, BaseGrid, SearchInput},
  data() {
    return {
      characters: [],
      statusFilterActivated: '',
      genderFilterActivated: '',
      currentQuery: '',
      statusFilters: ['Alive', 'Dead', 'Unknown'],
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
      }
    },

    visibleCharacters() {
      fetch('https://rickandmortyapi.com/api/character/?name=' + this.currentQuery + '&status=' + this.statusFilterActivated + '&gender=' + this.genderFilterActivated)
          .then(response => response.json())
          .then(data => {
            this.characters = data.results;
          })
      return this.characters
    }

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
}

.logo {
  width: 40vw;
  margin: 0 auto;
}

.facets{
  margin-left: 20px;
  margin-right: -30px;
}


.filters {
  width: 120px;
  list-style-type: none;

  &__label {
    font-size: 1em;
    text-transform: uppercase;
    margin-bottom:8px;
  }
}


.container {
  display: flex;
  font-family: 'Arial', sans-serif;
}

@media only screen and (max-width: 830px)  {
  .container{
    flex-direction:column;
    align-items: center;
  }
  .facets{
    display:flex;
    margin: 0;
  }
  .filtersTitle{
    display:none;
  }
  .logo{
    width:80vw;
  }

}

.footerInfo{
  display:flex;
  height: 100px;
  background: lightgrey;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  text-transform: uppercase;
}

.gitHubLink{
  margin-left: 3px;
  color: black;
}
</style>

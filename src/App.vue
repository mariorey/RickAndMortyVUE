<template>
  <header class="header">
    <img alt="Rick and Morty character search" class="logo" src="./assets/logo.png"/>
    <SearchInput v-on:textInput="search"/>
  </header>
  <div class="container">
    <aside class="facets">
      <h2>Filters</h2>
      <span>Status</span>
      <ul class="filters">
        <li v-for="filter in statusFilters" v-bind:key="filter">
          <Filter filter-type="statusFilter" v-bind:filter="filter" v-on:clickCheckbox="changeRadio(filter,'status')">
          </Filter>
        </li>
      </ul>
      <span>Gender</span>
      <ul class="filters">
        <li v-for="filter in genderFilters" v-bind:key="filter">
          <Filter filter-type="genderFilter" v-bind:filter="filter" v-on:clickCheckbox="changeRadio(filter,'gender')">
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
      statusRadioActivated: '',
      genderRadioActivated: '',
      currentQuery: ''
    };
  },
  mounted() {
    this.initialLoad()
  },
  computed: {
    statusFilters() {
      return this.characters?.reduce((filters, character) => filters.add(character.status), new Set()) ?? [];
    },
    genderFilters() {
      return this.characters?.reduce((filters, character) => filters.add(character.gender), new Set()) ?? [];
    },

  },


    methods: {
      search(event) {
        const query = event.target.value;
        this.currentQuery = query;
        clearTimeout(this.searchTimer);
        console.log(event.target.value)

        this.searchTimer = setTimeout(() => {
          console.log(this.statusRadioActivated)
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

      changeRadio(radioValue, radioType) {
        if (radioType === 'status') {
          this.statusRadioActivated = radioValue;
          this.visibleCharacters()
        } else if (radioType === 'gender') {
          this.genderRadioActivated = radioValue;
          this.visibleCharacters()
        }
      },

      visibleCharacters() {
        console.log(this.genderRadioActivated)
        console.log(this.statusRadioActivated)

        if (this.statusRadioActivated.length > 0 || this.genderRadioActivated.length > 0) {
          fetch('https://rickandmortyapi.com/api/character/?name=' + this.currentQuery + '&status=' + this.statusRadioActivated + '&gender=' + this.genderRadioActivated)
              .then(response => response.json())
              .then(data => {
                this.characters = data.results;
              })
          return this.characters
        } else {
          return this.characters;
        }
      }

  }
}
</script>

<style scoped>
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



.filters {
  width: 120px;
  list-style-type: none;
}


.container {
  display: flex;
}
</style>

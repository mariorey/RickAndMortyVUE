<template>
  <div class="content">
  <div class="episodes">
    <h2>EPISODES</h2>
    <ul class="episodes__list">
      <TransitionGroup name="list">
      <li class="episodes__listElement" v-for="episode in episodes" :key="episode.id">
        {{ episode.name }} ({{ episode.episode }})
      </li>
      </TransitionGroup>
    </ul>
  </div>
  <aside class="aside"><slot></slot></aside>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['toggle'],
  data() {
    return {
      episodes: [],
    };
  },
  computed: {
    ...mapState('search', ['query', "seasonFilterActivated"])
  },
  mounted() {
    this.initialLoad()
  },
  methods: {
    initialLoad(page = 1) {
      const url = `https://rickandmortyapi.com/api/episode?page=${page}`;
      fetch(url)
          .then(response => response.json())
          .then(data => {
            this.episodes = this.episodes.concat(data.results);
            if (data.info.next) {
              this.initialLoad(page + 1);
            }
          });
    },

    fetchEpisodeByName(query){
      if(this.toggle){
        fetch('https://rickandmortyapi.com/api/episode?name=' + query + '&episode=' + this.seasonFilterActivated)
            .then(response => response.json())
            .then(data => {
              this.episodes = data.results;
            });
      }

    },


  },
  watch: {
    query(newQuery) {
      if(newQuery === ''){
        this.initialLoad()
      }
      else{
        this.fetchEpisodeByName(newQuery);
      }
    },
    seasonFilterActivated(newFilter){
      newFilter !== '' ? this.fetchEpisodeByName(this.query) : this.initialLoad()
    }

  }
};
</script>
<style scoped lang="scss">

.content{
  font-family:'Arial', sans-serif;
  display: flex;
  flex-direction: row-reverse;
}

.episodes{
  display:flex;
  flex-basis:100%;
  flex-direction:column;
  align-items:center;
  &__list{
    align-self:center;
  }
  &__listElement{
    margin:3px;
  }
}

.aside{
  padding-top: 60px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
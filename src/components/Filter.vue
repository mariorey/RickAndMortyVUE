<template>
    <button class="filter" v-bind:value="filter" v-bind:name="filterType" v-bind:class="{ enabled: isActive }"
            @click="toggleEnabled"  v-on:click="clickButton">
      {{ filter }}
    </button>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Filter",
  props: ['filter', 'filterType'],
  methods:{
    toggleEnabled(event) {
      event.target.classList.toggle('enabled')
    },
    clickButton(event){
      if(this.filterType.toString() === 'status'){
        this.statusFilterActivated === event.target.value ? this.$store.commit('setStatusFilterActivated', '')
            : this.$store.commit('setStatusFilterActivated', event.target.value)
      }
      else if(this.filterType.toString() === 'gender'){
        this.genderFilterActivated === event.target.value ? this.$store.commit('setGenderFilterActivated', '')
            : this.$store.commit('setGenderFilterActivated', event.target.value)
      }
      else if(this.filterType.toString() === 'season'){
        this.seasonFilterActivated === event.target.value ? this.$store.commit('setSeasonFilterActivated', '')
            : this.$store.commit('setSeasonFilterActivated', event.target.value)
      }
    }
  },
  computed: {
    isActive() {
      return this.filter === this.$store.state.statusFilterActivated;
    },
    ...mapState(["statusFilterActivated", "genderFilterActivated", "seasonFilterActivated"])

},
}


</script>

<style scoped>

.filter:hover {
  font-weight: 600;
  cursor: pointer;
}
.filter {
  font-size: 1em;
  border-style:none;
  background:none;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.enabled{
  font-weight:600;
}

</style>
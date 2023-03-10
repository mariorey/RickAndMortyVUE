<template>
    <button class="filter" v-bind:value="filter" v-bind:name="filterType" v-bind:class="{ enabled: isActive }"
            @click="toggleEnabled"  v-on:click="clickButton">
      {{ filter }}
    </button>
</template>

<script>
export default {
  name: "Filter",
  props: ['filter', 'filterType'],
  methods:{
    toggleEnabled(event) {
      event.target.classList.toggle('enabled')
    },
    clickButton(event){
      if(this.filterType.toString() === 'status'){
        this.$store.state.statusFilterActivated === event.target.value ? this.$store.state.statusFilterActivated = ''
            : this.$store.state.statusFilterActivated = event.target.value
      }
      else if(this.filterType.toString() === 'gender'){
        this.$store.state.genderFilterActivated === event.target.value ? this.$store.state.genderFilterActivated = ''
            : this.$store.state.genderFilterActivated = event.target.value
      }
      else if(this.filterType.toString() === 'season'){
        this.$store.state.seasonFilterActivated === event.target.value ? this.$store.state.seasonFilterActivated = ''
            : this.$store.state.seasonFilterActivated = event.target.value
      }
    }
  },
  computed: {
    isActive() {
      return this.filter === this.$store.state.statusFilterActivated;
    },
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
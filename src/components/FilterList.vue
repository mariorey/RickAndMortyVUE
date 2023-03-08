<template>
  <ul class="filters">
    <li class="filters__label"><span>{{filterType}}</span></li>
    <li v-for="filter in filtersCollection" v-bind:key="filter">
      <Filter filter-type={filterType} v-bind:filter="filter" v-on:clickButton="buttonClicked(filter,filterType)">
      </Filter>
    </li>
  </ul>
</template>

<script>
import Filter from "@/components/Filter.vue";

export default {
  props: ['filtersCollection', 'filterType', 'statusFilterActivated'],
  name: "FilterList",
  components: {Filter},

  methods: {
    buttonClicked(filter,filterType){
      this.$emit('button-clicked', filter, filterType);
},
  }
}
</script>

<style scoped>

</style>
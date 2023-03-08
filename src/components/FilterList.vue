<template>
  <ul class="filters">
    <li class="filters__label"><span>{{filterType}}</span></li>
    <TransitionGroup name="list">
    <li v-for="filter in filtersCollection" v-bind:key="filter">

      <Filter filter-type={filterType} v-bind:filter="filter" v-on:clickButton="buttonClicked(filter,filterType)">
      </Filter>
    </li>
    </TransitionGroup>
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

<style scoped lang="scss">
.filters {
  width: 120px;
  list-style-type: none;

&__label {
   font-size: 1em;
   text-transform: uppercase;
   margin-bottom:8px;
 }
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
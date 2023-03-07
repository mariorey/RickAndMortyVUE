<template>
  <label class="filter">{{filter}}
    <input type="radio" v-bind:value="filter" v-bind:name="filterType" v-on:change="$emit('clickCheckbox',$event)" v-bind:value="val" v-model="selected" :id="val">
  </label>
</template>

<script>
export default {
  name: "Filter",
  props: ['filter', 'filterType'],
  data: {
    d_selected: ''
  },
  methods: {
    deselectFilter() {

    }
  }
}


</script>

<style scoped>

.filter:hover {
  font-weight: 600;
  cursor: pointer;
}
.filter {
  margin-bottom: 8px;
}

</style>
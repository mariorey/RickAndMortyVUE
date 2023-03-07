<template>
    <button class="filter" v-bind:value="filter" v-bind:name="filterType" v-bind:class="{ enabled: isActive }"
            @click="toggleEnabled"  v-on:click="$emit('clickButton',$event)">
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
    }
  },
  computed: {
    isActive() {
      return this.filter === this.$parent.statusFilterActivated;
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
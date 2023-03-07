<template>
  <section class="characters">
    <slot></slot>
  </section>
</template>

<script>
import Filter from "@/components/Filter.vue";
import Card from "@/components/Card.vue";

export default {
  components: {Card},
  name: "BaseGrid"
}
</script>

<style scoped>
.characters {
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  gap: 12px;
}
</style>
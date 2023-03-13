<template>
  <section class="characters">
    <slot></slot>
  </section>
</template>

<script>
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

@media only screen and (max-width: 900px) {
  .characters{
    justify-content: center;
  }
}

</style>
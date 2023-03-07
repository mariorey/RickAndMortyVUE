<template>
  <button class="button__clear" v-on:click="$emit('clearButton',$event)">X</button>
</template>

<script>
export default {
  name: "ClearButton"
}
</script>

<style scoped>
.button__clear{
  height: 25px;
  width: 25px;
  border-radius: 12.5px;
  border-style: dashed;
  margin-left: 0.6em;
}
</style>
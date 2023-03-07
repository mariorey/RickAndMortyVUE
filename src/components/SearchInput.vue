<template>
  <input class="search" placeholder="Search for a character" v-on:input="$emit('textInput',$event)"/>
</template>

<script>
export default {
  name: "SearchInput"
}
</script>

<style scoped>
.search {
  width: 40vw;
  height: 2em;
  margin: 0 auto;
}
</style>
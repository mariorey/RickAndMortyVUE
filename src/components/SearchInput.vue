<template>
  <input class="search" placeholder="Search for a character" v-on:input="changeQuery"/>
</template>

<script>
export default {
  name: "SearchInput",
  methods: {
    changeQuery(event){
      this.$store.state.query = event.target.value
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  width: 40vw;
  height: 44px;
  font-size: 0.8em;
  border:none;
  border-bottom: 1px solid black;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0 auto;
  &:focus{
     outline-width: 0;
   }
}

@media only screen and (max-width: 830px)  {
  .search{
    width: 80%;
  }
}
</style>
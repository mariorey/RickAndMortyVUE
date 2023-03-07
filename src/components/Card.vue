<template>
  <article v-bind:key="character.id" class="character">
    <img class="character__image" v-bind:alt="'Character image of'+character.name" v-bind:src="character.image">
    <div class="character__description">
            <span class="character__name">
            {{ character.name }}
          </span>
      <span class="status"
            v-bind:class="'status--'+character.status.toLowerCase()">{{ character.status }}</span>
    </div>
  </article>
</template>

<script>
export default {
  props: ['character'],

}
</script>

<style scoped>
.character {
  display: flex;
  flex-flow: column;
  width: 250px;
  height: 350px;
  border: 1px solid black;
  border-radius: 5px;
}

.character__description {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status {
  padding: 5px;
  color: white;
}

.status--alive {
  background: green;
}

.status--dead {
  background: red;
}

.status--unknown {
  background: gray;
}
</style>
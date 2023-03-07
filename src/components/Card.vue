<template>
  <article v-bind:key="character.id" class="character">
    <img class="character__image" v-bind:alt="'Character image of'+character.name" v-bind:src="character.image"/>
    <div class="character__description">
          <span class="character__name">
            {{ character.name }}
          </span>
      <span class="character__status"
            v-bind:class="'character__status--'+character.status.toLowerCase()">{{ character.status }}</span>
    </div>
  </article>
</template>

<script>
export default {
  props: ['character'],

}
</script>

<style scoped lang="scss">

.character {
  display: flex;
  flex-flow: column;
  width: 250px;
  height: 350px;
  border: 1px solid black;
  border-radius: 15px;

  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__image {
    border-radius: 15px;
  }

  &__status {
    padding: 5px;
    color: white;

    &--alive {
      background: green;
    }

    &--dead {
      background: red;
    }

    &--unknown {
      background: gray;
    }
  }
}
</style>
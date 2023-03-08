<template>

  <article v-bind:key="character.id" class="character">
    <img class="character__image" v-bind:alt="'Character image of'+character.name" v-bind:src="character.image"/>
    <div class="character__description">
          <span class="character__name">
            {{ character.name }}
          </span>
      <span class="character__status"
            v-bind:class="'character__status--'+character.status.toLowerCase()">{{ character.status }}</span>
      <div class="character__info">
        <span class="character__gender">
            Gender: {{ character.gender }}
          </span>
        <span class="character__origin">
          Origin : {{character.origin.name}}
        </span>
      </div>


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
  height: 340px;
  border: 1px solid black;
  border-radius: 15px;
  &:hover .character__info{
      opacity:1;
  }

  &__description {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  &__image {
    border-radius: 15px;
  }

  &__name {
    margin-left:0.5em;
    border-bottom: black
  }

  &__info{
    display:flex;
    flex-direction:column;
    text-align: center;
    flex-basis:100%;
    color:grey;
    opacity:0;
    transition: 0.3s;
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
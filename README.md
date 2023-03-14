# RickAndMortyVue

This challenge is about creating a SPA emulating an eCommerce search engine using the Vue Framework. The caracters shown on the app are consumed from https://rickandmortyapi.com/

## Features achieved
1. Create Basic HTML and CSS structure in App.vue without any logic.
2. Modify text input so it makes API calls to rick & morty API using the filter endpoint. Save the results and print the characters by console.
3. Paint dynamically with v-for the characters with its name, status and image.
4. Modify the filters so they use the filters inside characters and print them dynamically with v-for. Make the filters work also.
5. Move each filter, character card and input to a separate component (e.g StatusFilter,CharacterCard,SearchInput) but ensure the application works properly after these changes.
6. Make one API call per filter, following API specification.
7. Put CharacterCard inside a Grid component to use slots.
8. Create FilterList component that made the filter rendered interchangeable.

## Branch vuex-challenge
On the branch vuex-challenge I implemented every feature detailed before but using the Vuex library. The advantages using the Vuex library is that you can create a store where every state created there can be accessed from any component directly.

## DEMO
<img width="1440" alt="Screenshot 2023-03-09 at 12 25 32" src="https://user-images.githubusercontent.com/80252232/224986110-5407ee22-c69f-4dbb-9bcb-db08f07b1eb1.png">
You can see a demo of the app in this link:
mariorey.github.io/RickAndMortyVUE/



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

<script>
import { store } from './store';
import ComponentNavbar from "./components/ComponentNavbar.vue";
import ComponentFilmCard from "./components/ComponentFilmCard.vue";
export default {
    components: {
        ComponentNavbar,
        ComponentFilmCard
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <ComponentNavbar />
    <h2>Film</h2>
    <ComponentFilmCard v-for="film in this.store.foundFilms" :title="film.title" :original_title="film.original_title"
        :original_language="film.original_language" :vote_average="film.vote_average" />
    <h2>Serie TV</h2>
    <ComponentFilmCard v-for="TVserie in this.store.foundTVseries" :title="TVserie.title"
        :original_title="TVserie.original_title" :original_language="TVserie.original_language"
        :vote_average="TVserie.vote_average" />
</template>

<style scoped>
h2 {
    margin-top: 1rem;
}
</style>

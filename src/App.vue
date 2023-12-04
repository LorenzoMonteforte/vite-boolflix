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
    <ComponentFilmCard v-for="film in this.store.foundFilms" :title="film.title" :original_title="film.original_title"
        :original_language="film.original_language" :vote_average="film.vote_average" />
</template>

<style scoped></style>

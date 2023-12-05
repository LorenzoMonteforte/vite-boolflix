<script>
import { store } from '../store';
import ComponentCard from './ComponentCard.vue';
export default {
    name: "ComponentMain",
    components: {
        ComponentCard
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <main>
        <div id="notFoundMessage" v-if="store.foundFilms.length == 0 && store.foundTVseries.length == 0">{{ store.notFound
        }}</div>
        <h2 v-if="store.foundFilms.length != 0">FILM</h2>
        <div class="cardContainer">
            <ComponentCard v-for="film in this.store.foundFilms" :srcCopertina="film.srcCopertina" :title="film.title"
                :original_title="film.original_title" :overview="film.overview" :numberStar="film.numberStar"
                :original_language="film.original_language" />
        </div>
        <h2 v-if="store.foundTVseries.length != 0">SERIE TV</h2>
        <div class="cardContainer">
            <ComponentCard v-for="TVserie in this.store.foundTVseries" :srcCopertina="TVserie.srcCopertina"
                :title="TVserie.title" :original_title="TVserie.original_title" :overview="TVserie.overview"
                :numberStar="TVserie.numberStar" :original_language="TVserie.original_language" />
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: rgba(77, 77, 77, 255);
    padding: 0 3rem;
    padding-top: calc(1.5rem + 100px);
    padding-bottom: 3rem;
    min-height: 100vh;
}

#notFoundMessage {
    font-size: 1.5rem;
    color: white;
}

.cardContainer {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
}

h2 {
    text-align: center;
    color: white;
    margin-bottom: 1.5rem;
}

h2:last-of-type {
    margin-top: 1.5rem;
}
</style>
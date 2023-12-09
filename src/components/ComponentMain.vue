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
        <div id="notFoundMessage" v-if="store.found[0].length == 0 && store.found[1].length == 0">{{ store.notFound
        }}</div>
        <h2 v-if="store.found[0].length != 0">FILM {{ store.title }}</h2>
        <div class="cardContainer">
            <ComponentCard v-for="film in this.store.found[0]" :srcCopertina="film.srcCopertina" :title="film.title"
                :original_title="film.original_title" :overview="film.overview" :numberStar="film.numberStar"
                :original_language="film.original_language" :actors="film.actors" :genresName="film.genresName" />
        </div>
        <div class="btnContainer" v-if="store.showMore[0] == true">
            <button @click="store.methods.downloadAPI(0, false, store.whichFilter[0])">
                Mostra altri contenuti
            </button>
        </div>
        <h2 :class="store.found[0].length != 0 ? 'marTop1_5rem' : ''" v-if="store.found[1].length != 0">SERIE TV {{
            store.title }}</h2>
        <div class="cardContainer">
            <ComponentCard v-for="TVserie in this.store.found[1]" :srcCopertina="TVserie.srcCopertina"
                :title="TVserie.title" :original_title="TVserie.original_title" :overview="TVserie.overview"
                :numberStar="TVserie.numberStar" :original_language="TVserie.original_language" :actors="TVserie.actors"
                :genresName="TVserie.genresName" />
        </div>
        <div class="btnContainer" v-if="store.showMore[1] == true">
            <button @click="store.methods.downloadAPI(1, false, store.whichFilter[1])">
                Mostra altri contenuti
            </button>
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: rgba(77, 77, 77, 255);
    padding: 0 3rem;
    padding-top: calc(1.5rem + 100px);
    padding-bottom: 1.5rem;
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

.btnContainer {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
}

.btnContainer>button {
    padding: 0.5rem;
    border: none;
    color: white;
    background-color: rgba(27, 27, 27, 255);
}
</style>
<script>
import { store } from '../store';
export default {
    name: "ComponentSelect",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div>
        <select class="inpBtn" v-model="store.genreFilmSelect" @change="store.methods.downloadAPIfilms(true, 'byGenre')">
            <option value="">Ricerca film per genere</option>
            <option v-for="genreFilm in store.genresFilms" :value="genreFilm.id">{{ genreFilm.name }}</option>
        </select>
        <select class="inpBtn" v-model="store.genreTVserieSelect"
            @change="store.methods.downloadAPITVseries(true, 'byGenre')">
            <option value="">Ricerca serie TV per genere</option>
            <option v-for="genreTVserie in store.genresTVseries" :value="genreTVserie.id">{{ genreTVserie
                .name }}</option>
        </select>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
}

.inpBtn {
    height: 1.5rem;
    border: none;
    padding: 0 0.5rem;
    color: white;
    background-color: transparent;
}

select:focus {
    outline: none;
}

option {
    color: white;
    background-color: rgba(27, 27, 27, 255);
}
</style>
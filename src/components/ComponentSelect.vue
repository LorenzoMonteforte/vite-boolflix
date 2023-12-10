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
        <select class="inpBtn" v-model="store.genreSelected[0]"
            @change="store.methods.downloadAPI(0, true, 'byGenre'), store.genreSelected[0] == '' ? store.methods.downloadAPI(1, true, 'byGenre') : ''">
            <option value="">Ricerca film per genere</option>
            <option v-for="genreFilm in store.genres[0]" :value="genreFilm.id">{{ genreFilm.name }}</option>
        </select>
        <select class="inpBtn" v-model="store.genreSelected[1]"
            @change="store.methods.downloadAPI(1, true, 'byGenre'), store.genreSelected[1] == '' ? store.methods.downloadAPI(0, true, 'byGenre') : ''">
            <option value="">Ricerca serie TV per genere</option>
            <option v-for="genreTVserie in store.genres[1]" :value="genreTVserie.id">{{ genreTVserie
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

select:hover {
    cursor: pointer;
}

@media only screen and (max-width: 992px) {
    div {
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
        gap: 1.5rem;
    }
}

@media only screen and (max-width: 576px) {
    div {
        justify-content: space-between;
        gap: unset;
    }
}
</style>
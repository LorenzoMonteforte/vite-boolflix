<script>
export default {
    name: "ComponentCard",
    props: {
        srcCopertina: String,
        title: String,
        original_title: String,
        overview: String,
        numberStar: Number,
        original_language: String,
        actors: Array,
        genresName: Array
    }
}
</script>

<template>
    <div class="card">
        <img id="copertina" :src="srcCopertina" :alt="original_title">
        <div>
            <div>
                <strong>Titolo: </strong>
                <span class="fonSiz0_9rem">{{ title }}</span>
            </div>
            <div class="marTop0_5rem">
                <strong>Titolo originale: </strong>
                <span class="fonSiz0_9rem">{{ original_title }}</span>
            </div>
            <div class="marTop0_5rem">
                <strong v-if="genresName.length != 0">Genere: </strong>
                <span class="fonSiz0_9rem" v-for="(genre, i) in genresName">
                    <span v-if="i < (genresName.length - 1)">{{ genre }}, </span>
                    <span v-else>{{ genre }}.</span>
                </span>
            </div>
            <div class="marTop0_5rem">
                <strong>Panoramica: </strong>
                <span class="fonSiz0_9rem">{{ overview }}</span>
            </div>
            <div class="marTop0_5rem texAliCen">
                <span class="colYel" v-for="n in numberStar">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </span>
                <span class="colYel" v-for="n in (5 - numberStar)">
                    <font-awesome-icon icon="fa-regular fa-star" />
                </span>
            </div>
            <div class="marTop0_5rem">
                <strong class="verAliMid">Lingua originale: </strong>
                <img class="bandiera" src="../assets/img_bandiere/it.png" alt="Bandiera italiana"
                    v-if="original_language == 'it'">
                <img class="bandiera" src="../assets/img_bandiere/en.png" alt="Bandiera inglese"
                    v-else-if="original_language == 'en'">
                <img class="bandiera" src="../assets/img_bandiere/fr.png" alt="Bandiera francese"
                    v-else-if="original_language == 'fr'">
                <img class="bandiera" src="../assets/img_bandiere/de.png" alt="Bandiera tedesca"
                    v-else-if="original_language == 'de'">
                <img class="bandiera" src="../assets/img_bandiere/es.png" alt="Bandiera spagnola"
                    v-else-if="original_language == 'es'">
                <span v-else>{{ original_language }}</span>
            </div>
            <div class="marTop0_5rem">
                <strong v-if="actors.length != 0">Attori: </strong>
                <span class="fonSiz0_9rem" v-for="(actor, i) in actors">
                    <span :class="i == 0 ? 'fonWeiBol' : ''" v-if="i < (actors.length - 1)">{{ actor.name }}, </span>
                    <span v-else>{{ actor.name }}.</span>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    aspect-ratio: 1 / 1.618;
    width: calc((100% - 4.5rem) / 4);
    background-color: rgba(27, 27, 27, 255);
    color: white;
    box-shadow: 1px 1px 3px 1px rgba(27, 27, 27, 255);
}

.card>img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
}

.card:hover #copertina {
    display: none;
}

.card>div {
    height: 100%;
    width: 100%;
    background-color: rgba(27, 27, 27, 255);
    display: none;
    padding: 1rem;
    overflow: auto;
}

.card:hover div {
    display: block;
}

.bandiera {
    height: 30px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    vertical-align: middle;
}

.colYel {
    color: yellow;
}

.fonWeiBol {
    font-weight: bold;
}
</style>
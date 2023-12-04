<script>
export default {
    name: "ComponentFilmCard",
    props: {
        title: String,
        original_title: String,
        original_language: String,
        vote_average: Number,
        srcCopertina: String,
        numberStar: Number
    }
}
</script>

<template>
    <div class="filmCard">
        <div>Titolo: {{ title }}</div>
        <div>Titolo originale: {{ original_title }}</div>
        <div>
            <span>Lingua originale: </span>
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
        <div>Voto: {{ vote_average }}</div>
        <div>
            <span>Numero di stelle: </span>
            <span v-for="n in numberStar">
                <font-awesome-icon icon="fa-solid fa-star" />
            </span>
            <span v-for="n in (5 - numberStar)">
                <font-awesome-icon icon="fa-regular fa-star" />
            </span>
        </div>
        <img :src="srcCopertina" :alt="'Copertina ' + title">
    </div>
</template>

<style scoped>
.filmCard {
    margin-top: 1rem;
}

.filmCard>span {
    vertical-align: middle;
}

.bandiera {
    height: 30px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    vertical-align: middle;
}
</style>
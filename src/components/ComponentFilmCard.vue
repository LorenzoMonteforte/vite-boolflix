<script>
export default {
    name: "ComponentFilmCard",
    props: {
        title: String,
        original_title: String,
        original_language: String,
        vote_average: Number
    }
}
</script>

<template>
    <div class="filmCard">
        <div>Titolo: {{ title }}</div>
        <div>Titolo originale: {{ original_title }}</div>
        <span>Lingua originale: </span>
        <img src="../assets/img_bandiere/it.png" alt="Bandiera italiana" v-if="original_language == 'it'">
        <img src="../assets/img_bandiere/en.png" alt="Bandiera inglese" v-else-if="original_language == 'en'">
        <img src="../assets/img_bandiere/fr.png" alt="Bandiera francese" v-else-if="original_language == 'fr'">
        <img src="../assets/img_bandiere/de.png" alt="Bandiera tedesca" v-else-if="original_language == 'de'">
        <img src="../assets/img_bandiere/es.png" alt="Bandiera spagnola" v-else-if="original_language == 'es'">
        <span v-else>{{ original_language }}</span>
        <div>Voto: {{ vote_average }}</div>
    </div>
</template>

<style scoped>
.filmCard {
    margin-top: 1rem;
}

.filmCard>span {
    vertical-align: middle;
}

.filmCard>img {
    height: 30px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    vertical-align: middle;
}
</style>
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
        <div>Lingua originale: {{ original_language }}</div>
        <div>Voto: {{ vote_average }}</div>
    </div>
</template>

<style scoped>
.filmCard {
    margin-top: 1rem;
}
</style>
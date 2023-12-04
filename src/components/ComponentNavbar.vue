<script>
import { store } from '../store';
export default {
    name: "ComponentNavbar",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <input type="text" v-model="this.store.search">
    <button @click="this.store.methods.downloadAPI()">Cerca</button>
</template>

<style scoped></style>
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
    <nav>
        <input class="inpBtn" type="text" v-model="this.store.search" @keyup.enter="this.store.methods.downloadAPI()">
        <button class="inpBtn" @click="this.store.methods.downloadAPI()">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
    </nav>
</template>

<style scoped>
input {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
}

input:focus {
    outline: none;
}

button {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
}

.inpBtn {
    height: 1.5rem;
    border: none;
    padding: 0 0.5rem;
    color: white;
    background-color: rgba(77, 77, 77, 255);
}
</style>
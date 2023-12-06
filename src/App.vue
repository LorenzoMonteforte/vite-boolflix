<script>
import { store } from './store';
import ComponentHeader from './components/ComponentHeader.vue';
import ComponentMain from './components/ComponentMain.vue';
export default {
    components: {
        ComponentHeader,
        ComponentMain
    },
    data() {
        return {
            store
        }
    },
    mounted() {
        store.methods.downloadAPIgenres();
    }
}
</script>

<template>
    <ComponentHeader />
    <ComponentMain />
</template>

<style scoped></style>

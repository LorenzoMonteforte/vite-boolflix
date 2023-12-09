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
        store.methods.downloadAPI(0, true, "byPopularity");
        store.methods.downloadAPI(1, true, "byPopularity");
        store.methods.downloadAPIgenres();
    }
}
</script>

<template>
    <ComponentHeader />
    <ComponentMain />
</template>

<style scoped></style>

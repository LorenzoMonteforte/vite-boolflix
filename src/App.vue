<script>
import { store } from './store';
export default {
    data() {
        return {
            store
        }
    },
    mounted() {
        this.store.methods.downloadAPI();
    }
}
</script>

<template></template>

<style scoped></style>

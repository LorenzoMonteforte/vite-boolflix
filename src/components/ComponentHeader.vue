<script>
import ComponentNavbar from './ComponentNavbar.vue';
export default {
    name: "ComponentHeader",
    components: {
        ComponentNavbar
    }
}
</script>

<template>
    <header>
        <h1>BOOLFLIX</h1>
        <ComponentNavbar />
    </header>
</template>

<style scoped>
header {
    height: 100px;
    background-color: rgba(27, 27, 27, 255);
    display: flex;
    align-items: center;
    padding: 0 1rem;
    justify-content: space-between;
    position: fixed;
    width: 100%;
}

h1 {
    color: red;
}
</style>
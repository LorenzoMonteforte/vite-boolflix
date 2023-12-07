<script>
import { store } from '../store';
import ComponentNavbar from './ComponentNavbar.vue';
import ComponentSelect from "./ComponentSelect.vue";
export default {
    name: "ComponentHeader",
    components: {
        ComponentNavbar,
        ComponentSelect
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <header>
        <div>
            <h1>BOOLFLIX</h1>
        </div>
        <div>
            <ComponentNavbar />
        </div>
        <div>
            <ComponentSelect />
        </div>
    </header>
</template>

<style scoped>
header {
    height: 100px;
    background-color: rgba(27, 27, 27, 255);
    display: flex;
    padding: 0 1rem;
    position: fixed;
    width: 100%;
}

header>div:first-child,
header>div:last-child {
    height: 100%;
    width: 25%;
}

header>div:nth-child(2) {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
}

header>div:first-child {
    display: flex;
    align-items: center;
}

header>div:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

h1 {
    color: red;
}
</style>
<script>
import HelloWorld from './components/HelloWorld.vue'
import NavbarPage from './components/NavbarPage.vue'

export default {
    components: {
        HelloWorld,
        NavbarPage
    },


}
</script>

<template>
    <NavbarPage />
    <router-view></router-view>
</template>

<style lang="scss">
@use './styles/general.scss';
</style>

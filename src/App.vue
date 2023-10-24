<script>
import HelloWorld from './components/HelloWorld.vue'
import NavbarPage from './components/NavbarPage.vue'
import Footer from "./components/Footer.vue"

export default {
    components: {
        HelloWorld,
        NavbarPage,
        Footer
    },


}
</script>

<template>
    <NavbarPage />
    <router-view></router-view>
    <Footer />
</template>

<style lang="scss">
@use './styles/general.scss';
</style>

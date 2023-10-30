<script>
import NavbarPage from './components/NavbarPage.vue'


export default {
    components: {
        NavbarPage,
    },


}
</script>

<template>
    <NavbarPage />
    <router-view v-slot="{Component}">
        <transition enter-active-class="animate__animated animate__bounceInLeft"
                    leave-active-class="animate__animated animate__bounceOutRight"
                    mode="out-in">
            <component :is="Component"/>
        </transition>
    </router-view>
</template>

<style lang="scss">
@use './styles/general.scss';

</style>

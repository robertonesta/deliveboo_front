<script>
export default {
    name: 'NavbarPage',
    data() {
        return {

        }
    }
}
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark justify-content-around">
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation"></button>
            <div class="logo">
                <img src="../../public/img/deliveboo-logo.png" alt="" class="" width="60">
                <img src="../../public/img/moto.png" alt="" class="moto">
            </div>
            <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                <ul class="navbar-nav mt-2 mt-lg-0 px-5">
                    <li class="nav-item mx-2">
                        <router-link to="/" class="nav-link fs-3 fw-semibold" aria-current="page">Home <span
                                class="visually-hidden">(current)</span></router-link>
                    </li>
                    <li class="nav-item mx-2">
                        <router-link to="/restaurants" class="nav-link fs-3 fw-semibold">Restaurants</router-link>
                    </li>
                </ul>
    <div id="header">
        <nav class="navbar navbar-expand-md navbar-light bg_dark shadow-sm">
            <div class="container">
                <router-link to="/" class="nav-link active" aria-current="page">
                    <div class="logo w-25">
                        <p class="mb-0">logo</p>
                    </div>
                </router-link>
                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation"></button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link active" aria-current="page">Home<span class="visually-hidden">(current)</span></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/restaurants" class="nav-link">Locali</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';
.navbar {

    .navbar-collapse {
        flex-basis:auto;
        flex-grow:initial;
        align-items:normal;
    }

    .logo {
        position: relative;

        .moto {
            width: 23px;
            position: absolute;
            bottom: 5px;
            z-index: 1;
            left: -1000%;
            animation: goHome 3s ease 0.5s forwards; 
        }

                 @keyframes goHome {
            0% {
                left: -1000%;
                rotate: -80deg;
            }

            100% {
                left: 18px;
                rotate: 0deg;
            }
        } 

    
    }
}
</style>
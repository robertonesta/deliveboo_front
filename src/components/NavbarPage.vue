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
                <a href="http://localhost:5174/">
                    <div class="logo">
                        <img src="img/deliveboo-logo.png" alt="" class="" width="60">
                        <img src="img/moto.png" alt="" class="moto">
                    </div>
                </a>
            <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                <ul class="navbar-nav mt-2 mt-lg-0 px-5">
                    <li class="nav-item mx-2">
                        <router-link to="/restaurants" class="nav-link fs-3 fw-semibold">Ristoranti</router-link>
                    </li>
                    <li class="nav-item mx-2">
                        <a href="http://127.0.0.1:8000/login" class="nav-link fs-3 fw-semibold">Accedi</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
        
</template>


<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';

.navbar {

    .navbar-collapse {
        flex-basis: auto;
        flex-grow: initial;
        align-items: normal;
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
}</style>
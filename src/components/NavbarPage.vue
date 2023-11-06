<script>
import { store } from '../store.js'
import { useRoute } from 'vue-router'
export default {
    name: 'NavbarPage',
    data() {
        return {
            go_to_front_end: 'http://localhost:5174/',
            go_to_login: 'http://127.0.0.1:8000/login',
            store,
            dishFromLocalStorage: 0,
            routeObject: useRoute()
        }
    },
    mounted() {
        console.log(this.routeObject)
        //get Deliveboo
        const delivebooWord = document.querySelector('#deliveboo').innerText
        const delivebooElement = document.querySelector('#deliveboo')
        //splitted
        let delivebooSplitted = delivebooWord.split('')
        //add transition delay
        let delay = 0.3
        //wrap
        delivebooSplitted.forEach(letter => {
            let span = document.createElement('span')
            span.innerText = letter
            span.style.opacity = 0;
            span.style.transition = `opacity ${delay}s ease`
            delivebooElement.appendChild(span)
            delay += 0.3
        });
        //remove the previous text
        delivebooElement.childNodes["0"].textContent = ''
        //add total delay delay
        delivebooElement.childNodes.forEach(child => {
            if (child.innerText) {
                setTimeout(() => {
                    child.style.opacity = 1
                }, 3000)
            }
        })


    },
    methods: {
        totalDishesCart() {
            let totalDishes = 0
            store.cart.forEach(dish => {
                totalDishes += dish.counter
            }
            )
            return totalDishes
        }
    },
    created() {
        //prendiamo i dati dal localStorage e li mettiamo nel localStorageCart che si trova nello store
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key)); // Parse the stored JSON data
            store.cart.push(value);
        }
    },


}
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-sm justify-content-around shadow">
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation"></button>
            <a :href="go_to_front_end" class="d-flex gap-2 align-items-center text-decoration-none">
                <div class="logo">
                    <img src="/public/img/delivelogo.png" alt="" class="" width="60" loading="lazy">
                    <img src="/public/img/moto.png" alt="" class="moto" loading="lazy">
                </div>
                <h2 id="deliveboo" class="fs-2 mb-0">Deliveboo</h2>
            </a>

            <div class="collapse navbar-collapse justify-content-end align-items-center" id="collapsibleNavId">
                <ul class="navbar-nav mt-2 mt-lg-0 px-5">
                    <li class="nav-item mx-2">
                        <router-link to="/restaurants" class="nav-link fs-3 fw-semibold">Ristoranti</router-link>
                    </li>
                    <li class="nav-item mx-2">
                        <a :href="go_to_login" class="nav-link fs-3 fw-semibold">Accedi</a>
                    </li>
                    <li class="nav-item mx-2">
                        <router-link to="/cart" class="nav-link fs-3 fw-semibold cart">
                            <i class="fa-solid fa-cart-shopping text-white"></i>
                            <span class="ms-2">{{ totalDishesCart() }}</span>
                        </router-link>
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
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 90px;
    background-color: $d-boo-darker;

    .nav-link {
        color: $d-boo-orange;

        &:hover,
        &:focus {
            color: $d-boo-light;
        }
    }


    a[href="http://localhost:5174/"] {
        color: $d-boo-orange;
    }


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
}
</style>
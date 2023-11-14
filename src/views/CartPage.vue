<script>
import axios from "axios";
import { store } from "../store.js"
export default {
    data() {
        return {
            store,
            message: ''
        }
    },
    mounted() {
    },
    methods: {
        deleteDish(dish) {
            if (store.cart && store.cart.length > 0) {
                store.cart.forEach(dishCart => {
                    if (dishCart.id === dish.id) {
                        //rimuoviamo il piatto dal carrello
                        store.cart.splice(store.cart.findIndex(dishCart => dishCart.id === dish.id), 1)
                        //store.cart.splice(dish.oldPosition, 1)
                        console.log(store.cart)
                        //rimuoviamo il piatto dal localStorage
                        localStorage.removeItem(`${dish.name}`)
                    }
                })
            }
        },

    },
}
</script>

<template>
    <div class="container">
        <h1 class="my-5 fw-semibold text-center">Carrello</h1>
        <p v-if="message" class="alert alert-success">{{ message }}</p>
        <div v-if="store.cart && store.cart.length > 0">
            <ul class="list-unstyled">
                <li v-for="dish in store.cart">
                    <div class="info-dishes w-75 mx-auto px-5 d-flex justify-content-between align-items-center mb-3"
                        v-if="dish.counter != 0">
                        <div>
                            <h4>{{ dish.name }}</h4>
                            <b class="me-3">€ {{ dish.price }}</b>
                            <button @click="store.remove(dish)" class="bg-transparent text-white fs-5 border-0">-</button>
                            <span class="mx-1">{{ !dish.counter ? 0 : dish.counter }}</span>
                            <button @click="store.add(dish)" class="bg-transparent fs-5 text-white border-0">+</button>
                        </div>
                        <div>
                            <button @click="deleteDish(dish)"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="fw-semibold text-center">
                <h2>Totale</h2>
                <p>€ {{ store.sum() }}</p>
                <router-link to="/order" class="btn text-white btn-success">Vai al checkout</router-link>
            </div>
        </div>
        <div v-else>
            <p class="text-center">Non ci sono prodotti nel carrello.</p>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.container {
    color: white;
    padding-top: 90px;

    .info-dishes {
        padding: 1rem 0;
        border: 1px solid white;
        border-radius: 10px;
    }
}
</style>
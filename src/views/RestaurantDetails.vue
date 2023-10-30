<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    name: "RestaurantDetails",
    data() {
        return {
            server: "http://127.0.0.1:8000",
            restaurants_end_point: "/api/restaurants",
            restaurant: [],
            counter: 0,
            store
        };
    },
    methods: {
        decrease(dish) {
            if(dish.counter && dish.counter > 0){
                dish.counter--
                store.cart.pop()
            } else {
                dish.counter = 0
            }
        },
        increase(dish) {
            if(!dish.counter){
                //contatore a 0
                dish.counter = 0
            }
            store.cart.push(dish)
            //incrementiamo il contatore di 1
            dish.counter++
            //mettiamo nel carrello
            console.log(dish.counter)
        },


    },
    mounted() {
        axios
            .get(`${this.server}/api/restaurants/${this.$route.params.slug}`)
            .then((response) => {
                console.log(response)
                this.restaurant = response.data.restaurant
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    },
}
</script>


<template>
    <main class="restaurant">
        <div class="container pt-5">
            <div class="row">
                <div class="col p-3">
                    <div class="photo w-75 mx-auto p-2">
                        <img :src="restaurant.photo" alt="" class="img-fluid rounded-2">
                    </div>
                </div>
                <div class="col p-3 d-flex flex-column gap-3 align-items-center">
                    <h3 class="text-white text-center">{{ restaurant.name }}</h3>
                    <ul class="list-unstyled" v-for="typology in restaurant.typologies">
                        <li>
                            {{ typology.name }}
                        </li>
                    </ul>
                    <address>{{ restaurant.address }}</address>
                </div>
            </div>
            <div class="row mt-5 px-5">
                <h2 class="text-center fs-1">Menù</h2>
                <h3 class="mb-3 fw-bolder">Piatti</h3>
                <ul class="list-unstyled dishes mb-5">
                    <li v-for="(dish, index) in restaurant.dishes" :key="index">
                        <div v-if="!dish.ingredients.includes('acqua')"
                            class="d-flex justify-content-between align-items-center border_bottom py-3">
                            <div class="info-dish">
                                <h4 class="fw-bold">{{ dish.name }}</h4>
                                <p class="fst-italic w-75">{{ dish.ingredients }}</p>
                                <div class="purchase d-flex align-items-center">
                                    <b class="me-3">€ {{ dish.price }}</b>
                                    <button @click="decrease(dish)" class="bg-transparent fs-5 border-0">-</button>
                                    <span class="mx-3">{{ !dish.counter ? 0 : dish.counter }}</span>
                                    <button @click="increase(dish)" class="bg-transparent fs-5 border-0">+</button>
                                </div>

                            </div>
                            <div class="dish-photo">
                                <img :src="dish.photo" alt="" class="h-100 object-fit-cover">
                            </div>
                        </div>
                    </li>
                </ul>
                <h3 class="mb-3 fw-bolder">Bevande</h3>
                <ul class="list-unstyled dishes">
                    <li v-for="dish in restaurant.dishes">
                        <div v-if="dish.ingredients.includes('acqua')"
                            class="d-flex justify-content-between align-items-center border_bottom py-3">
                            <div class="info-dish">
                                <h4 class="fw-bold">{{ dish.name }}</h4>
                                <div class="purchase d-flex align-items-center">
                                    <b class="me-3">€ {{ dish.price }}</b>
                                    <button @click="decrease(dish)" class="bg-transparent fs-5 border-0">-</button>
                                    <span class="mx-3">{{ !dish.counter ? 0 : dish.counter }}</span>
                                    <button @click="increase(dish)" class="bg-transparent fs-5 border-0">+</button>
                                </div>
                            </div>
                            <div class="drink-photo">
                                <img :src="dish.photo" alt="" class="w-100 h-100 object-fit-cover">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>


<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';

.restaurant {
    background: $d-boo-background;

    .row:nth-child(2) {
        h3 {
            color: $d-boo-orange;
        }

        .dishes {
            li {

                .border_bottom {
                    border-bottom: 3px solid $d-boo-dark;
                }

                .dish-photo {
                    width: 150px;
                    height: 100px;
                    object-fit: cover;

                    img {
                        width: 150px;
                    }

                    ;
                }

                .drink-photo {
                    width: 50px;
                    height: 100px;
                    object-fit: cover;
                }
            }
        }
    }
}
</style>
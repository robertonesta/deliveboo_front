<script>
import axios from 'axios';
import { store } from '../store.js';
import ModalComponent from '../components/ModalComponent.vue';
export default {
    name: "RestaurantDetails",
    components:{
        ModalComponent
    },
    data() {
        return {
            server: "http://127.0.0.1:8000",
            restaurants_end_point: "/api/restaurants",
            restaurant: null,
            counter: 0,
            store,
            show: false,
        };
    },
    methods: {

    },
    mounted() {
        axios
            .get(`${this.server}/api/restaurants/${this.$route.params.slug}`)
            .then((response) => {
                //Diamo i dati al ristorante dall' API
                this.restaurant = response.data.restaurant
                console.log(this.restaurant)
                //se il carrello e il ristorante hanno i dati
                if (store.cart && store.cart.length > 0 && this.restaurant) {
                    //prendiamo il piatto dal carrello 
                    store.cart.forEach(dishCart => {
                        // controlliamo con map se la condizione è rispettata e ritorniamo tutto all' array da cui lo prendiamo, aggiornandolo
                        this.restaurant.dishes = this.restaurant.dishes.map(dishRest => {
                            if (dishRest.id === dishCart.id) {
                                //this.restaurant.dishes[dishCart.oldPosition] = dishCart
                                //dishRest.counter = dishCart.counter
                                return dishCart
                                //console.log(this.restaurant.dishes, 'ristorante con piatti aggiornati')
                            } else {
                                return dishRest
                            }
                        })
                    })
                } else {
                    console.log('non ci va')
                }
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    }
}




</script>


<template>
    <main class="restaurant">
        <ModalComponent />
        <div class="container pt-5">
            <div class="row" v-if="restaurant">
                <div class="col p-3">
                    <div class="photo w-75 mx-auto p-2" >
                        <img :src="restaurant.photo" alt="" class="img-fluid rounded-2">
                    </div>
                </div>
                <div class="col p-3 d-flex flex-column gap-3 align-items-center">
                    <h3 class=" fs-1 text-center">{{ restaurant.name }}</h3>
                    <address class="fs-5">{{ restaurant.address }}</address>
                    <ul class="list-unstyled d-flex">
                        <li v-for="typology in restaurant.typologies" class="mx-2">
                            {{ typology.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row mt-5 px-5">
                <h2 class="text-center fs-1 mb-5"> <span>Menù</span></h2>
                <h3 class="mb-3 fw-bolder fs-2">Piatti</h3>
                <ul class="list-unstyled dishes p-5 mb-5" v-if="restaurant">
                    <li v-for="dish in restaurant.dishes">
                        <div v-if="!dish.ingredients.includes('acqua')"
                            class="d-flex justify-content-between align-items-center border_bottom py-3">
                            <div class="info-dish">
                                <h4 class="fw-bold">{{ dish.name }}</h4>
                                <p class="fst-italic w-75">{{ dish.ingredients }}</p>
                                <div class="purchase d-flex align-items-center">
                                    <b class="me-3">€ {{ dish.price }}</b>
                                    <button @click="store.remove(dish)" class="bg-transparent fs-5 border-0">-</button>
                                    <span class="mx-3">{{ !dish.counter ? dish.counter = 0 : dish.counter }}</span>
                                    <button @click="store.add(dish)" class="bg-transparent fs-5 border-0">+</button>
                                </div>

                            </div>
                            <div class="dish-photo">
                                <img :src="dish.photo" alt="" class="h-100 object-fit-cover">
                            </div>
                        </div>
                    </li>
                </ul>
                <h3 class="mb-3 fw-bolder">Bevande</h3>
                <ul class="list-unstyled dishes p-5" v-if="restaurant">
                    <li v-for="dish in restaurant.dishes">
                        <div v-if="dish.ingredients.includes('acqua')"
                            class="d-flex justify-content-between align-items-center border_bottom py-3">
                            <div class="info-dish">
                                <h4 class="fw-bold">{{ dish.name }}</h4>
                                <div class="purchase d-flex align-items-center">
                                    <b class="me-3">€ {{ dish.price }}</b>
                                    <button @click="store.remove(dish)" class="bg-transparent fs-5 border-0">-</button>
                                    <span class="mx-3">{{ !dish.counter ? dish.counter = 0 : dish.counter }}</span>
                                    <button @click="store.add(dish)" class="bg-transparent fs-5 border-0">+</button>
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
    position: relative;
    padding-top: 90px;

    .cart {
        position: fixed;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
    }

    .row:nth-child(1) {
        h3 {
            color: $d-boo-dark;
            border: 3px solid $d-boo-dark;
            border-radius: 10px;
            padding: 0.25rem 0.5rem;
        }
    }

    .row:nth-child(2) {
        h3 {
            color: $d-boo-orange;
        }

        h2 {

            span {
                border-bottom: 3px solid $d-boo-dark;
            }
        }


        .dishes {
            border: 3px solid $d-boo-dark;
            border-radius: 10px;

            li {


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
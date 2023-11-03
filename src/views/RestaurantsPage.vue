<script>
import axios from "axios";
import { store } from "../store.js"
export default {
    data() {
        return {
            store
        };
    },
    mounted() {
        //get all the restaurants
        axios
            .get(store.server + store.restaurants_end_point)
            .then((response) => {
                //console.log(response);
                store.restaurants = response.data.restaurants;
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
        if (store.typologyId > 0) {
            console.log(store.typologyId)
            store.typologies.forEach(typologySelected => {
                //store.typologies.forEach(typology => {
                if (typologySelected.id === store.typologyId) {
                    typologySelected.checked = true;
                    console.log(store.typologies)
                }
                //})
            })
        } else {
            axios
                .get(store.server + store.typologies_end_point)
                .then((response) => {
                    console.log(response);
                    store.typologies = response.data.typologies;

                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.message);
                });
        };
    },
    methods: {
        filterPerTypology(typology) {
            if (!typology.checked) {
                typology.checked = true;
                axios
                    .post(
                        `${store.server}/api/searchRestaurants?typologyId=${typology.id}`
                    )
                    .then((response) => {
                        // Gestisci la risposta dal server, ad esempio, aggiorna i risultati nella tua interfaccia utente
                        console.log(response);
                        if (response.data.restaurants.length > 0) {
                            store.filteredRestaurants = response.data.restaurants;
                            typology.checked = true;
                            console.log(store.filteredRestaurants)
                        }
                        //store.typologyId = store.selectedTypology;
                        //console.log(store.typologyId)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                typology.checked = false;
                store.filteredRestaurants = null;
                axios
                    .get(store.server + store.restaurants_end_point)
                    .then((response) => {
                        console.log(response);
                        store.restaurants = response.data.restaurants;
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log(err.message);
                    });
            }
            // Esegui una richiesta HTTP per inviare il valore selezionato al server Laravel

            // TO DO: fare la ricerca filtrata multipla
        },
    },
};
</script>

<template>
    <main class="restaurants">
        <div class="container text-center align">
            <h1 class="my-5 text-white fw-semibold">Ristoranti</h1>
            <div class="text-center text-white">
                <h4>Filtra</h4>
                <div class="text-white d-flex justify-content-center gap-3 flex-wrap">
                    <div class="form-check d-flex gap-1" v-for="typology in store.typologies">
                        <input @click="filterPerTypology(typology)" :checked="typology.checked" class="form-check-input"
                            type="checkbox" :value="typology.name" :id="typology.name">
                        <label class="form-check-label" :for="typology.name">
                            {{ typology.name }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="row g-5" v-if="store.filteredRestaurants && store.filteredRestaurants.length > 0">
                <transition-group tag="div" name="fade" mode="in-out" class="row g-5">
                    <div class="col-12 col-sm-6 col-md-4 col-xl-3" v-for="restaurant in store.filteredRestaurants"
                        :key="restaurant.id">
                        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
                            class="text-decoration-none" :key="restaurant.id">
                            <div class="card h-100 justify-content-between border-0 bg-transparent">
                                <div class="card-header d-flex align-items-center justify-content-center fs-5 fw-semibold">
                                    <span class="p-1 rounded w-100 mb-4">{{ restaurant.name }}</span>
                                </div>
                                <div class="card-img-top flex-grow-1 animate__animated animate__fadeInRight">
                                    <img :src="restaurant.photo" alt="" class="rounded-3" loading="lazy">
                                </div>
                            </div>
                        </router-link>
                    </div>
                </transition-group>
            </div>
            <div v-else-if="store.filteredRestaurants && store.filteredRestaurants.length === 0">
                <p class="text-white">Non ci sono ristoranti con questo filtro di ricerca. <br> <a> Vai alla sezione con
                        tutti i Ristoranti per iniziare una nuova ricerca.</a></p>
            </div>
            <div class="row g-5" v-else="store.restaurants">
                <transition-group tag="div" name="fade" mode="in-out" class="row g-5">
                    <div class="col-12 col-sm-6 col-md-4 col-xl-3" v-for="restaurant in store.restaurants"
                        :key="restaurant.id">
                        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
                            class="text-decoration-none" :key="restaurant.id">
                            <div class="card h-100 justify-content-between border-0 bg-transparent">
                                <div class="card-header d-flex align-items-center justify-content-center fs-5 fw-semibold">
                                    <span class="p-1 rounded w-100 mb-4">{{ restaurant.name }}</span>
                                </div>
                                <div class="card-img-top flex-grow-1 animate__animated animate__fadeInRight">
                                    <img :src="restaurant.photo" alt="" class="rounded-3" loading="lazy">
                                </div>
                            </div>
                        </router-link>
                    </div>
                </transition-group>
            </div>
        </div>
    </main>
</template>


<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';

main.restaurants {
    background: url('./img/bg-restaurants-3.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    padding: 90px 1rem 6rem;

    .card {
        cursor: pointer;

        .card-img-top {
            img {
                width: 100%;
                height: 230px;
                object-fit: cover;
                transition: box-shadow 0.1s ease-in;
                box-shadow: none;

                &:hover {
                    box-shadow: 0 0 5px $d-boo-lighter;
                }
            }
        }

        .card-header {
            color: $d-boo-lighter;

            span {
                background-color: rgba(0, 0, 0, 0.742);
                color: $d-boo-orange;
                box-shadow: 0 0 3px $d-boo-orange;
            }
        }

        .card-footer {
            color: $d-boo-lighter;
        }

        .card-header,
        .card-footer {
            border: 0;
            background: transparent;
            height: 60px;

        }
    }


}
</style>
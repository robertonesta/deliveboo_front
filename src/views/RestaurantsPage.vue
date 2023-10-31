<script>
import axios from "axios";
export default {
    data() {
        return {
            restaurants: [],
            server: "http://127.0.0.1:8000",
            restaurants_end_point: "/api/restaurants",
        };
    },
    mounted() {
        //get all the restaurant
        axios
            .get(this.server + this.restaurants_end_point)
            .then((response) => {
                console.log(response);
                this.restaurants = response.data.restaurants;
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    },
    methods: {

    },
};
</script>

<template>
    <main class="restaurants">
        <div class="container text-center align">
            <h1 class="my-5 text-white fw-semibold">Tutti i ristoranti</h1>
            <div class="row g-5" v-if="restaurants">
                <transition-group tag="div" name="fade" mode="in-out" class="row g-5">
                    <div class="col-12 col-sm-6 col-md-4 col-xl-3" v-for="restaurant in restaurants">
                        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
                            class="text-decoration-none">
                            <div class="card h-100 justify-content-between border-0 bg-transparent">
                                <div class="card-header d-flex align-items-center justify-content-center fs-5 fw-semibold">
                                    <span class="p-1 rounded w-100 mb-4">{{ restaurant.name }}</span>
                                </div>
                                <div class="card-img-top flex-grow-1 animate__animated animate__fadeInRight">
                                    <img :src="restaurant.photo" alt="" class="rounded-3" loading="lazy">
                                </div>
                                <!--                             <div class="card-footer d-flex align-items-center justify-content-center">{{ restaurant.address }}
                                </div> -->
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


}</style>
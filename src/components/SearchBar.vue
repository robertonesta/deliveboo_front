<script>
import axios from 'axios';
export default {
    name: "SearchBar",
    data() {
        return {
            filteredRestaurants: [],
            typologies: [],
            selectedTypology: "",
            server: "http://127.0.0.1:8000",
            restaurants_end_point: "/api/restaurants",
            typologies_end_point: "/api/typologies",
        }
    },
    methods: {
        searchRestaurants() {
            // Esegui una richiesta HTTP per inviare il valore selezionato al server Laravel
            axios
                .post(
                    `http://127.0.0.1:8000/api/searchRestaurants?typologyId=${this.selectedTypology}`
                )
                .then((response) => {
                    // Gestisci la risposta dal server, ad esempio, aggiorna i risultati nella tua interfaccia utente
                    console.log(response.data.restaurants);
                    this.filteredRestaurants = response.data.restaurants;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    mounted() {
        //typologies
        axios
            .get(this.server + this.typologies_end_point)
            .then((response) => {
                console.log(response);
                this.typologies = response.data.typologies;
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    }
}
</script>

<template>
    <div>
        <select v-model="selectedTypology" class="me-4 w-25">
            <option v-for="typology in typologies" :key="typology.id" :value="typology.id">
                {{ typology.name }}
            </option>
            <!-- Altre opzioni typology... -->
        </select>
        <button class="btn" @click="searchRestaurants">Cerca Ristoranti</button>
    </div>
    <ul class="list-unstyled">
        <li v-for="restaurant in filteredRestaurants" :key="restaurant.id">
            <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }" class="text-decoration-none">
                {{ restaurant.name }}
            </router-link>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';

ul {
    height: 150px;
    overflow-y: scroll;
}

.btn {
    background-color: $d-boo-dark;
    color: $d-boo-light;
    transition: all 0.3s ease;

    &:hover {
        background-color: $d-boo-dark;
        color: $d-boo-orange;
    }
}

a {
    color: $d-boo-dark;
}
</style>
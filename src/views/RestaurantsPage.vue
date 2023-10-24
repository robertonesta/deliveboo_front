<script>
import axios from "axios";
export default {
    data() {
        return {
            restaurants: [],
            typologies: [],
            selectedTypology: "",
            server: "http://127.0.0.1:8000",
            restaurants_end_point: "/api/restaurants",
            typologies_end_point: "/api/typologies",
        };
    },
    mounted() {
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
                    this.restaurants = response.data.restaurants;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<template>
        <div class="container text-center">
            <h1>Ristoranti</h1>
            <div>
                <select v-model="selectedTypology">
                    <option v-for="typology in typologies" :key="typology.id" :value="typology.id">
                        {{ typology.name }}
                    </option>
                    <!-- Altre opzioni typology... -->
                </select>
                <button @click="searchRestaurants">Cerca Ristoranti</button>
            </div>


            <div v-for="restaurant in restaurants" :key="restaurant.id">
                {{ restaurant.name }}
            </div>
        </div>
</template>


<style lang="scss" scoped></style>
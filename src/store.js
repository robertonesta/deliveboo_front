import { reactive } from "vue";
import axios from "axios";
export const store = reactive({
    restaurants: [],
    filteredRestaurants: null,
    checkedTypologies:[],
    typologies: [],
    selectedTypology: "",
    typologyId: "",
    server: "http://127.0.0.1:8000",
    restaurants_end_point: "/api/restaurants",
    typologies_end_point: "/api/typologies",
    cart: [],
    localStorageCart: [],
    getAllRestaurants(){
        axios
            .get(this.server + this.restaurants_end_point)
            .then((response) => {
                //console.log(response);
                this.restaurants = response.data.restaurants;
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    },
    getAllTypologies(){
        axios
        .get(this.server + this.typologies_end_point)
        .then((response) => {
            console.log(response.data.typologies, 'tutte le tipologie');
            this.typologies = response.data.typologies;

        })
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
    }
})
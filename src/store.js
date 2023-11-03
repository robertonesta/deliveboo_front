import { reactive } from "vue";

export const store = reactive({
    restaurants: [],
    filteredRestaurants: [],
    typologies: [],
    selectedTypology: "",
    server: "http://127.0.0.1:8000",
    restaurants_end_point: "/api/restaurants",
    typologies_end_point: "/api/typologies",
    cart: [],
    localStorageCart: []
})
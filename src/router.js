import {createRouter, createWebHistory} from 'vue-router';
import HomePage from "./views/HomePage.vue"
import RestaurantsPage from "./views/RestaurantsPage.vue"
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
        },   
        {
            path: "/restaurants",
            name: "restaurants",
            component: RestaurantsPage,
        },       
    ]
});

export {router};
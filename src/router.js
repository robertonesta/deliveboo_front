import {createRouter, createWebHistory} from 'vue-router';
import HomePage from "./views/HomePage.vue"
import RestaurantsPage from "./views/RestaurantsPage.vue"
import RestaurantDetails from "./views/RestaurantDetails.vue"
import NotFound from "./views/NotFound.vue"

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
        {
            path: "/restaurants/:slug",
            name: "restaurant",
            component: RestaurantDetails,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFound,
        },  
    ]
});

export {router};
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "./views/HomePage.vue"
import RestaurantsPage from "./views/RestaurantsPage.vue"
import RestaurantDetails from "./views/RestaurantDetails.vue"
import NotFound from "./views/NotFound.vue"
import CartPage from "./views/CartPage.vue"
import OrderPage from "./views/OrderPage.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
            beforeEnter: (to, from, next) => {
                // Extract the message from the URL
                const message = to.query.message;
          
                // Pass the message to the component
                if (message) {
                  to.params.message = message;
                }
          
                next();
            }
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
        {
            path: "/cart",
            name: "cart",
            component: CartPage,
        },
        {
            path: "/order",
            name: "order",
            component: OrderPage,
        },
    ]
});

export { router };
<script>
import axios from 'axios';
export default {
    name: "RestaurantDetails",

    data(){
        return {
            server: "http://127.0.0.1:8000",
            restaurants_end_point: "/api/restaurants",
            restaurant: [],
        };
    },
    methods:{

    },
    mounted() {
        axios
        .get(`${this.server}/api/restaurants/${this.$route.params.slug}`)
        .then((response) => {
            console.log(response)
            this.restaurant = response.data.restaurant
        })
        .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    },
}
</script>


<template>
    <div>
        <h1>{{ restaurant.name }}</h1>
    </div>
</template>


<style lang="scss" scoped>

</style>
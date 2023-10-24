<script>
import axios from 'axios'
export default {
    data() {
        return {
            restaurants: [],
            server: 'http://127.0.0.1:8000',
            restaurants_end_point: '/api/restaurants'
        }
    },
    mounted(){
        axios
            .get(this.server + this.restaurants_end_point)
            .then(response => {
                console.log(response);
                this.restaurants = response.data.restaurants
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            });

    }
}
</script>

<template>
    <div class="container text-center">
        <h1>Locali</h1>
        <div class="row row-cols-5">
            <div class="col" v-for="restaurant in restaurants">
                <div class="card">
                    <div class="card-header bg-none">
                        {{ restaurant.name }}
                    </div>
                    <div class="card-body">
                        <img class="w-100" :src="restaurant.photo" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>
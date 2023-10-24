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
        <h1>Ristoranti</h1>
    </div>
</template>


<style lang="scss" scoped></style>
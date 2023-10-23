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
    <div>
        <h1>pagina ristoranti</h1>
        <div v-for="restaurant in restaurants">
            <div class="card text-left">
              <img class="card-img-top" src="holder.js/100px180/" alt="">
              <div class="card-body">
                <h4 class="card-title">{{restaurant.name}}</h4>
                <p class="card-text">Body</p>
              </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>
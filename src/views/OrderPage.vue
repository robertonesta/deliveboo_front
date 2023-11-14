<script>
import axios from "axios";
import {store} from "../store.js";
export default {
    data() {
        return {
            store,
            name: '',
            lastname: '',
            address: '',
            phone:'',

        }
    },
    methods: {
        send() {
            let total = store.sum()
            //console.log(total, 'total'); 
            axios
                .post(store.server + '/api/orders', { 
                    totalCart: total, 
                    name: this.name,
                    lastname:this.lastname,
                    address: this.address,
                    phone: this.phone
                })

                .then((response) => {
                    // Redirect to the Laravel view
                    console.log(response.data.total)
/*                     if(response.data.total > 0) {
                        window.location.href = store.server + '/api/orders';
                    } */
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.message);
                });
        },
    }
}
</script>

<template>
    <div class="container text-center align">
        <h1 class="text-white mb-4">CHECKOUT</h1>
        <h3 class="text-white mb-4">Dettagli del cliente</h3>
            <form @submit.prevent="send">
                <div class="form-check w-50 mx-auto">
                  <input v-model="name" class="form-control" name="name" type="text" placeholder="name" id="name">
                  <label class="form-label text-white" for="name">
                    Nome
                  </label>
                </div>
                <div class="form-check w-50 mx-auto">
                  <input v-model="lastname" class="form-control" name="lastname" type="text" placeholder="lastname" id="lastname">
                  <label class="form-label text-white" for="lastname">
                    Cognome
                  </label>
                </div>
                <div class="form-check w-50 mx-auto">
                  <input v-model="address" class="form-control" name="address" type="text" placeholder="address" id="address">
                  <label class="form-label text-white" for="address">
                    Indirizzo
                  </label>
                </div>
                <div class="form-check w-50 mx-auto">
                  <input v-model="phone" class="form-control" name="phone" type="text" placeholder="phone" id="phone">
                  <label class="form-label text-white" for="phone">
                    Numero di Telefono
                  </label>
                </div>
                <div class="form-check w-50 mx-auto">
                    <input type="hidden" name="totalprice" id="totalprice" :value="store.sum()">
                </div>
                <button class="btn btn-success" type="submit">PAAAAAGAAAAA</button>
            </form>
    </div>
</template>


<style lang="scss" scoped>
.container{
    padding: 90px 1rem 6rem;
}
</style>
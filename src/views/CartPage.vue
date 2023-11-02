<script>
import { store } from "../store.js"
export default {
    data() {
        return {
            store,
            message: ''
        }
    },
    mounted() {
        //prendiamo i dati dal localStorage e li mettiamo nel localStorageCart che si trova nello store
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key)); // Parse the stored JSON data
            store.localStorageCart.push(value);
        }
        console.log(store.localStorageCart)
    },
    methods: {
        add(dish) {
            if (!dish.counter) {
                //contatore a 1
                dish.counter = 1
            } else {
                //incrementiamo il contatore di 1
                dish.counter++
            }
            //mettiamo il prodotto nel carrello
            store.cart.push(dish)
            //mettiamo il prodotto nel local storage
            localStorage.setItem(`${dish.name}`, JSON.stringify(dish));
        },
        remove(dish) {
            if (dish.counter && dish.counter > 1) {
                dish.counter--
            } else {
                this.deleteDish(dish)
                this.message = `Il prodotto ${dish.name} è stato rimosso dal carrello`
                console.log(this.message)
            }
        },

        removeDuplicates(cart) {
            return cart.filter((dish, index) => cart.indexOf(dish) === index);
        },
        sum(store) {
            let total = 0;
            let priceDish = 0;
            store.localStorageCart.forEach(dish => {
                //prezzo piatto = prezzo singolo piatto per quantita'
                priceDish = parseFloat(dish.price) * dish.counter;
                total += priceDish;
            })
            return total;
        },
        deleteDish(dish) {
            localStorage.removeItem('dish')
            store.cart = store.cart.filter(item => {
                return item != dish
            })
        }
    },
    computed: {
        getItem(store) {
            store.cart = JSON.parse(localStorage.getItem('dish'))
        }
    }
}
</script>

<template>
    <div class="container">
        <h1 class="my-5 fw-semibold text-center">Carrello</h1>
        <p v-if="message" class="alert alert-success">{{ message }}</p>
        <div v-if="store.localStorageCart && store.localStorageCart.length > 0">
            <ul class="list-unstyled" v-if="store.localStorageCart && store.localStorageCart.length > 0">
                <li v-for="dish in store.localStorageCart">
                    <div class="info-dishes w-75 mx-auto px-5 d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h4>{{ dish.name }}</h4>
                            <b class="me-3">€ {{ dish.price }}</b>
                            <button @click="remove(dish)" class="bg-transparent text-white fs-5 border-0">-</button>
                            <span class="mx-1">{{ !dish.counter ? 0 : dish.counter }}</span>
                            <button @click="add(dish)" class="bg-transparent fs-5 text-white border-0">+</button>
                        </div>
                        <div>
                            <button @click="deleteDish(dish)"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="fw-semibold text-center">
                <h2>Totale</h2>
                <p>€ {{ sum(store) }}</p>
                <button class="btn text-white btn-success">Vai al checkout</button>
            </div>
        </div>
        <div v-else>
            <p class="text-center">Non ci sono prodotti nel carrello.</p>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.container {
    color: white;
    padding-top: 90px;

    .info-dishes {
        padding: 1rem 0;
        border: 1px solid white;
        border-radius: 10px;
    }
}
</style>
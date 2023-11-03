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
    },
    methods: {
        add(dish, index) {
            console.log(dish, 'dish')
            if (store.cart.includes(dish)) {
                //console.log(store.cart, `dentro includes`)
                //incrementiamo il contatore di 1
                //dish.counter++
                store.cart.forEach(dishCart => {
                    if (dishCart.oldPosition === dish.oldPosition) {
                        dishCart.counter++
                    }
                })
                //console.log(store.cart)
                if (localStorage[dish.name]) {
                    //rimuoviamo il vecchio
                    localStorage.removeItem(`${dish.name}`)
                    //aggiungiamo il nuovo
                    localStorage.setItem(`${dish.name}`, JSON.stringify(dish));
                }
            } else {
                //contatore a 1
                dish.counter++
                //aggiungiamo la sua posizione come proprieta'
                dish.oldPosition = index
                //mettiamo il prodotto nel carrello
                store.cart.push(dish)
                //mettiamo il prodotto nel local storage
                localStorage.setItem(`${dish.name}`, JSON.stringify(dish));
                //console.log(store.cart, `dentro l'if !dish.counter`)
            }
        },
        remove(dish) {
            //controlliamo che ci siano i piatti nel carrello
            if (store.cart && store.cart.length > 0) {
                //controlliamo i piatti che ci sono
                store.cart.forEach(dishCart => {
                    //controlliamo che il nome del piatto che vogliamo levare si trovi nel carrello e che la quantita e' maggiore di 0 
                    if (dishCart.name === dish.name && dishCart.counter > 1) {
                        dishCart.counter--
                        if (localStorage[dish.name]) {
                            //rimuoviamo il vecchio
                            localStorage.removeItem(`${dish.name}`)
                            //aggiungiamo il nuovo
                            localStorage.setItem(`${dish.name}`, JSON.stringify(dish));
                        }
                    } else {
                        if (dishCart.oldPosition === dish.oldPosition) {
                            //rimuoviamo il piatto dal carrello
                            store.cart.splice(store.cart.findIndex(dishCart => dishCart.oldPosition === dish.oldPosition), 1)
                            //store.cart.splice(dish.oldPosition, 1)
                            console.log(store.cart)
                            //rimuoviamo il piatto dal localStorage
                            localStorage.removeItem(`${dish.name}`)
                        }
                    }
                })
            }

        },
        sum(store) {
            let total = 0;
            let priceDish = 0;
            if (store.cart && store.cart.length > 0) {
                store.cart.forEach(dish => {
                    //prezzo piatto = prezzo singolo piatto per quantita'
                    priceDish = parseFloat(dish.price) * dish.counter;
                    total += priceDish;
                })
                return total;
            }
        },
        deleteDish(dish) {
            if (store.cart && store.cart.length > 0) {
                store.cart.forEach(dishCart => {
                    if (dishCart.oldPosition === dish.oldPosition) {
                        //rimuoviamo il piatto dal carrello
                        store.cart.splice(store.cart.findIndex(dishCart => dishCart.oldPosition === dish.oldPosition), 1)
                        //store.cart.splice(dish.oldPosition, 1)
                        console.log(store.cart)
                        //rimuoviamo il piatto dal localStorage
                        localStorage.removeItem(`${dish.name}`)
                    }
                })
            }
        }
    },
}
</script>

<template>
    <div class="container">
        <h1 class="my-5 fw-semibold text-center">Carrello</h1>
        <p v-if="message" class="alert alert-success">{{ message }}</p>
        <div v-if="store.cart && store.cart.length > 0">
            <ul class="list-unstyled">
                <li v-for="(dish, index) in store.cart">
                    <div class="info-dishes w-75 mx-auto px-5 d-flex justify-content-between align-items-center mb-3"
                        v-if="dish.counter != 0">
                        <div>
                            <h4>{{ dish.name }}</h4>
                            <b class="me-3">€ {{ dish.price }}</b>
                            <button @click="remove(dish)" class="bg-transparent text-white fs-5 border-0">-</button>
                            <span class="mx-1">{{ !dish.counter ? 0 : dish.counter }}</span>
                            <button @click="add(dish, index)" class="bg-transparent fs-5 text-white border-0">+</button>
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
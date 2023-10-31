<script>
import { store } from "../store.js"
export default {
    data() {
        return {
            store
        }
    },
    methods: {
        decrease(dish) {
            if (dish.counter && dish.counter > 0) {
                dish.counter--
                store.cart.pop()
            } else {
                dish.counter = 0
            }
        },
        increase(dish) {
            if (!dish.counter) {
                //contatore a 0
                dish.counter = 0
            }
            store.cart.push(dish)
            //incrementiamo il contatore di 1
            dish.counter++
            //mettiamo nel carrello
        },
        removeDuplicates(cart) {
            return cart.filter((dish, index) => cart.indexOf(dish) === index);
        },
        sum(store) {
            let total = 0;
            let totalSingleDish = 0;
            store.cart.forEach(dish => {
                totalSingleDish = parseFloat(dish.price);
                total += totalSingleDish;
            })
            return total;
        },
        deleteDish(dish) {
            store.cart.find((dish));
        }
    }
}
</script>

<template>
    <div class="container">
        <h1 class="my-5 fw-semibold text-center">Carrello</h1>
        <div v-if="store.cart && store.cart.length > 0">
            <ul class="list-unstyled">
                <li v-for="dish in removeDuplicates(store.cart)">
                    <div class="info-dishes w-75 mx-auto px-5 d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h4>{{ dish.name }}</h4>
                            <b class="me-3">€ {{ dish.price }}</b>
                            <button @click="decrease(dish)" class="bg-transparent text-white fs-5 border-0">-</button>
                            <span class="mx-1">{{ !dish.counter ? 0 : dish.counter }}</span>
                            <button @click="increase(dish)" class="bg-transparent fs-5 text-white border-0">+</button>
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
            </div>
        </div>
        <div v-else>
            <p>Non ci sono prodotti nel carrello.</p>
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
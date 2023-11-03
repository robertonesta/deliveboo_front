<script>
import { store } from "../store.js";
export default {
  data() {
    return {
      store,
      message: "",
      cart: store.cart,
    };
  },
  mounted() {
    //   Se esistono dati in local storage li metto nel carrello dello store
    const cartLocalStorage = localStorage.getItem("cart");
    if (cartLocalStorage) {
      store.cart = JSON.parse(cartLocalStorage);
    }
  },
  methods: {
    add(dish) {
      // cerco se nel mio carrello il piatto c'è gia
      let existingDish = store.cart.find((item) => item.name === dish.name);
      // se il piatto c'è incremento il counter
      if (existingDish) {
        dish.counter++;
      } else {
        dish.counter = 1;
        store.cart.push(dish);
      }
      this.saveCart();
    },

    remove(dish) {
      const existingDishIndex = store.cart.findIndex(
        (item) => item.name === dish.name
      );

      if (existingDishIndex !== -1) {
        const existingDish = store.cart[existingDishIndex];

        if (existingDish.counter > 1) {
          existingDish.counter--;
          this.saveCart();
        } else {
          store.cart.splice(existingDishIndex, 1);
          this.message = `Il prodotto ${dish.name} è stato rimosso dal carrello`;
          //   alert(this.message);
          this.saveCart();
        }
      } else {
        this.message = `Il prodotto ${dish.name} non esiste nel carrello`;
        alert(this.message);
      }
    },

    saveCart() {
      localStorage.setItem("cart", JSON.stringify(store.cart));
    },
  },
  computed: {
    total() {
      return store.cart.reduce(
        (acc, item) => acc + item.price * item.counter,
        0
      );
    },
    cartItemCount() {
      return store.cart.reduce((total, item) => total + item.counter, 0);
    },
  },
};
</script>

<template>
  <div class="container">
    <h1 class="my-5 fw-semibold text-center">Carrello</h1>
    <p v-if="message" class="alert alert-success">{{ message }}</p>
    <div v-if="cartItemCount > 0">
      <ul class="list-unstyled" v-if="store.cart && store.cart.length > 0">
        <li v-for="dish in store.cart">
          <div
            class="info-dishes w-75 mx-auto px-5 d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4>{{ dish.name }}</h4>
              <b class="me-3">€ {{ dish.price }}</b>
              <button
                @click="remove(dish, index)"
                class="bg-transparent text-white fs-5 border-0">
                -
              </button>
              <span class="mx-1">{{ !dish.counter ? 0 : dish.counter }}</span>
              <button
                @click="add(dish)"
                class="bg-transparent fs-5 text-white border-0">
                +
              </button>
            </div>
            <!-- <div>
              <button @click="deleteDish(dish)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div> -->
          </div>
        </li>
      </ul>
      <div class="fw-semibold text-center">
        <h2>Totale</h2>
        <p>€ {{ total }}</p>
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

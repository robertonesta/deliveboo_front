import { reactive } from "vue";
import axios from "axios";
export const store = reactive({
    restaurants: [],
    filteredRestaurants: null,
    checkedTypologies:[],
    typologies: [],
    selectedTypology: "",
    typologyId: "",
    server: "http://127.0.0.1:8000",
    restaurants_end_point: "/api/restaurants",
    typologies_end_point: "/api/typologies",
    cart: [],
    localStorageCart: [],
    getAllRestaurants(){
        axios
            .get(this.server + this.restaurants_end_point)
            .then((response) => {
                //console.log(response);
                this.restaurants = response.data.restaurants;
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    },
    getAllTypologies(){
        axios
        .get(this.server + this.typologies_end_point)
        .then((response) => {
            console.log(store.checkedTypologies)
            console.log(response.data.typologies, 'tutte le tipologie');
            this.typologies = response.data.typologies;

        })
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
    modalMessage:'',
    isOpen:false,
    cart: [],
    remove(dish) {
        //controlliamo che ci siano i piatti nel carrello
        if (store.cart && store.cart.length > 0) {
            //controlliamo i piatti che ci sono
            store.cart.forEach(dishCart => {
                //controlliamo che il nome del piatto che vogliamo levare si trovi nel carrello e che la quantita e' maggiore di 0 
                if (dishCart.id === dish.id) {
                    if (dishCart.counter > 1) {
                        //console.log(dish)
                        dishCart.counter--
                        if (localStorage[dish.name]) {
                            //rimuoviamo il vecchio
                            localStorage.removeItem(`${dish.name}`)
                            //aggiungiamo il nuovo
                            localStorage.setItem(`${dish.name}`, JSON.stringify(dish));
                        }
                    } else {
                        //rimuoviamo il piatto dal carrello
                        store.cart.splice(store.cart.findIndex(dishCart => dishCart.id === dish.id), 1)
                        //store.cart.splice(dish.oldPosition, 1)
                        //console.log(store.cart)
                        //rimuoviamo il piatto dal localStorage
                        localStorage.removeItem(`${dish.name}`)
                    }

                }
            })
        }

    },
    add(dish) {
        console.log(dish, 'dish')
        if (store.cart.includes(dish)) {
            //console.log(store.cart, `dentro includes`)
            store.cart.forEach(dishCart => {
                if (dishCart.id === dish.id) {
                    dishCart.counter++
                }
            })
            //incrementiamo il contatore di 1
            //dish.counter++
            //store.cart[index].counter++
            //console.log(store.cart)
            if (localStorage[dish.name]) {
                //rimuoviamo il vecchio
                localStorage.removeItem(`${dish.name}`)
                //aggiungiamo il nuovo
                localStorage.setItem(`${dish.name}`, JSON.stringify(dish));
            }
        } else {
            //se i piatti sono di ristoranti diversi
            if (store.cart.length > 0 && store.cart[0].restaurant_id != dish.restaurant_id) {
                console.log(localStorage.length, 'localstorage')
                console.log(store.cart.length, 'cart')
                console.log('i ristoranti sono diversi')
                this.modalMessage = "Non puoi selezionare piatti di ristoranti diversi."
                this.isOpen = true
            } else {
                //contatore a 1
                dish.counter++
                //aggiungiamo la sua posizione come proprieta'
                //dish.oldPosition = index
                //mettiamo il prodotto nel carrello
                store.cart.push(dish)
                //mettiamo il prodotto nel local storage
                localStorage.setItem(`${dish.name}`, JSON.stringify(dish));
                //console.log(store.cart, `dentro l'if !dish.counter`)
            }
        }
    }
})
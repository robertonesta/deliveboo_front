<script>
import axios from "axios";
import { store } from "../store.js"
export default {
    data() {
        return {
            store
        };
    },
    mounted() {
        //get all the restaurants
        store.getAllRestaurants()

        //se è stata fatta una ricerca nella home
        if (store.typologyId > 0) {
            console.log(store.typologyId, 'tipologia selezionata nel searchbar')
            //cicliamo nelle tipologie
            store.typologies.forEach(typologySelected => {
                //se l'id della tipologia dentro le tipologie è uguale a quella richiesta 
                if (typologySelected.id === store.typologyId) {
                    //ceccala
                    typologySelected.checked = true;
                    //console.log(store.typologies)
                }
                
            })
        } else {
            if (store.checkedTypologies.length > 0) {
                if(store.typologies.length > 0) {
                    store.checkedTypologies.forEach(checkedTypology => {
                        store.typologies.forEach(typology => {
                            if (typology.id === checkedTypology.id) {
                                typology.checked = true;
                            }
                        })
                    })
                }
            } else {
                store.getAllTypologies()
            }
            //se non è stata fatta nessuna ricerca mostra tutti i tipi di tipologie
        };
    },
    methods: {
        checkTypologies(typology) {
            //cecca la checkbox
            typology.checked = true;
            //controlliamo se ci sono gia checkbox ceccate e le salviamo
            store.checkedTypologies = store.typologies.filter(typologyArr => typologyArr.checked)
            console.log(store.checkedTypologies, 'checkedTypologies')
            //se non ne abbiamo
            if (store.checkedTypologies.length === 1) {
                console.log('checkedTypologies uguale 1')
                //facciamo la 1 chiamata
                axios
                    .post(
                        `${store.server}/api/searchRestaurants?typologyId=${typology.id}`
                    )
                    .then((response) => {
                        //se la risposta è positiva
                        if (response.data.restaurants.length > 0) {
                            //salva i ristoranti
                            store.filteredRestaurants = response.data.restaurants;
                            console.log(store.filteredRestaurants, '1 chiamata')
                        } else {
                            console.log('la ricerca non ha prodotto nessun risultato')
                            store.filteredRestaurants = []
                        }
                    })
            } else if (store.checkedTypologies.length > 1) {
                console.log('checkedTypologies maggiore di 1')
                store.checkedTypologies = []
                //inseriamo la nuova tipologia
                store.checkedTypologies.push(typology)
                //lasciamo l'ultima tipologia
                //store.checkedTypologies  = store.checkedTypologies[store.checkedTypologies.length - 1]
                console.log(store.checkedTypologies, 'checkedTypologies nella 2 chiamata')
                //store.checkedTypologies.splice(0, 1, typology)
                //facciamo la 2 chiamata
                axios
                    .post(
                        `${store.server}/api/searchRestaurants?typologyId=${typology.id}`
                    )
                    .then((response) => {
                        //se la risposta è positiva
                        console.log(response, 'response')
                        if (response.data.restaurants.length > 0) {
                            //salva i ristoranti
                            let newRestaurants = response.data.restaurants;
                            console.log(newRestaurants, '2 chiamata')
                            //creiamo un array che conterrà i ristoranti inclusi sia da newRestaurants che in store.filteredRestaurants e li mettiamo in un unico array
                            let merged = newRestaurants.map(newRestaurant => {
                                return store.filteredRestaurants.find(filteredRestaurant => filteredRestaurant.id === newRestaurant.id);
                            });
                            //console.log(merged, 'merged')
                            if (!merged.includes(undefined)) {
                                console.log(merged, 'merged dentro l\'if')
                                store.filteredRestaurants = merged
                                //cecca la checkbox
                                typology.checked = true;
                                //console.log(merged);
                            } else {
                                merged = merged.filter(restaurant => restaurant != undefined)
                                if (merged.length > 0) {
                                    store.filteredRestaurants = merged
                                    console.log(merged, 'merged fuori l\'if')
                                } else {
                                    console.log('la ricerca non ha prodotto nessun risultato')
                                    store.filteredRestaurants = []
                                }
                            }
                        }
                    })

            } else {
                console.log('checkedTypologies uguale 0')
                store.getAllRestaurants()
            }
        },
        filterPerTypology(typology) {
            //se si
            store.typologyId = typology;
            //console.log(store.checkedTypologies)

            if (!typology.checked) {
                this.checkTypologies(typology)
            } else {
                //la dececchiamo
                typology.checked = false;
                //controlliamo se ci sono gia checkbox ceccate e le salviamo
                store.checkedTypologies = store.typologies.filter(typologyArr => typologyArr.checked)
                console.log(store.checkedTypologies, 'se dececco')
                if (store.checkedTypologies.length > 0) {
                    axios
                        .post(
                            `${store.server}/api/searchRestaurants?typologyId=${store.checkedTypologies[0].id}`
                        )
                        .then((response) => {
                            //se la risposta è positiva
                            if (response.data.restaurants.length > 0) {
                                //salva i ristoranti
                                store.filteredRestaurants = response.data.restaurants;
                                //cecca la checkbox
                                //console.log(store.filteredRestaurants, '1 chiamata')
                            }
                        })
                } else {
                    //rimuovo tutti i ristoranti
                    store.filteredRestaurants = null
                    //mostro tutti i ristoranti
                    store.getAllRestaurants()
                    console.log(store.filteredRestaurants, 'tutti i ristoranti filtrati')
                    console.log(store.getAllRestaurants(), 'tutti i ristoranti')
                }
                //this.checkTypologies(typology)
                //se è gai ceccata allora si dececca
                //typology.checked = false;
                //si azzera la quantita dei ristoranti filtrati precedentemente
                //store.filteredRestaurants = null;
                //si fa la chiamata per ottenere tutti i ristoranti
            }
        }
        // Esegui una richiesta HTTP per inviare il valore selezionato al server Laravel

        // TO DO: fare la ricerca filtrata multipla
    },
}

</script>

<template>
    <main class="restaurants">
        <div class="container text-center align">
            <h1 class="my-5 text-white fw-semibold">Ristoranti</h1>
            <div class="text-center text-white">
                <h4>Filtra</h4>
                <div class="text-white d-flex justify-content-center gap-3 flex-wrap">
                    <div class="form-check d-flex gap-1" v-for="typology in store.typologies">
                        <input @click="filterPerTypology(typology)" :checked="typology.checked" class="form-check-input"
                            type="checkbox" :value="typology.name" :id="typology.name">
                        <label class="form-check-label" :for="typology.name">
                            {{ typology.name }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="row g-5" v-if="store.filteredRestaurants && store.filteredRestaurants.length > 0">
                <transition-group tag="div" name="fade" mode="in-out" class="row g-5">
                    <div class="col-12 col-sm-6 col-md-4 col-xl-3" v-for="restaurant in store.filteredRestaurants"
                        :key="restaurant.id">
                        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
                            class="text-decoration-none" :key="restaurant.id">
                            <div class="card h-100 justify-content-between border-0 bg-transparent">
                                <div class="card-header d-flex align-items-center justify-content-center fs-5 fw-semibold">
                                    <span class="p-1 rounded w-100 mb-4">{{ restaurant.name }}</span>
                                </div>
                                <div class="card-img-top flex-grow-1 animate__animated animate__fadeInRight">
                                    <img :src="restaurant.photo" alt="" class="rounded-3" loading="lazy">
                                </div>
                            </div>
                        </router-link>
                    </div>
                </transition-group>
            </div>
            <div v-else-if="store.filteredRestaurants && store.filteredRestaurants.length === 0">
                <p class="text-white">Non ci sono ristoranti con questo filtro di ricerca. <br> <a> Vai alla sezione con
                        tutti i Ristoranti per iniziare una nuova ricerca.</a></p>
            </div>
            <div class="row g-5" v-else="store.restaurants">
                <transition-group tag="div" name="fade" mode="in-out" class="row g-5">
                    <div class="col-12 col-sm-6 col-md-4 col-xl-3" v-for="restaurant in store.restaurants"
                        :key="restaurant.id">
                        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
                            class="text-decoration-none" :key="restaurant.id">
                            <div class="card h-100 justify-content-between border-0 bg-transparent">
                                <div class="card-header d-flex align-items-center justify-content-center fs-5 fw-semibold">
                                    <span class="p-1 rounded w-100 mb-4">{{ restaurant.name }}</span>
                                </div>
                                <div class="card-img-top flex-grow-1 animate__animated animate__fadeInRight">
                                    <img :src="restaurant.photo" alt="" class="rounded-3" loading="lazy">
                                </div>
                            </div>
                        </router-link>
                    </div>
                </transition-group>
            </div>
        </div>
    </main>
</template>


<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';

main.restaurants {
    background: url('./img/bg-restaurants-3.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    padding: 90px 1rem 6rem;

    .card {
        cursor: pointer;

        .card-img-top {
            img {
                width: 100%;
                height: 230px;
                object-fit: cover;
                transition: box-shadow 0.1s ease-in;
                box-shadow: none;

                &:hover {
                    box-shadow: 0 0 5px $d-boo-lighter;
                }
            }
        }

        .card-header {
            color: $d-boo-lighter;

            span {
                background-color: rgba(0, 0, 0, 0.742);
                color: $d-boo-orange;
                box-shadow: 0 0 3px $d-boo-orange;
            }
        }

        .card-footer {
            color: $d-boo-lighter;
        }

        .card-header,
        .card-footer {
            border: 0;
            background: transparent;
            height: 60px;

        }
    }


}
</style>
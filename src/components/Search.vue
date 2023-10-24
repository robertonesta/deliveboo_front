<script>
import axios from "axios";

export default {
  data() {
    return {};
  },

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <div>
    <h1>Ristoranti</h1>
    <div class="tipology-buttons">
      <button
        v-for="typology in typologies"
        :key="typology.id"
        @click="selectTypology(typology.id)">
        {{ typology.name }}
      </button>
    </div>
    <ul v-if="selectedTypology !== null">
      <li v-for="restaurant in filteredRestaurants" :key="restaurant.id">
        {{ restaurant.name }}
      </li>
    </ul>
    <div v-else>
      <p>Seleziona una tipologia di ristorante.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

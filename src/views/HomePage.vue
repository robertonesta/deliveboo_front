<script>
import SearchBar from "../components/SearchBar.vue";
import StaticSections from "../components/StaticSections.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    SearchBar,
    Footer,
    StaticSections
  },
  data() {
    return {};
  },
  methods: {},
  mounted() { },
};
</script>

<template>
  <div class="main">
    <main>
      <div class="container h-100 d-flex flex-column justify-content-center">
        <h1 class="w-50">Seleziona il tipo di ristorante e scegli cosa mangiare</h1>
        <div class="row">
          <div class="col">
            <SearchBar />
          </div>
        </div>
      </div>
    </main>
    <StaticSections />
    <Footer />
  </div>
</template>


<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';

main {
  height: 100vh;
  background: url('./img/cheesburger.png'), linear-gradient(122deg, $d-boo-background 50%, $d-boo-orange 50%);
  background-position: top 50% right 10%, center;
  background-repeat: no-repeat;

}


</style>
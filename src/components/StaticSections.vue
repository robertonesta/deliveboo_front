<script>
export default {
    name:'StaticSections'
}
</script>
<template>
    <div>
        <section class="first text-center">
      <p class="pt-5 fs-5">Ecco come funziona</p>
      <h2 class="">Non è mai stato più facile.</h2>
      <div class="container">
        <div class="row p-3 align-items-center mt-4 row-cols-1 row-cols-md-2">
          <div class="col px-3 d-flex justify-content-center align-items-center flex-column gap-3">
            <h4 class="fw-bold">Trovi quello che cerchi</h4>
            <img src="/img/map.jpg" alt="">
            <p class="">Ti mostriamo da quali ristoranti nelle vicinanze puoi ordinare.</p>
          </div>
          <div class="col px-3 d-flex justify-content-center align-items-center flex-column gap-3">
            <h4 class="fw-bold">Consegna veloce</h4>
            <img src="/img/delivery-scooter.png" alt="">
            <p class="">Mangi dove vuoi al momento che decidi tu!</p>
          </div>
        </div>
      </div>
    </section>
    <section class="second p-4">
      <div class="container">
        <h2 class="text-center py-4">Diventa nostro partner</h2>
      </div>
    </section>
    <section class="third">
      <div class="row p-3">
        <h2 class="text-center mb-4">Cosa puoi fare con <span>Deliveboo</span></h2>
        <div class="col-12 col-lg-6 text-center">
          <p class=" fs-5 p-3 w-75 mx-auto">
            Registra il tuo ristorante, aggiungi il tuo menù, scegli le tipologie e aumenta la tua visibilità.
          </p>
          <div class="icons">
            <img src="/img/register.png" alt="" class="w-25">
          </div>
        </div>
        <div class="col-12 col-lg-6 text-center">
          <p class="fs-5 p-3 w-75 mx-auto">
            Grazie al nostro servizio di consegna non farai mai aspettare i tuoi clienti!
          </p>
          <div class="icons">
            <img src="/img/time.png" alt="" class="w-25">
          </div>
        </div>
      </div>
    </section>
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';
section.first {
  background-color: $d-boo-lighter;

  h2 {
    color: $d-boo-orange;
    font-weight: 800;
    font-size: 3.5rem;
  }

  h4+img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
}

section.second {
  background-image: url('./img/partner.jpg');
  background-position: center;
  background-size: cover;
  height: 80vh;

  h2 {
    color: $d-boo-orange;
    font-weight: 800;
    font-size: 3.5rem;
  }
}

section.third {
  background-color: $d-boo-lighter;
  padding: 3rem 0;

  h2 {
    color: $d-boo-orange;
    font-weight: 800;
    font-size: 2.5rem;

    span {
      color: $d-boo-darker
    }
  }
}</style>
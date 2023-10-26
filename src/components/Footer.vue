<script>
    export default {
        name:"Footer"
    }
</script>
<template>
    <footer id="footer">
        <section>
			<div class="container">
				<div class="row pt-5 text-center">
					<div class="col-12 col-md-6 col-lg-3 gap-3">
						<h3 class="text-center text-md-start">Scopri Deliveroo</h3>

						<ul class="d-flex flex-column align-items-center align-items-md-start gap-3 mt-4 list-unstyled">
							<li><a href="#">Investitori</a></li>
							<li><a href="#">Chi siamo</a></li>
							<li><a href="#">Ristoranti</a></li>
							<li><a href="#">Altro</a></li>
                            <li><a href="#">Pressroom</a></li>
                            <li><a href="#">Programmazione</a></li>
                            <li><a href="#">Design</a></li>
                            <li><a href="#">Lavora con noi</a></li>
                            <li><a href="#">Diventa nostro partner</a></li>
						</ul>

					</div>
                    <div class="col-12 col-md-6 col-lg-3">
						<h3 class="text-center text-md-start">Note Legali</h3>

						<ul class="d-flex flex-column align-items-center align-items-md-start gap-3 mt-4 list-unstyled">
							<li><a href="#">Termini & condizioni</a></li>
							<li><a href="#">Informativa sulla privacy</a></li>
							<li><a href="#">Cookies</a></li>
						</ul>

					</div>
                    <div class="col-12 col-md-6 col-lg-3">
						<h3 class="text-center text-md-start">Aiuto</h3>

						<ul class="d-flex flex-column align-items-center align-items-md-start gap-3 mt-4 list-unstyled">
							<li><a href="#">Contatti</a></li>
							<li><a href="#">FAQ</a></li>
							<li><a href="#">Tipi di cucina</a></li>
						</ul>

					</div>
					<div class="col-12 col-md-6 col-lg-3 mt-5 mt-lg-0">
						<h3 class="text-center text-md-start">Made By</h3>

						<ul class="d-flex flex-column align-items-center align-items-md-start gap-3 mt-4 list-unstyled">
							<li><a href="https://www.linkedin.com/in/leonecarmelo/">Carmelo Leone</a></li>
							<li><a href="https://www.linkedin.com/in/paolo-cardinale/">Paolo Cardinale</a></li>
							<li><a href="https://www.linkedin.com/in/robertonesta/">Roberto Nesta</a></li>
							<li><a href="https://www.linkedin.com/in/mattia-benelli-1a1885270/">Mattia Benelli</a></li>
						</ul>
					</div>
				</div>

			</div>

			<div class="col-12 d-flex justify-content-between">
				<div class="container hidden">
					<div class="row justify-content-center">
						<nav class="navbar my-3 d-flex justify-content-center align-items-center">
							<a class="navbar-brand text-end me-0 text-md-center" href="#">
								&copy; 2023 Deliveboo, Inc.
							</a>
							<div class="col d-flex justify-content-center py-3 w-100">
								<a type="button"
									class="btn shadow d-flex align-items-center gap-2 w-50 justify-content-center fs-2"
									href="http://127.0.0.1:8000">
									Iscriviti!
								</a>
							</div>
						</nav>

					</div>
				</div>

			</div>
		</section>
    </footer>
</template>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';
#footer{
	background-color:$d-boo-orange;
    li * {
		color: $d-boo-dark;
		&:hover {
			color:$d-boo-lighter;
		}
	}
    h3{
        font-weight: 800;
    }
    a{
        text-decoration: none;
        color: $d-boo-dark;
    }

}
</style>
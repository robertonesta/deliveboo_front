<script>
export default {
    name: 'NavbarPage',
    data(){
        return {

        }
    }
}
</script>

<template>
    <div id="header">
        <nav class="navbar navbar-expand-md navbar-light bg_dark shadow-sm">
            <div class="container">
                <router-link to="/" class="nav-link active" aria-current="page">
                    <div class="logo w-25">
                        <p class="mb-0">logo</p>
                    </div>
                </router-link>
                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation"></button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link active" aria-current="page">Home<span class="visually-hidden">(current)</span></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/restaurants" class="nav-link">Locali</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>


<style lang="scss" scoped></style>
<script>
import { store } from '../store';
export default {
    name: 'ModalComponent',
    data() {
        return {
            store,

        }
    },
    
}
</script>

<template>
    <div v-if="store.modalMessage">   
        <div class="modal" id="modalId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true" v-if="store.modalMessage" :class="store.isOpen ? 'd-flex' : 'd-none'">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="store.isOpen = false"></button>
                    </div>
                    <div class="modal-body text-center fs-3">
                        {{store.modalMessage}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/general.scss';

.modal {
    background-color: $d-boo-dark-transparent;
    .modal-content {
        border:5px solid $d-boo-orange-light; 
    }
    .modal-header {
        background: $d-boo-darker;
        border-bottom: 3px solid $d-boo-orange-light;
        .btn-close {
            background-color: $d-boo-orange;
            opacity:1;
            transition: opacity 0.25s ease;
            &:hover {
                opacity: 0.8;
            }
        }
    }
    .modal-body {
        background: $d-boo-darker;
        color:$d-boo-background;
    }
}
</style>
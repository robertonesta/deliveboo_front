import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
/* module.exports = {
    publicPath: "./",
  }; */

createApp(App)
    .use(router)
    .mount('#app')

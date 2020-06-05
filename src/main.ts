import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index'
import Http from '@/utils/http'
import '@/directives/index'
import { $Message, $Confirm } from '@/plugins/Message'
import './plugins/element-ui.ts'
import './plugins/vue-awesome-swiper.ts'

Vue.config.productionTip = false

Vue.use(Http)
Vue.use($Message)
Vue.use($Confirm)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')

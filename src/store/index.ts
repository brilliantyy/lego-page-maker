import Vue from 'vue'
import Vuex from 'vuex'
import operatePlugin from './plugins/operatePlugin'

Vue.use(Vuex)

export interface IRootState {
	editStore: any
	pageStore: any
	templateStore: any
}

export default new Vuex.Store<IRootState>({
	plugins: [ operatePlugin, ]
})

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AsyncLoadComponentMixin extends Vue {
	private asyncComponents: any = {}

	private asyncLoadComponent(name: string): any {
		if (!this.asyncComponents[name]) {
			this.asyncComponents[name] = () => import(`@/views/tmpl/${name}.vue`)
			// .then(module => {
			//     const newModule = Object.create(module)
			//     newModule.default.mixins = 
			// })
		}
		return this.asyncComponents[name]
	}
}

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store/index'
import TYPES from './types'

interface Template {
	type: string
	name: string
}

interface ITemplateState {
	globalMap: Map<string, Template[]>
	[key: string]: any
}

@Module({ dynamic: true, store: store, name: 'templateStore' })
class TemplateState extends VuexModule implements ITemplateState {
	private _globalMap = new Map()
	private _templates: string[] = []

	get globalMap() {
		return this._globalMap
	}

	get templates() {
		return this._templates
	}

	@Mutation
	[TYPES.ADD_TEMPLATE](template: Template) {
		if (this._globalMap.has(template.type)) {
			const olds = this._globalMap.get(template.type)
			this._globalMap.set(template.type, [...olds, template])
		} else {
			this._globalMap.set(template.type, [template])
		}
	}

	@Mutation
	[TYPES.SET_CURRENT_TEMPLATES](type: string) {
		if (!type) {
			this._templates = []
		}
		const templates = this._globalMap.get(type)
		this._templates = templates
	}
}

export default getModule(TemplateState)

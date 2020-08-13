import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import TemplateStore from '@/store/modules/templateStore'
import { SET_CURRENT_TEMPLATES } from '@/store/modules/templateStore/types'
import store from '@/store/index'
import TYPES from './types'

interface IEditState {
	components: any[] // 组件列表
	activeComponents: string[] // 已选组件列表
	hoverComponent: string // 鼠标hover组件
	isPressed: boolean // 组件是否已选中
	anchorPressed: number // 锚点
	isLongDown: boolean // 当前是否处于多选状态
	offsetvalueX: number // 辅助线位置配合变量auxiliary确定具体位置
	offsetvalueY: number // 辅助线位置配合变量auxiliary确定具体位置
	properties: PropertyItem[]
	datas: DataItem[]
	historyIndex: number
}

@Module({ dynamic: true, store: store, name: 'editStore' })
class EditState extends VuexModule implements IEditState {
	private _components = [] as any[]
	private _activeComponents = [] as any[]
	private _hoverComponent = ''
	private _isPressed = false
	private _anchorPressed = 0
	private _isLongDown = false
	private _offsetvalueX = 0
	private _offsetvalueY = 0
	private _properties = [] as any[]
	private _datas = [] as any[]
	private _historyIndex = 0
	private _templates: string[] = []

	get components() {
		return this._components
	}
	get activeComponents() {
		return this._activeComponents
	}
	get hoverComponent() {
		return this._hoverComponent
	}
	get isPressed() {
		return this._isPressed
	}
	get anchorPressed() {
		return this._anchorPressed
	}
	get offsetvalueX() {
		return this._offsetvalueX
	}
	get offsetvalueY() {
		return this._offsetvalueY
	}
	get isLongDown() {
		return this._isLongDown
	}
	get properties() {
		return this._properties
	}
	get datas() {
		return this._datas
	}
	get historyIndex() {
		return this._historyIndex
	}
	get componentsConfig() {
		return this._components.map(cmp => ({
			name: cmp.name,
			id: cmp.id,
			css: cmp.css,
			options: cmp.options,
			animation: cmp.animation
		}))
	}

	@Mutation
	[TYPES.SET_MOUSE_DOWN](status: boolean) {
		this._isPressed = status
	}

	@Mutation
	[TYPES.UPDATE_CMPS](cmps: any[]) {
		this._components = cmps
	}

	@Mutation
	[TYPES.ADD_CMP](cmp: any) {
		this._components.push(cmp)
	}

	@Mutation
	[TYPES.REPLACE_CMP](cmp: any) {
		const currentIndex = this._components.findIndex(cmp => this._activeComponents.includes(cmp.id))
		const { top, left } = this._components[currentIndex].css
		cmp.css.top = top
		cmp.css.left = left
		this._components.splice(currentIndex, 1, cmp)
		this._activeComponents[0] = cmp.id
		// TODO 多选情况
	}

	@Mutation
	[TYPES.SET_HOVER_CMP](id: string) {
		this._hoverComponent = id
	}

	@Mutation
	[TYPES.UPDATE_CMP_STYLE]({ id, css } : { id: string, css: any }) {
		const cmps = this._components.slice()
		const cmp = cmps.filter((cmp: any) => cmp.id === id)[0]

		cmp.css = css
	}

	@Mutation
	[TYPES.TOGGLE_CMP_STATUS](id: string) {
		const cmps = this._components.slice()
		const activeComponents: any[] = []
		const chosen = cmps.filter((cmp: any) => cmp.id === id)
		const templateType = chosen[0].name.replace('cmp-', '')

		if (!!chosen.length) {
			activeComponents.push(id)
			if (chosen[0].options.isTemplate) {
				(TemplateStore as any)[SET_CURRENT_TEMPLATES](chosen[0].options.templateType)
			} else if (TemplateStore.globalMap.has(templateType)) {
				(TemplateStore as any)[SET_CURRENT_TEMPLATES](templateType)
			} else {
				(TemplateStore as any)[SET_CURRENT_TEMPLATES]()
			}
		}

		this._activeComponents = activeComponents
	}

	@Mutation
	[TYPES.CLEAR_SELECTED]() {
		this._components.forEach((cmp: any) => {
			if (this._activeComponents.includes(cmp.id)) {
				if (cmp.options && cmp.options.activeIndex) {
					cmp.options.activeIndex = 0
				}
			}
		})
		this._activeComponents = []
	}

	@Mutation
	[TYPES.CLEAR_ALL]() {
		this._components = []
	}

	@Mutation
	[TYPES.UPDATE_ANCHOR_POS](index: number) {
		this._anchorPressed = index
	}

	@Mutation
	[TYPES.UPDATE_POSITION]({ x, y }: { x: number; y: number }) {
		const cmps = this._components.slice()
		cmps.map((item: any) => {
			if (this._activeComponents.includes(item.id)) {
				const oldLeft = Number(item.css.left)
				const oldTop = Number(item.css.top)
				item.css.left = oldLeft + x <= 0 ? 0 : oldLeft + x
				item.css.top = oldTop + y <= 0 ? 0 : oldTop + y
			}
		})
		// 判断绝对值
		// 自动偏移到最近的上面
		// 判断是否存在辅助线
		// list.map((res) => {
		//     if (state.activeTemplate.includes(res.activityId)) {
		//     // 针对选中的组件进行匹配
		//     for (let index = 0; index < state.marking.x.length; index++) {
		//         // 组件下侧
		//         const item = state.marking.x[index]
		//         if (item.includes(res.css.top + res.css.height)) {
		//         state.offsetvalueX = res.css.top + res.css.height
		//         res.css.top = item[0] - res.css.height
		//         break
		//         }
		//         // 组件上侧
		//         if (item.includes(res.css.top)) {
		//         state.offsetvalueX = res.css.top
		//         res.css.top = item[0]
		//         break
		//         }
		//         state.offsetvalueX = 0
		//     }
		//     // 组件左侧
		//     for (let index = 0; index < state.marking.y.length; index++) {
		//         const item = state.marking.y[index]
		//         if (item.includes(res.css.left + res.css.width)) {
		//         state.offsetvalueY = res.css.left + res.css.width
		//         res.css.left = item[0] - res.css.width
		//         break
		//         }
		//         if (item.includes(res.css.left)) {
		//         state.offsetvalueY = res.css.left
		//         res.css.left = item[0]
		//         break
		//         }
		//         state.offsetvalueY = 0
		//     }
		//     }
		// })
		this._components = cmps
	}
	
	@Mutation
	[TYPES.UPDATE_RESIZE]({ x, y }: { x: number; y: number }) {
		const cmps = this._components.slice()
		if (this._anchorPressed === 1) {
			cmps.map(cmp => {
				if (this._activeComponents.includes(cmp.id)) {
					cmp.css.left = Number(cmp.css.left) + x
					cmp.css.top = Number(cmp.css.top) + y
					cmp.css.width = Number(cmp.css.width) - x
					cmp.css.height = Number(cmp.css.height) - y
				}
			})
		} else if (this._anchorPressed === 2) {
			cmps.map(cmp => {
				if (this._activeComponents.includes(cmp.id)) {
					cmp.css.top = Number(cmp.css.top) + y
					cmp.css.height = Number(cmp.css.height) - y
				}
			})
		} else if (this._anchorPressed === 3) {
			cmps.map(cmp => {
				if (this._activeComponents.includes(cmp.id)) {
					cmp.css.top = Number(cmp.css.top) + y
					cmp.css.width = Number(cmp.css.width) + x
					cmp.css.height = Number(cmp.css.height) - y
				}
			})
		} else if (this._anchorPressed === 4) {
			cmps.map(cmp => {
				if (this._activeComponents.includes(cmp.id)) {
					cmp.css.width = Number(cmp.css.width) + x
					cmp.css.height = Number(cmp.css.height) + y
				}
			})
		} else if (this._anchorPressed === 5) {
			cmps.map(cmp => {
				if (this._activeComponents.includes(cmp.id)) {
					cmp.css.height = Number(cmp.css.height) + y
				}
			})
		} else if (this._anchorPressed === 6) {
			cmps.map(cmp => {
				if (this._activeComponents.includes(cmp.id)) {
					cmp.css.left = Number(cmp.css.left) + x
					cmp.css.width = Number(cmp.css.width) - x
					cmp.css.height = Number(cmp.css.height) + y
				}
			})
		}
		this._components = cmps
	}

	@Mutation
	[TYPES.UPDATE_PROPERTIES](properties: PropertyItem[]) {
		this._properties = properties
	}

	@Mutation
	[TYPES.UPDATE_DATA](data: DataItem[]) {
		this._datas = data
	}

	// 文本组件
	@Mutation
	[TYPES.UPDATE_TEXT]({ id, text }: { id: string; text: string }) {
		const cmp = this._components.filter((cmp: any) => cmp.id === id)[0]
		if (cmp) {
			cmp.options.text = text
		}
	}

	// 幻灯片组件
	@Mutation
	[TYPES.UPDATE_INDEX]({ id, index }: { id: string; index: string }) {
		const cmp = this._components.filter((cmp: any) => cmp.id === id)[0]
		if (cmp) {
			cmp.options.activeIndex = index
		}
	}

	@Action({ rawError: true })
	[TYPES.UPDATE_MOUSE_DOWN](status: boolean) {
		(this as any)[TYPES.SET_MOUSE_DOWN](status)

		if (status) {
			// commit(TYPES.UPDATE_ANCHOR_POS)
		}
	}

	// 模板相关
	@Action({ rawError: true })
	[TYPES.UPDATE_TEMPLATES](templates: any[]) {
		this._templates = templates
	}
}

export const initialState = {
	components: [],
	activeComponents: [],
	hoverComponent: '',
	isPressed: false,
	anchorPressed: 0,
	isLongDown: false,
	offsetvalueX: 0,
	offsetvalueY: 0,
	properties: [],
	datas: []
}

export default getModule(EditState)

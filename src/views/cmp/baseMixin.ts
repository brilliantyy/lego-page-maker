import { Component, Vue, Prop } from 'vue-property-decorator'
import { handleStyle } from '@/utils/index'
import EditStore from '@/store/modules/editStore'
import TYPES from '@/store/modules/editStore/types'

@Component
export default class BaseMixin extends Vue {
	@Prop({ default: '' }) id!: string
	@Prop({ default: () => {} }) css!: object
	@Prop({ default: () => {} }) options!: Options
	@Prop({ default: () => [] }) properties!: PropertyItem[]
	@Prop({ default: () => [] }) datas!: DataItem[]

	defaultUrl: string = require('@/assets/img/png/image.png')

	get idTag() {
		return this.id.split('-')[0]
	}

	get style() {
		return handleStyle(this.css)
	}

	get constyle() {
		const style = handleStyle(this.css)
		return {
			top: style.top,
			left: style.left,
			width: style.width,
			height: style.height,
			paddingTop: style.paddingTop,
			paddingLeft: style.paddingLeft,
			paddingRight: style.paddingRight,
			paddingBottom: style.paddingBottom,
			zIndex: style.zIndex,
		}
	}

	get isEdit() {
		return EditStore.activeComponents.includes(this.id)
	}

	get hoverStatus() {
		return EditStore.hoverComponent == this.id
	}

	public toggleEdit() {
		;(EditStore as any)[TYPES.TOGGLE_CMP_STATUS](this.id)
		;(EditStore as any)[TYPES.UPDATE_MOUSE_DOWN](true)
		;(EditStore as any)[TYPES.UPDATE_PROPERTIES](this.properties)
		;(EditStore as any)[TYPES.UPDATE_DATA](this.datas)
	}

	public mousedown(e: Event) {
		e.preventDefault()
	}

	public mouseenter() {
		;(EditStore as any)[TYPES.SET_HOVER_CMP](this.id)
	}

	public mouseleave() {
		;(EditStore as any)[TYPES.SET_HOVER_CMP]('')
	}
}

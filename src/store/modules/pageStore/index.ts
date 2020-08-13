import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store/index'
import { pageWidth, pageHeight } from '@/config'
import TYPES from './types'

interface IPageState {
	title: string
	pageHeight: number
	url: string
	pid: number | string
	description: string
	renderType: number
	backgroundColor: string
	backgroundImage: string
	backgroundRepeat: string
	backgroundSize: string
	[key: string]: any
}

@Module({ dynamic: true, store: store, name: 'pageStore' })
class PageState extends VuexModule implements IPageState {
	public url = ''
	public title = ''
	public pageWidth = pageWidth
	public pageHeight = pageHeight
	public renderType = 0
	public backgroundColor = '#FFFFFF'
	public backgroundImage = ''
	public backgroundRepeat = 'no-repeat'
	public backgroundSize = 'none'
	public pid = ''
	public description = ''

	get pageConfig() {
		return {
			pid: this.pid,
			url: this.url,
			title: this.title,
			pageHeight: this.pageHeight,
			renderType: this.renderType,
			backgroundColor: this.backgroundColor,
			backgroundImage: this.backgroundImage,
			backgroundRepeat: this.backgroundRepeat,
			backgroundSize: this.backgroundSize,
			description: this.description
		}
	}
	
	@Mutation
	[TYPES.UPDATE_SETTINGS](settings: IPageState) {
		Object.keys(settings).forEach(key => {
			(<IPageState>this)[key] = settings[key]
		})
	   
	}
}

export default getModule(PageState)

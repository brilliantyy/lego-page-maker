import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store/index'
import { pageHeight } from '@/config'
import TYPES from './types'

interface IPageState {
    title: string
	pageHeight: number
	url: string
	pid: number | string
    description: string
    background: string
    [key: string]: any
}

@Module({ dynamic: true, store: store, name: 'pageStore' })
class PageState extends VuexModule implements IPageState {
    public url = ''
    public title = ''
	public pageHeight = pageHeight
	public background = '#FFFFFF'
	public pid = ''
    public description = ''
    
    @Mutation
    [TYPES.UPDATE_SETTINGS](settings: IPageState) {
        Object.keys(settings).forEach(key => {
            (<IPageState>this)[key] = settings[key]
        })
    }
}

export default getModule(PageState)

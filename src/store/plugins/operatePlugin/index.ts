import { cloneDeep } from 'lodash'
import history from './history'
import TYPES from '../../modules/editStore/types'
import PAGE_TYPES from '../../modules/pageStore/types'

const mutationWhitelist: string[] = [
	TYPES.SET_HOVER_CMP,
	TYPES.SET_MOUSE_DOWN,
	TYPES.TOGGLE_CMP_STATUS,
	TYPES.UPDATE_MOUSE_DOWN,
	TYPES.UPDATE_ANCHOR_POS,
	TYPES.UPDATE_INDEX,
	TYPES.CLEAR_SELECTED,
	TYPES.UPDATE_PROPERTIES,
	TYPES.UPDATE_DATA,
	PAGE_TYPES.UPDATE_SETTINGS
]

export default function(store: any) {
	history.init(store, 20)
	history.setState({})
	store.subscribe((mutation: any, state: any) => {
		if (!mutationWhitelist.includes(mutation.type)) {
			history.setState(cloneDeep(state))
		}
	})
}

export function undo() {
	history.undo()
}

export function redo() {
	history.redo()
}

export function reset() {
	history.reset()
}

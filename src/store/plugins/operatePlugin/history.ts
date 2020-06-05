import { cloneDeep } from 'lodash'
import { initialState } from '../../modules/editStore'
import { SET_MOUSE_DOWN } from '../../modules/editStore/types'

class History {
	private store: any = null
	private state: any[] = []
	private index: number = 0
	private max: number = 20

	public init(store: any, max: number) {
		this.store = store
		this.max = max
	}

	public setState(state: any) {
		debounce(() => {
			if (this.state.length - 1 >= this.max) {
				this.state.shift()
			}
			if (this.state.length - 1 > this.index) {
				this.state.splice(this.index + 1, this.state.length - 1)
			}
			this.state.push(state)
			this.index = this.state.length - 1
		}, 200)
	}

	public getState() {
		return this.state
	}

	public getIndex() {
		return this.index
	}

	public undo() {
		if (this.index > 0) {
			this.index -= 1
			let state = cloneDeep(this.state[this.index])
			if (!Object.keys(state).length) {
				state = { editStore: initialState }
			}
			this.store.replaceState(state)
			this.store.commit(SET_MOUSE_DOWN, false)
		} else {
			alert('已无法进行撤回操作')
		}
	}

	public redo() {
		if (this.state.length - 1 > this.index) {
			this.index += 1
			let state = cloneDeep(this.state[this.index])
			if (!Object.keys(state).length) {
				state = { editStore: initialState }
			}
			this.store.replaceState(state)
			this.store.commit(SET_MOUSE_DOWN, false)
		} else {
			alert('已无法进行重做操作')
		}
	}

	public reset() {
		this.state = []
		this.index = 0
	}
}
let timeout: any = null
export function debounce(fn: Function, wait: number) {
	if (timeout !== null) clearTimeout(timeout)
	timeout = setTimeout(fn, wait)
}

const history = new History()
export default history

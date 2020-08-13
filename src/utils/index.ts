import Vue from 'vue'
import EditStore from '@/store/modules/editStore'
import TemplateStore from '@/store/modules/templateStore'
import TYPES from '@/store/modules/editStore/types'
import { ADD_TEMPLATE } from '@/store/modules/templateStore/types'

/**
 * 对css进行格式化处理
 */
export function handleStyle(css: any) {
	const cssOutput: any = {}
	const style = [
		'top',
		'left',
		'width',
		'height',
		'font-size',
		'fontSize',
		'borderRadius',
		'marginTop',
		'marginLeft',
		'marginBottom',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
		'borderWidth',
		'letterSpacing',
		'line-height',
		'lineHeight',
		'slideWidth'
	]
	const animation = ['animationDuration', 'animationDelay']
	for (const key in css) {
		if (style.includes(key)) {
			cssOutput[key] = `${css[key]}px`
		} else if (animation.includes(key)) {
			cssOutput[key] = `${css[key]}ms`
		} else {
			cssOutput[key] = css[key]
		}
	}
	return cssOutput
}


let pagePanel: any = null

function handleMouseUp() {
	if (EditStore.isPressed || EditStore.anchorPressed) {
		;(EditStore as any)[TYPES.UPDATE_MOUSE_DOWN](false)
		;(EditStore as any)[TYPES.UPDATE_ANCHOR_POS](0)
	}
}

function handleMouseMove(e: MouseEvent) {
	if (EditStore.isPressed) {
		;(EditStore as any)[TYPES.UPDATE_POSITION]({ x: e.movementX, y: e.movementY })
	}

	if (EditStore.anchorPressed) {
		;(EditStore as any)[TYPES.UPDATE_RESIZE]({ x: e.movementX, y: e.movementY })
	}
}

export function initMouseEvent() {
	pagePanel = document.querySelector('.page-panel')
	pagePanel.addEventListener('mouseup', handleMouseUp)
	pagePanel.addEventListener('mousemove', handleMouseMove)
}

export function destroyMouseEvent() {
	pagePanel.removeEventListener('mouseup', handleMouseUp)
	pagePanel.removeEventListener('mousemove', handleMouseMove)
}

/* 加载全部模板 */
export function loadTemplates() {
	const context = require.context('../views/templates', true, /\.vue$/)
	let constructor = null
	
	context.keys().forEach(path => {
		const item = context(path)
		const res = path.match(/\/([a-zA-Z]+)\//)
		let type = ''
		if (res && res.length > 1) {
			type = res[1]
		}
		constructor = Vue.extend(item.default)
		const formatName = item.default.name.replace(/[A-Z]/g, function(r: string) { return `-${r.toLowerCase()}`}).slice(1)
		const instance = new constructor()
		Vue.component(formatName, item.default);
		(TemplateStore as any)[ADD_TEMPLATE]({ type: type || formatName, name: formatName, nickname: (instance as any).nickName, icon: (instance as any).previewImage })
	})
	constructor = null
}

export function importAllSFC(context: any) {
	const modules: any = {}

	context.keys().forEach((key: string) => {
		const module = context(key).default
		modules[module.name] = module
	})
	return modules
}

export function importAllModel(context: any) {
	let modules = {}

	context.keys().forEach((key: string) => {
		modules = { ...modules, ...context(key) }
	})
	return modules
}

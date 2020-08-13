import Vue, { VNode } from "vue";

declare global {
	namespace JSX {
		// tslint:disable no-empty-interface
		interface Element extends VNode {}
		// tslint:disable no-empty-interface
		interface ElementClass extends Vue {}
		interface IntrinsicElements {
		[elem: string]: any;
		}
	}

	interface PageData {
		pid: number | string
		url: string
		title: string
		pageHeight: number
		description: string
		backgroundColor: string
		backgroundImage: string
	}

	interface Options {
		[index: string]: any
	}

	interface PropertyItem {
		type: string
		name: string
		key: string
		data?: Array<any>
		value?: any
		min?: number
		max?: number
	}

	interface DataItem {
		type: string
		name: string
		key: string
		data?: Array<any>
		value?: any
		min?: number
		unit?: string
		attr?: string,
		options?: Array<any>
		validator?: RegExp
	}

	interface styleObj {
		left: string,
		top: string,
		width: string,
		height: string,
		zIndex: string,
	}

	interface DragEvt {
		offsetX: number
		offsetY: number
		target: any
		dataTransfer: any
		preventDefault: Function
	}
}

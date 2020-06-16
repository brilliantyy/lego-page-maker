import { guid } from '@/utils/tools'
import { carouselEffectOptions, methodOptions } from '@/config/index'

export interface BaseComponent {
	id: String
	name: String
	css: Object
    properties: PropertyItem[]
	animation?: Object
	datas?: DataItem[]
	options?: Object
	activeIndex?: number
}

export function cmpDiv(): BaseComponent {
	return {
		name: 'cmp-div',
		id: guid(),
		options: {},
		css: {
			top: 0,
			left: 0,
			width: 300,
			height: 100,
			zIndex: 0, //store.components.length + 1,
			backgroundColor: '#FFFFFF',
			borderColor: '#000000',
			borderStyle: 'solid',
			borderWidth: 1,
			borderRadius: 0,
		},
		animation: {
			animationName: '',
			animationDuration: 1000, // 动画时间
			animationDelay: 0, // 延迟时间
			animationIterationCount: 1, // 动画执行次数
			animationFillMode: 'both', // 动画停留最后一帧
		},
		properties: [
			{ name: '对齐方式', key: 'align', type: 'blockAlign' },
			{ name: '宽度', key: 'width', type: 'number' },
			{ name: '高度', key: 'height', type: 'number' },
			{ name: '圆角', key: 'borderRadius', type: 'number' },
			{ name: '层级', key: 'zIndex', type: 'number' },
			{ name: '边框宽度', key: 'borderWidth', type: 'number' },
			{ name: '边框颜色', key: 'borderColor', type: 'color' },
			{ name: '背景色', key: 'backgroundColor', type: 'color' }
		]
	}
}

export function cmpText(): BaseComponent {
	return {
		name: 'cmp-text',
		id: guid(),
		options: {
			text: ''
		},
		css: {
			top: 0,
			left: 0,
			width: 200,
			height: 30,
			zIndex: 0,
			fontSize: 12,
			fontWeight: 400,
			fontStyle: 'normal',
			textDecoration: 'none',
			textAlign: 'left',
			backgroundColor: 'rgba(255,255,255,0)',
			borderColor: '#000000',
			borderStyle: 'solid',
			borderWidth: 0,
			borderRadius: 0,
			color: '#333',
			letterSpacing: 0,
			lineHeight: 12,
		},
		animation: {
			animationName: '',
			animationDuration: 1000,
			animationDelay: 0,
			animationIterationCount: 1,
			animationFillMode: 'both',
		},
		properties: [
			{ name: '文本对齐', key: 'textAlign', type: 'textAlign' },
			{ name: '宽度', key: 'width', type: 'number' },
			{ name: '高度', key: 'height', type: 'number' },
			{ name: '背景色', key: 'backgroundColor', type: 'color' },
			{ name: '边框颜色', key: 'borderColor', type: 'color' },
			{ name: '边框宽度', key: 'borderWidth', type: 'number' },
			{ name: '字体颜色', key: 'color', type: 'color' },
			{ name: '字体大小', key: 'fontSize', type: 'number' },
			{ name: '字体属性', key: 'fontProp', type: 'fontProp' },
			{ name: '字间距', key: 'letterSpacing', type: 'number' },
			{ name: '行间距', key: 'lineHeight', type: 'number' },
			{ name: '层级', key: 'zIndex', type: 'number' },
		],
	}
}

export function cmpImage(url: string): BaseComponent {
	return {
		name: 'cmp-image',
		id: guid(),
		options: {
			url,
		},
		css: {
			top: 0,
			left: 0,
			width: 140,
			height: 110,
			zIndex: 0,
			background: '#FFFFFF',
			borderColor: 'rgba(255,255,255,0)',
			borderStyle: 'solid',
			borderWidth: 1,
			borderRadius: 0,
			objectFit: 'none',
		},
		animation: {
			animationName: '',
			animationDuration: 1000,
			animationDelay: 0,
			animationIterationCount: 1,
			animationFillMode: 'both',
		},
		properties: [
			{ name: '宽度', key: 'width', type: 'number' },
			{ name: '高度', key: 'height', type: 'number' },
			{ name: '圆角', key: 'borderRadius', type: 'number' },
			{ name: '边框宽度', key: 'borderWidth', type: 'number' },
			{ name: '适应方式', key: 'objectFit', type: 'objectFit' },
			{ name: '边框颜色', key: 'borderColor', type: 'color' },
			{ name: '层级', key: 'zIndex', type: 'number' },
		],
		datas: [
			{ name: '图片', key: 'url', type: 'upload' },
		]
	}
}

export function cmpCarousel(): BaseComponent {
	return {
		name: 'cmp-carousel',
		id: guid(),
		options: {
			items: [{ url: '', link: '' }],
			activeIndex: 0,
			nums: 1,
			autoplay: true,
			speed: 300,
			delay: 1000,
			effect: 'slide'
		},
		css: {
			top: 0,
			left: 0,
			width: 375,
            height: 140,
            paddingTop: 0,
            paddingLeft: 0,
            paddingBottom: 0,
            paddingRight: 0,
            marginTop: 0,
            marginLeft: 0,
            marginBottom: 0,
            marginRight: 0,
			zIndex: 0,
			backgroundColor: '#eeeeee',
			borderColor: '#000000',
			borderStyle: 'solid',
			borderWidth: 0,
			borderRadius: 0,
			boxSizing: 'border-box',
			objectFit: 'none',
		},
		animation: {
			animationName: '',
			animationDuration: 1000,
			animationDelay: 0,
			animationIterationCount: 1,
			animationFillMode: 'both'
		},
		properties: [
			{ name: '对齐方式', key: 'align', type: 'blockAlign' },
			{ name: '宽度', key: 'width', type: 'number' },
			{ name: '高度', key: 'height', type: 'number' },
			{ name: '内边距', key: 'padding', type: 'group-number' },
			{ name: '外边距', key: 'margin', type: 'group-number' },
			{ name: '圆角', key: 'borderRadius', type: 'number' },
			{ name: '边框宽度', key: 'borderWidth', type: 'number' },
			{ name: '适应方式', key: 'objectFit', type: 'objectFit' },
            { name: '边框颜色', key: 'borderColor', type: 'color' },
			{ name: '背景色', key: 'backgroundColor', type: 'color' },
			{ name: '层级', key: 'zIndex', type: 'number' },
		],
		datas: [
			{ name: '图片', key: 'carousel', type: 'carousel' },
			{ name: '切换效果', key: 'effect', type: 'select', options: carouselEffectOptions },
			{ name: '自动切换', key: 'autoplay', type: 'switch' },
			{ name: '切换时间', key: 'speed', type: 'number', min: 1, unit: '（毫秒）' },
			{ name: '间隔时间', key: 'delay', type: 'number', min: 1000, unit: '（毫秒）' }
		],
	}
}

export function cmpForm(): BaseComponent {
	return {
		name: 'cmp-form',
		id: guid(),
		options: {
			formItemName: { type: 'input', name: 'name', value: '', placeholder: '请输入您的姓名', inputType: 'text' },
			formItemPhone: { type: 'input', name: 'phone', value: '', placeholder: '请输入您的手机号码', inputType: 'tel' },
			formItemSubmit: { type: 'button', name: 'submit', text: '提交' },
			requestUrl: { value: '' },
			method: 'POST',
		},
		css: {
			top: 0,
			left: 0,
			width: 200,
			height: 30,
			itemHeight: 30,
			zIndex: 0,
			marginBottom: 10,
			borderColor: 'rgba(0,0,0,0.5)',
			borderStyle: 'solid',
			borderWidth: 1,
			borderRadius: 0,
		},
		animation: {
			animationName: '',
			animationDuration: 1000,
			animationDelay: 0,
			animationIterationCount: 1,
			animationFillMode: 'both',
		},
		properties: [
			{ name: '对齐方式', key: 'align', type: 'blockAlign' },
			{ name: '宽度', key: 'width', type: 'number' },
			{ name: '高度', key: 'height', type: 'number' },
			{ name: '间距', key: 'marginBottom', type: 'number' },
			{ name: '圆角', key: 'borderRadius', type: 'number' },
			{ name: '边框宽度', key: 'borderWidth', type: 'number' },
			{ name: '边框颜色', key: 'borderColor', type: 'color' },
			{ name: '层级', key: 'zIndex', type: 'number' },
		],
		datas: [
			{ name: '接口地址', key: 'requestUrl', type: 'input', attr: 'value', validator: /^https?:\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/ },
			{ name: '提交方式', key: 'method', type: 'select', options: methodOptions },
			{ name: '提交按钮', key: 'formItemSubmit', type: 'input', attr: 'text' },
		]
	}
}

export function cmpScroller(): BaseComponent {
	return {
		name: 'cmp-scroller',
		id: guid(),
        activeIndex: 0,
		options: {
			items: [{ url: '', link: '' }],
			autoplay: true,
			loop: true,
			interval: 300,
		},
		css: {
			top: 0,
			left: 0,
			width: 140,
			height: 110,
			zIndex: 0,
			background: '#FFFFFF',
			borderColor: '#FFFFFF',
			borderStyle: 'solid',
			borderWidth: 1,
			borderRadius: 0,
			objectFit: 'none'
		},
		animation: {
			animationName: '',
			animationDuration: 1000,
			animationDelay: 0,
			animationIterationCount: 1,
			animationFillMode: 'both'
		},
		properties: [
			{ name: '宽度', key: 'width', type: 'number' },
			{ name: '高度', key: 'height', type: 'number' },
			{ name: '边框颜色', key: 'borderColor', type: 'color' },
			{ name: '层级', key: 'zIndex', type: 'number' },
		],
		datas: [
			{ name: '图片', key: 'carousel', type: 'carousel' },
			{ name: '适应方式', key: 'objectFit', type: 'objectFit' },
			{ name: '自动切换', key: 'autoplay', type: 'switch' },
			{ name: '循环播放', key: 'loop', type: 'switch' },
			{ name: '间隔时间', key: 'interval', type: 'number', min: 1, unit: '（毫秒）' },
		],
	}
}

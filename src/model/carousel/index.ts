import { guid } from '@/utils/tools'
import { BaseComponent } from '@/model/baseComponent'
import { carouselApiOptions, carouselEffectOptions } from '@/config/index'

export function carouselNormal(): BaseComponent {
    return {
        name: 'carousel-normal',
        id: guid(),
		options: {
            isTemplate: true,
            templateType: 'carousel',
			items: [{ url: '', link: '' }],
			api: 0,
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
			objectFit: 'none'
		},
		properties: [
			{ name: '对齐方式', key: 'align', type: 'blockAlign' },
			{ name: '宽度', key: 'width', type: 'number' },
			{ name: '高度', key: 'height', type: 'number' },
			{ name: '内边距', key: 'padding', type: 'group-number' },
			{ name: '外边距', key: 'margin', type: 'group-number' },
			{ name: '圆角', key: 'borderRadius', type: 'number' },
			{ name: '边框宽度', key: 'borderWidth', type: 'number' },
			{ name: '边框颜色', key: 'borderColor', type: 'color' },
			{ name: '背景色', key: 'backgroundColor', type: 'color' },
			{ name: '适应方式', key: 'objectFit', type: 'objectFit' },
			{ name: '层级', key: 'zIndex', type: 'number' },
		],
		datas: [
            { name: '数目', key: 'nums', type: 'number', min: 1 },
			{ name: '数据源', key: 'api', type: 'select', options: carouselApiOptions },
			{ name: '切换效果', key: 'effect', type: 'select', options: carouselEffectOptions },
			{ name: '自动切换', key: 'autoplay', type: 'switch' },
			{ name: '切换时间', key: 'speed', type: 'number', min: 1, unit: '（毫秒）' },
			{ name: '间隔时间', key: 'delay', type: 'number', min: 1000, unit: '（毫秒）' },
		]
    }
}

export function carouselRotate(): BaseComponent {
    return {
        name: 'carousel-rotate',
        id: guid(),
		options: {
            isTemplate: true,
            templateType: 'carousel',
			items: [{ url: '', link: '' }, { url: '', link: '' }, { url: '', link: '' }],
			api: 0,
			nums: 3,
			autoplay: true,
			speed: 300,
			delay: 1000,
		},
		css: {
			top: 0,
			left: 0,
			width: 375,
			height: 140,
			slideWidth: 240,
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
			boxSizing: 'border-box'
		},
		properties: [
			{ name: '对齐方式', key: 'align', type: 'blockAlign' },
			{ name: '容器宽度', key: 'width', type: 'number', min: 0, max: 375 },
			{ name: '容器高度', key: 'height', type: 'number' },
			{ name: '元素宽度', key: 'slideWidth', type: 'number', min: 0, max: 375 },
			{ name: '内边距', key: 'padding', type: 'group-number' },
			{ name: '外边距', key: 'margin', type: 'group-number' },
			{ name: '圆角', key: 'borderRadius', type: 'number' },
			{ name: '边框宽度', key: 'borderWidth', type: 'number' },
			{ name: '边框颜色', key: 'borderColor', type: 'color' },
			{ name: '背景色', key: 'backgroundColor', type: 'color' },
			{ name: '适应方式', key: 'objectFit', type: 'objectFit' },
			{ name: '层级', key: 'zIndex', type: 'number' },
		],
		datas: [
            { name: '数目', key: 'nums', type: 'number', min: 3 },
			{ name: '数据源', key: 'api', type: 'select', options: carouselApiOptions },
			{ name: '自动切换', key: 'autoplay', type: 'switch' },
			{ name: '切换时间', key: 'speed', type: 'number', min: 1, unit: '（毫秒）' },
			{ name: '间隔时间', key: 'delay', type: 'number', min: 1000, unit: '（毫秒）' },
		]
    }
}

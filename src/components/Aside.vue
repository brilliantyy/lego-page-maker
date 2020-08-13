<template>
	<ul class="menu-list-wrapper">
		<li :class="{'menu-block': true, 'active': activeItem === submenu.com_type_key}" v-for="submenu in menuData" :key="submenu.com_type_key" @click="activeItem = submenu.com_type_key">
			<i class="make-up-top"></i>
			<i class="make-up-bottom"></i>
			<span class="title">{{ submenu.com_type_name }}</span>
			<ul class="menu-com-wrapper" :style="{ 'display': activeItem === submenu.com_type_key ? 'block' : 'none' }">
				<template v-if="submenu.com_children.length">
					<li v-for="com in submenu.com_children"
						:class="{ 'menu-com-block': true, 'active': currentComponentId === com.com_id }"
						:key="com.com_id"
						:draggable="true"
						@dragstart="handleDragstart(com.com_id, $event)"
						@click="handleClickCom(com.com_id)">
						<div><img class="menu-com-block__icon" :src="currentComponentId === com.com_id ? com.com_icon_active : com.com_icon"><p>{{com.com_name}}</p></div>
					</li>
				</template>
				<template v-else>
					<component :is="submenu.com_name"></component>
				</template>
			</ul>
		</li>
	</ul>
</template>

<script lang="ts">	
import { Vue, Component } from "vue-property-decorator"
import TemplateStore from '@/store/modules/templateStore'
import { SET_CURRENT_TEMPLATES } from '@/store/modules/templateStore/types'
import PageSetting from './PageSetting.vue'

const draggable = require('vuedraggable')

@Component({
	components: { 
		draggable,
		PageSetting
	}
})
export default class Menu extends Vue {	
	private name: String = 'menu'
	private activeItem: String = 'component'
	private currentComponentId: String | Number = ''
	private menuData: any[] = [
		{
			com_type_name: '组件',
			com_type_key: 'component',
			com_children: [
				{ com_id: 'cmpDiv', com_name: '容器', com_icon: require('@assets/img/png/com_div.png'), com_icon_active: require('@assets/img/png/com_div_active.png') },
				{ com_id: 'cmpText', com_name: '文本', com_icon: require('@assets/img/png/com_text.png'), com_icon_active: require('@assets/img/png/com_text_active.png') },
				{ com_id: 'cmpImage', com_name: '图片', com_icon: require('@assets/img/png/com_image.png'), com_icon_active: require('@assets/img/png/com_image_active.png') },
				{ com_id: 'cmpCarousel', com_name: '轮播图', com_icon: require('@assets/img/png/com_swiper.png'), com_icon_active: require('@assets/img/png/com_swiper_active.png') },
				{ com_id: 'cmpForm', com_name: '表单', com_icon: require('@assets/img/png/com_form.png'), com_icon_active: require('@assets/img/png/com_form_active.png') },
				{ com_id: 'cmpModal', com_name: '弹窗', com_icon: require('@assets/img/png/com_modal.png'), com_icon_active: require('@assets/img/png/com_modal_active.png') },
			],
		},
		{
			com_type_name: '页面',
			com_type_key: 'settings',
			com_children: [],
			com_name: 'page-setting'
		},
	]

	private handleClickCom(comId: String) {
		this.currentComponentId = comId;
		(TemplateStore as any)[SET_CURRENT_TEMPLATES](comId.replace('cmp', '').toLowerCase())
	}

	private handleDragstart(cmpId: String, event: DragEvt) {
		event.dataTransfer.setData('id', cmpId)
	}
	private handleCloneOnDrag(obj: any) {
		return { ...obj, com_id: `${obj.com_id}__${Date.now()}`, active: false }
	}
}
</script>

<style lang="scss" scoped>
.menu-list-wrapper {
	position: relative;
	margin: 0;
	padding: 0;
	height: 100%;
	list-style: none;
	.menu-block {
		position: relative;
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: #333;
		cursor: pointer;
		z-index: 1;
		.make-up-top,
		.make-up-bottom {
			display: none;
			position: absolute;
			width: 15px;
			height: 15px;
			background: #f7f7f7;
		}
		&.active {
			font-weight: 700;
			color: #ff8816;
			background-color: #f7f7f7;
			&::before, &::after {
				content: '';
				display: block;
				position: absolute;
				width: 15px;
				height: 15px;
				top: -15px;
				right: 0;
				background: #fff;
				border-bottom-right-radius: 15px;
				z-index: 1;
			}
			&::after {
				top: 100%;
				border-bottom-right-radius: 0;
				border-top-right-radius: 15px;
			}
			& .make-up-top {
				display: block;
				top: -15px;
				right: 0;
			}
			& .make-up-bottom {
				display: block;
				top: 100%;
				right: 0;
			}
		}
	}
	.menu-com-wrapper {
		display: none;
		position: fixed;
		top: 0;
		left: 80px;
		padding: 80px 20px 20px;
		height: 100%;
		width: 230px;
		background-color: #f7f7f7;
		list-style: none;
		font-weight: 300;
		box-sizing: border-box;
		box-shadow: 4px 0 4px rgba(154, 154, 154, 0.2);
		cursor: default;
		.menu-com-block {
			float: left;
			margin: 0 7px 10px;
			width: 80px;
			height: 70px;
			line-height: 20px;
			font-size: 13px;
			color: #8b8b8b;
			font-weight: 700;
			cursor: pointer;
			.menu-com-block__icon {
				display: inline-block;
				width: 50px;
			}
			&.active {
				p {
					color: #ff8816;
				}
			}
			p {
				margin: 0;
			}
		}
	}

	@media screen and (max-width: 1460px) {
		.menu-com-wrapper {
			padding: 80px 10px 10px;
			width: 150px;
			.menu-com-block {
				width: 60px;
				margin: 0 2px 10px;
			}
		}
	}
}
</style>

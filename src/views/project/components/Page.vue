<template>
	<div class="page-frame"
		@dragenter="dragEnter"
		@dragover="dragOver"
		@drop="drop"
		:style="{
			height: `${pageHeight}px`,
			backgroundColor: backgroundColor,
			backgroundImage: `url(${backgroundImage})`,
			backgroundRepeat: backgroundRepeat,
			backgroundSize: backgroundSize
		}">
		<template v-if="components.length">
			<component
				v-for="(item, index) in components"
				:key="index"
				:is="item.name"
				:id="item.id"
				:css="item.css"
				:options="item.options"
				:properties="item.properties"
				:datas="item.datas"
				></component>
		</template>
		<template v-else>
			<div class="empty-block">
				<img class="icon" src="@assets/img/png/drag_drop.png" />
				<p>可从左侧组件栏拖拽到此处</p>
			</div>
		</template>
		<!-- <div class="h_ruler_wraper"><ul id="h_ruler"><li>0</li><li>100</li><li>200</li><li>300</li><li>400</li><li>500</li><li>600</li></ul></div> -->
	</div>			
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditStore from '@/store/modules/editStore'
import PageStore from '@/store/modules/pageStore'
import TYPES from '@/store/modules/editStore/types'
import { initMouseEvent, destroyMouseEvent, importAllSFC, importAllModel } from "@/utils/index"

const Draggable = require('vuedraggable')
const CmpModules = importAllSFC(require.context('../../cmp', false, /\.vue$/))
const TemplateModules = importAllSFC(require.context('../../templates', true, /\.vue$/))
const models: any = importAllModel(require.context('../../../model', true, /\.ts$/))

interface comp {
	com_name: String
	com_id: String
	active: Boolean
}

@Component({
	components: {
		...CmpModules,
		...TemplateModules
	}
})
export default class Page extends Vue {
	private comps: comp[] = []
	private currCmp: comp | undefined = undefined
	private offsetLeft: number = 0
	private offsetTop: number = 0
	
	get components() {
		return EditStore.components
	}

	get pageHeight() {
		return PageStore.pageHeight
	}

	get backgroundColor() {
		return PageStore.backgroundColor
	}

	get backgroundImage() {
		return PageStore.backgroundImage
	}
	
	get backgroundRepeat() {
		return PageStore.backgroundRepeat
	}

	get backgroundSize() {
		return PageStore.backgroundSize
	}

	private dragEnter(e: Event) {}
	private dragOver(e: Event) {
		e.preventDefault()
	}
	private drop(e: DragEvt) {
		const id = e.dataTransfer.getData('id')
		let data: any = models[id]()

		if (!data || !data.css) return
		data.css.top = e.offsetY - data.css.height / 2 + e.target.offsetTop - this.offsetTop;
		data.css.left = e.offsetX - data.css.width / 2 + e.target.offsetLeft - this.offsetLeft;
		(<any>EditStore)[TYPES.ADD_CMP](data)
		e.preventDefault()
	}

	private handleSelectComponent(cmp: any) {
		this.comps.forEach((item: comp) => (item.active = false))
		cmp.active = true
		this.currCmp = cmp
	}

	mounted() {
		initMouseEvent()
		this.$nextTick(() => {
			const mainEl = document.querySelector('.el-main')
			this.offsetLeft = mainEl ? (mainEl as any).offsetLeft : 0
			this.offsetTop = mainEl ? (mainEl as any).offsetTop : 0
		})
	}
	
	beforeDestroy() {
		destroyMouseEvent()
	}
}
</script>

<style lang="scss" scoped>
.page-frame {
	position: relative;
	width: 375px;
	min-height: 667px;
	left: 50%;
	transform: translateX(-50%);
	border: 1px solid #eee;
	overflow: hidden;
	.empty-block {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		p {
			color: #bbb;
			font-size: 14px;
		}
	}
	.abstract-component {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200px;
		background: #fff;
		border: 2px dashed #dfdfdf;
		color: #898989;
		outline: none;
		&.active {
			border-color: #999;
		}
	}
	.el-form-item__content > .el-input--small {
		width: 300px;
	}
}
</style>

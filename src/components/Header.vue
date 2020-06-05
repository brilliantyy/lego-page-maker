<template>
	<div class="apm-header-wrapper">
		<div class="logo"><img src="@assets/img/png/logo.png" alt="logo"></div>
		<template v-if="showToolbar">
			<ul class="common-tool-bar">
				<li :class="{ 'tool-item': true, 'is-disabled': false }" @click="undo"><img src="@/assets/img/png/undo.png"/>撤销</li>
				<li :class="{ 'tool-item': true, 'is-disabled': false }" @click="redo"><img src="@/assets/img/png/redo.png"/>重做</li>
				<li :class="{ 'tool-item': true, 'is-disabled': !hasSelectedCmps }"><img :src="canPlus"/>加层级</li>
				<li :class="{ 'tool-item': true, 'is-disabled': !hasSelectedCmps }"><img :src="canMinus"/>减层级</li>
				<li class="tool-item" @click="showGrid = !showGrid"><img :src="gridVisible"/>网格</li>
				<li class="tool-item" @click="clearComponent"><img src="@/assets/img/png/clear.png"/>清空</li>
				<li :class="{ 'tool-item': true, 'is-disabled': !hasSelectedCmps }" @click="deleteComponent"><img :src="canDelete"/>删除</li>
			</ul>
			<ul class="action-bar">
				<li><button class="action-btn" @click="handlePublish" v-sClick><i class="icon icon-publish"></i>发布</button></li>
				<li>
					<button class="action-btn preview-btn" @click="handlePreviewPage" v-sClick><i class="icon icon-view"></i>预览</button>
					<div class="preview-container" v-show="showCode">
						<div id="qrcode"></div>
					</div>
				</li>
				<li><button class="action-btn" @click="handleSavePage" v-sClick><i class="icon icon-save"></i>保存</button></li>
			</ul>
			
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditStore from '@/store/modules/editStore'
import PageStore from '@/store/modules/pageStore'
import TYPES from '@/store/modules/editStore/types'
import { UPDATE_SETTINGS } from '@/store/modules/pageStore/types'
import { undo, redo } from '@/store/plugins/operatePlugin'
import history from '@/store/plugins/operatePlugin/history'

@Component
export default class Header extends Vue {
	@Prop({ default: false }) showToolbar!: boolean

	private showGrid: boolean = false
	private qrcode: any = null
	private showCode: boolean = false

	get pid() {
		return PageStore.pageConfig.pid
	}

	get hasSelectedCmps() {
		return !!EditStore.activeComponents.length
	}

	get isUndoable() {
		return EditStore.historyIndex !== 0
	}

	get isRedoable() {
		return history.getIndex() < history.getState().length - 1
	}

	get gridVisible() {
		return this.showGrid ? require('@/assets/img/png/visible.png') : require('@/assets/img/png/not_visible.png')
	}

	get canDelete() {
		return this.hasSelectedCmps ? require('@/assets/img/png/trash.png') : require('@/assets/img/png/trash_disable.png')
	}

	get canPlus() {
		return this.hasSelectedCmps ? require('@/assets/img/png/plus.png') : require('@/assets/img/png/plus_disable.png')
	}

	get canMinus() {
		return this.hasSelectedCmps ? require('@/assets/img/png/minus.png') : require('@/assets/img/png/minus_disable.png')
	}

	mounted() {
		this.initQRCode()
		document.body.addEventListener('click', this.handleMouseClick)
	}

	beforeDestroy() {
		document.body.removeEventListener('click', this.handleMouseClick)
	}

	private handleMouseClick(e: Event) {
		if (e.target.classList.contains('preview-btn')) return
		this.showCode = false
	}

	private initQRCode() {
		if (!this.showToolbar) return
		this.qrcode = new QRCode(document.getElementById('qrcode'), {
			text: "",
			width: 128,
			height: 128,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRCode.CorrectLevel.H
		})
	}

	private refreshQRCode(text: string) {
		this.qrcode.clear()
		this.qrcode.makeCode(text)
	}

	private undo() {
		undo()
	}

	private redo() {
		redo()
	}

	private clearComponent() {
		(EditStore as any)[TYPES.CLEAR_ALL]()
	}

	private deleteComponent() {
		if (!EditStore.activeComponents.length) return

		const cmps = EditStore.components
		EditStore.activeComponents.forEach((id: string) => {
			for(let i = 0; i < cmps.length; i++) {
				if (cmps[i].id === id) {
					cmps.splice(i, 1);
					(EditStore as any)[TYPES.UPDATE_CMPS](cmps)
					break;
				}
			}
		});
		(EditStore as any)[TYPES.CLEAR_SELECTED]()
	}

	private handleSavePage() {
		if (!this.validate()) {
			this.$Message.warning('请求参数格式不正确');
			return
		}
		const pageConfig = PageStore.pageConfig
		const components = this.stringifyComponents()
		const res = {
			pageConfig,
			components
		}

		this.$http.post('http://localhost:3000/project/save', { id: this.pid, content: JSON.stringify(res), uid: 1 })
			.then((res: any) => {
				if (res.code === 0) {
					(PageStore as any)[UPDATE_SETTINGS]({ pid: res.data.id })
					this.$Message.success(res.msg)
				} else {
					this.$Message.error(res.msg)
				}
			})
			.catch((err: Error) => {
				this.$Message.error('网络异常，请稍后重试')
			})
	}

	private handlePreviewPage() {
		const Mustache = require('mustache')
		const tmpl = require('@/utils/pageTmpl').default
		const pageData = {
			pageConfig: PageStore.pageConfig,
			componentsConfig: this.stringifyComponents()
		}
		let htmlStr = Mustache.render(tmpl, { pageData: JSON.stringify(pageData) })

		htmlStr = htmlStr.replace(/&quot;/g, '"').replace(/&#x2F;/g, '/')

		this.$http.post('http://localhost:3000/project/preview', { id: this.pid, content: htmlStr, uid: 1 })
			.then((res: any) => {
				if (res.code === 0) {
					this.showCode = true
					this.refreshQRCode(res.data.url)
				}
			})
			.catch((err: Error) => {
				this.$Message.error('网络异常，请稍后重试')
			})
	}

	private handlePublish() {
		const Mustache = require('mustache')
		const tmpl = require('@/utils/pageTmpl').default
		const pageData = {
			pageConfig: PageStore.pageConfig,
			componentsConfig: this.stringifyComponents()
		}
		let htmlStr = Mustache.render(tmpl, { pageData })

		htmlStr = htmlStr.replace(/&quot;/g, '"').replace(/&#x2F;/g, '/')

		this.$http.post('http://localhost:3000/project/publish', { id: this.pid, content: htmlStr, uid: 1 })
			.then((res: any) => {

			})
			.catch((err: Error) => {
				this.$Message.error('网络异常，请稍后重试')
			})
	}

	private stringifyComponents() {
		const components = EditStore.components.map(item => {
			const { name, id, css, animation, options } = item
			const ops = { ...options }
			if (options.params && options.params.trim()) {
				ops.params = JSON.parse(options.params.trim())
			}
			return {
				name,
				id,
				css,
				animation,
				options: ops
			}
		})

		return components
	}

	private validate() {
		const componentsConfig = EditStore.components
		let result = true

		componentsConfig.forEach(config => {
			if (config.options.params && config.options.params.trim()) {
				try {
					JSON.parse(config.options.params.trim())
				} catch (error) {
					result = false
				}
			}
		})
		return result
	}
}
</script>

<style scoped lang="scss">
.apm-header-wrapper {
	position: relative;
	height: 60px;
	width: 100%;
	padding: 0 80px;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.13);
	background-color: #fff;
	box-sizing: border-box;
	.logo {
		position: absolute;
		width: 28px;
		height: 40px;
		left: 20px;
		top: 8px;
		img {
			height: 100%;
		}
	}
	.common-tool-bar {
		display: flex;
		justify-content: center;
		width: 540px;
		height: 100%;
		padding: 0;
		margin: 0 0 0 230px;
		list-style: none;
		user-select: none;
		.tool-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 0 6px;
			min-width: 30px;
			height: 100%;
			font-size: 12px;
			color: #8b8b8b;
			&.is-disabled {
				color: #BFBFBF;
			}
			cursor: pointer;
			img {
				width: 20px;
				height: 20px;
				margin: 0 auto 2px;
				display: block;
			}
		}
	}
	.action-bar {
		position: absolute;
		right: 80px;
		top: 0;
		margin: 15px 0;
		width: 300px;
		list-style: none;
		li {
			position: relative;
			float: right;
			.action-btn {
				height: 30px;
				width: 80px;
				padding: 0;
				border-radius: 15px;
				border: none;
				outline: none;
				background: #FFFFFF;
				color: #666666;
				line-height: 30px;
				font-size: 14px;
				font-weight: 700;
				cursor: pointer;
				&:hover {
					color: #FFFFFF;
					background: linear-gradient(135deg, #fbac48 0, #ff4848 100%);
					box-shadow: 0 0 8px rgba(154, 154, 154, 0.3);
				}
				.icon {
					position: relative;
					display: inline-block;
					width: 16px;
					height: 16px;
					margin-right: 5px;
					top: 3px;
					background-size: contain;
					background-repeat: no-repeat;
				}
				.icon-publish {
					background-image: url('~@/assets/img/png/publish.png')
				}
				.icon-view {
					background-image: url('~@/assets/img/png/phone.png')
				}
				.icon-save {
					background-image: url('~@/assets/img/png/save.png')
				}
				&:hover {
					.icon-publish {
						background-image: url('~@/assets/img/png/publish_active.png')
					}
					.icon-view {
						background-image: url('~@/assets/img/png/phone_active.png')
					}
					.icon-save {
						background-image: url('~@/assets/img/png/save_active.png')
					}
				}
			}
		}
	}
	.preview-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 160px;
		height: 160px;
		position: absolute;
		left: -50%;
		top: 54px;
		background: #fff;
		border-radius: 6px;
		box-shadow: 0 0 8px rgba(0,0,0,.15);
		&::before {
			content: '';
			display: block;
			position: absolute;
			width: 0;
			height: 0;
			top: -7px;
			border-style: solid;
			border-left-width: 6px;
			border-right-width: 6px;
			border-bottom-width: 7px;
			border-top-width: 0;
			border-bottom-color: #fff;
			border-left-color: transparent;
			border-right-color: transparent;
		}
	}
}

@media screen and (max-width: 1460px) {
	.apm-header-wrapper {
		.common-tool-bar {
			width: 500px;
			margin: 0 0 0 150px;
		}
	}
}
</style>

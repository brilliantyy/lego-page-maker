<template>
	<div class="home">
		<el-container>
			<el-header><Header :showToolbar="true"></Header></el-header>
			<el-container>
				<el-aside width="80px"><Menu></Menu></el-aside>
				<el-main>
					<div class="page-panel">
						<div class="page-wrapper" @click="handleClick">
							<Page></Page>
							<!-- <div class="h-ruler-wrapper"><ul class="h-ruler"><li>0</li><li>100</li><li>200</li><li>300</li><li>400</li></ul></div>
							<div class="v-ruler-wrapper"><ul class="v-ruler"><li>0</li><li>100</li><li>200</li><li>300</li><li>400</li><li>500</li><li>600</li><li>700</li></ul></div> -->
						</div>
					</div>
					<div class="property-panel">
						<div class="property-setting-panel">
							<el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
								<el-tab-pane name="properties">
									<span class="tab-label" slot="label">设置样式</span>
									<div class="property-list-wrapper">
										<property-panel></property-panel>
									</div>
								</el-tab-pane>
								<el-tab-pane name="data">
									<span class="tab-label" slot="label">配置数据</span>
									<div class="property-list-wrapper">
										<data-panel></data-panel>
									</div>
								</el-tab-pane>
								<el-tab-pane name="animation">
									<span class="tab-label" slot="label">设置动画</span>
									<div class="property-list-wrapper">
										<animation-panel></animation-panel>
									</div>
								</el-tab-pane>
								<el-tab-pane name="template">
									<span class="tab-label" slot="label">选择模板</span>
									<div class="property-list-wrapper">
										<template-panel></template-panel>
									</div>
								</el-tab-pane>
							</el-tabs>
						</div>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/Header.vue'
import Menu from '@/components/Aside.vue'
import EditStore from '@/store/modules/editStore'
import PageStore from '@/store/modules/pageStore'
import TemplateStore from '@/store/modules/templateStore'
import { ADD_CMP, CLEAR_SELECTED } from '@/store/modules/editStore/types'
import { UPDATE_SETTINGS } from '@/store/modules/pageStore/types'
import { ADD_TEMPLATE } from '@/store/modules/templateStore/types'
import { loadTemplates, importAllModel } from '@/utils/index'
import Page from './components/Page.vue'
import PropertyPanel from './components/PropertyPanel.vue'
import DataPanel from './components/DataPanel.vue'
import AnimationPanel from './components/AnimationPanel.vue'
import TemplatePanel from './components/TemplatePanel.vue'

const models: any = importAllModel(require.context('../../model', true, /\.ts$/))

interface comp {
	com_name: string
	com_id: string
	active: boolean
}

@Component({
	components: {
		Header,
		Menu,
		Page,
		PropertyPanel,
		DataPanel,
		AnimationPanel,
		TemplatePanel
	},
})
export default class Home extends Vue {
	private activeName: string = 'properties'
	private currCmp: comp | undefined = undefined

	created() {
		this.isEdit && this.fetchDetail()
		this.initTemplates()
	}

	get isEdit() {
		return this.$route.name === 'detail'
	}

	private fetchDetail() {
		const pid = +this.$route.params.id
		this.$http.post('http://localhost:3000/project/detail', { id: pid, uid: 1 }).then((res: any) => {
			if (res.code === 0 && res.data) {
				const { title, url, content } = res.data
				try {
					const { pageConfig, components } = JSON.parse(content)
					const { renderType } = pageConfig
					components.forEach((cmp: any) => {
						if (cmp.options.params) {
							cmp.options.params = JSON.stringify(cmp.options.params)
						}
						const { properties, datas } = models[cmp.name.replace(/-([a-z])/, (r: string) => r.toUpperCase()).replace('-', '')]();
						(EditStore as any)[ADD_CMP]({ ...cmp, properties, datas })
					});
					(PageStore as any)[UPDATE_SETTINGS]({ pid, title, url, renderType })
				} catch (error) {
					this.$Message.error('数据异常')
				}

				(PageStore as any)[UPDATE_SETTINGS]({ pid, title, url })
			}
		}).catch((err: any) => {
			this.$Message.error('网络异常，请稍后重试')
		})
	}

	private handleTabClick(tab: any, event: Event) {
		//
	}

	private handleClick(e: MouseEvent) {
		if ((e.target as any).getAttribute('class') === 'page-wrapper') {
			;(EditStore as any)[CLEAR_SELECTED]()
		}
	}

	private initTemplates() {
		loadTemplates()
	}
}
</script>

<style lang="scss" scoped>
$defaultBoxShadow: 0 0 8px rgba(154, 154, 154, 0.1);

.home {
	position: relative;
	height: 100%;
	& > .el-container {
		height: 100%;
		.el-header {
			z-index: 3;
		}
		.el-container {
			height: calc(100vh - 60px);
		}
	}
	.el-aside {
		margin-right: 230px;
		overflow: visible;
		background-color: #fff;
		z-index: 1;
	}
	.el-main {
		display: flex;
		justify-content: space-between;
		position: relative;
		padding: 0;
		overflow: hidden;
		.page-panel {
			padding: 40px 0;
			width: 540px;
			min-width: 540px;
			box-sizing: border-box;
			overflow: hidden;
			box-shadow: 0 0 8px rgba(0, 0, 0, .1);
			&:hover {
				overflow: auto;
				.page-wrapper {
					width: 540px;
				}
			}
			.page-wrapper {
				position: relative;
				.h-ruler-wrapper {
					position: absolute;
					width: 375px;
					height: 14px;
					left: 50%;
					top: -14px;
					transform: translateX(-50%);
					overflow: hidden;
					background: red;
					.h-ruler {
						// background: url() repeat-x;
						width: 100%;
						height: 100%;
						padding: 0;
						margin: 0;
					}
				}
				.v-ruler-wrapper {
					position: absolute;
					width: 14px;
					min-height: 667px;
					overflow: hidden;
					left: 50%;
					top: 0;
					transform: translateX(-202px);
					background: red;
				}
			}
		}
		.property-panel {
			flex: 1;
			min-width: 620px;
			padding: 20px;
			box-sizing: border-box;
			overflow: auto;
			.property-setting-panel {
				height: 100%;
				min-width: 640px;
				max-width: 940px;
				margin: 0 auto;
				::v-deep .el-tabs__header {
					border: none;
					background-color: #fff;
					border-radius: 16px 16px 0 0;
					box-shadow: $defaultBoxShadow;
				}
				::v-deep .el-tabs__nav {
					border: none;
				}
				::v-deep .el-tabs__content {
					overflow: visible;
				}
				::v-deep .el-tabs__item {
					padding: 0;
					height: 36px;
					line-height: 36px;
					color: #333;
					border: none;
					transition: none;
					&.is-active {
						color: #fff;
						.tab-label {
							border-radius: 16px 16px 0 0;
							background: linear-gradient(135deg, #fbac48 0, #ff4848 100%);
							&::after {
								position: absolute;
								content: '';
								display: block;
								width: 0;
								height: 0;
								border-top-width: 0;
								border-bottom-width: 10px;
								border-right-width: 7px;
								border-left-width: 7px;
								border-left-color: transparent;
								border-right-color: transparent;
								border-bottom-color: #ffffff;
								border-style: solid;
								bottom: -15px;
								left: 50%;
								transform: translateX(-50%);
							}
						}
					}
					.tab-label {
						position: relative;
						display: block;
						padding: 0 20px;
					}
				}
				.el-tabs {
					height: 100%;
					display: flex;
					flex-direction: column;
					::v-deep .el-tabs__content {
						flex: 1;
						div[role='tabpanel'] {
							height: 100%;
						}
						.tmpl-list-wrapper {
							left: 20px;
							margin-left: -20px;
							position: relative;
							.tmpl-block {
								width: 220px;
								height: 300px;
								background: #fff;
								float: left;
								margin-right: 20px;
								margin-bottom: 20px;
								border-radius: 10px;
								box-shadow: $defaultBoxShadow;
								outline: none;
								border: 1px solid #fff;
								box-sizing: border-box;
								&:focus {
									border-color: #ff8e00;
									box-shadow: 0 0 8px rgba(244, 130, 11, 0.7);
								}
							}
						}
						.property-list-wrapper {
							position: relative;
							height: 100%;
							padding: 20px;
							background-color: #fff;
							border-radius: 0px 0px 16px 16px;
							box-shadow: $defaultBoxShadow;
							box-sizing: border-box;
						}
					}
					::v-deep .el-tabs__nav-wrap, ::v-deep .el-tabs__nav-scroll {
						overflow: visible;
					}
				}
			}
		}
	}
}

@media screen and (max-width: 1460px) {
	.home {
		.el-aside {
			margin-right: 150px;
		}
		.el-main {
			.page-panel {
				width: 500px;
				min-width: 500px;
				&:hover {
					.page-wrapper {
						width: 500px;
					}
				}
			}
		}
	}
}
</style>

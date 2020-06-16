<template>
	<div>
		<el-form>
			<el-form-item>
				<label class="label">项目ID</label>
				<el-input v-model="pid" disabled size="small"></el-input>
			</el-form-item>
			<el-form-item>
				<label class="label">名称</label>
				<el-input v-model="title" size="small"></el-input>
			</el-form-item>
			<el-form-item>
				<label class="label">描述</label>
				<el-input v-model="description" type="textarea" resize="none" size="small"></el-input>
			</el-form-item>
			<el-form-item>
				<label class="label">高度</label>
				<el-input-number v-model="pageHeight" controls-position="right" :min="667" size="small"></el-input-number>
			</el-form-item>
			<el-form-item>
				<label class="label">渲染方式</label>
				<el-radio-group v-model="renderType">
					<el-radio :label="0">CSR</el-radio>
					<el-radio :label="1">SSR</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<label class="label">背景色</label>
				<el-color-picker v-model="backgroundColor" show-alpha size="small"></el-color-picker>
			</el-form-item>
			<el-form-item>
				<label class="label">背景图</label>
				<image-upload :value="backgroundImage" :isBody="true" @success="handleUploadSuccess" @delete="handleDelete"></image-upload>
			</el-form-item>
			<el-form-item v-show="backgroundImage">
				<label class="label">背景重复</label>
				<el-radio-group v-model="backgroundRepeat" size="small" fill="#fe8816">
					<el-radio-button :checked="false" label="no-repeat">无</el-radio-button>
					<el-radio-button :checked="false" label="repeat-x">水平</el-radio-button>
					<el-radio-button :checked="false" label="repeat-y">垂直</el-radio-button>
					<el-radio-button :checked="false" label="repeat">平铺</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-show="backgroundImage">
				<label class="label">适应方式</label>
				<el-radio-group v-model="backgroundSize" size="small" fill="#fe8816">
					<el-radio-button :checked="false" label="none">无</el-radio-button>
					<el-radio-button :checked="false" label="contain">包含</el-radio-button>
					<el-radio-button :checked="false" label="cover">覆盖</el-radio-button>
					<el-radio-button :checked="false" label="fill">填充</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<label class="label">地址</label>
				<el-input v-model="url" disabled size="small"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">	
import { Vue, Component, Watch } from "vue-property-decorator"
import ImageUpload from '@/components/ImageUpload.vue'
import PageStore from '@/store/modules/pageStore'
import { UPDATE_SETTINGS } from '@/store/modules/pageStore/types'
import { pageHeight } from '@/config'

@Component({
	components: { ImageUpload }
})
export default class PageSetting extends Vue {	
	get pid() {
		return PageStore.pid
	}
	get title() {
		return PageStore.title
	}
	set title(val: string) {
		(PageStore as any)[UPDATE_SETTINGS]({ title: val })
	}
	get description() {
		return PageStore.description
	}
	set description(val: string) {
		// (PageStore as any)[UPDATE_SETTINGS]({ title: val })
	}
	get pageHeight() {
		return PageStore.pageHeight
	}
	set pageHeight(val: number) {
		(PageStore as any)[UPDATE_SETTINGS]({ pageHeight: val })
	}
	get renderType() {
		return PageStore.renderType
	}
	set renderType(val: number) {
		(PageStore as any)[UPDATE_SETTINGS]({ renderType: val })
	}
	get backgroundColor() {
		return PageStore.backgroundColor
	}
	set backgroundColor(val: string) {
		(PageStore as any)[UPDATE_SETTINGS]({ backgroundColor: val })
	}
	get backgroundImage() {
		return PageStore.backgroundImage
	}
	set backgroundImage(val: string) {
		(PageStore as any)[UPDATE_SETTINGS]({ backgroundImage: val })
	}
	get backgroundRepeat() {
		return PageStore.backgroundRepeat
	}
	set backgroundRepeat(val: string) {
		(PageStore as any)[UPDATE_SETTINGS]({ backgroundRepeat: val })
	}
	get backgroundSize() {
		return PageStore.backgroundSize
	}
	set backgroundSize(val: string) {
		(PageStore as any)[UPDATE_SETTINGS]({ backgroundSize: val })
	}
	get url() {
		return PageStore.url
	}
	set url(val: string) {
		(PageStore as any)[UPDATE_SETTINGS]({ url: val })
	}

	private handleUploadSuccess(data: any) {
		this.backgroundImage = data.url
	}

	private handleDelete() {
		this.backgroundImage = ''
	}
}
</script>

<style lang="scss" scoped>
.el-form-item {
	text-align: left;
}
.el-input-number--small {
	width: 100%;
}
.el-radio-button--small {
	::v-deep .el-radio-button__inner {
		padding-left: 12px;
		padding-right: 12px;
	}
}
.el-form-item .el-color-picker {
    display: block;
    width: 36px;
    top: 3px;
    height: 38px;
}
.label {
    display: block;
	text-align: left;
	line-height: 20px;
	color: #8b8b8b;
}
.el-radio {
	color: #8b8b8b;
	::v-deep .el-radio__inner {
		margin-top: 1px;
	}
	::v-deep .el-radio__label {
		vertical-align: middle;
	}
}
@media screen and (max-width: 1460px) {
	.el-radio-button--small {
		::v-deep .el-radio-button__inner {
			padding-left: 5px;
			padding-right: 5px;
		}
	}
	.el-radio {
		margin-right: 12px;
		::v-deep .el-radio__label {
			padding-left: 8px;
		}
	}
	
}
</style>

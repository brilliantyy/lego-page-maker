<template>
	<div>
		<el-form v-model="form" v-if="cmp" label-width="80px">
			<el-form-item v-for="prop in dataConfig" :key="prop.name" :label="prop.name">
				<template v-if="prop.type === 'upload'">
					<image-upload></image-upload>
				</template>
				<template v-else-if="prop.type === 'number'">
					<el-input-number v-model="cmpOptions[prop.key]" controls-position="right" :min="prop.min || 0" size="small"></el-input-number>
					{{ prop.unit }}
				</template>
				<template v-else-if="prop.type === 'carousel'">
					<image-upload :isCarousel="true" @update-image="handleUpdateImage"></image-upload>
				</template>
				<template v-else-if="prop.type === 'switch'">
					<el-switch
						v-model="cmpOptions[prop.key]"
						active-color="#fbaa5c">
					</el-switch>
				</template>
				<template v-else-if="prop.type === 'select'">
					<el-select v-model="cmpOptions[prop.key]" size="small">
						<el-option v-for="option in prop.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
					</el-select>
				</template>
				<template v-else-if="prop.type === 'input'">
					<el-input type="text" v-model="cmpOptions[prop.key][prop.attr]" size="small"></el-input>
				</template>
			</el-form-item>
			<el-form-item v-for="item in formItems" :key="item.key" :label="item.label">
				<template v-if="item.type === 'input'">
					<el-input v-model="item.placeholder" :type="item.inputType" placeholder="提示文本" size="small"></el-input>
					<label>校验规则</label>
					<el-select v-model="item.validator" size="small">
						<el-option label="邮箱" value="email"></el-option>
						<el-option label="手机号码" value="phone"></el-option>
						<el-option label="身份证号" value="ID"></el-option>
					</el-select>
				</template>
				<template v-if="item.type !== 'button'">
					<el-checkbox v-model="item.required">必填</el-checkbox>
				</template>
				<template v-else>
					<el-input v-model="item.text" type="text" placeholder="按钮文本" size="small"></el-input>
				</template>
			</el-form-item>
		</el-form>
		<template v-else>
            <img class="empty" :src="require('@assets/img/png/no_content.png')" alt="无内容">
        </template>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import EditStore from '@/store/modules/editStore'
import ImageUpload from '@/components/ImageUpload.vue'
@Component({
	components: {
		ImageUpload
	}
})
export default class PropertyPanel extends Vue {
	private form: any = {}

	@Prop({ default: () => {} }) componentConfig!: object

	get dataConfig() {
		return EditStore.datas
	}

	get cmp() {
		const cmps = EditStore.components.slice()
		const activeOnes = cmps.filter(cmp => EditStore.activeComponents.includes(cmp.id))

		return activeOnes[0]
	}

	get cmpOptions() {
		return this.cmp.options
	}

	get formItems() {
		return Object.keys(this.cmpOptions).filter(i => i.indexOf('formItem') > -1).map(i => this.cmpOptions[i])
	}

	private handleUpdateImage(url: string) {
		console.log(url)
	}

}
</script>
<style lang="scss" scoped>
.el-form-item {
	::v-deep .el-form-item__content {
		& > .el-input--small {
			width: 150px;
			margin-right: 10px;
		}
		& > .el-select--small {
			margin-right: 10px;
		}
		& > label {
			margin-right: 8px;
			color: #606266;
		}
	}
}
</style>
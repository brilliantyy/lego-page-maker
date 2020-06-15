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
					<input type="text" v-model="inputProperty"/>
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

	get isCmpForm() {
		return this.cmp.name.indexOf('form') > -1
	}

	get inputProperty() {
		// return this.isCmpForm ? this.cmpOptions.items.filter(i => i.name === prop.key)[prop.value]: this.cmpOptions[prop.key]
	}

	private handleUpdateImage(url: string) {
		console.log(url)
	}

}
</script>
<style lang="scss" scoped>
.el-form {
	::v-deep .el-form-item__content {
		color: #606266;
		font-size: 12px;
		font-weight: 500;
	}
	.el-input {
		width: 400px;
	}
}
</style>

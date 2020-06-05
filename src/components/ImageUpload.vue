<template>
	<div>
		<template v-if="isCarousel">
			<div class="carousel-wrapper" v-for="(item, index) in cmp.options.items" :key="item.url + '_' + index" @click="setCurrentItem(item, index)">
				<div v-if="item.url" class="upload-preview-wrapper">
					<img class="upload-image-preview" :src="item.url" />
					<i class="el-icon-delete" @click="handleDelCarousel(item)"></i>
				</div>
				<el-upload
					v-else
					class="image-uploader"
					accept="image/png,image/jpeg,image/gif"
					:action="action"
					:show-file-list="false"
					:on-success="handleCarouselUploadSuccess"
					>选择图片
				</el-upload>
				<el-input v-model="item.link" placeholder="跳转链接（选填）" size="small"></el-input>
				<el-button v-if="index === 0" @click.stop="handleAddCarouselItem" size="small"><i class="el-icon-plus"></i></el-button>
				<el-button v-else @click.stop="handleRemoveCarouselItem(index)" size="small"><i class="el-icon-minus"></i></el-button>
			</div>
			<div class="indicator-wrapper">
				<el-button v-for="(item, index) in cmp.options.items"
					:key="item.url + '_' + index"
					:class="{ 'is-active': currentItem === item || (!currentItem && index === 0) }"
					@click="setCurrentItem(item, index)"
					size="mini"
					circle>{{ index + 1 }}</el-button>
			</div>
		</template>
		<template v-else>
			<div v-if="value || (cmp.options && cmp.options.url)" class="upload-preview-wrapper">
				<img class="upload-image-preview" :src="value || cmp.options.url" />
				<i class="el-icon-delete" @click="handleDelImage"></i>
			</div>
			<el-upload v-else
				class="image-uploader"
				:action="action"
				accept="image/png,image/jpeg,image/gif"
				:on-success="handleImageUploadSuccess"
				:show-file-list="false">
				<i class="el-icon-plus"></i>
			</el-upload>
		</template>
	</div>
</template>

<script lang="ts">	
import { Vue, Component, Prop } from "vue-property-decorator"
import EditStore from '@/store/modules/editStore'
import TYPES from '@/store/modules/editStore/types'


@Component
export default class ImageUpload extends Vue {	
	private action: string = 'http://localhost:3000/upload/image'
	private currentItem: any = null

	@Prop({ default: false }) isCarousel!: boolean
	@Prop({ default: false }) isBody!: boolean
	@Prop({ default: '' }) value!: string

	get cmp() {
		if (this.isBody) {
			return this.value
		}
		const cmps = EditStore.components.slice()
		const activeOnes = cmps.filter(cmp => EditStore.activeComponents.includes(cmp.id))

		return activeOnes[0]
	}

	private handleImageUploadSuccess(res: any) {
		if (res.code === 0) {
			if (!this.isBody) {
				this.cmp.options.url = res.data.url || ''
			}
			this.$emit('success', { url: res.data.url })
		} else {
			this.$Message.error(res.msg)
		}
	}

	private handleCarouselUploadSuccess(res: any) {
		if (res.code === 0) {
			this.currentItem.url = res.data.url || ''
			this.$emit('update-image', { url: res.data.url })
		} else {
			this.$Message.error(res.msg)
		}
	}

	private setCurrentItem(item: any, index: number) {
        this.currentItem = item;
        (EditStore as any)[TYPES.UPDATE_INDEX]({ id: this.cmp.id, index })
	}

	private handleAddCarouselItem() {
		this.currentItem = null
		this.cmp.options.items.push({ url: '', link:'' })
	}

	private handleRemoveCarouselItem(index: number) {
		this.cmp.options.items.splice(index, 1)
		this.currentItem = this.cmp.options.items[0]
        (EditStore as any)[TYPES.UPDATE_INDEX]({ id: this.cmp.id, index: 0 })
	}

	private handleDelImage() {
		if (!this.isBody) {
			this.cmp.options.url = ''
		}
		this.$emit('delete')
	}

	private handleDelCarousel(item: any, index: number) {
		this.currentItem = item
		item.url = ''
	}
}
</script>

<style lang="scss" scoped>
.carousel-wrapper {
	display: flex;
	.el-button {
		height: 32px;
		margin-top: 4px;
		margin-left: 10px;
	}
}
.upload-preview-wrapper {
	position: relative;
	width: 72px;
	height: 32px;
	margin-top: 4px;
	box-sizing: border-box;
	border: 1px solid #D9D9D9;
	border-radius: 4px;
	.upload-image-preview {
		width: 100%;
		height: 100%;
        object-fit: cover;
        border-radius: 4px;
	}
	.el-icon-delete {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: #FFFFFF;
		z-index: 1;
		cursor: pointer;
	}
	&::after {
		display: none;
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		border-radius: 4px;
	}
	&:hover {
		&::after, .el-icon-delete {
			display: block;
		}
	}
}
.image-uploader {
	::v-deep .el-upload {
		margin-top: 4px;
		width: 72px;
		height: 32px;
		font-size: 12px;
		line-height: 32px;
		color: #606266;
		font-weight: 500;
		border: 1px solid #D9D9D9;
		border-radius: 4px;
		box-sizing: border-box;
	}
	.el-icon-plus {
		position: relative;
		color: #acacac;
	}
}
.el-input {
	margin-left: 10px;
	width: 300px;
}
.indicator-wrapper {
	.el-button {
		width: 28px;
		height: 28px;
		text-align: center;
		&:focus {
			background: #FFF;
			border-color: #DCDFE6;
			color: #606266;
		}
		&.is-active {
			color: #FE8816;
			border-color: #FE8816;
			background-color: #fbefe8;
		}
	}
}
</style>

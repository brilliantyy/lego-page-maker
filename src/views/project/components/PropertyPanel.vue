<template>
	<div>
		<el-form v-model="form" v-if="cmp" label-width="80px">
			<el-form-item v-for="prop in properties" :key="prop.name" :label="prop.name">
				<template v-if="prop.type === 'text'">
					<el-input @change="updateCMP"></el-input>
				</template>
				<template v-else-if="prop.type === 'color'">
					<el-color-picker v-model="cmp.css[prop.key]" @change="updateCMP" show-alpha size="small"></el-color-picker>
				</template>
				<template v-else-if="prop.type === 'number'">
					<el-input-number v-model="cmp.css[prop.key]" @change="updateCMP" controls-position="right" :min="prop.min || 0" :max="prop.max || Infinity" size="small"></el-input-number>
				</template>
				<template v-else-if="prop.type === 'group-number'">
					<el-input-number v-model="cmp.css[prop.key + 'Top']" class="mr10" @change="updateCMP" controls-position="right" :min="0" size="small"></el-input-number>
					<el-input-number v-model="cmp.css[prop.key + 'Left']" class="mr10" @change="updateCMP" controls-position="right" :min="0" size="small"></el-input-number>
					<el-input-number v-model="cmp.css[prop.key + 'Bottom']" class="mr10" @change="updateCMP" controls-position="right" :min="0" size="small"></el-input-number>
					<el-input-number v-model="cmp.css[prop.key + 'Right']" class="mr10" @change="updateCMP" controls-position="right" :min="0" size="small"></el-input-number>
				</template>
				<template v-else-if="prop.type === 'fontProp'">
					<el-checkbox-group v-model="fontProp" size="mini" fill="#fe8816">
						<el-checkbox-button :checked="false" label="bold"><i class="icon font-bold-icon"></i></el-checkbox-button>
						<el-checkbox-button :checked="false" label="italic"><i class="icon font-italic-icon"></i></el-checkbox-button>
						<el-checkbox-button :checked="false" label="underline"><i class="icon font-underline-icon"></i></el-checkbox-button>
					</el-checkbox-group>
				</template>
				<template v-else-if="prop.type === 'textAlign'">
					<el-radio-group v-model="cmp.css[prop.key]" @change="updateCMP" size="mini" fill="#fe8816">
						<el-radio-button :checked="false" label="left"><i class="icon align-left-icon"></i></el-radio-button>
						<el-radio-button :checked="false" label="right"><i class="icon align-right-icon"></i></el-radio-button>
						<el-radio-button :checked="false" label="center"><i class="icon align-center-icon"></i></el-radio-button>
						<el-radio-button :checked="false" label="justify"><i class="icon align-justify-icon"></i></el-radio-button>
					</el-radio-group>
				</template>
				<template v-else-if="prop.type === 'blockAlign'">
					<el-radio-group v-model="form.align" @change="updateCMP" size="mini" fill="#fe8816">
						<el-radio-button :checked="false" label="left"><i class="icon block-left-icon"></i></el-radio-button>
						<el-radio-button :checked="false" label="center"><i class="icon block-center-icon"></i></el-radio-button>
						<el-radio-button :checked="false" label="right"><i class="icon block-right-icon"></i></el-radio-button>
					</el-radio-group>
				</template>
				<template v-else-if="prop.type === 'objectFit'">
					<el-radio-group v-model="cmp.css[prop.key]" size="mini" fill="#fe8816">
						<el-radio-button :checked="false" label="none">默认</el-radio-button>
						<el-radio-button :checked="false" label="contain">包含</el-radio-button>
						<el-radio-button :checked="false" label="cover">覆盖</el-radio-button>
						<el-radio-button :checked="false" label="fill">填充</el-radio-button>
					</el-radio-group>
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
import pageStore from '@/store/modules/pageStore'
import { UPDATE_CMP_STYLE } from '@/store/modules/editStore/types'

@Component
export default class PropertyPanel extends Vue {
	@Prop({ default: () => {} }) componentConfig!: object

	private form: any = {
		align: '',
	}

	get properties() {
		return EditStore.properties
	}

	get cmp() {
		const cmps = EditStore.components.slice()
		const activeOnes = cmps.filter(cmp => EditStore.activeComponents.includes(cmp.id))

		return activeOnes[0]
	}


	get fontProp() {
		if (this.cmp.name === 'cmp-text') {
			return [this.cmp.css.fontWeight, this.cmp.css.fontStyle, this.cmp.css.textDecoration]
		} else {
			return []
		}
	}

	set fontProp(value: string[]) {
		this.cmp.css['fontWeight'] = 'bold'
		this.cmp.css['fontStyle'] = 'normal'
		this.cmp.css['textDecoration'] = 'none'

		if (value.includes('bold')) {
			this.cmp.css['fontWeight'] = 'bold'
		}
		if (value.includes('italic')) {
			this.cmp.css['fontStyle'] = 'italic'
		}
		if (value.includes('underline')) {
			this.cmp.css['textDecoration'] = 'underline'
		}
	}
	
	updateCMP(value: any){
		(EditStore as any)[UPDATE_CMP_STYLE]({ id: this.cmp.id, css: this.cmp.css })
	}

	@Watch('form.align')
	alignChange(value: string) {
		this.cmp.css['left'] = 'auto'

		if (value === 'left') {
			this.cmp.css['left'] = 0
		}
		if (value === 'center') {
			this.cmp.css['left'] = `${(pageStore.pageWidth - this.cmp.css.width) / 2}`
		}

		if (value === 'right') {
			this.cmp.css['left'] = `${pageStore.pageWidth - this.cmp.css.width}`
		}
	}
}
</script>

<style lang="scss" scoped>
.icon {
	width: 16px;
	height: 16px;
	display: block;
	background-repeat: no-repeat;
	background-size: contain;
}
.font-bold-icon {
	background-image: url('~@/assets/img/png/font_bold.png')
}
.font-italic-icon {
	background-image: url('~@/assets/img/png/font_italic.png')
}
.font-underline-icon {
	background-image: url('~@/assets/img/png/font_underline.png')
}
.is-checked {
	.font-bold-icon {
		background-image: url('~@/assets/img/png/bold_active.png')
	}
	.font-italic-icon {
		background-image: url('~@/assets/img/png/italic_active.png')
	}
	.font-underline-icon {
		background-image: url('~@/assets/img/png/underline_active.png')
	}
}
.align-left-icon {
	background-image: url('~@/assets/img/png/align_left.png')
}
.align-right-icon {
	background-image: url('~@/assets/img/png/align_right.png')
}
.align-center-icon {
	background-image: url('~@/assets/img/png/align_center.png')
}
.align-justify-icon {
	background-image: url('~@/assets/img/png/align_justify.png')
}
.block-left-icon {
	background-image: url('~@/assets/img/png/block_left.png')
}
.block-right-icon {
	background-image: url('~@/assets/img/png/block_right.png')
}
.block-center-icon {
	background-image: url('~@/assets/img/png/block_center.png')
}
.is-active {
	.align-left-icon {
		background-image: url('~@/assets/img/png/align_left_active.png')
	}
	.align-right-icon {
		background-image: url('~@/assets/img/png/align_right_active.png')
	}
	.align-center-icon {
		background-image: url('~@/assets/img/png/align_center_active.png')
	}
	.align-justify-icon {
		background-image: url('~@/assets/img/png/align_justify_active.png')
	}
	.block-left-icon {
		background-image: url('~@/assets/img/png/block_left_active.png')
	}
	.block-right-icon {
		background-image: url('~@/assets/img/png/block_right_active.png')
	}
	.block-center-icon {
		background-image: url('~@/assets/img/png/block_center_active.png')
	}
}
.mr10 {
	margin-right: 10px;
}
</style>

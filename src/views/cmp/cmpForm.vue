<template>
	<div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<edit-mode v-show="isEdit" :style="formStyle" :id="id">
			<div @mousedown="mousedown" class="inline-div">
				<div class="form-item" :style="formItemStyle" v-for="key in itemKeys" :key="key">
					<template v-if="options[key].type === 'input'">
						<input
							:type="options[key].inputType"
							:value="options[key].value"
							:placeholder="options[key].placeholder"
						/>
					</template>
					<template v-else-if="options[key].type === 'button'">
						<button>{{ options[key].text }}</button>
					</template>
				</div>
			</div>
		</edit-mode>
		<div v-show="hoverStatus && !isEdit" class="is-hover" :style="formStyle">
			<div @mousedown="mousedown" class="inline-div">
				<div class="form-item" :style="formItemStyle" v-for="key in itemKeys" :key="key">
					<template v-if="options[key].type === 'input'">
						<input
							:type="options[key].inputType"
							:value="options[key].value"
							:placeholder="options[key].placeholder"
						/>
					</template>
					<template v-else-if="options[key].type === 'button'">
						<button>{{ options[key].text }}</button>
					</template>
				</div>
			</div>
		</div>
		<div
			v-show="!hoverStatus && !isEdit"
			class="default-status"
			ondragstart="return false;"
			:style="formStyle"
		>
			<div class="form-item" :style="formItemStyle" v-for="key in itemKeys" :key="key">
				<template v-if="options[key].type === 'input'">
					<input
						:type="options[key].inputType"
						:value="options[key].value"
						:placeholder="options[key].placeholder"
					/>
				</template>
				<template v-else-if="options[key].type === 'button'">
					<button>{{ options[key].text }}</button>
				</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator'
import { handleStyle } from '@/utils/index'
import EditMode from '@/components/editMode/index.vue'
import EditStore from '@/store/modules/editStore'
import TYPES from '@/store/modules/editStore/types'
import BaseMixin from './baseMixin'

@Component({
	components: {
		EditMode
	}
})
export default class CmpForm extends Mixins(BaseMixin) {
	get formStyle(): Object {
		const { left, top, width, height } = this.style
		return { left, top, width }
	}

	get formItemStyle(): Object {
		const { width, height, marginBottom, itemBorderColor, borderWidth, borderColor, borderStyle, borderRadius } = this.style
		return { width, height, marginBottom, borderWidth, borderColor, borderStyle, borderRadius }
	}

	get itemKeys() {
		return Object.keys(this.options).filter(i => i.indexOf('formItem') > -1)
	}
}
</script>

<style lang="scss" scoped>
.form-item {
	box-sizing: border-box;
	overflow: hidden;
	&:last-child {
		margin-bottom: 0 !important;
	}
	input,
	button {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: none;
	}
}
</style>

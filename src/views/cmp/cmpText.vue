<template>
	<div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<edit-mode v-show="isEdit" :id="id" :css="constyle">
			<p class="inline_paragraph"
				v-show="!isInput"
				v-html="options.text.replace(/\n|\r\n/g, '<br>')"
				@dblclick="startEdit"
				:style="style"></p>
			<textarea class="inline_textarea"
				v-show="isInput"
				v-model="inputText"
				:style="style"
				@keydown.enter="saveText"></textarea>
		</edit-mode>
		<div v-show="hoverStatus && !isEdit"
			class="is-hover"
			:style="constyle">
			<p :style="style" class="inline_paragraph" v-html="options.text.replace(/\n|\r\n/g, '<br>')"></p>
		</div>
		<div v-show="!isEdit & !hoverStatus" class="default-status" :style="style">
			<p v-html="options.text.replace(/\n|\r\n/g, '<br>')"></p>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { handleStyle } from '@/utils/index'
import EditMode from '@/components/editMode/index.vue'
import EditStore from '@/store/modules/editStore'
import TYPES from '@/store/modules/editStore/types'
import BaseMixin from './baseMixin'

@Component({
	components: {
		EditMode
	},
	mixins: [ BaseMixin ]
})
export default class CmpText extends Vue {
	private isInput: boolean = false
	private inputText: string = '' 
	private startEdit() {
	  this.isInput = true
	  this.inputText = (this.options as any).text
	}

	private saveText() {
	  this.isInput = false
	  ;(EditStore as any)[TYPES.UPDATE_TEXT]({ id: this.id, text: this.inputText })
	}
}
</script>

<style lang="scss" scoped></style>

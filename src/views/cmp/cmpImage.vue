<template>
	<div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<edit-mode v-show="isEdit" :id="id" :css="constyle">
			<img class="inline-img"
				:style="style"
				:src="options.url || defaultUrl"
				@mousedown="mousedown"
				@error="loadImg"/>
		</edit-mode>
		<div class="is-hover"
			v-show="hoverStatus && !isEdit"
			:style="constyle">
			<img class="inline-img"
				:style="style"
				:src="options.url || defaultUrl"
				@mousedown="mousedown"
				@error="loadImg"/>
		</div>
		<img class="default-status"
			v-show="!hoverStatus && !isEdit"
			:style="style"
			:src="options.url || defaultUrl" 
			ondragstart="return false;" />
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
export default class CmpImage extends Mixins(BaseMixin) {
	private loadImg(e: Event) {
		console.log(e)
	}
}
</script>

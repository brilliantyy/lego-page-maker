<template>
	<div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<edit-mode v-show="isEdit" :id="id" :css="constyle">
			<div :style="style" @mousedown="mousedown" class="inline_div"></div>
		</edit-mode>
		<div
			v-show="hoverStatus && !isEdit"
			:style="constyle"
			class="is-hover">
			<div :style="style" @mousedown="mousedown" class="inline_div"></div>
		</div>
		<div
			v-show="!hoverStatus && !isEdit"
			class="default-status"
			ondragstart="return false;"
			:style="style"></div>
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
	mixins: [BaseMixin]
})
export default class CmpDiv extends Vue {
	
};
</script>

<style lang="scss" scoped></style>

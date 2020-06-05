<template>
	<div class="edit-mode" :style="css">
		<div class="top-left" @mousedown.stop="anchorMousedown(1)"></div>
		<div class="top-center" @mousedown.stop="anchorMousedown(2)"></div>
		<div class="top-right" @mousedown.stop="anchorMousedown(3)"></div>
		<div class="bottom-right" @mousedown.stop="anchorMousedown(4)"></div>
		<div class="bottom-center" @mousedown.stop="anchorMousedown(5)"></div>
		<div class="bottom-left" @mousedown.stop="anchorMousedown(6)"></div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import TYPES from '@/store/modules/editStore/types'
import EditStore from '@/store/modules/editStore'

@Component
export default class EditMode extends Vue {
	@Prop({ default: '' }) id!: string
	@Prop({ default: () => {} }) css!: styleObj

	created() {}

	anchorMousedown(index: number) {
		;(EditStore as any)[TYPES.UPDATE_ANCHOR_POS](index)
	}
}
</script>

<style lang="scss" scoped>
@mixin base-circle {
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background-color: #FFFFFF;
	border: 1px solid #1890FF;
	box-sizing: border-box;
	z-index: 10;
}
.edit-mode {
	position: absolute;
	outline: 1px solid rgb(24, 144, 255);
	box-sizing: border-box;
	.top-left {
		@include base-circle;
		left: -3px;
		top: -4px;
		cursor: nw-resize;
	}
	.top-center {
		@include base-circle;
		left: 50%;
		top: -4px;
		margin-left: -3px;
		cursor: n-resize;
	}
	.top-right {
		@include base-circle;
		right: -3px;
		top: -4px;
		cursor: ne-resize;
	}
	.bottom-left {
		@include base-circle;
		left: -3px;
		bottom: -4px;
		cursor: sw-resize;
	}
	.bottom-center {
		@include base-circle;
		left: 50%;
		margin-left: -3px;
		bottom: -4px;
		cursor: s-resize;
	}
	.bottom-right {
		@include base-circle;
		right: -3px;
		bottom: -4px;
		cursor: se-resize;
	}
}
</style>

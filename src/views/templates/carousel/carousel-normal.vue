<template>
	<div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<edit-mode v-show="isEdit" :id="id" :css="wrapperStyle">
			<div class="swiper-content" :style="contentStyle">
				<swiper class="swiper-no-swiping" :options="swiperOptions" @mousedown="mousedown">
					<swiper-slide v-for="(item, index) in options.items" :key="index"></swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
		</edit-mode>
		<div class="is-hover" v-show="hoverStatus && !isEdit" :style="wrapperStyle">
			<div class="swiper-content" :style="contentStyle">
				<swiper class="swiper-no-swiping" :options="swiperOptions" @mousedown="mousedown">
					<swiper-slide v-for="(item, index) in options.items" :key="index"></swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
		</div>
		<div class="default-status" v-show="!hoverStatus && !isEdit" :style="wrapperStyle" ondragstart="return false;">
			<div class="swiper-content" :style="contentStyle">
				<swiper :options="swiperOptions">
					<swiper-slide v-for="(item, index) in options.items" :key="index"></swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Mixins } from 'vue-property-decorator'
import EditMode from '@/components/editMode/index.vue'
import BaseMixin from '@/views/cmp/baseMixin'

@Component({
	components: {
		EditMode
	}
})
export default class CarouselNormal extends Mixins(BaseMixin) {
	private nickName: string = '常规'
	public previewImage: string = require('@assets/img/png/carousel_normal.png')
	private swiperOptions: any = {
		pagination: {
			el: '.swiper-pagination'
		}
	}

	get wrapperStyle() {
		return { ...this.style, borderRadius: 0, backgroundColor: 'transparent' }
	}

	get contentStyle() {
		return { borderRadius: this.style.borderRadius, backgroundColor: this.style.backgroundColor }
	}

	@Watch('options.nums')
	onNumsChange(val: number) {
		this.options.items = new Array(val).fill({ url: '', link: '' })
	}
}
</script>

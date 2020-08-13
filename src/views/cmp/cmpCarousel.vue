<template>
	<div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<edit-mode v-show="isEdit" :id="id" :css="wrapperStyle">
			<div class="swiper-content">
				<swiper class="swiper-no-swiping" :options="swiperOptions" @mousedown="mousedown">
					<swiper-slide v-for="(item, index) in options.items" :key="index" :style="slideStyle">
						<img :src="item.url || defaultUrl" :style="{ 'object-fit': style.objectFit }" ondragstart="return false;" />
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
		</edit-mode>
		<div class="is-hover"
			v-show="hoverStatus && !isEdit"
			:style="wrapperStyle">
			<div class="swiper-content">
				<swiper class="swiper-no-swiping" :options="swiperOptions" @mousedown="mousedown">
					<swiper-slide v-for="(item, index) in options.items" :key="index" :style="slideStyle">
						<img :src="item.url || defaultUrl" :style="{ 'object-fit': style.objectFit }" />
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
		</div>
		<div class="default-status" v-show="!hoverStatus && !isEdit" :style="wrapperStyle" ondragstart="return false;">
			<div class="swiper-content">
				<swiper :options="swiperOptions">
					<swiper-slide v-for="(item, index) in options.items" :key="index" :style="slideStyle">
						<img :src="item.url || defaultUrl" :style="{ 'object-fit': style.objectFit }" />
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
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
export default class CmpCarousel extends Mixins(BaseMixin) {
	private swiperOptions: any = {
		pagination: {
			el: '.swiper-pagination'
		}
	}

	get wrapperStyle() {
		return { ...this.style, borderRadius: 0, backgroundColor: 'transparent' }
	}

	get slideStyle() {
		const { borderRadius, backgroundColor } = this.style
		return { borderRadius, backgroundColor }
	}

	get currentUrl() {
		return (this.options && this.options.items[this.options.activeIndex] && this.options.items[this.options.activeIndex].url) || this.defaultUrl
	}

	@Watch('options.nums')
	onNumsChange(val: number) {
		this.options.items = new Array(val).fill({ url: '', link: '' })
	}
}
</script>

<style lang="scss" scoped>
.swiper-slide {
	img {
		width: 100%;
		height: 100%;
	}
}
</style>

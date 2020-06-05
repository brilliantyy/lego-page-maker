<template>
    <div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <edit-mode v-show="isEdit" :id="id" :css="wrapperStyle">
            <div class="swiper-content">
                <swiper class="swiper-no-swiping" :options="swiperOptions" @mousedown="mousedown">
                    <swiper-slide v-for="(item, index) in options.items" :key="index" :style="slideStyle"></swiper-slide>
                </swiper>
            </div>
		</edit-mode>
		<div class="is-hover"
			v-show="hoverStatus && !isEdit"
			:style="wrapperStyle">
            <div class="swiper-content">
                <swiper class="swiper-no-swiping" :options="swiperOptions" @mousedown="mousedown">
                    <swiper-slide v-for="(item, index) in options.items" :key="index" :style="slideStyle"></swiper-slide>
                </swiper>
            </div>
		</div>
        <div class="default-status" v-show="!hoverStatus && !isEdit" :style="wrapperStyle" ondragstart="return false;">
            <div class="swiper-content">
                <swiper :options="swiperOptions">
                    <swiper-slide v-for="(item, index) in options.items" :key="index" :style="slideStyle"></swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script lang="ts">	
import { Vue, Component, Watch } from "vue-property-decorator"
import EditMode from '@/components/editMode/index.vue'
import BaseMixin from '@/views/cmp/baseMixin'

@Component({
    components: {
        EditMode
    },
    mixins: [BaseMixin]
})
export default class CarouselRotate extends Vue {
    private nickName: string = '3D旋转'
    public previewImage: string = require('@assets/img/png/carousel_rotate.png')
    private swiperOptions: any = {
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        centeredSlides: true,
        loop: true,
        autoplay: false,
        loopedSlides: 3,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 10,
            depth: 80,
            modifier: 3,
            slideShadows : true
        }
    }

    get wrapperStyle() {
        return {...this.style, borderRadius: 0, backgroundColor: 'transparent' }
    }

    get slideStyle() {
        const { slideWidth, backgroundColor, borderRadius } = this.style
        return { width: slideWidth, backgroundColor, borderRadius }
    }

    @Watch('options.nums')
    onNumsChange(val: number) {
        this.options.items = new Array(val).fill({ url: '', link: '' })
    }

}
</script>
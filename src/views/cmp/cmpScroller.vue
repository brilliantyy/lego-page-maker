<template>
	<div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<edit-mode v-show="isEdit" :id="id" :css="constyle">
			<img class="inline-img"
                :style="style"
                :src="currentUrl"
                @mousedown="mousedown"/>
		</edit-mode>
		<div class="is-hover"
			v-show="hoverStatus && !isEdit"
			:style="constyle">
			<img class="inline-img"
                :style="style"
                :src="currentUrl"
                @mousedown="mousedown"/>
		</div>
		<img class="default-status"
			v-show="!hoverStatus && !isEdit"
			:style="style"
            :src="currentUrl" 
			ondragstart="return false;"/>
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
export default class CmpScroller extends Vue {

    get currentUrl() {
        return (this.options.items[this.activeIndex] && this.options.items[this.activeIndex].url) || this.defaultUrl
    }

    get activeIndex() {
        const cmp = EditStore.components.filter((cmp: any) => cmp.id === this.id)[0]
        return cmp.activeIndex
    }
}
</script>

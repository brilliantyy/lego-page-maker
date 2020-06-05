<template>
    <div class="lego-previewer">
        <template v-if="components.length">
			<component
				v-for="(item, index) in components"
				:key="index"
				:is="asyncLoadComponent(item.name)"
				:id="item.id"
				:css="item.css"
				:options="item.options"
				:properties="item.properties"
				:datas="item.datas"
				></component>
		</template>
    </div>
</template>

<script lang="ts">	
import { Vue, Component } from "vue-property-decorator"
import EditStore from '@/store/modules/editStore'
import PageStore from '@/store/modules/setting'
import TYPES from '@/store/modules/editStore/types'
import CmpDiv from '@/views/cmp/cmpDiv.vue'
import CmpText from '@/views/cmp/cmpText.vue'
import CmpImage from '@/views/cmp/cmpImage.vue'
import CmpCarousel from '@/views/cmp/cmpCarousel.vue'
import CmpScroller from '@/views/cmp/cmpScroller.vue'
import AsyncLoadComponentMixin from './asyncLoadComponent'

@Component({
    mixins: [AsyncLoadComponentMixin]
})
export default class Preview extends Vue {	


	get components() {
		return EditStore.components
	}
}
</script>

<style lang="scss" scoped>

</style>
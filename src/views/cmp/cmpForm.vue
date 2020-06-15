<template>
	<div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<edit-mode v-show="isEdit" :style="formStyle" :id="id">
			<div @mousedown="mousedown" class="inline-div">
                <div class="form-item" :style="formItemStyle" v-for="item in options.items" :key="item.name">
                    <template v-if="item.type === 'input'">
                        <input :type="item.inputType" :value="item.value" :placeholder="item.placeholder"/>
                    </template>
                    <template v-else-if="item.type === 'submit'">
                        <button>{{item.text}}</button>
                    </template>
                </div>
            </div>
		</edit-mode>
		<div
			v-show="hoverStatus && !isEdit"
			:style="formStyle"
			class="is-hover">
			<div @mousedown="mousedown" class="inline-div">
                <div class="form-item" :style="formItemStyle" v-for="item in options.items" :key="item.name">
                    <template v-if="item.type === 'input'">
                        <input :type="item.inputType" :value="item.value" :placeholder="item.placeholder"/>
                    </template>
                    <template v-else-if="item.type === 'submit'">
                        <button>{{item.text}}</button>
                    </template>
                </div>
            </div>
		</div>
		<div
			v-show="!hoverStatus && !isEdit"
			class="default-status"
			ondragstart="return false;"
			:style="formStyle">
            <div class="form-item" :style="formItemStyle" v-for="item in options.items" :key="item.name">
                <template v-if="item.type === 'input'">
                    <input :type="item.inputType" :value="item.value" :placeholder="item.placeholder"/>
                </template>
                <template v-else-if="item.type === 'submit'">
                    <button>{{item.text}}</button>
                </template>
            </div>
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
	mixins: [BaseMixin]
})
export default class CmpForm extends Vue {
    get formStyle(): Object {
        const { left, top, width, height } = this.style
        return { left, top, width }
    }

    get formItemStyle(): Object {
        const { width, height, marginBottom, itemBorderColor, borderWidth, borderColor, borderStyle, borderRadius } = this.style
        return { width, height, marginBottom, borderWidth, borderColor, borderStyle, borderRadius }
    }
};
</script>

<style lang="scss" scoped>
.form-item {
    box-sizing: border-box;
    overflow: hidden;
    input, button {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: none;
    }
}
</style>

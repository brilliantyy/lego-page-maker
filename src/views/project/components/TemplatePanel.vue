<template>
    <div class="template-wrapper">
        <template v-if="cmp && !!templates.length">
            <div :class="{'tmpl-block': true, 'active': tpl.name === selectedTemplate}" v-for="tpl in templates" :key="tpl.name" @click="setTemplate(tpl.type, tpl.name)">
                <img :src="tpl.icon" :alt="tpl.nickname">
                <span class="tmpl-name">{{tpl.nickname}}</span>
            </div>
        </template>
        <template v-else>
            <img class="empty" :src="require('@assets/img/png/no_content.png')" alt="无内容">
        </template>
    </div>
</template>

<script lang="ts">	
import { Vue, Component } from 'vue-property-decorator'
import TemplateStore from '@/store/modules/templateStore'
import EditStore from '@/store/modules/editStore'
import { REPLACE_CMP } from '@/store/modules/editStore/types'
import { importAllModel } from '@/utils/index'

const models: any = importAllModel(require.context('../../../model', true, /\.ts$/))

@Component
export default class TemplatePanel extends Vue {

    get templates() {
        return TemplateStore.templates || []
    }

    get cmp() {
		const cmps = EditStore.components.slice()
		const activeOnes = cmps.filter(cmp => EditStore.activeComponents.includes(cmp.id))

		return activeOnes[0]
    }
    
    get selectedTemplate() {
        return this.cmp ? this.cmp.name : ''
    }

    private setTemplate(type: string, name: string) {
        if (!this.cmp) return

        if (this.cmp.name.includes(type)) {
            const modelId = name.replace(/-([a-z])/, (r) => {return r.toUpperCase()}).replace('-', '')
            const data = models[modelId]();
            (EditStore as any)[REPLACE_CMP](data)
        }
    }

    private loadImage(url: string) {
        return require(url)
    }
}
</script>

<style lang="scss" scoped>
.tmpl-block {
    position: relative;
    width: 200px;
    height: 200px;
    float: left;
    margin-right: 20px;
    border: 1px solid #eee;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    &.active {
        border-color: #ffab63;
        box-shadow: 0 0 5px rgba(247, 125, 21, 0.3)
    }
    img {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    .tmpl-name {
        top: 50%;
        margin-top: -11px;
        display: block;
        position: absolute;
        width: 100%;
        padding: 2px 9px;
        color: #fff;
        font-size: 13px;
        font-weight: 500;
        background: linear-gradient(135deg, #fbac48 0, #ff4848 100%);
        transform: rotate(45deg) translate(0, -106px);
        text-align: center;
        box-sizing: border-box;
    }
}
</style>
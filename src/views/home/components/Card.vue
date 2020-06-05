<template>
    <div class="card" @click="$router.push({ path: '/project/detail/' + data.id })">
        <div class="gradient-bg"><span class="title">{{data.title}}</span></div>
        <div class="info-bar">
            <span class="date">{{ data.updateTime }}</span>
        </div>
    </div>
</template>

<script lang="ts">	
import { Vue, Component, Prop } from "vue-property-decorator"	

@Component
export default class Card extends Vue {
    @Prop({ default: () => {}}) data!: object
}
</script>

<style lang="scss" scoped>
.card {
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 295px;
    height: 245px;
    padding: 15px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    box-shadow: 0px 10px 40px -10px rgba(125, 125, 125, 0.2);
    cursor: pointer;
    &:hover {
        box-shadow: 0 20px 40px -10px rgba(207, 139, 56, .4);
    }
    .gradient-bg {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 162px;
        border-radius: 5px;
        background-image: radial-gradient(circle 369px at 1% 20%, rgba(245, 76, 76, 0.8) 0.7%, rgba(243, 203, 129, 0.9) 70%);
        .title {
            display: block;
            width: 160px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
            color: #fff;
            font-weight: 500;
        }
    }
    .info-bar {
        padding-top: 5px;
        text-align: right;
        .date {
            color: #666;
            font-size: 14px;
        }
    }
}
</style>
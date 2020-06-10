<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '@/style/common.scss';

#app {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
</style>

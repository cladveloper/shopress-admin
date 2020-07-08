<template>
    <header class="l-title mb-4">
        <nav-mapsite :mapsite="mapsite"/>
        <section class="l-title-text">
            <h1 class="mb-0 font-size-l" style="max-width: 800px"><slot/></h1>
            <n-link :to="btnLink" class="btn btn-secondary ml-auto mb-0" v-if="btn">{{btn}}</n-link>
        </section>
        <nav-menu v-if="links" :links="links"/>
    </header>
</template>

<script>
import navMenu from '@/components/nav/menu';
import navMapsite from '@/components/nav/mapsite';
export default {
    props: {
        btn: String,
        btnLink: {
            type: String,
            default: '/',
        },
        links: Array,
        mapsite: Array
    },
    components: {
        navMenu,
        navMapsite
    }
}
</script>

<style lang="sass" scoped>
    .l-title
        &-text
            display: flex
            align-items: center
</style>
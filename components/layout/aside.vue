<template>
    <aside class="l-aside background-color-secondary-dark">
        <slot/>
    </aside>
</template>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'
    .l-aside
        flex: 1
        max-width: 220px
        overflow: auto
        

</style>
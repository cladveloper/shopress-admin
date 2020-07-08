<template>
    <header class="l-header">
        <l-logo/>
    </header>
</template>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'
    .l-header
        flex: 1
        max-height: 50px
        border-bottom: 1px solid map-get($colors, grey)
        
</style>
<template>
    <nav class="nav-mapsite">
        <ul class="nav-mapsite-container">
            <li class="nav-mapsite-item" v-for="(link,i) in mapsite" :key="i">
                <n-link :to="link.to" class="nav-mapsite-link">
                    {{link.name}} {{i == mapsite.length-1 ? '' : '>'}}
                </n-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        mapsite: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'
    .nav-mapsite
        &-container
            margin: 0
            list-style: none
            display: flex

        &-link
            display: block
            font-size: $xs
            color: map-get($colors, primary-dark)
            margin-right: $gutter/2
            text-decoration: none
            opacity: .5
            text-transform: uppercase
            font-weight: bold

            &.nuxt-link-exact-active
                opacity: 1
                cursor: default
</style>
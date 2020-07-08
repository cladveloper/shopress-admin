<template>
    <nav class="nav-menu">
        <ul class="nav-menu-container">
            <li class="nav-menu-item" v-for="(link,i) in links" :key="i">
                <n-link :to="link.to" class="nav-menu-link">
                    {{link.name}}
                </n-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        links: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'
    .nav-menu
        &-container
            margin: 0
            list-style: none
            display: flex

        &-link
            display: block
            font-weight: bold
            color: map-get($colors, dark-50)
            margin-right: $gutter
            text-decoration: none
            opacity: .5

            &.nuxt-link-active
                opacity: 1

            &.nuxt-link-exact-active
                cursor: default
</style>
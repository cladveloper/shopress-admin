<template>
    <nav class="l-nav">
        <ul class="l-nav-ul">
            <li class="l-nav-item" v-for="(item,i) in items" :key="i">
                <n-link :to="item.link" class="l-nav-link">
                    <img v-if="item.icon" :src="require(`@/assets/images/${item.icon}`)" class="l-nav-icon" fill="red"/>
                    <span>{{item.name}}</span>
                </n-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            items: [{
                icon: 'shopping-cart-outline.svg',
                name: 'Productos',
                link: '/productos'
            },{
                icon: 'list-outline.svg',
                name: 'Categorías',
                link: '/categorias'
            },{
                icon: 'car-outline.svg',
                name: 'Órdenes',
                link: '/ordenes'
            }]
        }
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'

    .l-nav
        &-icon
            width: 20px
            margin-right: $gutter
        &-ul
            margin: 0
            list-style: none
            padding-top: $gutter

        &-link
            text-decoration: none
            display: block
            padding: $gutter/2 $gutter/2
            margin-left: $gutter/2 
            margin-right: $gutter/2 
            display: flex
            align-items: center
            font-size: $xs
            opacity: .5
            transition: .5s opacity
            color: #fff
            border-radius: $border-radius

            &:hover
                opacity: 1

            &.nuxt-link-active
                opacity: 1
                background-color: map-get($colors, primary)
                font-weight: bold

            &.nuxt-link-exact-active
                cursor: default
            
</style>
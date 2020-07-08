<template>
    <section class="c-category-min">
        <section class="c-category-min-image">
            <a href="" @click.prevent="$emit('click')">
                <img :src="$resizeImage(src,60,60)" v-if="src && !loading"/>
            </a>
            <img src="@/assets/images/loading.svg" v-show="loading"/>
            
        </section>
        <section class="c-category-min-content">
            <span class="font-weight-bold font-size-s ml-2">{{nameCut}}</span><br>
            <span class="font-size-xxs ml-2 dark-50">Arrastra aquí el ícono</span>
        </section>
    </section>
</template>

<script>
import {cutText} from '@/assets/js/transform';
export default {
    props: {
        name: {
            type: String,
            default: '',
        },
        src: {
            type: String,
            default: '',
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        nameCut(){
            return cutText(this.name, 55)
        }
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'
    .c-category-min
        display: flex
        align-items: center
        &-image
            position: relative
            $size: 60px
            width: $size
            height: $size
            background-color: map-get($colors, grey)

            & img
                border-radius: $border-radius 0 0 $border-radius
</style>
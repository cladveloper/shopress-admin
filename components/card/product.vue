<template>
    <article class="c-product">
        <section class="c-product-image background-color-light">
            <section class="area ai-c j-c py-6 border-radius" style="flex-direction: column" v-if="loading">
                <img src="@/assets/images/loading.svg" height="45px" class="mb-2 mt-2"/>
                <span class="font-weight-bold mb-2">Actualizando portada...</span>
            </section>
            <a href="" v-else-if="src" @click.prevent="$emit('click')"><img :src="$scaleImage(src,400)" class="border-radius-top"/></a>
            <section class="area ai-c j-c py-6" style="flex-direction: column" v-else>
                <img src="@/assets/images/file-add-outline.svg" height="45px" class="mb-2"/>
                <span class="font-weight-bold mb-2">Portada del producto</span>
                <span class="font-size-xs">Arrastra de la galería</span>
            </section>
        </section>
        <section class="p-3">
            <span class="display-block line-height font-weight-bold font-size-m">{{name}}</span>
            <p class="font-size-xs">{{description}}</p>
            <p class="font-weight-bold font-size-xl mb-0">${{priceFormated}}</p>
        </section>
    </article>
</template>

<script>
import {formatedMoney} from '@/assets/js/transform';
export default {
    props: {
        name: String,
        price: Number,
        description: String,
        src: String,
        loading: Boolean
    },
    computed:{
        priceFormated(){
            return formatedMoney(this.price);
        }
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'


</style>
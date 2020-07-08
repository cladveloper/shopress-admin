<template>
    <article class="c-product">
        <section class="c-product-image background-color-light">
            <section class="area ai-c j-c py-2 border-radius" style="flex-direction: column" v-if="loading">
                <img src="@/assets/images/loading.svg" height="32px" class="mb-2 mt-2"/>
                <span class="font-weight-bold font-size-xs">Actualizando portada...</span>
            </section>
            <a href="" v-else-if="src" @click.prevent="$emit('click')"><img :src="$scaleImage(src,400)" class="border-radius-top"/></a>
            <section class="area ai-c j-c py-2" style="flex-direction: column" v-else>
                <img src="@/assets/images/file-add-outline.svg" height="32px" class="mb-2"/>
                <span class="font-weight-bold mb-1 font-size-xs">Portada de la categoría</span>
                <span class="font-size-xxs">Arrastra de la galería</span>
            </section>
        </section>
        <section class="p-3">
            <span class="display-block line-height font-weight-bold font-size-m">{{nameCut}}</span>
            <p class="font-size-xs">{{descriptionCut}}</p>
        </section>
    </article>
</template>

<script>
import {cutText} from '@/assets/js/transform';
export default {
    props: {
        name: String,
        description: String,
        src: String,
        loading: Boolean
    },
    computed:{
        nameCut(){
            return cutText(this.name, 55);
        },
        descriptionCut(){
            return cutText(this.description, 180);
        }
    }
}
</script>
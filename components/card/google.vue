<template>
    <article class="google-view">
        <span class="google-url display-block line-height">https://{{path}}{{urlCut}}</span>
        <span class="google-title display-block line-height my-1">{{nameCut}}</span>
        <span class="google-description display-block line-height">{{description.length > 0 ? descriptionCut : 'No hay una descripción para mostrar'}}</span>
    </article>
</template>

<script>
import {cutText} from '@/assets/js/transform';
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        path: {
            type: String,
            default: 'producto/'
        }
    },
    computed: {
        nameCut(){
            return cutText(this.name, 57);
        },
        descriptionCut(){
            return cutText(this.description, 160);
        },
        urlCut(){
            return cutText(this.url, 30);
        },
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'
    .google
        &-url
            font-size: $xxs
            color: #202124
        &-title
            color: #1a0dab
        &-description
            font-size: $xs
        
</style>
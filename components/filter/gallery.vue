<template>
    <section class="gallery area g-1 gy-1">
        <g-card :src="/svg/i.test(image.split('.').pop()) ? image : $resizeImage(image, 120,120,80)" v-for="(image,i) in images" :key="i" @click="$emit('click', image.split('/').pop())"/>
    </section>
</template>

<script>
import gCard from '@/components/card/gallery';
export default {
    props: {
        images: Array
    },
    components: {
        gCard
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'
    .gallery
        
</style>
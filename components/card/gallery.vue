<template>
    <section class="box-3">
        <a href="" target="_new" @click.prevent="$emit('click')" class="g-card" :draggable="draggable" @dragstart="drag" @dragover.stop>
            <img :src="src" class="image-cover border-radius"/>
        </a>
    </section>
</template>

<script>
export default {
    props: {
        src: String,
        draggable: Boolean,
        route: String
    },

    methods: {
        drag(e){
            e.dataTransfer.setData('src', this.route);
        },
    },
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'

    .g-card
        width: 100%
        height: 100px
        border-radius: $border-radius
        background-color: map-get($colors, grey)
        position: relative
        display: block
</style>
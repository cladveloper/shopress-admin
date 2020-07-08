<template>
    <section class="f-box">
        <a href="" @click.prevent="active = !active" class="f-select">
            {{label}}&nbsp;<span v-show="check.length != 0" class="font-weight-bold">({{multi ? check.length : '1' }})</span>
        </a>
        <section class="f-options" :class="{active}">
            <label class="f-option-container" v-for="(option,i) in options" :key="i">
                <input class="f-option-input m-0" :type="multi ? 'checkbox' : 'radio'" :value="option.value" v-model="check"/>
                <span class="f-option-checkmark ml-1">{{option.label}}</span>
            </label>
            
        </section>
    </section>
</template>

<script>
export default {
    props: {
        label: String,
        options: Array,
        multi: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            active: false,
            check: []
        }
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'

    .f-box
        position: relative
    .f-select
        display: block
        background-color: white
        border-radius: $border-radius
        height: 100%
        min-height: 40px
        text-decoration: none
        display: flex
        align-items: center
        padding-left: $gutter
        padding-right: $gutter
        color: map-get($colors, dark)

    .f-option
        &s
            margin-top: $gutter/4
            position: absolute
            width: 100%
            display: none
            min-width: 300px

            &.active
                display: block
                width: 100%
                background-color: white
                border: 1px solid map-get($colors, grey)
                min-height: 100px

        &-container
            display: flex
            align-items: center
            padding: $gutter
            cursor: pointer

            & .f-option-input:checked ~ .f-option-checkmark
                font-weight: bold
        &-input
            margin-right: $gutter/2
        &-checkmark

            
</style>
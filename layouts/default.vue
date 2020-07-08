<template>
    <section class="layout">
        <l-header></l-header>
        <l-container>
            <l-aside>
                <span class="display-block pt-2 pl-2 font-size-xxs font-weight-bold color-dark-50">NAVEGACIÓN</span>
                <l-nav/>
            </l-aside>
            <l-main>
                <l-wrapper>
                    <l-content><nuxt/></l-content>
                </l-wrapper>
            </l-main>
        </l-container>
    </section>
</template>

<style lang="sass" scoped>
    .layout
        width: 100%
        height: 100vh
        display: flex
        flex-direction: column
        overflow: auto
</style>
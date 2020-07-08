<template>
    <section class="login">
        <article class="form-login">
            <form class="form" @submit.prevent="logIn">
                <h1 class="font-size-xl mb-4">Shopress</h1>
                <label>Nombre de usuario</label>
                <input v-model="login.username" placeholder="nombre@correo.cl"/>
                <label>Contraseña</label>
                <input type="password" v-model="login.password" placeholder="*********"/>
                <input type="submit" class="btn btn-primary mb-0" :disabled="loading" :value="loading ? 'Cargando...' : 'Iniciar sesión'"/>
            </form>
        </article>
    </section>
</template>

<script>
export default {
    layout: 'white',
    data(){
        return{
            login: {
                username: '',
                password: '',
            },
            loading: false,
            error: false
        }
    },
    methods: {
        async logIn(){
            try{
                this.loading = true;
                let response = await this.$auth.loginWith('local', {data: this.login});
            } catch(err){
                console.log(err);
                alert('Usuario y/o contraseña inválidos');
            }
            this.loading = false;
        }
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'
    .login
        height: 100vh
        width: 100%
        background-color: map-get($colors, light)
        display: flex
        align-items: center
        justify-content: center

    .form-login
        width: 100%
        max-width: 350px
        border-radius: $border-radius
        border: map-get($colors, grey) 1px solid
        background: #fff
        padding: $gutter*2
</style>
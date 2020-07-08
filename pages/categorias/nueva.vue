<template>
    <section>
        <l-title btn="Volver a categorías" btn-link="/categorias" :mapsite="[{name: 'Categorías', to: '/categorias'}, {name: 'Nueva', to: '/categorias/nueva'}]">Nueva categoría</l-title>
        <form-categories @submit="createCategory" :loading="loading"/>        
    </section>
</template>

<script>
import formCategories from '@/components/form/categories';

export default {
    components: {
        formCategories
    },
    data(){
        return{
            loading: false
        }
    },
    methods: {
        async createCategory(categoryData){
            this.loading = true;
            await this.$store.dispatch('categories/create', categoryData)
            .then(category => this.$router.push(`/categorias/editar/${category._id}`))
            .catch(err => alert('La url ingresada debe ser única'));
            
            this.loading = false;
        }
    }
}
</script>
<template>
    <section>
        <l-title btn="Volver a productos" btn-link="/productos" :mapsite="[{name: 'Productos', to: '/productos'}, {name: 'Nuevo', to: '/productos/nuevo'}]">Nuevo producto</l-title>
        <form-products @submit="createProduct" :available-categories="categories" :loading="loading"/>        
    </section>
</template>

<script>
import formProducts from '@/components/form/products';

export default {
    async asyncData({store}){
        let categories = await store.dispatch('categories/getAll', {project: 'name'});
            categories = categories.results
        return {categories}
    },
    components: {
        formProducts
    },
    data(){
        return{
            loading: false
        }
    },
    methods: {
        async createProduct(productData){
            this.loading = true;
            const product = await this.$store.dispatch('products/create', productData)
            .then(product => this.$router.push(`/productos/editar/${product._id}`))
            .catch(err => alert('La url ingresada debe ser única'));
            
            this.loading = false;
        }
    }
}
</script>


<template>
    <section>
        <l-title btn="Nuevo producto" btn-link="/productos/nuevo" :mapsite="[{name: 'Productos', to: '/productos'}]">Lista de productos</l-title>
        <filter-table
            :data="results"
            image="imageCover"
            :total-data="totalResults"
            :total-data-per-page="resultsPerPage"
            :actions="actions"
            :filters="filters"
            :search="true"
            :labels="labels"
            :loading-data="loadingData"
            link="/productos/editar/"
            @change="search"
        />
    </section>
</template>

<script>
import filterTable from '@/components/filter/table';
import {formatedMoney,formatedDate, cutText} from '@/assets/js/transform';
const mapResults = (results) => {
    return results.map(result => {
        return {
            _id: result._id,
            name: cutText(result.name, 100),
            price: `$${formatedMoney(result.price)}`,
            sku: cutText(result.sku, 15),
            stock: result.stock,
            imageCover: result.imageCover,
            uploadDate: formatedDate(result.uploadDate)
        }
    });
}
export default {
    async asyncData({store, route}){
        let {results, totalResults, resultsPerPage} = await store.dispatch('products/getAll', {project: 'name,price,sku,stock,uploadDate,imageCover'});
        let categories = await store.dispatch('categories/getAll', {project: 'name'});
        categories = categories.results;
        results = mapResults(results);
        return {results,totalResults,resultsPerPage, categories};
    },
    components: {
        filterTable
    },
    data(){
        return{
            loadingData: false,
            actions: [
                {name: 'Eliminar seleccionadas', value: 'products/deleteMany'},
                {name: 'Cambiar a stock disponible', value: {
                    action: 'products/updateMany', obj: {stock: 999999}
                }},
                {name: 'Cambiar a sin stock', value: {
                    action: 'products/updateMany', obj: {stock: 0}
                }},
                {name: 'Cambiar estado a destacado', value: {
                    action: 'products/updateMany', obj: {featured: true}
                }},
                {name: 'Cambiar estado a no destacado', value: {
                    action: 'products/updateMany', obj: {featured: false}
                }},
                {name: 'Cambiar estado a publicado', value: {
                    action: 'products/updateMany', obj: {published: true}
                }},
                {name: 'Cambiar estado a borrador', value: {
                    action: 'products/updateMany', obj: {published: false}
                }},
            ],
            labels: [
                {name: 'Nombre del producto', value: 'name', sort: ['name', '-name'], width: '35%'},
                {name: 'Precio', value: 'price', sort: ['price', '-price'], width: '13%'},
                {name: 'SKU', value: 'sku', sort: ['sku', '-sku'], width: '12%'},
                {name: 'Stock', value: 'stock', sort: ['stock', '-stock'], width: '10%'},
                {name: 'Fecha', value: 'uploadDate', sort: ['uploadDate', '-uploadDate'], width: '30%'}
            ]
        }
    },
    computed:{
        filters(){
            const categories = this.categories.map(category => {return {label: category.name, value: {categoriesIds: category._id}}});
            return [{
                id: 'ctgr',
                options: [
                    {label: 'Seleccionar categorías', value: {}},
                    ...categories
                ]
            },{
                id: 'prdct',
                options: [
                    {label: 'Mostrar todo', value: {}},
                    {label: 'Mostrar solo destacados', value: {featured: 'yes'}},
                    {label: 'Mostrar no destacados', value: {featured: 'no'}},
                ]
            }]
        }
    },

    methods: {
        async search(query){
            this.loadingData = true;
            let {results, totalResults, resultsPerPage} = await this.$store.dispatch('products/getAll', {...query, project: 'name,price,sku,stock,uploadDate,imageCover'});
            results = mapResults(results);
            this.results = results;
            this.totalResults = totalResults;
            this.resultsPerPage = resultsPerPage;
            this.loadingData = false;
        }
    },
}
</script>
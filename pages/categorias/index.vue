<template>
    <section>
        <l-title btn="Nueva categoría" btn-link="/categorias/nueva" :mapsite="[{name: 'Categorías', to: '/categorias'}]">Lista de categorías</l-title>
        <filter-table
            :data="results"
            :total-data="totalResults"
            :total-data-per-page="resultsPerPage"
            :actions="actions"
            :search="true"
            :labels="labels"
            :loading-data="loadingData"
            link="/categorias/editar/"
            @change="search"
        />
    </section>
</template>

<script>
import filterTable from '@/components/filter/table';
import {formatedDate} from '@/assets/js/transform';
const mapResults = (results) => {
    return results.map(result => {
        return {
            _id: result._id,
            name: result.name,
            uploadDate: formatedDate(result.uploadDate)
        }
    });
}
export default {
    async asyncData({store, route}){
        let {results,totalResults,resultsPerPage,} = await store.dispatch('categories/getAll', {project: 'name,uploadDate', sort: 'name'});
        results = mapResults(results);
        return {results,totalResults,resultsPerPage};
    },
    components: {
        filterTable
    },
    data(){
        return{
            loadingData: false,
            actions: [
                {name: 'Eliminar seleccionadas', value: 'categories/deleteMany'},
            ],
            labels: [
                {name: 'Nombre de la categoría', value: 'name', sort: ['name', '-name'], width: '60%'},
                {name: 'Fecha', value: 'uploadDate', sort: ['uploadDate', '-uploadDate'], width: '30%'}
            ]
        }
    },

    methods: {
        async search(query){
            this.loadingData = true;
            if(query.sort.length < 1) query.sort = 'name';
            let {results,totalResults,resultsPerPage,} = await this.$store.dispatch('categories/getAll', {project: 'name,uploadDate', ...query});
            results = mapResults(results);
            this.results = results;
            this.totalResults = totalResults;
            this.resultsPerPage = resultsPerPage;
            this.loadingData = false;
        }
    }
}
</script>
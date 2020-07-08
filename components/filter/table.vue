<template>
    <section class="tb">
        <header class="tb-filter">
            <form class="form tb-filter-form mb-1" @submit.prevent="changeQuery()">
                <input type="text" class="m-0" v-if="search" v-model.trim="searchTxt" placeholder="Buscar por palabras claves..."/>
                <select class="mb-0 ml-1" style="width: auto !important" v-for="(filter,i) in filters" :key="i" v-model="filtersTxt[i]">
                    <option v-for="(option,i) in filter.options" :key="i" :value="option.value">{{option.label}}</option>
                </select>
                <input type="submit" class="mb-0 ml-1 btn btn-primary" style="width: auto" value="Buscar"/>
            </form>
            <section class="area font-size-xs">
                <span class="mr-auto">Mostrando <b>{{totalData}}</b> resultado/s</span>
                <a href="" @click.prevent="clearFilters" class="color-dark">Borrar filtros</a>
            </section>
        </header>
        <table class="tb-table">
            <thead class="tb-table-thead">
                <tr class="tb-table-tr">
                    <th class="tb-table-th" style="width: 5%"><input @change="selectAll()" v-model="all" type="checkbox"/></th>
                    <th class="tb-table-th" style="width: 8%" v-if="image"></th>
                    <th class="tb-table-th" :style="label.width ? `width: ${label.width}` : ''" v-for="(label,i) in labels" :key="i">
                        <a href="" class="color-dark" @click.prevent="changeSort(label.sort)">{{label.name}}</a>
                    </th>
                </tr>
            </thead>
            <tbody class="tb-table-tbody" v-show="!loadingData">
                <tr class="tb-table-filter" v-show="selected.length > 0">
                    <td class="tb-table-td pr-3" :colspan="labels.length + 1 + (image ? 1 : 0)">
                        <form style="display: flex; align-items: center" class="form" @submit.prevent="applyAction">
                            <span>Se han seleccionado <b>{{selected.length}}</b> elemento/s</span>
                            <select class="mb-0 font-size-xs ml-auto mr-1" style="width: auto !important" v-model="actionValue">
                                <option value="">Seleccione una acción</option>
                                <option v-for="(action,i) in actions" :key="i" :value="action.value">{{action.name}}</option>
                            </select>
                            <input type="submit" :disabled="loading" class="btn btn-primary mb-0" :value="loading ? 'Cargando...' : 'Aplicar'" style="width: auto !important"/>
                        </form>
                    </td>
                </tr>
                <tr class="tb-table-tr" v-for="(d,i) in data" :key="i">
                    <td class="tb-table-td"><input type="checkbox" @change="all = false" v-model="selected" :value="d._id"/></td>
                    <td class="tb-table-td" v-if="image">
                        <a href="#" class="img-content">
                            <img :src="$resizeImage(d[image],40,40)" width="40px" class="image-cover border-radius" v-if="d[image]"/>
                        </a>
                    </td>
                    <td class="tb-table-td" v-for="(label,i) in labels" :key="i">
                        <n-link :to="`${link}${d._id}`" class="color-dark">
                            {{d[label.value] ? d[label.value] : '--'}}
                        </n-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <section v-if="loadingData" class="txt-c pt-6">
            <img src="@/assets/images/loading.svg" height="80px"/>
        </section>

        <section class="py-6 txt-c" v-else-if="data.length < 1">
            <img src="@/assets/images/search-outline.svg" height="54px"/><br><br>
            <span class="font-weight-bold color-dark-50">Sin resultados:c</span>
        </section>

    </section>
</template>

<script>
import filterDinamic from '@/components/filter/dinamic.vue'
export default {
    components: {
        filterDinamic
    },
    props: {
        search: Boolean,
        actions: Array,
        filters: Array,
        totalData: Number,
        data: Array,
        labels: Array,
        image: String,
        loadingData: Boolean,
        link: {
            type: String,
            default: '',
        }
    },
    data(){
        return{
            searchTxt: '',
            filtersTxt: [],
            sort: '',
            selected: [],
            actionValue: '',
            all: false,
            loading: false
        }
    },
    methods: {
        changeQuery(){
            this.selected = [];
            this.all = false;
            const params1 = {};
            const params2 = {text: this.searchTxt};
            this.filtersTxt.forEach(element => {
                const keys = Object.keys(element);
                if(keys.length > 0){
                    params1[keys[0]] = element[keys[0]];
                }
            });
            const query = {...params1, ...params2, sort: this.sort};
            this.$emit('change', query);
        },
        clearFilters(){
            alert('Se limpian los filtros');
        },
        changeSort(sort){
            //console.log(sort);
            if(this.sort == sort[0]){
                this.sort = sort[1];
            } else{
                this.sort = sort[0];
            };
            this.changeQuery();
        },
        selectAll(){
            if(this.all){
                const allIds = this.data.map(d => d._id);
                this.selected = allIds;
            } else{
                this.selected = [];
            }
        },
        applyAction(){
            if(this.actionValue == ''){
                alert('Debes seleccionar una acción primero')
            } else{
                const value = this.actionValue;
                let action, ids, coerce;
                typeof value == 'object' ? action = value.action : action = value;
                ids = this.selected.toString();

                const cb = async (obj) => {
                    this.loading = true;
                    await this.$store.dispatch(action,obj)
                    .then(res => this.changeQuery())
                    .catch(err => {alert('No se pudo ejecutar la acción'); console.log(err)})
                    this.loading = false;
                }
                
                if(typeof value.obj == 'undefined'){
                    cb(ids);
                } else{
                    coerce = {
                        ids,
                        ...value.obj
                    };
                    cb(coerce);
                }
            }
        },
    },
    created(){
        if(this.filters){
            this.filters.forEach(filter => {
                this.filtersTxt.push(filter.options[0].value);
            });
        };
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'

    .tb
        background-color: white
        border: 1px solid map-get($colors, grey)
        border-radius: $border-radius
        min-height: 380px

        &-filter
            padding-top: $gutter*1.5
            padding-left: $gutter*1.5
            padding-right: $gutter*1.5
            padding-bottom: 0

            &-form
                display: flex
                align-items: stretch

        &-table
            width: 100%
            position: relative

            &-filter
                width: 100%
                text-align: left
                font-size: $xs
                border-bottom: 1px solid map-get($colors, grey)

            &-tr
                width: 100%
                text-align: left
                font-size: $xs
            
            &-th, &-td
                padding-top: $gutter / 1.5
                padding-bottom: $gutter / 1.5
                padding-left: $gutter *1.5
                padding-right: $gutter /2

            &-th
                font-weight: bold
                border-bottom: 2px solid map-get($colors, grey)

            &-td
                border-bottom: 1px solid map-get($colors, grey)
                vertical-align: middle
    
    .img-content
        background-color: map-get($colors, grey)
        width: 40px
        height: 40px
        border-radius: $border-radius
        display: inline-block

</style>
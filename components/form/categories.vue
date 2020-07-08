<template>
    <form class="form area g-2" @submit.prevent="submit" @change="$emit('change')">
        <article :class="mode ? 'box-12' : 'box-7'">
            <section class="background-color-white border-radius mb-2 p-3 border">
                <h2 class="font-size-s mb-4">Información de la categoría</h2>
                <label>Nombre de la categoría</label>
                <div class="box">
                    <input type="text" placeholder="Smarthphone" :class="{error: $v.form.name.$error}" v-model.trim="$v.form.name.$model"/>
                    <span class="error-msg" v-if="!$v.form.name.required">El nombre es obligatorio</span>
                    <span class="error-msg" v-else-if="!$v.form.name.maxLength">El nombre no puede superar los 180 caracteres</span>
                </div>

                <label>Descripción</label>
                <div class="box">
                    <textarea placeholder="Lo mejor en smarthphone en un solo lugar" v-model.trim="$v.form.description.$model" :class="{error: $v.form.description.$error}"></textarea>
                    <span class="error-msg" v-if="!$v.form.description.maxLength">La descripción no puede superar los 2500 caracteres</span>
                </div>

                <div class="area ai-c" v-show="mode" style="height: 32px !important">
                    <span class="font-weight-bold mb-0" v-show="!loading && status == 1">No guardado</span>
                    <span class="font-weight-bold mb-0" v-show="!loading && status == 0">Guardado</span>
                    <span class="font-weight-bold mb-0" v-show="loading">Guardando...</span>
                    <img src="@/assets/images/loading.svg" height="32px" v-show="loading"/>
                </div>

            </section>
        </article>

        <article :class="mode ? 'box-12' : 'box-5'">
            <section class="background-color-white border-radius p-3 border">
                <h2 class="font-size-s mb-4">Visibilidad de la categoría</h2>
                <label>URL</label>
                <div class="box mb-6">
                    <input type="text" class="mb-0" placeholder="smarthphone" v-model.trim="$v.form.url.$model" :class="{error: $v.form.url.$error}"/>
                    <span class="error-msg" v-if="!$v.form.url.required">La url es requerida</span>
                    <span class="error-msg" v-else-if="!$v.form.url.maxLength">La url no debe exceder los 50 caracteres</span>
                    <span class="error-msg" v-else-if="!$v.form.url.regex">Solo está permitido letras, sin tildes y ñ, números y guiones</span>
                    <span class="font-size-xxs display-block line-height" style="position:absolute;" v-else>https://mipaginaweb.cl/categoria/{{form.url}}</span>
                </div>
                <label class="checkbox">
                    <input type="checkbox" v-model="form.featured"/>
                    <span>Categoría destacada</span>
                </label>
                <input type="submit" :disabled="loading" class="btn btn-primary mb-0" :value="loading ? 'Cargando...' : txtBtn"/>
                <span class="line-height font-size-xxs display-block txt-c mt-1 color-dark-50">Una vez creada la categoría, puedes subir fotos</span>
            </section>
        </article>
    </form>
</template>

<script>
import {categoriesSchema} from '@/utils/schemas/categories';

export default {
    props: {
        txtBtn: {
            type: String,
            default: 'Crear categoría'
        },
        loading: {
            type: Boolean,
            default: false
        },
        availableCategories: {
            type: Array,
        },
        mode: {
            type: Boolean,
            default: false
        },
        status: {
            type: Number,
            default: 0
        },
        data: Object,
    },
    data(){
        return{
            form: {
                name: '',
                description: '',
                url: '',
                featured: false
            },
        }
    },

    methods: {
        submit(){
            this.$v.$touch();
            if(!this.$v.$invalid){
                this.$emit('submit', this.form);
            }
        },
    },

    created(){
        if(this.data){
            this.form = this.data;
        }
    },

    ...categoriesSchema
}
</script>
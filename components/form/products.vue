<template>
    <form class="form area g-2" @submit.prevent="submit" @change="$emit('change')">
        <article :class="mode ? 'box-12' : 'box-7'">
            <section class="background-color-white border-radius mb-2 p-3 border">
                <h2 class="font-size-s mb-4">Información del producto</h2>
                <label>Nombre del producto</label>
                <div class="box">
                    <input type="text" placeholder="iPhone 6s 32GB" :class="{error: $v.form.name.$error}" v-model.trim="$v.form.name.$model"/>
                    <span class="error-msg" v-if="!$v.form.name.required">El nombre es obligatorio</span>
                    <span class="error-msg" v-else-if="!$v.form.name.minLength">El nombre debe contener al menos 3 caracteres</span>
                    <span class="error-msg" v-else-if="!$v.form.name.maxLength">El nombre no puede superar los 180 caracteres</span>
                </div>
                <label>Lista de categoría</label>
                <select v-model="form.categoriesIds">
                    <option value="">Sin categoría</option>
                    <option :value="category._id" v-for="(category,i) in availableCategories" :key="i">{{category.name}}</option>
                </select>
                <label>Descripción</label>
                <div class="box">
                    <textarea placeholder="Compra el nuevo iPhone 6s de 32gb" v-model.trim="$v.form.description.$model" :class="{error: $v.form.description.$error}"></textarea>
                    <span class="error-msg" v-if="!$v.form.description.maxLength">La descripción no puede superar los 2500 caracteres</span>
                </div>

                <div class="area ai-c" v-show="mode" style="height: 32px !important">
                    <span class="font-weight-bold mb-0" v-show="!loading && status == 1">No guardado</span>
                    <span class="font-weight-bold mb-0" v-show="!loading && status == 0">Guardado</span>
                    <span class="font-weight-bold mb-0" v-show="loading">Guardando...</span>
                    <img src="@/assets/images/loading.svg" height="32px" v-show="loading"/>
                </div>

            </section>

            <section class="background-color-white border-radius p-3 border">
                <h2 class="font-size-s mb-4">Detalles del producto</h2>
                <label>SKU</label>
                <div class="box">
                    <input type="text" placeholder="IPHONE6S32GB"  v-model.trim="$v.form.sku.$model" :class="{error: $v.form.sku.$error}"/>
                    <span class="error-msg" v-if="!$v.form.sku.maxLength">La descripción no puede superar los 500 caracteres</span>
                </div>
                <section class="area g-1">
                    <article class="box-6">
                        <label>Precio</label>
                        <div class="box">
                            <input type="number" placeholder="20000" v-model.trim="$v.form.price.$model" :class="{error: $v.form.price.$error}" value="0"/>
                            <span class="error-msg" v-if="!$v.form.price.required">El precio es requerido</span>
                            <span class="error-msg" v-else-if="!$v.form.price.between">El precio debe ser entre $0 y $999.999.999</span>
                            <span class="msg" v-else>${{priceFormated}} CLP</span>
                        </div>
                    </article>
                    <article class="box-6">
                        <label>Stock</label>
                        <div class="box">
                            <input type="number" placeholder="20000" v-model.trim="$v.form.stock.$model" :class="{error: $v.form.stock.$error}"/>
                            <span class="error-msg" v-if="!$v.form.stock.between">El stock debe ser entre 0 y 999.999.999</span>
                            <span class="msg" v-else>{{stockFormated}} unidad/es</span>
                        </div>
                    </article>
                    
                </section>

                <div class="area ai-c" v-show="mode" style="height: 32px !important">
                    <span class="font-weight-bold mb-0" v-show="!loading && status == 1">No guardado</span>
                    <span class="font-weight-bold mb-0" v-show="!loading && status == 0">Guardado</span>
                    <span class="font-weight-bold mb-0" v-show="loading">Guardando...</span>
                    <img src="@/assets/images/loading.svg" height="32px" v-show="loading"/>
                </div>
                    
            </section>

        </article>
        <article :class="mode ? 'box-12 mt-2' : 'box-5'">
            <section class="background-color-white border-radius p-3 border">
                <h2 class="font-size-s mb-4">Visibilidad del producto</h2>
                <label>Tags (separa por comas)</label>
                <input type="text" placeholder="iPhone, Apple, GB, 32" v-model="form.tags"/>
                <label>URL</label>
                <div class="box mb-6">
                    <input type="text" class="mb-0" placeholder="iphone-32-gb" v-model.trim="$v.form.url.$model" :class="{error: $v.form.url.$error}"/>
                    <span class="error-msg" v-if="!$v.form.url.required">La url es requerida</span>
                    <span class="error-msg" v-else-if="!$v.form.url.maxLength">La url no debe exceder los 50 caracteres</span>
                    <span class="error-msg" v-else-if="!$v.form.url.regex">Solo está permitido letras, sin tildes y ñ, números y guiones</span>
                    <span class="font-size-xxs display-block line-height" style="position:absolute;" v-else>https://mipaginaweb.cl/producto/{{form.url}}</span>
                </div>
                <label class="checkbox">
                    <input type="checkbox" v-model="form.featured"/>
                    <span>Producto destacado</span>
                </label>
                <input type="submit" :disabled="loading" class="btn btn-primary mb-0" :value="loading ? 'Cargando...' : txtBtn"/>
                <span class="line-height font-size-xxs display-block txt-c mt-1 color-dark-50">Una vez creado el producto, puedes subir fotos</span>
            </section>
        </article>
    </form>
</template>

<script>
import {productsSchema} from '@/utils/schemas/products';
import {formatedMoney} from '@/assets/js/transform';
export default {
    props: {
        txtBtn: {
            type: String,
            default: 'Crear producto'
        },
        loading: {
            type: Boolean,
            default: false
        },
        availableCategories: {
            type: Array,
        },
        mode: Boolean,
        data: Object,
        status: {
            type: Number,
            default: 0,
        }
    },
    created(){
        if(this.data){
            this.form = this.data;
        }
    },
    data(){
        return{
            form: {
                name: '',
                description: '',
                sku: '',
                stock: '',
                price: '',
                url: '',
                tags: '',
                categoriesIds: '',
                featured: false,
                published: false,
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

    computed: {
        priceFormated(){
            return formatedMoney(this.form.price);
        },
        stockFormated(){
            return formatedMoney(this.form.stock);
        }
    },

    ...productsSchema
}
</script>
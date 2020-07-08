<template>
    <section>
        <l-title btn="Volver a productos" btn-link="/productos" :mapsite="[{name: 'Productos', to: '/productos'}, {name: titleCut, to: `/productos/editar/${$route.params.id}`}]">{{titleCut}}</l-title>
        <section class="area g-2">
            <article class="box-5">
                <section class="background-color-white border-radius border mb-2" @dragover.prevent @drop.prevent="drop">
                    <product-view
                        :name="titleCut"
                        :description="descriptionCut"
                        :price="product.price"
                        :src="product.imageCover"
                        :loading="loadingCover"
                        @click="updateImageCover('')"
                    />
                </section>
                <section class="background-color-white border-radius border p-3">
                    <google-view
                        :name="product.name"
                        :description="product.description"
                        :url="product.url"
                    />
                </section>
            </article>
            <article class="box-7">
                <section class="background-color-white border p-3 mb-2 border-radius" style="height: 300px; overflow-y: auto">
                    <header class="area ai-c mb-3">
                        <div class=" mr-auto">
                            <h2 class="font-size-s mb-0">Galería</h2>
                            <p class="font-size-xs mb-0">Se ha/n cargado <b>{{images.length}}</b> foto/s</p>
                        </div>
                        <button href="" class="btn btn-secondary" @click.prevent="upload = !upload" :disabled="loading">{{upload ? 'Ver fotos' : 'Subir fotos'}}</button>
                    </header>

                    <section v-show="!upload">
                        <article class="area ai-c j-c pb-4" style="flex-direction:column" v-if="loading">
                            <img src="@/assets/images/loading.svg" height="65px"/>
                            <span class="font-weight-bold">Cargando imagenes...</span>
                        </article>

                        <article class="area ai-c j-c pt-4" style="flex-direction:column" v-else-if="images.length < 1">
                            <img src="@/assets/images/image-outline.svg" class="mb-2" height="45px"/>
                            <span class="font-weight-bold">No has subido ninguna imagen</span>
                        </article>

                        <section class="area gy-1 g-1" v-else>
                            <g-card :src="$resizeImage(image, 120,120,80)" v-for="(image,i) in images" :key="i" @click="deleteImage(image.split('/').pop())" :draggable="true" :route="image"/>
                        </section>
                    </section>

                    <upload-image v-show="upload" @submit="uploadFiles" :loading="loading"/>

                </section>
                <form-products @change="status = 1" @submit="updateProduct" :available-categories="categories" :loading="loading" mode txtBtn="Guardar cambios" :data="product" :status="status"/>        
            </article>
        </section>
    </section>
</template>

<script>
import {cutText} from '@/assets/js/transform';
import formProducts from '@/components/form/products';
import productView from '@/components/card/product';
import googleView from '@/components/card/google';
import uploadImage from '@/components/form/gallery.vue';
import gCard from '@/components/card/gallery';


export default {
    async asyncData({store,params}){
        let product = await store.dispatch('products/getById', params.id);
            product['categoriesIds'].length > 0 ? product['categoriesIds'] = product['categoriesIds'][0] : product['categoriesIds'] = '';
        let categories = await store.dispatch('categories/getAll', {project: 'name'});
        categories = categories.results;
        return {product,categories}
    },
    computed: {
        titleCut(){
            return cutText(this.product.name, 55)
        },
        descriptionCut(){
            return cutText(this.product.description, 180)
        }
    },
    created(){
        this.getImages();
    },
    data(){
        return{
            upload: false,
            loading: false,
            loadingCover: false,
            images: [],
            status: 0,
        }
    },
    components: {
        formProducts,
        productView,
        googleView,
        uploadImage,
        gCard
    },
    methods: {
        async updateProduct(form){
            delete form._id;
            delete form.uploadDate;
            this.loading = true;
            await this.$store.dispatch('products/updateMany', {...form, ids: this.$route.params.id})
            .then(p => this.status = 0)
            .catch(err => {alert('No se pudo actualizar'); this.status = 1});
            this.loading = false;
        },
        async getImages(){
            this.loading = true;
            const images = await this.$store.dispatch('gallery/getImagesById', {collection: 'products', id: this.$route.params.id})
                        .catch(err => alert('No se han podido cargar las imagenes'));
            this.images = images;
            this.loading = false;
        },
        async uploadFiles(form){
            this.loading = true;
            await this.$store.dispatch('gallery/uploadFiles', {collection: 'products', id: this.$route.params.id, form})
            .then(e => {
                this.upload = false;
            })
            .catch(e => alert('No se pudo subir el archivo'));
            this.loading = false;
            this.getImages();
        },
        async deleteImage(file){
            this.loading = true;
            await this.$store.dispatch('gallery/deleteImageByName', {collection: 'products', id: this.$route.params.id, name: file});
            if(typeof this.product.imageCover !== "undefined"){
                if(file == this.product.imageCover.split('/').pop()) await this.updateImageCover('');
            }
            this.loading = false;
            this.getImages();
        },

        drop(e){
            const src = e.dataTransfer.getData('src');
            this.updateImageCover(src);
        },

        async updateImageCover(src){
            this.loadingCover = true;
            await this.$store.dispatch('products/updateMany', {imageCover: src, ids: this.$route.params.id})
            .then(res => this.product.imageCover = src)
            .catch(err => {alert('Error'); console.log(err)});
            this.loadingCover = false;
        },

    }
}
</script>
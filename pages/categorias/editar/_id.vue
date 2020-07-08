<template>
    <section>
        <l-title btn="Volver a categorías" btn-link="/categorias" :mapsite="[{name: 'Categorías', to: '/categorias'}, {name: titleCut, to: `/categorias/editar/${$route.params.id}`}]">{{titleCut}}</l-title>
        <section class="area g-2">
            <article class="box-5">
                <section class="background-color-white border-radius border" @dragover.prevent @drop.prevent="dropIcon">
                    <c-category-min :loading="loadingIcon" :name="category.name" :description="category.description" :src="category.icon" @click="updateIcon('')"/>
                </section>
                <section class="background-color-white border-radius border my-2" @dragover.prevent @drop.prevent="dropImageCover">
                    <c-category :loading="loadingCover" :name="category.name" :description="category.description" :src="category.image" @click="updateImageCover('')"/>
                </section>
                <section class="background-color-white border-radius border p-3">
                    <google-view :name="category.name" :description="category.description" :url="category.url" path="categoria/"/>
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

                <form-category @change="status = 1" @submit="updateCategory" :loading="loading" mode txtBtn="Guardar cambios" :data="category" :status="status"/>

            </article>
        </section>
    </section>
</template>

<script>
import {cutText} from '@/assets/js/transform';
import cCategory from '@/components/card/category';
import cCategoryMin from '@/components/card/category-min';
import googleView from '@/components/card/google';
import uploadImage from '@/components/form/gallery.vue';
import gCard from '@/components/card/gallery';
import formCategory from '@/components/form/categories';

export default {
    async asyncData({store,params}){
        let category = await store.dispatch('categories/getById', params.id);
        return {category};
    },

    computed:{
        titleCut(){
            return cutText(this.category.name, 55)
        },
    },

    components: {
        cCategory,
        cCategoryMin,
        gCard,
        uploadImage,
        googleView,
        formCategory
    },

    data(){
        return {
            images: [],
            upload: false,
            loading: false,
            loadingCover: false,
            loadingIcon: false,
            status: 0
        }
    },

    created(){
        this.getImages();
    },
    
    methods: {
        dropIcon(e){
            const src = e.dataTransfer.getData('src');
            this.updateIcon(src);
        },
        dropImageCover(e){
            const src = e.dataTransfer.getData('src');
            this.updateImageCover(src);
        },
        async getImages(){
            this.loading = true;
            const images = await this.$store.dispatch('gallery/getImagesById', {collection: 'categories', id: this.$route.params.id})
                        .catch(err => alert('No se han podido cargar las imagenes'));
            this.images = images;
            this.loading = false;
        },
        async uploadFiles(form){
            this.loading = true;
            await this.$store.dispatch('gallery/uploadFiles', {collection: 'categories', id: this.$route.params.id, form})
            .then(e => {
                this.upload = false;
            })
            .catch(e => alert('No se pudo subir el archivo'));
            this.loading = false;
            this.getImages();
        },
        async deleteImage(file){
            this.loading = true;
            await this.$store.dispatch('gallery/deleteImageByName', {collection: 'categories', id: this.$route.params.id, name: file});
            if(typeof this.category.image !== "undefined"){
                if(file == this.category.image.split('/').pop()) await this.updateImageCover('');
            };
            if(typeof this.category.icon !== "undefined"){
                if(file == this.category.icon.split('/').pop()) await this.updateIcon('');
            }
            this.loading = false;
            this.getImages();
        },
        async updateImageCover(src){
            this.loadingCover = true;
            await this.$store.dispatch('categories/updateMany', {image: src, ids: this.$route.params.id})
            .then(res => this.category.image = src)
            .catch(err => {alert('Error'); console.log(err)});
            this.loadingCover = false;
        },
        async updateIcon(src){
            this.loadingIcon = true;
            await this.$store.dispatch('categories/updateMany', {icon: src, ids: this.$route.params.id})
            .then(res => this.category.icon = src)
            .catch(err => {alert('Error'); console.log(err)});
            this.loadingIcon = false;
        },
        async updateCategory(form){
            delete form._id;
            delete form.uploadDate;
            this.loading = true;
            await this.$store.dispatch('categories/updateMany', {...form, ids: this.$route.params.id})
            .then(() => this.status = 0)
            .catch(() => {alert('No se pudo actualizar'); this.status = 1})
            this.loading = false;
        }
    }
}
</script>
<template>
    <section>
        <article class="g-drop" v-cloak @drop.prevent="addFilesFromDrop" @dragover.prevent>
            <section class="area ai-c j-c pt-3" style="flex-direction: column !important" v-show="files.length < 1 && !loading">
                <section class="mb-1">
                    <img src="@/assets/images/file-add-outline.svg" height="45px"/>
                    <img src="@/assets/images/image-outline.svg" height="45px"/>
                </section>
                <span class="font-weight-bold">Arrastra tus fotos aquí</span>
            </section>

            <section class="area g-1 gy-1" v-show="files.length > 0 && !loading">
                <g-card :src="file.url" v-for="(file,i) in files" :key="i" @click="removeFile(file)"/>
            </section>

            <section class="area ai-c j-c pt-1" style="flex-direction: column !important" v-show="loading">
                <img src="@/assets/images/loading.svg" height="60px"/>
                <span class="font-weight-bold">Subiendo...</span>
            </section>
            
        </article>
        <form @submit.prevent="uploadFiles" class="form" v-show="!loading">
            <input type="file" class="font-size-s" ref="files" multiple @change="addFilesFromInput()"/>
            <input type="submit" class="btn btn-primary" style="width: auto" value="Subir archivos"/>
        </form>
    </section>
</template>

<script>
import gCard from '@/components/card/gallery';

export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    components: {
        gCard
    },
    data(){
        return{
            files: [],
            allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'],
            maxSice: 1000000,
            maxUploads: 15,
        }
    },
    methods: {
        async addFiles(droppedFiles) {
            if(!droppedFiles) return;
            for (let i = 0; i < [...droppedFiles].length; i++) {
                const f = [...droppedFiles][i];
                let err = '';
                if(!this.allowedTypes.includes(f.type)){
                    err = 'Archivo no permitido';
                };
                if(f.size > this.maxSice){
                    err = 'Archivo supera el 1mb permitido'
                }
                if(this.files.length >= this.maxUploads){
                    err = `Puedes subir hasta ${this.maxUploads} archivos a la vez`
                }
                if(err.length <= 0){
                    await this.readFileSync(f);
                } else{
                    alert(`${f.name}\n${err}`);
                    break;
                }
            }
            this.$refs.files.value = '';
        },
        addFilesFromDrop(e){
            let droppedFiles = e.dataTransfer.files;
            this.addFiles(droppedFiles);
        },
        addFilesFromInput(){
            const files = this.$refs.files.files;
            this.addFiles(files);
        },
        readFileSync(file){
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    file.url = event.target.result;
                    this.files.unshift(file);
                    resolve();
                }
                reader.readAsDataURL(file);
            });
        },
        removeFile(file){
            this.files = this.files.filter(f => {
                return f != file;
            });
        },
        uploadFiles(){
            let formData = new FormData();
            for (let i = 0; i < this.files.length; i++) {
                const element = this.files[i];
                formData.append('images', element);
            };
            this.files = [];
            this.$emit('submit', formData);
        }
    }
}
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/config.sass'
    .g-drop
        background-color: map-get($colors, light)
        padding: $gutter
        border-radius: $border-radius
        min-height: 150px
        margin-bottom: $gutter*2
</style>
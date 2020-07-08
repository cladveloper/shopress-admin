export const actions = {
    async uploadFiles({}, obj){
        return await this.$axios.$post(`/gallery/${obj.collection}/${obj.id}`, obj.form);
    },

    async getImagesById({}, obj){
        return await this.$axios.$get(`/gallery/${obj.collection}/${obj.id}`);
    },

    async deleteImageByName({}, obj){
        return await this.$axios.$delete(`/gallery/${obj.collection}/${obj.id}/${obj.name}`);
    }
}
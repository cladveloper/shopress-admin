export const actions = {
    async getAll({}, obj){
        return await this.$axios.$get('/products', {params: obj});
    },

    async getById({}, id){
        return await this.$axios.$get(`/products/${id}`);
    },

    async create({}, productData){
        return await this.$axios.$post('/products', productData);
    },

    async deleteMany({}, ids){
        const idsArray = ids.split(',');
        for await (let id of idsArray) {
            this.$axios.$delete(`/gallery/products/${id}`);
        };
        return await this.$axios.$delete(`/products/${ids}`);
    },

    async updateMany({}, params){
        const ids = params.ids;
        delete params.ids;
        return await this.$axios.$put(`/products/${ids}`, params);
    },
    
}
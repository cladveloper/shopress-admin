export const actions = {
    async getAll({}, obj){
        return await this.$axios.$get('/categories', {params: obj});
    },

    async create({}, categoryData){
        return await this.$axios.$post('/categories', categoryData);
    },

    async deleteMany({}, ids){
        const idsArray = ids.split(',');
        for await (let id of idsArray) {
            this.$axios.$delete(`/gallery/categories/${id}`);
        };
        return await this.$axios.$delete(`/categories/${ids}`);
    },

    async updateMany({}, params){
        const ids = params.ids;
        delete params.ids;
        return await this.$axios.$put(`/categories/${ids}`, params);
    },

    async getById({}, id){
        return await this.$axios.$get(`/categories/${id}`);
    },
}
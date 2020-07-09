export const state = () => ({
    apiURLDev: '',
    apiURLProduction: ''
});

export const mutations  = {
    setApiURLDev(state, data){
        state.apiURLDev = data;
    },

    setApiURLProduction(state, data){
        state.apiURLProduction = data;
    }
};

export const actions = {
    async nuxtServerInit ({commit}) {
        commit('setApiURLDev', process.env.API_URL_DEV);
        commit('setApiURLProduction', process.env.API_URL_PRODUCTION);
	},
}
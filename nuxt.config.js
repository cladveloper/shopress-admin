import env from 'dotenv';
env.config();

export default{
    css: ['@/assets/styles/main.sass'],
    plugins: [{
        src: '~/plugins/components.js'
    },{
        src: '~/plugins/shopress.js'
    }],
    head: {
        meta: [
            {name:"viewport", content:"width=device-width, initial-scale=1"}
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap'}
        ],
    },
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
    ],
    axios: {
        baseURL: process.env.NODE_ENV !== 'production' ? process.env.API_URL_DEV : process.env.API_URL_PRODUCTION
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/auth', method: 'post', propertyName: 'token' },
                    user: { url: '/auth', method: 'get', propertyName: 'user' }
                }
            }
        }
    },
    router: {
        middleware: ['auth']
    },
    loading: {
        color: '#16a085',
        height: '5px'
    },
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },
}
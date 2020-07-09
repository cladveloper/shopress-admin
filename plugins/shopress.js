import Vue from 'vue';
process.env;

Vue.prototype.$resizeImage = (url = "", width = 100, height = 100, quality = 80) => {
    const baseURL = process.env.NODE_ENV !== 'production' ? process.env.API_URL_DEV : process.env.API_URL_PRODUCTION;
    if(/svg/i.test(url.split('.').pop())) return url
    else return `${baseURL}/jimp/resize?url=${url}&w=${width}&h=${height}&q=${quality}`
};

Vue.prototype.$scaleImage = (url = "", width = 100, quality = 80) => {
    const baseURL = process.env.NODE_ENV !== 'production' ? process.env.API_URL_DEV : process.env.API_URL_PRODUCTION;
    if(/svg/i.test(url.split('.').pop())) return url
    else return `${baseURL}/jimp/scale?url=${url}&w=${width}&q=${quality}`
};
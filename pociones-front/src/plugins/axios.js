import Services from '@/services';
import i18n from '@/i18n';
import store from '@/store/store';
import axios from 'axios';
import Vue from 'vue';

// const baseURL = `${protocol}://${hostname}:${port}/api/`;
const baseURL = `http://localhost:9022/api/`;
const instance = axios.create({ baseURL });
instance.interceptors.request.use(function (config) {
    const token = store.state.session.token
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});
instance.interceptors.response.use((data) => data, (error) => {
    if (error.response && error.response.status === 401) {
        const url = new URL(error.config.url);
        if (url.pathname !== '/api/auth/login') {
            Vue.notify({
                title: i18n.t('session_expired.title'),
                text:  i18n.t('session_expired.text'),
                type: 'warning',
            });
        }
        store.dispatch('session/logout');
    }

    return Promise.reject(error);
});


Vue.use(Services, { axios: instance });

export default instance;

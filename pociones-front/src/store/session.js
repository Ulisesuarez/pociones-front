import i18n from '@/i18n';
import router from '@/router';
import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        locale: 'en',
        loggedIn: false,
        token: null,
        account: {},
    },
    mutations: {
        locale(state, value) {
            state.locale = value;
            Vue.cookie.set('locale', value,  { expires: '3Y' });
        },
        token(state, value) {
            state.token = value;
            Vue.cookie.set('token',value,{ expires: '3H' });
        },
        loadCookie(state) {
            state.token = Vue.cookie.get('token')
            state.locale = Vue.cookie.get('locale')
        },
        loggedIn(state, value) {
            state.loggedIn = value;
        },
        account(state, value) {
            state.account = value;
        },
    },
    actions: {
        setLocale({ commit }, value) {
            let locale = value;
            if (locale !== 'en' && locale !== 'es') {
                locale = 'en';
            }
            commit('locale', locale);
            i18n.locale = locale;
            Vue.prototype.$vuetify.lang.current = locale;
        },
        setToken({ commit }, value) {
            commit('token', value);
            Vue.prototype.$axios.defaults.headers.common.Authorization = `Bearer ${value}`;
        },
        loadCookie({ commit }){
            commit('loadCookie')
        },
        setAccount({ commit }, value) {
            commit('account', value);
        },
        login({ dispatch, commit }, crendentials) {
            dispatch('setToken', null);
            Vue.prototype.$services.auth.login(crendentials).then(response=>{
                console.log(response)
                dispatch('setToken', response.data.token);
                commit('account', response.data.account);
                commit('loggedIn', true);

                Vue.notify({
                    title: i18n.t('Welcome'),
                    type: 'primary',
                });

            }).catch (e=> {
                commit('loggedIn', false);
                console.log(e);
            })
        },
        logout({commit}) {
            commit('token', null);
            commit('account', {});
            commit('loggedIn', false);

            Vue.prototype.$services.auth.logout();
            //router.push({ name: 'home' });
        },
    },
};

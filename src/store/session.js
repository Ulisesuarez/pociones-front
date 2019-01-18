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
            Vue.cookie.locale.set(value.code);
        },
        token(state, value) {
            state.token = value;
            Vue.cookie.token.set(value);
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
            if (locale !== 'en' || locale !== 'es') {
                locale = 'en';
            }
            commit('locale', locale);
            i18n.locale = locale.code;
            Vue.prototype.$vuetify.lang.current = locale.code;
        },
        setToken({ commit }, value) {
            commit('token', value);
            Vue.axios.defaults.headers.common.Authorization = `Bearer ${value}`;
        },
        async login({ dispatch, commit }, crendentials = {username: '', password:  ''}) {
            const { username, password } = crendentials;
            if (username && password) {
                dispatch('setToken', null);
            }
            try {
                const { data } = await Vue.services.auth.login({ username, password });
                dispatch('setToken', data.token);
                commit('account', data);
                commit('loggedIn', true);

                Vue.notify({
                    title: i18n.t('notify.logged_in.title'),
                    type: 'primary',
                });
            } catch (e) {
                commit('loggedIn', false);
                throw e;
            }
        },
        async logout({commit}) {
            commit('token', null);
            commit('account', {});
            commit('loggedIn', false);

            await Vue.services.auth.logout();
            router.push({ name: 'home' });
        },
    },
};

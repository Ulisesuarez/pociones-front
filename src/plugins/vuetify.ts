import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import i18n from '@/i18n.ts';

Vue.use(Vuetify, {
  iconfont: 'md',
    lang: {
        t: (key: any, ...params: any[]) => i18n.t(key, params),
    },
});

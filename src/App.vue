<template>
  <v-app>
    <custom-header></custom-header>
      <login></login>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import CustomHeader from './components/Header';
import Login from './components/Login';

export default {
  name: 'App',
  components: {
    CustomHeader,
    Login,
  },
  data() {
    return {
      //
    };
  },
    beforeMount() {
        this.$i18n.locale = this.$cookie.get('locale') || 'en';
    },
};
</script>

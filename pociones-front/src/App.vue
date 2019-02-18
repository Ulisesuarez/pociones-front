<template>
  <v-app>
    <custom-header></custom-header>
    <v-content>
      <sidebar></sidebar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import CustomHeader from './components/Header';
import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: {
    CustomHeader,
    Sidebar,
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

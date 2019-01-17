<template>
  <v-app>
    <custom-header></custom-header>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import CustomHeader from './components/Header';

export default {
  name: 'App',
  components: {
    CustomHeader,
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

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
        this.$store.dispatch('session/loadCookie').catch((error) => {
            console.warn(error);
        });
        this.$i18n.locale = this.$cookie.get('locale') || 'en';
        this.$services.generic.get({endpoint: 'details'}).then( (response) => {
            console.log(response);
            this.$store.dispatch('session/setAccount', response.data).catch((error) => {
                console.warn(error);
            });
        }).catch((error) => {
            console.warn(error);
        });
    },
};
</script>

<style>
.avatar {
  width: 100px;
  height: 100px;
}
.m12 {
  width: 100%;
}
.m9 {
  width: 75%;
}
.m6 {
  width: 50%;
}
.m3 {
  width:25%;
}
</style>


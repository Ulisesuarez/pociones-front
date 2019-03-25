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
        this.$store.dispatch('session/loadCookie')
        this.$i18n.locale = this.$cookie.get('locale') || 'en';
        this.$services.generic.get({endpoint:'details'}).then(response=>{
            console.log(response)
            this.$store.dispatch('session/setAccount', response.data)
        }).catch(error=>{
            console.error(error)
        })
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


<template>
  <div v-if="loggedIn">
    <v-navigation-drawer
      style="float:left; position:fixed; margin-top:200px; max-width:200px;"
      :mini-variant="mini"
      v-model="drawer"
      height="320"
      mini-variant-width="70"
    >
      <v-list class="pt-0" dense style="max-width: 200px!important;">
        <v-divider></v-divider>

        <v-subheader>{{$t('Your Alchemy')}}</v-subheader>
        <v-list-tile v-for="item in items" :key="item.title" @click="goTo(item.route)">
          <v-list-tile-action>
            <v-tooltip v-if="mini" right>
              <v-icon slot="activator" color="primary" dark>{{ item.icon }}</v-icon>
              <span>{{$t(item.title)}}</span>
            </v-tooltip>
            <v-icon v-else slot="activator" color="primary" dark>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{$t(item.title)}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile style="width:200px;position: absolute;
    bottom: 81px;" @click="backTo()">
          <v-list-tile-action>
            <v-tooltip v-if="mini" right>
              <v-avatar slot="activator" style="width:22px!important; height: 22px!important">
                <img style="width: 22px!important;height:22px!important;" :src="idoniaLogo">
              </v-avatar>
              <span>{{this.$t('Back Home') }}</span>
            </v-tooltip>
            <v-avatar v-else style="width:22px!important; height: 22px!important">
              <img style="width: 22px!important;height:22px!important;" :src="idoniaLogo">
            </v-avatar>
          </v-list-tile-action>

          <v-list-tile-content v-if="!mini">
            <v-list-tile-title>{{ this.$t('Back Home') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider style="width:200px; position: absolute;
    bottom: 80px;"></v-divider>
        <v-list-tile style=" position: absolute;
    bottom: 40px;">
          <v-list-tile-action>
            <v-tooltip v-if="mini" right>
              <v-btn
                slot="activator"
                :icon="mini"
                :flat="!mini"
                :style="mini?'':'width:168px;'"
                @click.stop="mini = !mini"
              >
                <v-icon v-if="mini">arrow_right</v-icon>
                <v-icon v-else>arrow_left</v-icon>
              </v-btn>
              <span>{{this.$t('Expand') }}</span>
            </v-tooltip>
            <v-btn v-else slot="activator" flat style="width:168px;" @click.stop="mini = !mini">
              <v-icon v-if="mini">arrow_right</v-icon>
              <v-icon v-else>arrow_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider style="width:200px; position: absolute;
    bottom: 41px;"></v-divider>
      </v-list>
    </v-navigation-drawer>
  </div>
  <div v-else>
    <v-navigation-drawer
      style="float:left; position:fixed; margin-top:200px; max-width:200px;"
      :mini-variant="mini"
      v-model="drawer"
      height="150"
      mini-variant-width="70"
    >
      <v-list class="pt-0" dense style="max-width: 200px!important;">
        <v-divider></v-divider>

        <v-subheader>{{$t('Your Alchemy')}}</v-subheader>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-on @click="goTo(item.route)">
            <div v-if="item.title == 'Random'">
              <v-list-tile-action>
                <v-tooltip v-if="mini" right>
                  <v-icon slot="activator" color="primary" dark>{{ item.icon }}</v-icon>
                  <span>{{$t(item.title)}}</span>
                </v-tooltip>
                <v-icon v-else slot="activator" color="primary" dark>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{$t(item.title)}}</v-list-tile-title>
              </v-list-tile-content>
            </div>
          </v-on>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile style="width:150px;position: absolute;
    bottom: 81px;" @click="backTo()">
          <v-list-tile-action>
            <v-tooltip v-if="mini" right>
              <v-avatar slot="activator" style="width:22px!important; height: 22px!important">
                <img style="width: 22px!important;height:22px!important;" :src="idoniaLogo">
              </v-avatar>
              <span>{{this.$t('Back Home') }}</span>
            </v-tooltip>
            <v-avatar v-else style="width:22px!important; height: 22px!important">
              <img style="width: 22px!important;height:22px!important;" :src="idoniaLogo">
            </v-avatar>
          </v-list-tile-action>

          <v-list-tile-content v-if="!mini">
            <v-list-tile-title>{{ this.$t('Back Home') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider style="width:150px; position: absolute;
    bottom: 40px;"></v-divider>
        <v-list-tile style=" position: absolute;
    bottom: 40px;">
          <v-list-tile-action>
            <v-tooltip v-if="mini" right>
              <v-btn
                slot="activator"
                :icon="mini"
                :flat="!mini"
                :style="mini?'':'width:128px;'"
                @click.stop="mini = !mini"
              >
                <v-icon v-if="mini">arrow_right</v-icon>
                <v-icon v-else>arrow_left</v-icon>
              </v-btn>
              <span>{{this.$t('Expand') }}</span>
            </v-tooltip>
            <v-btn v-else slot="activator" flat style="width:128px;" @click.stop="mini = !mini">
              <v-icon v-if="mini">arrow_right</v-icon>
              <v-icon v-else>arrow_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider style="width:150px; position: absolute;
    bottom: 21px;"></v-divider>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import Login from "@/components/Login";
import Register from "@/components/Register";
import ForgottenPassword from "@/components/ForgottenPassword";
import CustomHeader from "@/components/Header";

export default {
  name: "sidebar",
  components: {
    Login,
    Register,
    CustomHeader,
    ForgottenPassword
  },
  props: {
    whitelabel: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: ""
    }
  },
  watch: {
    mini: {
      immediate: true,
      handler(val) {
        this.$root.$emit("expand", val);
      }
    },
    logo: {
      immediate: true,
      handler(val) {
        const imgWL = new Image();
        imgWL.onload = () => {
          this.idoniaLogo = imgWL.src;
        };
        imgWL.onerror = () => {
          const img = new Image();
          img.onload = () => {
            this.idoniaLogo = img.src;
          };
          img.src = val;
        };
        imgWL.src = this.whitelabel + val;
      }
    }
  },
  data() {
    return {
      showLogin: false,
      showRegister: false,
      user: {},
      loggedIn: false,
      showForgottenPassword: false,
      drawer: true,
      idoniaLogo:
        "https://www.sccpre.cat/mypng/full/102-1027121_house-logo-clip-art-home-icon-green-png.png",
      items: [
        { title: "My Recipes", icon: "assignment", route: "Recipes" },
        { title: "Potions", icon: "local_library", route: "potions", id: "5" },
        { title: "Favorites", icon: "star", route: "Favorites" },
        { title: "Random", icon: "local_bar", route: `/potion/`, id: "5" }
      ],
      mini: true,
      right: null,
      recipeIds: []
    };
  },
  beforeCreate() {
    this.$services.generic
      .get({ endpoint: `recipes` })
      .then(response => {
        response.data.forEach(recipe => {
          this.recipeIds.push(recipe.id);
        });
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    goTo(route) {
      this.mini = true;

      if (route === "/potion/") {
        route += this.recipeIds[
          Math.floor(Math.random() * this.recipeIds.length)
        ];
      }
      this.$router.push({ path: route });
      location.reload();
    },
    backTo() {
      console.log(window);
      window.location.href = "/";
    }
  },
  computed: {
    logged() {
      return (
        this.$store.state.session.token &&
        this.$store.state.session.token !== "" &&
        this.$store.state.session.token !== null &&
        typeof this.$store.state.session.token === "string" &&
        this.$store.state.session.token.length > 1
      );
    },
    accountUser() {
      return this.$store.state.session.account;
    }
  },
  watch: {
    logged(val) {
      this.loggedIn = val;
      console.log("LOGGED IN:", this.loggedIn);
    },
    accountUser: {
      deep: true,
      handler(val) {
        const keys = Object.keys(val);
        for (const key of keys) {
          this.$set(this.user, key, val[key]);
        }
        console.log("ACCOUNT:", this.user);
      }
    }
  },
  mounted() {
    this.loggedIn = this.logged;
    window.addEventListener("resize", this.refreshViewport);
    this.$root.$on("closeLogin", () => {
      this.showLogin = false;
    });
    this.$root.$on("closeRegister", () => {
      this.showRegister = false;
    });
    this.$root.$on("openForgottenPassword", () => {
      this.showForgottenPassword = true;
    });
    this.$root.$on("closeForgottenPassword", () => {
      this.showForgottenPassword = false;
    });
  }
};
</script>

<style lang="scss">
</style>

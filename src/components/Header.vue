<template>
    <div>
    <v-toolbar id="desktopToolbar" v-show="$vuetify.breakpoint.smAndUp" app>
        <v-toolbar-title class="headline text-uppercase">
            <span>{{$t('Drunken Witch')}}</span>
            <span v-if="viewport>640" class="font-weight-light">SAVAGE</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y
                attach="#desktopToolbar">
        <v-btn
           slot="activator"
           icon>
            <v-icon>translate</v-icon>
        </v-btn>
            <v-list>
                <v-list-tile
                        v-for="(item, index) in locales"
                        :key="index"
                        @click="changeLocale(item.value)"
                >
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
        <v-btn @click="showDialog('login')" v-if="!loggedIn" flat>
            {{$t('Login')}}
        </v-btn>

        <v-btn @click="showDialog('register')" v-if= "!loggedIn" flat>
            {{$t('Register')}}
        </v-btn>
        <v-menu offset-y
                attach="#desktopToolbar"
                nudge-left="100">
        <v-avatar v-if="loggedIn"
                slot="activator"
                size="36px"
                color="blue"
        >
            <img
                    v-if="user.avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    alt="Avatar"
            >
            <span style="color: #fffafa; font-weight: bold;font-size: 2em;" v-else>{{user.userName.charAt(0)}}</span>
        </v-avatar>
            <v-list>
            <v-list-tile>
                <v-list-tile-title>{{ user.userName }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content> <v-btn @click="logout()">{{$t('logout')}}</v-btn></v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-menu>

         <login v-if="showLogin"></login>
         <register v-if="showRegister"></register>
    </v-toolbar>

        <v-toolbar id="mobileToolbar" v-show="$vuetify.breakpoint.xsOnly" app>
            <v-toolbar-title class="headline text-uppercase">
                <span>{{$t('Drunken Witch')}}</span>
                <span v-if="viewport > 640" class="font-weight-light">SAVAGE</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu attach="#mobileToolbar"
                    offset-y>
                <v-btn
                        slot="activator"
                        icon>
                    <v-icon>translate</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile
                            v-for="(item, index) in locales"
                            :key="index"
                            @click="changeLocale(item.value)"
                    >
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-menu v-if= "!loggedIn"
                    max-height
                    attach="#mobileToolbar"
                    nudge-left="100"
                    offset-y>
                <v-btn  id="menuButton"
                        slot="activator"
                        icon>
                    <v-icon>menu</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-content>
            <v-btn @click="showDialog('login')"
                   flat>{{$t('Login')}}</v-btn>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
            <v-btn @click="showDialog('register')"

                   flat>{{$t('Register')}}</v-btn>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-menu v-if="loggedIn"
                    offset-y
                    attach="#mobileToolbar"
                    nudge-left="100"
            >
                <v-avatar   id="avatar"
                          slot="activator"
                          size="36px"
                          color="blue"
                >
                    <img
                            v-if="user.avatar"
                            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                            alt="Avatar"
                    >
                    <span style="color: #fffafa; font-weight: bold;font-size: 2em;" v-else>{{user.userName.charAt(0)}}</span>
                </v-avatar>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title>{{ user.userName }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content> <v-btn @click="logout()">{{$t('logout')}}</v-btn></v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
          </v-toolbar>
        <login v-if="showLogin"></login>
    </div>
</template>

<script>
import Login from '@/components/Login';
import Register from '@/components/Register';
export default {
    name: 'custom-header',
    components: {Login,
                 Register},
    data() {
        return {
            loggedIn: false,
            showLogin: false,
            showRegister: false,
            locales: [
                {name: this.$t('English'), value: 'en'},
                {name: this.$t('Spanish'), value: 'es'},
            ],
            user: { userName: 'Ulises'},
            viewport: window.innerWidth && document.documentElement.clientWidth ?
                Math.min(window.innerWidth, document.documentElement.clientWidth) :
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.getElementsByTagName('body')[0].clientWidth,
        };
    },
    mounted() {
      window.addEventListener('resize', this.refreshViewport);
      console.log(this.viewport);
      this.$root.$on('closeLogin', () => {
          console.log('hey');
          this.showLogin = false;
      });
      this.$root.$on('closeRegister', () => {
          console.log('hey');
          this.showRegister = false;
      });
    },
    beforeDestroy() {
        this.$root.$off('closeLogin');
        this.$root.$off('closeRegister');
        window.removeEventListener('resize', this.refreshViewport);
    },
    methods: {
      showDialog(dialog) {
          switch (dialog) {
              case 'login': {
                  this.showLogin = !this.showLogin;
                  this.showRegister = false;
                  break;
              }

              case 'register': {
                  this.showRegister = !this.showRegister;
                  this.showLogin = false;
                  break;
              }
          }

      },
      changeLocale(locale) {
          this.$i18n.locale = locale;
          this.$cookie.set('locale', locale, 365);
      },
        logout() {
            console.log('ToDo');
        },
        refreshViewport() {
        this.viewport = window.innerWidth && document.documentElement.clientWidth ?
            Math.min(window.innerWidth, document.documentElement.clientWidth) :
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.getElementsByTagName('body')[0].clientWidth;
        },
    },
};
</script>

<style scoped>
    #mobileToolbar .v-btn{

    }

</style>
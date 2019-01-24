<template>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>{{$t('Drunken Witch')}}</span>
            <span class="font-weight-light">SAVAGE</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
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
            Login
        </v-btn>

        <v-btn @click="showDialog('register')" v-if= "!loggedIn" flat>
            {{$t('Register')}}
        </v-btn>
        <v-menu offset-y>
        <v-avatar v-if="!loggedIn"
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
</template>

<script>
    export default {
        name: 'custom-header',
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
            };
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
        },
    };
</script>

<style scoped>

</style>
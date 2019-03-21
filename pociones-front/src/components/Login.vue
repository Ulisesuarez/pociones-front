<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="show"
      width="500"
     
    >
      <v-card>
      <v-form v-model="valid" lazy-validation>
    <v-container>
      <v-layout wrap>
        <v-flex
          xs12
           d-flex
        >
          <v-text-field
            v-model="Usuario"
            :rules="nameRulesU"
            :counter="20"
            v-bind:label="$t('Username')"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          d-flex
        >
          <v-text-field
            v-model="password"
            :rules="nameRulesP"
            :counter="20"
            :error-messages="passErrors"
            type= password
            v-bind:label="$t('Password')"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>

        <v-divider></v-divider>

        <v-card-actions>
                  <a @click="forgottenPassword"
          style="float: right; position: relative"
        >{{$t('ForgottenPassword')}}</a>
          <v-spacer></v-spacer>
          <v-btn
                  color="gray"
                  flat
                  @click="cancel"
          >
            {{$t('Close')}}
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="accept"
          >
           Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
      name: 'login',
    data() {
      return {
        valid: false,
        Usuario: '',
        loginShow: true,
        password: '',
        passErrors: [],
        nameRulesU: [ () => {
            return !!this.Usuario || this.$t('Username Required');
        }],
         nameRulesP: [ () => {
            return !!this.password || this.$t('Password Required');
        }],
      };
    },
      computed: {
          show: {
              get() {
                  return this.loginShow;
              },
              set() {
                  this.loginShow = !this.loginShow;
                  const show =  this.loginShow;
                  if (!show) {
                      this.$root.$emit('closeLogin');
                  }
                  return show;

              },
          },
      },
      methods: {
          accept() {
              this.$services.auth.login({userName: this.userName, password: this.password})
                  .then( (response) => {

                  }).catch( (error) => {
                  console.error(error);
              });
              this.$root.$emit('closeLogin');
          },
          cancel() {
              this.$root.$emit('closeLogin');
          },
          forgottenPassword() {
            this.$root.$emit('openForgottenPassword');
            this.$root.$emit('closeLogin');
          }
      },
  };
</script>

<style scoped>

</style>
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
            v-model="email"
            :rules="nameRulesU"
            :counter="20"
            v-bind:label="$t('Email')"
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
        email: '',
        loginShow: true,
        password: '',
        passErrors: [],
        nameRulesU: [
            (v) => !!v || this.$t('Username Required'),
            (v) => /.+@.+/.test(v) || this.$t('Validators.validEmail'),
        ],
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
              this.$store.dispatch('session/login', {email: this.email, password: this.password})
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
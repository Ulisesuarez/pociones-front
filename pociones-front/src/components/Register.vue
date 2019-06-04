<template>
<div class="text-xs-center">
    <v-dialog
      v-model="show"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{$t('Register')}}
        </v-card-title>

        <v-form v-model="valid">
    <v-container>
      <v-layout wrap>
        <v-flex
          xs12
          d-flex
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            v-bind:label="$t('Username')"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          d-flex
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            v-bind:label="$t('Email')"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          d-flex
        >
          <v-text-field
            v-model="emailRepeat"
            :rules="repeatEmailRules"
            v-bind:label="$t('Repeat Email')"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          d-flex
        >
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            type= password
            v-bind:label="$t('Password')"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          d-flex
        >
          <v-text-field
            v-model="repeatPassword"
            :rules="repeatPasswordRules"
            type= password
            v-bind:label="$t('Repeat password')"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="accept"
          >
            {{$t('Register')}}
          </v-btn>
          <v-btn
            color="gray"
            flat
            @click="cancel"
          >
            {{$t('Close')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    export default {
        name: 'register',
        data() {
          return {
      registerShow: true,
      valid: false,
      name: '',
      nameRules: [
        (v) => {
          return !!v || this.$t('Validators.requiredName'); },
        (v) => v.length >= 5 || this.$t('Validators.nameLength'),
      ],
      email: '',
      emailRepeat: '',
      emailRules: [
        (v) => !!v || this.$t('Validators.requiredEmail'),
        (v) => /.+@.+/.test(v) || this.$t('Validators.validEmail'),
      ],
      repeatEmailRules: [
        () => {
          return this.email === this.emailRepeat || this.$t('Validators.emailMatch');
        },
      ],
      password: '',
      repeatPassword: '',
      passwordRules: [
        (v) => !!v || this.$t('Validators.requiredPassword'),
      ],
      repeatPasswordRules: [
        () => {
          return this.password === this.repeatPassword || this.$t('Validators.passwordMatch');
        },
      ],
      };
    },
    computed: {
      show: {
        get() {
          return this.registerShow;
        },
        set() {
          this.registerShow = !this.registerShow;
          const show = this.registerShow;
          if (!show) {
            this.$root.$emit('closeRegister');
          }
          return show;
        },
      },
    },
    methods: {
          accept() {

              this.$services.auth.register({
                username: this.name,
                email: this.email,
                password: this.password,
                role: "user"});

              this.$root.$emit('closeRegister');
          },
          cancel() {
              this.$root.$emit('closeRegister');
          },
      },
    };
</script>

<style scoped>

</style>

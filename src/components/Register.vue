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
          Sign Up
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
            :counter="10"
            label="Name"
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
            label="E-mail"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          d-flex
        >
          <v-text-field
            v-model="emailRepeat"
            :rules="emailRules"
            label="Repeat E-mail"
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
            label="Password"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          d-flex
        >
          <v-text-field
            v-model="repeatPassword"
            :rules="testRulz"
            type= password
            label="Repeat password"
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
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    export default {
        name: 'register',
        data(){
          return {
      registerShow: true,    
      valid: false,
      name: '',
      nameRules: [
        v => {
          return !!v || this.$t('Register')},
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRepeat: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
        () => {
          return   this.email === this.emailRepeat || 'The emails you entered donesn\'t match';
        }
      ],
      password: '',
      repeatPassword: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ]
      }
    },
    computed: {
      testRulz(){
        let t=this.nameRules;
        t.push(this.checkEmail);
        return t;
      },
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
        }
      }
    },
    methods:{
       checkEmail() {
        if(this.email !== this.emailRepeat) {
          return 'The emails you entered donesn\'t match';
        }
      },
      checkPassword() {
        if(this.password !== this.repeatPassword) {
          return 'The passwords you entered donesn\'t match';
        }
      }
    }
    };
</script>

<style scoped>

</style>
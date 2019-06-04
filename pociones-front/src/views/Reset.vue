<template>
    <v-container class="container">
        <v-layout row justify-center>
            <v-flex xs7>
                <v-card class="card card-default">
                    <v-card-title class="title">New Password</v-card-title>
                    <v-card-text class="card-body">
                        <!-- <ul v-if="errors">
                          <li v-for="error in errors" v-bind:key="error">{{ msg }}</li>
                        </ul> -->
                        <v-form autocomplete="off" @submit.prevent="resetPassword">
                            <v-text-field
                                    v-model="email"
                                    :rules="nameRulesU"
                                    :counter="20"
                                    v-bind:label="$t('Email')"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="password"
                                    :rules="nameRulesP"
                                    :counter="20"
                                    :error-messages="passErrors"
                                    type= password
                                    v-bind:label="$t('Password')"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="passwordConfirmation"
                                    :rules="repeatPasswordRules"
                                    type= password
                                    v-bind:label="$t('Repeat password')"
                                    required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                flat
                                @click="accept"
                        >
                            {{$t('Update')}}
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
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        props: {
          token: {
              default: "",
              type: String,
          },
          email: {
              default: "",
              type: String,
          }
        },
        beforeMount(){
            theEmail = this.email;
        },
        data() {
            return {
                theEmail: "",
                password: "",
                passwordConfirmation: "",
                hasError: false
            }
        },
        methods: {
            accept() {
                this.$axios.post("/reset/password/", {
                    token: this.token,
                    email: this.theEmail,
                    password: this.password
                })
                    .then(result => {
                        // console.log(result.data);
                        this.$router.push({name: 'home'})
                    }, error => {
                        console.error(error);
                    });
            },
            cancel(){}
        }
    }
</script>

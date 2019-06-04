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
            :rules="emailRules"
            v-bind:label="$t('Email')"
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
                  color="gray"
                  flat
                  @click="accept"
          >
            {{$t('PasswordRecovery')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
      name: 'forgottenPassword',
    data() {
      return {
        valid: false,
        forgottenShow: true,
        email: '',
        emailRules: [
        (v) => !!v || this.$t('Validators.requiredEmail'),
        (v) => /.+@.+/.test(v) || this.$t('Validators.validEmail'),
      ],
      };
    },
      computed: {
          show: {
              get() {
                  return this.forgottenShow;
              },
              set() {
                  this.forgottenShow = !this.forgottenShow;
                  if (!this.forgottenShow) {
                      this.$root.$emit('closeForgottenPassword');
                  }
                  return show;
              },
          },
      },
      methods: {
          accept() {
              this.$axios.post('forgot', {email: this.email});
              this.$root.$emit('closeForgottenPassword');
          },
      },
  };
</script>

<style scoped>

</style>

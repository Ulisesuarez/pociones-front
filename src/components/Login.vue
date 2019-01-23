<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="show"
      width="500"
     
    >
      <v-card>
      <v-form v-model="valid">
    <v-container>
      <v-layout wrap>
        <v-flex
          xs12
           d-flex
        >
          <v-text-field
            v-model="Usuario"
            :rules="nameRules"
            :counter="20"
            label="Usuario"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          d-flex
        >
          <v-text-field
            v-model="Password"
            :rules="nameRules"
            :counter="20"
            type= password
            label="Contraseña"
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
      props: {
        show:{type: Boolean, default: false,},
      },
    data () {
      return {
        valid: false,
        Usuario:'',
        Password:'',
        nameRules:[],
      };
    }
  };
</script>

<style scoped>

</style>
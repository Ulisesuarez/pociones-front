<template>
  <v-container class="potion-view">
      <v-layout row wrap class="potion-container">
          <v-flex>
            <h1>{{drink.name}}</h1>
          </v-flex>
          <v-flex>
            <v-layout row wrap>
                <v-flex>
                    <img :src="drink.image"/>
                </v-flex>
                <v-flex class="potion-subview">
                    <h3>Ingredientes</h3>
                    <ul v-for="ingredient in drink.ingredients" :key="ingredient" style="list-style-type: none;">
                        <li>{{ingredient.name}}</li>
                    </ul>
                    <h3>Proceso</h3>
                    <ul v-for="step in drink.steps" :key="step">
                        <li>{{step}}</li>
                    </ul> 
                </v-flex> 
            </v-layout>  
        </v-flex>
      </v-layout>
      <br/>
      <v-layout row wrap class="potion-container">
          <v-flex xs12>
            <h3>Opiniones</h3>
          </v-flex>
          <v-flex v-for="comment in drink.comments" :key="comment" xs12>
              <v-layout row wrap class="comments">
                    <v-flex xs3>
                        <img class="avatar" :src="comment.user.avatar"/>
                        <h4>{{comment.user.userName}}</h4>
                    </v-flex>
                    <v-flex xs9 class="comment-text">
                        <div>{{comment.valoration}}</div>
                        <div>{{comment.comment}}</div>
                    </v-flex>
              </v-layout>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'potion-view',
  data() {
    return {
        drink: {},
        comments: []
        }
    },
    computed:{
        recipeId(){
            return this.$route.params.id;
        }
    },
    beforeMount() {
      this.$services.generic.get({endpoint: `recipe/${this.recipeId}`}).then(response=>{
          console.log(response.data);
          this.drink = response.data;
        }).catch(e=>{
          console.log(e);
        });
      this.$services.generic.get({endpoint: `opinionsByRecipeId/${this.recipeId}`}).then(response=>{
          console.log(response);
      }).catch(e=>{
          console.log(e);
      })  
    },
    created() {
        this.drink = {title: "Pomada",
            ingredients: ["Gin Tonic Xoriguer",
                    "Limonada",
                    "Hielo Picado",
                    "Mucho Amor"],
            steps: ["Preparar la limonada con limones exprimidos con la furia de 100 mandriles farloperos, agua del Manantial de las lágrimas de las Ninfas y azúcar extraído de la Remolacha Remolona.",
                    "A ser posible en un vaso limpio, añadir el hielo, 1/3 de Xoriguer y 2/3 de limonada.",
                    "Y ya está! Ya tenemos el elixir de San Juan en nuestras manos!"
            ],
            image: "http://www.ginxoriguer.es/wp-content/uploads/2017/03/receta-pomada-gin-xoriguer.jpg",
        };
        this.coments = [{comment: "Qué rico!!!", valoration: "5", user: {avatar: "https://www.w3schools.com/howto/img_avatar.png", userName: "Xibeca"} }]
    },
});
</script>

<style>
    img {
        margin: 3vh;
        width: 50vw;
    }
    .potion-view {
        width: 80%;
        background-color: darkgrey;
        margin: auto;
        text-align: center;
    }
    .potion-container {
        width: 80%;
        background-color: white;
        margin: auto;
        padding-top: 5vh;
        padding-bottom: 5vh;
        text-align: center;
    }
    .potion-subview {
        background-color: white;
        text-align: left;
        padding-left: 5vw;
    }
    .comments {
        background-color: white;
        text-align: left;
        border:1px black solid;
        width: 80%;
        margin: auto;
    }
</style>

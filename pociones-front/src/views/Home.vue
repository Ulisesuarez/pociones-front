<template>
<v-container>
    <v-layout>
        <v-flex xs4>
            <v-layout
                    column
                    fill-height>
                <v-flex d-flex>
                    <v-form  ref="form"
                             v-model="valid"
                             lazy-validation>
                        <v-card>
                            <v-card-title class="headline font-weight-regular blue-grey white--text">{{$t('Potions')}}</v-card-title>
                            <v-card-text>
                                <v-subheader class="pa-0">{{$t('¿What do you have for me?')}}</v-subheader>
                                <v-autocomplete
                                        v-model="selectedIngredient"
                                        :hint="$t('omit brands if possible')"
                                        :items="ingredients"
                                        item-text="name"
                                        item-value="id"
                                        :label="$t('ingredient')"
                                        persistent-hint
                                        append-outer-icon="add"
                                        :append-outer-icon-cb="debugMe"
                                        return-object
                                >
                                    <div style="margin-left: 1em;" slot="no-data">
                                        <p >{{$t('No matches found   :(')}}</p>
                                        <p >{{$t('Try again with something more generic maybe')}}</p>
                                    </div>
                                </v-autocomplete>
                                <v-spacer></v-spacer>
                                <v-select
                                        v-model="selectedCategory"
                                        :items="categories"
                                        :label="$t('Category')"
                                ></v-select>
                            </v-card-text>
                        </v-card>
                    </v-form>
                </v-flex>
                <v-spacer style="height: 2em;" class="my-2"></v-spacer>
                <v-flex d-flex>
                    <v-card style="min-height: 300px">
                        <v-card-title class="headline font-weight-regular blue-grey white--text">{{$t('List of Selected Ingredients')}}</v-card-title>
                        <v-card-text>
                            <v-list two-line>
                                <v-list-tile
                                        v-for="item in ingredientsSelected"
                                        :key="item.id"
                                        avatar
                                        @click=""
                                >
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-btn @click="deleteIngredient(item)" icon ripple>
                                            <v-icon color="grey lighten-1">clear</v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-spacer xs1></v-spacer>
        <v-flex xs6>
            <v-card style="min-height: 300px">
                <v-card-title class="headline font-weight-regular blue-grey white--text">{{$t('Recipes')}}</v-card-title>
                <v-card-text>
            <v-list three-line>
                <template v-for="(item, index) in results">
                    <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                    <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
                    <v-list-tile v-else :key="item.id" avatar @click="goToPotion(item.id)">
                        <v-list-tile-avatar>
                            <img v-if="item.image" :src="item.image" alt="potion">
                            <v-icon v-else>{{item.icon}}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title >{{ item.name}}</v-list-tile-title>
                            <v-list-tile-sub-title v-html="expandRecipe(item)"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
                </v-card-text>
                <v-pagination style="margin-left: 100px;"
                        v-model="page"
                        circle
                        :length="4"
                ></v-pagination>
            </v-card>
        </v-flex>
    </v-layout>

</v-container>
</template>

<script>
import Vue from 'vue';


export default Vue.extend({
  name: 'home',
  components: {},
    data() {
        let arr;
        arr = [];
        return {
            page: 1,
            elementsPerPage:5,
            selectedIngredient: '',
            selectedCategory:'Any',
            valid: true,
            ingredients: null,
            ingredientsSelected: arr,
            results: arr.slice(),
            categories: ['Any', 'Alcoholic', 'Alcohol Free', 'Poison', 'Love', 'Fun', 'Sleep'],
        };
    },
    beforeCreate() {
        this.$services.generic.get({endpoint:'ingredients'}).then(response=>{
            console.log(response)
            this.ingredients = response.data;
        }).catch(e=>{
            console.log(e);
        });
    },
    beforeMount() {
        this.searchAll()
        /*this.$services.generic.get({endpoint:'users'}).then(response=>{
            console.log(response)
            }).catch(e=>{
            console.log(e);
        });

          this.$services.generic.get({endpoint:'recipe/6'}).then(response=>{
              console.log(response)
          }).catch(e=>{
              console.log(e);
          });
          this.$services.generic.post("user", {
              username: "Test",
              password: "estoVieneHasheado",
              email: "test3@msn.com",
              role: "user"
        this.$services.generic.post("recipe", {
              name: 'JägerBomb',
              steps: ['Enfriar el Jägermeister',
               'Echar el Jägermeister en un vaso de chupitos',
               'Echar media lata de Red Bull en un vaso grande'],
              image: 'http://hielosmairena.com/wp-content/uploads/2018/10/whisky-con-hielo-1200x600.jpg',
              tag: 'Alcoholic',
              ingredients:[23,22,2]
          }
          ).then(response=>{
              console.log(response)
          }).catch(e=>{
              console.log(e);
          })

          })
        */
      /*this.results.push({ icon: 'local_bar', title: 'Recipe to try', subtitle:
              '<span class=\'text--primary\'>Britta Holt</span> &mdash; ' +
              'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' });*/
    },
    watch: {
      page(val) {
          if (typeof this.ingredientsSelected !== 'undefined' && this.ingredientsSelected.length > 0 ) {
              this.searchPotion();
          } else {
              this.searchAll();
          }
      },
      ingredientsSelected:{
          deep: true,
          handler: function(val) {
              if (typeof val !== 'undefined' && val.length > 0 ){
                  this.searchPotion();
              } else {
                  this.searchAll();
              }
          },
      },
      selectedCategory(){
          if (typeof this.ingredientsSelected !== 'undefined' && this.ingredientsSelected.length > 0 ) {
              this.searchPotion();
          } else {
              this.searchAll();
              // TODO cambiar a search by tag
          }
      }
    },
  methods: {
      searchAll() {
          this.$services.generic.post('recipes',
              {
                  offset: (this.page - 1) * this.elementsPerPage,
                  limit: (this.page) * this.elementsPerPage,}).then(response=>{
              console.log(response);
              this.results = response.data;
          }).catch(e=>{
              console.log(e);
          });
      },
      searchPotion() {
          this.$services.generic.post('recipes/search',{
                  ingredients: this.ingredientsSelected.map((a)=>a.id),
                  category: this.selectedCategory,
                  order: 'created_at',
                  offset: (this.page - 1) * this.elementsPerPage,
                  limit: (this.page) * this.elementsPerPage,
              }).then((response) =>{
                  this.results = response.data;
          } );
      },
      debugMe() {
          if (!this.ingredientsSelected.includes(this.selectedIngredient)) {
              this.$set(this.ingredientsSelected, this.ingredientsSelected.length , this.selectedIngredient);
          }
          console.log(this.selectedIngredient);
      },
      submit() {
          console.log('submit');
      },
      clear() {
          console.log('clear');
      },
      deleteIngredient(ingredient) {
          console.log(ingredient);
          console.log(this.ingredientsSelected.findIndex((item) => item === ingredient));
          this.$delete(this.ingredientsSelected, this.ingredientsSelected.findIndex((item) => item === ingredient));
      },
      expandRecipe(item) {
          let description = '';
          if (item.ingredients){
              description = this.$t('Ingredients: ') + item.ingredients.map((a)=>a.name).join(', ');
          }
          if (item.steps){
              description = description + '<br> '  + this.$t('Steps: ') +
                  item.steps.join(', ').substring(0,150) + '...';
          }
          return description;
      },
      goToPotion(potionId) {
          this.$router.push(`potion/${potionId}`)
      }
    },
});
</script>

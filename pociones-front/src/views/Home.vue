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
                                        :label="$t('ingredient')"
                                        persistent-hint
                                        append-outer-icon="add"
                                        :append-outer-icon-cb="debugMe"
                                >
                                    <div style="margin-left: 1em;" slot="no-data">
                                        <p >{{$t('No matches found   :(')}}</p>
                                        <p >{{$t('Try again with something more generic maybe')}}</p>
                                    </div>
                                </v-autocomplete>
                                <v-spacer></v-spacer>
                                <v-select
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
                                        :key="item"
                                        avatar
                                        @click=""
                                >
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item }}</v-list-tile-title>
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
                <template v-for="(item, index) in results.slice(0, 6)">
                    <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                    <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
                    <v-list-tile v-else :key="item.title" avatar @click="">
                        <v-list-tile-avatar>
                            <img v-if="item.avatar" :src="item.avatar">
                            <v-icon v-else>{{item.icon}}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
                </v-card-text>
                <v-pagination style="margin-left: 100px;"
                        v-model="page"
                        circle
                        :length="6"
                ></v-pagination>
            </v-card>
        </v-flex>
    </v-layout>

</v-container>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  name: 'home',
  components: {},
    data() {
        let arr: any[];
        arr = [];
        return {
            page: 1,
            selectedIngredient: '',
            valid: true,
            ingredients: ['limonada', 'refresco cola', 'ron'],
            ingredientsSelected: arr,
            results: arr.slice(),
            categories: ['Any', 'Alcoholic', 'Alcohol Free', 'Poison', 'Love', 'Fun', 'Sleep'],
        };
    },
    beforeMount() {

      this.results.push({ icon: 'local_bar', title: 'Recipe to try', subtitle:
              '<span class=\'text--primary\'>Britta Holt</span> &mdash; ' +
              'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' });
    },
    watch: {
      page(val) {
          this.results = this.$services.search({ingredients: this.ingredientsSelected, page:val, order:"created_at"})
      },
    },
  methods: {
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
      deleteIngredient(ingredient: any) {
          console.log(ingredient);
          console.log(this.ingredientsSelected.findIndex((item) => item === ingredient));
          this.$delete(this.ingredientsSelected, this.ingredientsSelected.findIndex((item) => item === ingredient));
      },
    },
});
</script>

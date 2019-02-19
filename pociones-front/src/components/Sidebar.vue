<template>
  <v-navigation-drawer
   style="float:left; position:fixed; margin-top:200px; max-width:200px;"
      :mini-variant="mini"
      v-model="drawer"
      height="320"
      mini-variant-width="70"
     
     

  >
   <v-list class="pt-0" dense style="max-width: 200px!important;">
      <v-divider></v-divider>
     <v-subheader style="margin-left:23%">{{$t('Your Alchemy')}}</v-subheader>
      <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="goTo(item.route)"
      >
        <v-list-tile-action>
          <v-tooltip v-if="mini" right>
            <v-icon
                slot="activator"
                color="primary"
                dark>{{ item.icon }}</v-icon>
            <span>{{$t(item.title)}}</span>
          </v-tooltip>
          <v-icon v-else
              slot="activator"
              color="primary"
              dark>{{ item.icon }}</v-icon>

        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{$t(item.title)}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
     <v-divider></v-divider>
     <v-list-tile style="width:200px;position: absolute;
    bottom: 81px;"
         @click="backTo()"
     >
       <v-list-tile-action>
         <v-tooltip v-if="mini" right>
           <v-avatar
               slot="activator" style="width:22px!important; height: 22px!important">
             <img style="width: 22px!important;height:22px!important;"
                  :src="idoniaLogo"
             >
           </v-avatar>
           <span>{{this.$t('Back to Idonia') }}</span>
         </v-tooltip>
         <v-avatar v-else style="width:22px!important; height: 22px!important">
           <img style="width: 22px!important;height:22px!important;"
               :src="idoniaLogo"
           >
         </v-avatar>
       </v-list-tile-action>

       <v-list-tile-content v-if="!mini">
         <v-list-tile-title>{{ this.$t('Back Home') }}</v-list-tile-title>
         </v-list-tile-content>

     </v-list-tile>
     <v-divider style="width:200px; position: absolute;
    bottom: 80px;"></v-divider>
     <v-list-tile style=" position: absolute;
    bottom: 40px;">
     <v-list-tile-action >
       <v-tooltip v-if="mini" right>
       <v-btn
           slot="activator"
           :icon="mini"
           :flat="!mini"
           :style="mini?'':'width:168px;'"
           @click.stop="mini = !mini"
       >
         <v-icon v-if="mini">arrow_right</v-icon>
         <v-icon v-else>arrow_left</v-icon>
       </v-btn>
         <span>{{this.$t('Expand') }}</span>
       </v-tooltip>
       <v-btn v-else
           slot="activator"
           flat
           style="width:168px;"
           @click.stop="mini = !mini"
       >
         <v-icon v-if="mini">arrow_right</v-icon>
         <v-icon v-else>arrow_left</v-icon>
       </v-btn>
     </v-list-tile-action>

   </v-list-tile>
     <v-divider style="width:200px; position: absolute;
    bottom: 41px;"></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
      name: 'sidebar',
    props: {
      whitelabel: {
        type: String,
        default: ''
      },
      logo: {
        type: String,
        default: ''
      }
    },
    watch: {
      mini: {
        immediate: true,
        handler (val) {
          this.$root.$emit('expand', val)
        }
      },
      logo: {
        immediate: true,
        handler (val) {
          let imgWL = new Image()
          imgWL.onload = () => {
            this.idoniaLogo = imgWL.src
          }
          imgWL.onerror = () => {
            let img = new Image()
            img.onload = () => {
              this.idoniaLogo = img.src
            }
            img.src = val
          }
          imgWL.src = this.whitelabel + val
        }
      }
    },
    data () {
      return {
        drawer: true,
        idoniaLogo: "https://png.pngtree.com/svg/20160717/ico_home_on_53815.png",
        items: [
          { title: 'My Recipes', icon: 'assignment', route: 'Recipes' },
          { title: 'Favorites', icon: 'star', route: 'Favorites' },
          { title: 'Recent', icon: 'library_books', route: 'Recent' },
          { title: 'Random', icon: 'local_bar', route: 'Random' }
        ],
        mini: true,
        right: null
      }
    },
    methods: {
      goTo (route) {
        this.mini = true
        this.$router.push({ name: route })
      },
      backTo () {
        // window.location.href=window.location.hostname + '/myspace"
        console.log(window)
        window.location.href = 'http://0.0.0.0:8080/myspace'
      }
    }
  }
</script>

<style lang="scss">

</style>
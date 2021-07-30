<template>
  <div id="app">
    <v-app>
      <v-app-bar
          app
          color="primary"
          dark
      >
        <v-toolbar-title><img src="../public/percy.png" style=" width:36px;vertical-align:middle" alt=""> Percy</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data: function(){
    return{

    }
  },
};
</script>

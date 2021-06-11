<template>
  <div id="app">
    <v-app>
      <v-app-bar
          app
          color="primary"
          dark
          elevate-on-scroll
      >
        <v-toolbar-title>Chatbot</v-toolbar-title>
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

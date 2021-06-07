<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      elevate-on-scroll
    >
        <v-toolbar-title>Collapsing Bar</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <BotUi/>
        <v-sheet
            id="scrolling-techniques-7"
            class="overflow-y-auto"
            max-height="600"
        >
          <v-container style="height: 1500px;">
          </v-container>
        </v-sheet>
      </v-container>
    </v-main>
    <v-footer app>
      <!-- -->
      <h1>hello </h1>
    </v-footer>
  </v-app>
</template>

<script>
import BotUi from './components/BotUi';

export default {
  name: 'App',

  components: {
    BotUi,
  },

  data: () => ({
    //
  }),
};
</script>

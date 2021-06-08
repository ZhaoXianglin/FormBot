<template>
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
    <v-main>
      <v-container fluid>
        <BotUi/>
      </v-container>
    </v-main>
    <v-footer app color="white" padless>
      <v-row no-gutters>
        <v-col cols="9" sm="10" lg="11">
          <v-textarea
              label="Write here"
              auto-grow
              outlined
              rows="1"
              :disabled="dialogStatus"
              v-model="userMessage"
          ></v-textarea>
        </v-col>
        <v-col cols="3" sm="2" lg="1" class="d-flex align-start">
          <v-btn style="height:56px;bottom:0;" block  color="info" :disabled="dialogStatus" @click="msgsend">
            SEND
            <v-icon
                dark
                right
            >
              mdi-send
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>

    </v-footer>
  </v-app>
</template>

<script>
import BotUi from "./components/BotUi";
// 对象引入
import { botui } from './components/BotUi';
export default {
  name: 'App',
  components: {
    BotUi,
  },
  data: () => ({
    userMessage: '',
    dialogStatus:true,
    msgStep:0,
  }),
  mounted: function(){
    this.chatstart();
},
  methods: {
    chatstart:function(){
      botui.message.bot({
        loading: true,
        delay: 600,
        content: "Hello there! I am your mood assistant.😄"
      }).then(()=>{
        botui.message.bot({
          loading: true,
          delay: 500,
          content: "Please first introduce yourself in two to three sentences. ",
        });
        this.dialogStatus = false;
        this.msgStep += 1;
      });
      },
    msgsend:function(){
      botui.message.human({
        content: this.userMessage,
      });
      this.userMessage = '';
      switch (this.msgStep){
        case 1:
          //继续下一步，心情选择
          this.moodselect();
      }
    },
    moodselect:function(){
      botui.message.bot({
        content: "how are you feeling?"
      }).then(()=>function(){
        botui.action.button({
          action: [
            { // show only one button
              text: 'One',
              value: 'one'
            }
          ]
        });
      })
    }
  }
};
</script>

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
        <v-row justify="center">
          <v-dialog
              v-model="ucla20dialog"
              persistent
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">State Test</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" v-for="(q,index) in ucla20questions" :key="index">
                      <span>{{ q }}</span>
                      <v-radio-group row>
                        <v-radio
                            label="Never"
                            value="Never"
                        ></v-radio>
                        <v-radio
                            label="Rarely"
                            value="Rarely"
                        ></v-radio>
                        <v-radio
                            label="Sometimes"
                            value="Sometimes"
                        ></v-radio>
                        <v-radio
                            label="Always"
                            value="Always"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="ucla20dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="openended"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
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
              :disabled="msgStatus"
              v-model="userMessage"
          ></v-textarea>
        </v-col>
        <v-col cols="3" sm="2" lg="1" class="d-flex align-start">
          <v-btn style="height:56px;bottom:0;" block  color="info" :disabled=msgStatus @click="msgsend">
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
    ucla20dialog: false,
    userMessage: '',
    msgStatus:true,
    msgStep:0,
    ucla20step:0,
    ucla20questions:[
      '1. How often do you feel that you are “in tune” with the people around you?',
      '2. How often do you feel that you lack companionship?',
      '3. How often do you feel that there is no one you can turn to?',
      '4. How often do you feel alone?',
      '5. How often do you feel part of a group of friend?',
      '6. How often do you feel that you have a lot in common with the people around you?',
      '7. How often do you feel that you are no longer close to anyone?',
      '8. How often do you feel that your interests and ideas are not shared by those around you?',
      '9. How often do you feel outgoing and friendly?',
      '10. How often do you feel close to people?',
      '11. How often do you feel left out?',
      '12. How often do you feel that your relationships with others are not meaningful?',
      '13. How often do you feel that no one really knows you well?',
      '14. How often do you feel isolated from others?',
      '15. How often do you feel you can find companionship when you want it?',
      '16. How often do you feel that there are people who really understand you?',
      '17. How often do you feel shy?',
      '18. How often do you feel that people are around you but not with you?',
      '19. How often do you feel that there are people you can talk to?',
      '20. How often do you feel that there are people you can turn to?'
    ],
    opdquestions:[
      '1. In general, how would you describe your mood?',
      '2. Could you tell me about any times over the past few months that you’ve been bothered by low feelings [stress, or loneliness]',
      '3. Could you let me know what happened to make you feel this way?',
      '4. Can you tell me a little bit about any contact you have with friends or family right now?',
      '5.Do you consider loneliness to be an issue for you/someone like you?',
      '6. What do you think could be the main factors that contribute to loneliness?',
      '7. What would it take for you to feel happier or more at peace?',
      '8.Think of something, great or small (e.g., food we eat or the place we live in), that you feel happy and grateful for and describe it in a few words.',
      '9. Is there anything else that you would like to add?',
    ],
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
        this.msgStatus = false;
      });
      },
    msgsend:function(){
      botui.message.human({
        content: this.userMessage,
      });
      this.userMessage = '';
      this.msgStatus = true;
      if(this.msgStep === 0){
          //继续下一步，心情选择
          this.moodselect();
      }else if(this.msgStep>0 && this.msgStep<10){
        this.openended();
      }

    },
    moodselect:function() {
      botui.message.bot({
        loading: true,
        delay: 600,
        content: "how are you feeling?"
      }).then(()=>{
        botui.action.button({
          action: [
            {
              text: '😱 - Anxious',
              value: 'Anxious'
            },
            {
              text: '🤒 - Sick',
              value: 'Sick'
            },
            {
              text: '😡 - Angry',
              value: 'Angry'
            },
            {
              text: '😊 - Happy',
              value: 'Happy'
            },
            {
              text: '😀 - Really Happy',
              value: 'Really Happy'
            },
            {
              text: '😐 - Okey',
              value: 'Okey'
            },
            {
              text: '😴 - Tired',
              value: 'Tired'
            },
            {
              text: '☹️ - Sad',
              value: 'Sad'
            },
            {
              text: '😔 - Depressed',
              value: 'Depressed'
            },
            {
              text: '😌️ - Content',
              value: 'Content'
            },
            {
              text: '🙄 - Indifferent',
              value: 'Indifferent'
            },
            {
              text: '😅 - Relieved',
              value: 'Relieved'
            },
            {
              text: '🤔 - Curious',
              value: 'Curious'
            },
            {
              text: '😵 - Shocked',
              value: 'Shocked'
            },
            {
              text: '😭 - Upset',
              value: 'Upset'
            },
            {
              text: '😶 - Neutral',
              value: 'Neutral'
            },
            {
              text: '😂 - Very happy',
              value: 'Very happy'
            },
            {
              text: '😰 - Distressed',
              value: 'Distressed'
            },
          ]
        }).then((res)=>{
          console.log(res);
          this.askloneliness();
        });
      });
    },
    askloneliness:function(){
      botui.message.bot(
          {
            delay: 600,
            loading: true,
            content: 'Let\'s take a test to learn more about your recent state of mind',
          }
      ).then(()=>{
        this.ucla20();
      });
    },
    ucla20:function(){
      var data = this;
      botui.message.bot({
        loading: true,
        delay:600,
        content:this.ucla20questions[this.ucla20step],
      }).then(function(){
        botui.action.button({
          action: [
            {
              text: 'Never',
              value: 'Never'
            },
            {
              text: 'Rarely',
              value: 'Rarely'
            },
            {
              text: 'Sometimes',
              value: 'Sometimes'
            },
            {
              text: 'Always',
              value: 'Always'
            },
            ]
        }).then((res)=>{
          console.log(res);
          data.ucla20step++;
          if (data.ucla20step < 20){
            data.ucla20();
          }else {
            botui.message.bot({
              loading: true,
              delay:600,
              content:'Thank you for answering all the questions!'
            });
            console.log("finished");
            data.ucla20step = 0;
            data.ucla20form();
            }
        })
      })
    },
    ucla20form:function(){
      this.ucla20dialog = true;
    },
    openended:function(){
      this.ucla20dialog = false;
      this.msgStatus = true;
      botui.message.bot({
        loading: true,
        delay: 600,
        content: this.opdquestions[this.msgStep]
      }).then(()=>{
        this.msgStatus = false;
        this.msgStep += 1;
      });
    }
  }
};
</script>

<template>
  <div>
    <v-main>
      <v-container fluid>
        <BotUi/>
        <v-row justify="center">
          <v-dialog
              v-model="ucladialog"
              persistent
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">Loneliness Scale</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                      <v-col cols="12" v-for="(q,index) in uclaselectquestions" :key="index">
                        <span>{{ index + 1 }}.{{ q }}</span>
                        <v-radio-group
                            column
                            required
                            :rules="[v => !!v || 'Item is required']"
                        >
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
                    </v-form>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
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
        <v-bottom-sheet
            v-model="scoresheet"
        >
          <v-sheet width="auto">
            <v-card
                elevation="2"
            >
            <v-card-title>Loneliness Score:</v-card-title>
              <ve-gauge :data="chartData" :settings="chartSettings" :width="screenWidth"></ve-gauge>
              <v-card-actions>
                <v-btn
                    class="mt-6"
                    color="error"
                    block
                    @click="scoresheet = !scoresheet"
                >
                  close
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-sheet>
        </v-bottom-sheet>
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
          <v-btn style="height:56px;bottom:0;" block color="info" :disabled=msgStatus @click="msgsend">
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
  </div>
</template>

<script>
import BotUi from "../components/BotUi";
// 对象引入
import {botui} from '../components/BotUi';

export default {
  name: 'Chatbot',
  components: {
    BotUi,
  },
  data: function () {
    return {
      //屏幕宽度
      screenWidth: document.body.clientWidth+'px',
      chartSettings:{
        dataName: {'score': 'Points'},
        labelMap: {'score': 'score'},
        seriesMap:{'score':{min:0,max:80}},
      },
      chartData: {
        columns: ['type','value'],
        rows: [
          {type: 'score', value: 0}
        ]
      },
      // ucla结果 跳出的窗口
      scoresheet: false,
      //ucla表单验证
      valid: true,
      //ucla量表有多少项，默认20项
      items: 20,
      //使用的表单模式，1是chatbot，2是form
      formtype: 1,
      //控制ucla测试的对话框显示
      ucladialog: false,
      //用户输入框内容
      userMessage: '',
      //输入框状态
      msgStatus: true,
      msgStep: 0,
      //回答了第几个问题
      uclastep: 0,
      ucla20questions: [
        'How often do you feel that you are “in tune” with the people around you?',
        'How often do you feel that you lack companionship?',
        'How often do you feel that there is no one you can turn to?',
        'How often do you feel alone?',
        'How often do you feel part of a group of friend?',
        'How often do you feel that you have a lot in common with the people around you?',
        'How often do you feel that you are no longer close to anyone?',
        'How often do you feel that your interests and ideas are not shared by those around you?',
        'How often do you feel outgoing and friendly?',
        'How often do you feel close to people?',
        'How often do you feel left out?',
        'How often do you feel that your relationships with others are not meaningful?',
        'How often do you feel that no one really knows you well?',
        'How often do you feel isolated from others?',
        'How often do you feel you can find companionship when you want it?',
        'How often do you feel that there are people who really understand you?',
        'How often do you feel shy?',
        'How often do you feel that people are around you but not with you?',
        'How often do you feel that there are people you can talk to?',
        'How often do you feel that there are people you can turn to?'
      ],
      //表单中用到的问题
      uclaselectquestions: [],
      //ucla3中的用到的问题序号
      ucla3array: [1, 10, 13],
      //ucla10中的用到的问题序号
      ucla10array: [1, 5, 9, 10, 12, 13, 15, 17, 18, 19],
      //反向设计的问题
      uclareversearr: [0, 4, 5, 8, 9, 14, 15, 18, 19],
      //ucla 得分
      uclascore: 0,
      opdquestions: [
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
    }
  },
  created: function () {
    switch (this.$route.params.type) {
      case'1':
        this.items = 3;
        this.formtype = 1;
        for (let i = 0; i < this.ucla3array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla3array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min:3,max:12,splitNumber:9};
        break;
      case'2':
        this.items = 3;
        this.formtype = 2;
        for (let i = 0; i < this.ucla3array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla3array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min:3,max:12,splitNumber:9};
        break;
      case'3':
        this.items = 10;
        this.formtype = 1;
        for (let i = 0; i < this.ucla10array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla10array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min:10,max:40,splitNumber:6};
        break;
      case'4':
        this.items = 10;
        this.formtype = 2;
        for (let i = 0; i < this.ucla10array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla10array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min:10,max:40,splitNumber:6};
        break;
      case'5':
        this.items = 20;
        this.formtype = 1;
        this.uclaselectquestions = this.ucla20questions;
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min:20,max:80,splitNumber:6};
        break;
      case'6':
        this.items = 20;
        this.formtype = 2;
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min:20,max:80,splitNumber:6};
        this.uclaselectquestions = this.ucla20questions;
        break;
      default:
        this.items = 20;
        this.formtype = 1;
        break;
    }
  },
  mounted: function () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth+'px'
      })()
    }
    this.chatstart();
  },
  methods: {
    chatstart: function () {
      botui.message.bot({
        loading: true,
        delay: 600,
        content: "Hello there! I am your mood assistant.😄"
      }).then(() => {
        botui.message.bot({
          loading: true,
          delay: 500,
          content: "Please first introduce yourself in two to three sentences." + this.items,
        });
        this.msgStatus = false;
      });
    },
    msgsend: function () {
      botui.message.human({
        content: this.userMessage,
      });
      this.userMessage = '';
      this.msgStatus = true;
      if (this.msgStep === 0) {
        //继续下一步，心情选择
        this.moodselect();
      } else if (this.msgStep > 0 && this.msgStep < 10) {
        this.openended();
      }

    },
    moodselect: function () {
      botui.message.bot({
        loading: true,
        delay: 600,
        content: "how are you feeling?"
      }).then(() => {
        botui.action.button({
          action: [
            {
              text: '😀 Excited',
              value: 'Excited'
            },
            {
              text: '😊 Happy',
              value: 'Happy'
            },
            {
              text: '☺️ ️Relaxed',
              value: 'Relaxed'
            },
            {
              text: '😌️ Calm',
              value: 'Calm'
            },
            {
              text: '☹️  Sad',
              value: 'Sad'
            },
            {
              text: '😔  Depressed',
              value: 'Depressed'
            },
            {
              text: '😭  Upset',
              value: 'Upset'
            },
            {
              text: '😨  Nervous',
              value: 'Nervous'
            },
          ]
        }).then((res) => {
          console.log(res);
          this.askloneliness();
        });
      });
    },
    askloneliness: function () {
      botui.message.bot(
          {
            delay: 600,
            loading: true,
            content: 'Let\'s take a test to learn more about your recent state of mind',
          }
      ).then(() => {
        botui.message.bot(
            {
              delay: 600,
              loading: true,
              content: 'I will ask you ' + this.items + ' questions next, I hope you can answer truthfully',
            }
        ).then(() => {
          switch (this.formtype) {
            case 1:
              this.uclachat();
              break;
            case 2:
              this.uclaform();
              break;
            default:
              this.uclachat();
              break;
          }
        })
      });
    },
    uclachat: function () {
      //items有三个值（3，10，20)
      var data = this;
      botui.message.bot({
        loading: true,
        delay: 600,
        content: (data.uclastep + 1) + '. ' + data.uclaselectquestions[data.uclastep],
      }).then(function () {
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
        }).then((res) => {
          data.getscore(res.text);
          console.log(data.uclascore);
          data.uclastep++;
          if (data.uclastep < data.items) {
            data.uclachat();
          } else {
            botui.message.bot({
              loading: true,
              delay: 600,
              content: 'Thank you for answering all the questions!'
            }).then(()=>{
              data.scoresheet = true;
              data.chartData.rows=[{type: 'score', value: data.uclascore}]
            });
            console.log("finished");
            data.uclastep = 0;
          }
        })
      })
    },
    uclaform: function () {
      //items有三个值（3，10，20)
      this.ucladialog = true;
    },
    getscore: function (item) {
      const itemscore = {'Never': 1, 'Rarely': 2, 'Sometimes': 3, 'Always': 4};
      const itemrscore = {'Never': 4, 'Rarely': 3, 'Sometimes': 2, 'Always': 1};
      console.log(item)
      switch (this.items) {
        case 3:
          if (this.uclareversearr.includes(this.ucla3array[this.uclastep])) {
            this.uclascore += itemrscore[item]
            console.log(itemrscore[item])
          } else {
            this.uclascore += itemscore[item]
            console.log(itemscore[item])
          }
          break;
        case 10:
          if (this.uclareversearr.includes(this.ucla10array[this.uclastep])) {
            this.uclascore += itemrscore[item]
            console.log(itemrscore[item])
          } else {
            this.uclascore += itemscore[item]
            console.log(itemscore[item])
          }
          break;
        case 20:
          if (this.uclareversearr.includes(this.uclastep)) {
            this.uclascore += itemrscore[item]
            console.log(itemrscore[item])
          } else {
            this.uclascore += itemscore[item]
            console.log(itemscore[item])
          }
          break;
      }
    },
    openended: function () {
      this.$refs.form.validate();
      console.log(this.$refs.form.validate());
      // this.ucladialog = false;
      // this.msgStatus = true;
      // botui.message.bot({
      //   loading: true,
      //   delay: 600,
      //   content: this.opdquestions[this.msgStep]
      // }).then(() => {
      //   this.msgStatus = false;
      //   this.msgStep += 1;
      // });
    }
  }
}
</script>

<style scoped>

</style>

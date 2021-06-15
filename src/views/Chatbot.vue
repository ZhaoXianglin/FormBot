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
                            v-model="ucla20ans[index]"
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
                    @click="subucla"
                >
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
              v-model="cookiedialog"
              persistent
          >
            <v-card>
              <v-card-title>Error</v-card-title>
              <v-card-text>
                Please read the "Consent Statement" first!
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="goindex"
                >
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
              v-model="surveydialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar
                  dark
                  color="primary"
              >
                <v-toolbar-title>Survey</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-form ref="personalinfo">
                <v-container>
                  <p></p>
                  <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                      <p>Please indicate your age range.</p>
                    </v-col>
                    <v-col
                        class="d-flex"
                        cols="12"
                    >
                      <v-select
                          v-model="age"
                          :items="agesitems"
                          filled
                          label="Age range"
                          required
                          :rules="[v => !!v || 'Item is required']"
                      ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                    >
                      <p>Please indicate your gender.</p>
                      <v-radio-group v-model="gender"
                                     required
                                     :rules="[v => !!v || 'Item is required']"
                      >
                        <v-radio
                            label="Female"
                            value="Female"
                        ></v-radio>
                        <v-radio
                            label="Male"
                            value="Male"
                        ></v-radio>
                        <v-radio
                            label="Other"
                            value="Other"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col col="12">
                      <p>I see myself as someone who …</p>
                      <ul>
                        <li>(1) Disagree strongly</li>
                        <li>(2) Disagree a little</li>
                        <li>(3) Neither agree nor disagree</li>
                        <li>(4) Disagree strongly</li>
                        <li>(5) Disagree strongly</li>
                      </ul>
                    </v-col>
                    <v-col cols="12" v-for="(q,index) in personalq" :key="index">
                      <p>{{ index + 1 }}.{{ q }}. - <span
                          class="font-weight-bold">{{ ticksLabels[personality[index]] }} </span></p>
                      <v-slider
                          thumb-size="20"
                          thumb-label="always"
                          max="4"
                          step="1"
                          ticks="always"
                          tick-size="4"
                          v-model="personality[index]"
                      >
                        <template v-slot:thumb-label="{ value }">
                          ({{ value + 1 }})
                        </template>
                      </v-slider>
                    </v-col>
                    <v-col col="12">
                      <v-btn class="mb-6" block
                             color="error"
                             elevation="2"
                             @click="subuserinfo"
                      >
                        Submit
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-container>
              </v-form>
            </v-card>
          </v-dialog>
        </v-row>

        <v-bottom-sheet
            v-model="scoresheet"
            persistent
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
                    @click="closescore"
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
import {instance} from '../network/request';

export default {
  name: 'Chatbot',
  components: {
    BotUi,
  },
  data: function () {
    return {
      //用户信息
      age: '',
      agesitems: ['< 25 years old', '25-30 years old', '30-35 years old', '35-40 years old', '40-45 years old', '> 45 years old'],
      gender: '',
      personality: ['', '', '', '', '', '', '', '', '', ''],
      ticksLabels: ['Disagree strongly', 'Disagree a little', 'Neither agree nor disagree', 'Agree a little', 'Agree strongly'],
      personalq: ['…is reserved', '…is generally trusting', '…tends to be lazy', '…is relaxed, handles stress well',
        '…has few artistic interests', '…is outgoing, sociable', '…tends to find fault with others',
        '…does a thorough job', '…gets nervous easily', '…has an active imagination'],
      //采集用户信息dialog
      surveydialog: false,
      //是否设置cookie的弹出框
      cookiedialog: false,
      //屏幕宽度
      screenWidth: document.body.clientWidth + 'px',
      chartSettings: {
        dataName: {'score': 'Points'},
        labelMap: {'score': 'score'},
        seriesMap: {'score': {min: 0, max: 80}},
      },
      chartData: {
        columns: ['type', 'value'],
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
      //表单回答的结果
      ucla20ans:['','','','','','','','','','','','','','','','','','','',''],
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
        '5. Do you consider loneliness to be an issue for you/someone like you?',
        '6. What do you think could be the main factors that contribute to loneliness?',
        '7. What would it take for you to feel happier or more at peace?',
        '8.Think of something, great or small (e.g., food we eat or the place we live in), that you feel happy and grateful for and describe it in a few words.',
        '9. Is there anything else that you would like to add?',
        '10. Do you ever find yourself listening to music to try to influence your mood one way or another? ',
        '11. What do you think of playing music for you when you feel lonely?',
        '12. What kind of music do you prefer to listen to when you feel lonely?',
        '13. Would you find it annoying to listen to something upbeat when you are feeling low?',
        '14. What do you think if I play some songs that you are familiar with when you feel lonely?',
        '15. What do you think if I play some songs that you are unfamiliar with when you feel lonely?',
        '16. What do you think of communicating with people who have similar music tastes to you online when you feel lonely?'
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
        this.chartSettings.seriesMap.score = {min: 3, max: 12, splitNumber: 9};
        break;
      case'2':
        this.items = 3;
        this.formtype = 2;
        for (let i = 0; i < this.ucla3array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla3array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min: 3, max: 12, splitNumber: 9};
        break;
      case'3':
        this.items = 10;
        this.formtype = 1;
        for (let i = 0; i < this.ucla10array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla10array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min: 10, max: 40, splitNumber: 6};
        break;
      case'4':
        this.items = 10;
        this.formtype = 2;
        for (let i = 0; i < this.ucla10array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla10array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min: 10, max: 40, splitNumber: 6};
        break;
      case'5':
        this.items = 20;
        this.formtype = 1;
        this.uclaselectquestions = this.ucla20questions;
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min: 20, max: 80, splitNumber: 6};
        break;
      case'6':
        this.items = 20;
        this.formtype = 2;
        //修改坐标轴
        this.chartSettings.seriesMap.score = {min: 20, max: 80, splitNumber: 6};
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
        that.screenWidth = window.screenWidth + 'px'
      })()
    }
    if (this.$cookies.get('sid')) {
      this.chatstart();
    } else {
      this.cookiedialog = true;
    }
  },
  methods: {
    //回到首页
    goindex: function () {
      this.cookiedialog = false;
      this.$router.replace('/index/').catch((err) => {
        console.log(err.message);
      });
    },
    //开始聊天
    chatstart: function () {
      botui.message.bot({
        loading: true,
        delay: 600,
        content: "Hello there! I am your mood assistant.😄"
      }).then(() => {
        botui.message.bot({
          loading: true,
          delay: 500,
          content: "Please first introduce yourself in two to three sentences.",
        });
        this.msgStatus = false;
      });
    },
    //用户发送信息
    msgsend: function () {
      console.log("start strp:" + this.msgStep);
      botui.message.human({
        content: this.userMessage,
      });
      if (this.msgStep === 0) {
        //自我介绍
        instance.post('/self', {
          'id': this.$cookies.get("id"),
          'sid': this.$cookies.get("sid"),
          'intro': this.userMessage,
          'itime': new Date().getTime(),
        }).then((response) => {
          console.log(response.data);
          //继续下一步，心情选择
          this.userMessage = '';
          this.msgStatus = true;
          this.msgStep += 1;
          console.log('intro:' + this.msgStep);
          this.moodselect();
        })
      } else if (this.msgStep > 0 && this.msgStep <= 17) {
        //开放域的问题
        instance.post('/openq', {
          'id': this.$cookies.get("id"),
          'sid': this.$cookies.get("sid"),
          'oitem': 'o' + (this.msgStep - 1),
          'otime': new Date().getTime(),
          'content': this.userMessage,
        }).then((response) => {
          console.log(response.data);
          this.userMessage = '';
          this.msgStatus = true;
          if (this.msgStep != 17) {
            this.openended();
          } else {
            botui.message.bot({
              content: "Finished",
              loading: true,
              delay: 600,
            }).then(() => {
              this.surveydialog = true;
            })
          }
        });
      } else {
        this.surveydialog = true;
        this.userMessage = '';
        this.msgStatus = true;
      }
      console.log("end strp:" + this.msgStep);
    },
    //选择心情
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
          instance.post('/mood', {
            'id': this.$cookies.get("id"),
            'sid': this.$cookies.get("sid"),
            'mood': res.value,
            'mtime': new Date().getTime(),
          }).then((response) => {
            console.log(response.data);
          }).then(() => {
            //继续下一步，孤独量表
            if (this.$route.params.type === '0') {
              this.openended();
            } else {
              this.askloneliness();
            }
          })

        });
      });
    },
    //孤独量表的引导语
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
    //ucla量表的chatbot形式
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
            }).then(() => {
              data.scoresheet = true;
              data.chartData.rows = [{type: 'score', value: data.uclascore}]
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
      //将结果传到sercer
      const itemscore = {'Never': 1, 'Rarely': 2, 'Sometimes': 3, 'Always': 4};
      const itemrscore = {'Never': 4, 'Rarely': 3, 'Sometimes': 2, 'Always': 1};
      console.log(item);
      let citem = '';
      switch (this.items) {
        case 3:
          citem = 'c' + (this.ucla3array[this.uclastep] + 1);
          if (this.uclareversearr.includes(this.ucla3array[this.uclastep])) {
            this.uclascore += itemrscore[item]
            console.log(itemrscore[item])
          } else {
            this.uclascore += itemscore[item]
            console.log(itemscore[item])
          }
          break;
        case 10:
          citem = 'c' + (this.ucla10array[this.uclastep] + 1);
          if (this.uclareversearr.includes(this.ucla10array[this.uclastep])) {
            this.uclascore += itemrscore[item]
            console.log(itemrscore[item])
          } else {
            this.uclascore += itemscore[item]
            console.log(itemscore[item])
          }
          break;
        case 20:
          citem = 'c' + (this.uclastep + 1);
          if (this.uclareversearr.includes(this.uclastep)) {
            this.uclascore += itemrscore[item]
            console.log(itemrscore[item])
          } else {
            this.uclascore += itemscore[item]
            console.log(itemscore[item])
          }
          break;
      }
      //在这里上报了选项
      instance.post('/ucla', {
        'id': this.$cookies.get("id"),
        'sid': this.$cookies.get("sid"),
        'citem': citem,
        'ctime': new Date().getTime(),
        'content': item,
      }).then((response) => {
        console.log(response.data);
      });
    },

    closescore: function () {
      this.scoresheet = false;
      botui.message.bot({
        loading: true,
        delay: 600,
        content: "Let me ask you some questions",
      }).then(() => {
        this.openended();
      });

    },
    openended: function () {
      this.msgStatus = true;
      botui.message.bot({
        loading: true,
        delay: 600,
        content: this.opdquestions[this.msgStep - 1]
      }).then(() => {
        this.msgStatus = false;
      });
      this.msgStep += 1;
    },
    subucla: function () {
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        instance.post('/uclaf', {
          'id': this.$cookies.get("id"),
          'sid': this.$cookies.get("sid"),
          'content': this.ucla20ans,
          'ctime': new Date().getTime(),
        }).then((res)=>{
          console.log(res.data);
          this.uclascore = res.data['score'];
          this.chartData.rows = [{type: 'score', value: this.uclascore}];
          console.log(this.uclascore);
          this.ucladialog = false;
          this.scoresheet = true;
        })
        //this.openended();
      }
    },
    subuserinfo: function () {
      if (this.$refs.personalinfo.validate()) {
        instance.post('/person', {
          'id': this.$cookies.get("id"),
          'sid': this.$cookies.get("sid"),
          'age': this.age,
          'gender': this.gender,
          'etime': new Date().getTime(),
          'personality': this.personality,
        }).then((response) => {
          console.log(response.data);
          this.surveydialog = false;
          this.$router.replace('/about').catch((err) => {
            console.log(err.message);
          });
        });
      } else {
        alert("Some items are missing, please check again");
      }
    }
  }
}
</script>

<style scoped>

</style>

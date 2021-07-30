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
                <span class="text-h5">Loneliness Scale:</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                    <v-form
                        ref="form"
                        lazy-validation
                    >
                      <v-col cols="12" v-for="(q,index) in uclaselectquestions" :key="index">
                        <span>{{ index + 1 }}.{{ q }}</span>
                        <v-radio-group v-if="items === 3"
                                       column
                                       required
                                       :rules="[v => !!v || 'Item is required']"
                                       v-model="ucla20ans[index]"
                        >
                          <v-radio
                              label="Hardly Ever"
                              value="Hardly Ever"
                          ></v-radio>
                          <v-radio
                              label="Some of the Time"
                              value="Some of the Time"
                          ></v-radio>
                          <v-radio
                              label="Often"
                              value="Often"
                          ></v-radio>
                        </v-radio-group>
                        <v-radio-group v-else
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
                      <v-btn
                          color="primary"
                          block
                          @click="subucla"
                      >
                        Submit
                      </v-btn>
                    </v-form>
                </v-container>
              </v-card-text>
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
        </v-row>
        <v-bottom-sheet
            v-model="scoresheet"
            persistent
        >
          <v-sheet width="auto">
            <v-card
                elevation="2"
            >
              <v-card-title>Your Loneliness Score: {{ uclascore }}</v-card-title>
              <ve-gauge style="margin-top:-50px" :data="chartData" :settings="chartSettings" :width="screenWidth">
              </ve-gauge>
              <v-card-text style="padding:0 16px;margin-top:-60px">
                <p class="font-weight-regular text-justify">{{ uclatips }}</p>
                <p style="font-size:10px;line-height:16px;margin-bottom:5px;color:#BDBDBD" class="text-left">{{
                    uclaref
                  }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                    class="mb-6"
                    color="primary"
                    block
                    @click="closescore"
                >
                  close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-bottom-sheet>
        <v-snackbar
            v-model="snackbar"
        >
          {{ snackbartext }}

          <template v-slot:action="{ attrs }">
            <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
    <v-footer app color="white">
      <v-row no-gutters>
        <v-col cols="9" sm="10" lg="11">
          <v-form
              lazy-validation
              ref="send">
            <v-textarea
                label="Type here"
                auto-grow
                outlined
                rows="1"
                :disabled="msgStatus"
                v-model="userMessage"
                :rules="[rules.language, rules.length]"
                @keydown.enter="enter_send"
            ></v-textarea>
          </v-form>
        </v-col>
        <v-col cols="3" sm="2" lg="1" class="d-flex align-start">
          <v-btn style="height:56px; padding: 0" block color="info" :disabled=msgStatus @click="msgsend">
            Send
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
      //表单验证的规则
      rules: {length: true, language: true},
      //显示底部提示框
      snackbar: false,
      snackbartext: '',
      //是否设置cookie的弹出框
      cookiedialog: false,
      //屏幕宽度
      screenWidth: document.body.clientWidth + 'px',
      //控制指针颜色
      chartSettings: {
        dataName: {'score': 'Points'},
        labelMap: {'score': 'score'},
        seriesMap: {
          'score': {
            itemStyle: {
              color: '#C62828'
            },
            min: 0, max: 80,
            detail: {
              color: "#000"
            },
            axisLine: {
              lineStyle: {
                color: [[0.1, '#33691E'], [0.2, '#689F38'], [0.3, '#9CCC65'], [0.4, '#D4E157'], [0.5, '#FFEE58'], [0.6, '#FBC02D'], [0.7, '#FF9100'], [0.8, '#F4511E'], [0.9, '#D84315'], [1, '#BF360C']],
              }
            },
            axisLabel: {
              textStyle: {
                fontWeight: 'bolder',
                color: '#424242',
                shadowColor: '#EEEEEE',
                shadowBlur: 10
              }
            },
          }
        },
      },
      chartData: {
        columns: ['type', 'value'],
        rows: [
          {type: 'score', value: 0}
        ]
      },
      // ucla结果 跳出的窗口
      scoresheet: false,
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
      ucla20ans: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
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
      //ucla结果的提示语
      uclatips: '',
      uclaref: '',
      opdquestions: [
        'In general, how would you describe your current mood?',
        'What do you think of the influence of COVID-19 pandemic on your study and life?',
        'Can you tell me a little bit about any contact you have with friends or family recently?',
        'What have you tried to manage isolation and loneliness during COVID-19?',
        'What do you think could be the main factors that contribute to loneliness?',
        'What would it take for you to feel happier or more at peace?',
        'Think of something, great or small (e.g., food you eat or the place you live in), that you feel happy and grateful for and describe it in a few words.',
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
        this.chartSettings.seriesMap.score.min = 3;
        this.chartSettings.seriesMap.score.max = 9;
        this.chartSettings.seriesMap.score.splitNumber = 6;
        break;
      case'2':
        this.items = 3;
        this.formtype = 2;
        for (let i = 0; i < this.ucla3array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla3array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score.min = 3;
        this.chartSettings.seriesMap.score.max = 9;
        this.chartSettings.seriesMap.score.splitNumber = 6;
        break;
      case'3':
        this.items = 10;
        this.formtype = 1;
        for (let i = 0; i < this.ucla10array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla10array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score.min = 10;
        this.chartSettings.seriesMap.score.max = 40;
        this.chartSettings.seriesMap.score.splitNumber = 6;
        break;
      case'4':
        this.items = 10;
        this.formtype = 2;
        for (let i = 0; i < this.ucla10array.length; i++) {
          this.uclaselectquestions[i] = this.ucla20questions[this.ucla10array[i]]
        }
        //修改坐标轴
        this.chartSettings.seriesMap.score.min = 10;
        this.chartSettings.seriesMap.score.max = 40;
        this.chartSettings.seriesMap.score.splitNumber = 6;
        break;
      case'5':
        this.items = 20;
        this.formtype = 1;
        this.uclaselectquestions = this.ucla20questions;
        //修改坐标轴
        this.chartSettings.seriesMap.score.min = 20;
        this.chartSettings.seriesMap.score.max = 80;
        this.chartSettings.seriesMap.score.splitNumber = 10;
        break;
      case'6':
        this.items = 20;
        this.formtype = 2;
        //修改坐标轴
        this.uclaselectquestions = this.ucla20questions;
        this.chartSettings.seriesMap.score.min = 20;
        this.chartSettings.seriesMap.score.max = 80;
        this.chartSettings.seriesMap.score.splitNumber = 10;
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
      setTimeout(()=>{   //设置延迟执行
        window.scrollTo(0 ,0);
      },10);
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
      setTimeout(()=>{   //设置延迟执行
        window.scrollTo(0 ,0);
      },1601);
      botui.message.bot({
        loading: true,
        delay: 1600,
        content: "Hi there! I am Percy."
      }).then(() => {
        setTimeout(()=>{   //设置延迟执行
          window.scrollTo(0 ,0);
        },1601);
        botui.message.bot({
          loading: true,
          delay: 1600,
          content: "I would like to help you know yourself better through an interview.",
        }).then(() => {
          setTimeout(()=>{   //设置延迟执行
            window.scrollTo(0 ,0);
          },1601);
          botui.message.bot({
            loading: true,
            delay: 2000,
            content: "Can you tell me what you are studying at HKBU?",
          }).then(() => {
            this.msgStatus = false;
          });
        });
      });
    },
    //用户发送信息
    msgsend: function () {
      let that = this;
      that.rules = {
        length: v => (v || "").length >= 2 || 'Feel free to tell me more',
        language: v => !/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(v) || "Please type English",
      };
      this.$nextTick(() => {
        if (this.$refs.send.validate()) {
          // if (that.check_zh(this.userMessage)) {
          //   that.snackbartext = "Please type English";
          //   that.snackbar = true;
          //   return;
          // }
          //禁止用户输入
          that.msgStatus = true;
          botui.message.human({
            content: that.userMessage,
          }).then(function () {
            botui.message.bot({
              loading: true,
            }).then((index) => {
              if (that.msgStep === 0) {
                //自我介绍
                instance.post('/self', {
                  'id': that.$cookies.get("id"),
                  'sid': that.$cookies.get("sid"),
                  'intro': that.userMessage,
                  'category':that.$route.params.type,
                  'itime': new Date().getTime(),
                }).then(() => {
                  //console.log(response.data);
                  botui.message.remove(index);
                  //继续下一步，心情选择
                  that.rules = {
                    length: true,
                    language: true,
                  };
                  that.$refs.send.resetValidation();
                  that.userMessage = '';
                  that.msgStep += 1;
                  that.moodselect();
                }).catch(function (error) {
                  that.msgStatus = false;
                  console.log(error);
                });
              } else if (that.msgStep > 0 && that.msgStep <= 8) {
                //开放域的问题
                instance.post('/openq', {
                  'id': that.$cookies.get("id"),
                  'sid': that.$cookies.get("sid"),
                  'oitem': 'o' + (that.msgStep - 1),
                  'otime': new Date().getTime(),
                  'content': that.userMessage,
                }).then((response) => {
                  //console.log(response.data);
                  botui.message.update(index, {
                    loading: false,
                    content: response.data['bot'],
                  });
                  if (that.msgStep !== 8) {
                    that.openended();
                  } else {
                    //回答完了问题，给建议
                    that.end_tips()
                  }
                }).catch(function (error) {
                  that.msgStatus = false;
                  botui.message.update(index,{
                    loading: false,
                    content: "Sorry, please try again.",
                  });
                  console.log(error);
                });
              } else {
                botui.message.remove(index);
                that.surveydialog = true;
                that.userMessage = '';
              }
            })
          })
          //console.log("end strp:" + this.msgStep);
        }
      });
    },
    //选择心情
    moodselect: function () {
      let that = this;
      botui.message.bot({
        loading: true,
        delay: 1600,
        content: "I hope you enjoy studying at HKBU."
      }).then(() => {
        return botui.message.bot({
          loading: true,
          delay: 1600,
          content: " I know many students feel low during the pandemic of COVID-19."
        });
      }).then(() => {
        return botui.message.bot({
          loading: true,
          delay: 1600,
          content: "How are you feeling now?"
        });
      }).then(() => {
        botui.action.button({
          action: [
            {
              text: 'Excited 😀 ',
              value: 'Excited'
            },
            {
              text: 'Happy 😊 ',
              value: 'Happy'
            },
            {
              text: 'Relaxed 🙂 ',
              value: 'Relaxed'
            },
            {
              text: 'Calm 😌 ',
              value: 'Calm'
            },
            {
              text: 'Sad ☹️',
              value: 'Sad'
            },
            {
              text: 'Depressed 😔 ',
              value: 'Depressed'
            },
            {
              text: 'Upset 😭 ',
              value: 'Upset'
            },
            {
              text: 'Nervous 😨 ',
              value: 'Nervous'
            },
          ]
        }).then((res) => {
          //console.log(res);
          botui.message.bot({
            loading: true,
          }).then(function (index) {
            instance.post('/mood', {
              'id': that.$cookies.get("id"),
              'sid': that.$cookies.get("sid"),
              'mood': res.value,
              'mtime': new Date().getTime(),
            }).then(() => {
              //console.log(response.data);
              const emotions = ['Relaxed', 'Excited', 'Happy', 'Calm'];
              let msg = 'Sorry to hear that!';
              if (emotions.includes(res.value)) {
                msg = "That is great!";
              }
              botui.message.update(index, {
                content: msg
              }).then(() => {
                //继续下一步，孤独量表
                if (that.$route.params.type === '0') {
                  botui.message.bot({
                    loading: true,
                    delay:1600,
                    content:'Now I would like to ask you several questions to help you cope with loneliness.',
                  }).then(()=>{
                    botui.message.bot({
                      loading: true,
                      delay: 1600,
                      content: 'Please tell me as much as possible about your feelings.'
                    }).then(()=>{
                      that.openended();
                    })
                  })
                } else {
                  that.askloneliness();
                }
              })
            })
          })
        });
      });
    },
    //孤独量表的引导语
    askloneliness: function () {
      let that = this;
      botui.message.bot(
          {
            delay: 1600,
            loading: true,
            content: 'Let\'s take a test to learn more about your recent mood.',
          }
      ).then(() => {
        botui.message.bot(
            {
              delay: 1600,
              loading: true,
              type: 'html',
              content: 'As many students feel isolated while working from home, let me ask you <span class="font-weight-black">' + this.items + ' questions</span> to learn more about your recent feelings of loneliness.',
            }
        ).then(() => {
          botui.action.button({
            action: [{
              text: " OK",
              value: 'OK'
            }]
          }).then(function () {
            //给服务器传一个点击时间
            instance.post('/setltime', {
              'id': that.$cookies.get("id"),
              'sid': that.$cookies.get("sid"),
              'ltime': new Date().getTime(),
            });
            switch (that.formtype) {
              case 1:
                that.uclachat();
                break;
              case 2:
                that.uclaform();
                break;
              default:
                that.uclachat();
                break;
            }
          })
        })
      });
    },
    //ucla量表的chatbot形式
    uclachat: function () {
      //items有三个值（3，10，20)
      let that = this;
      let actionbtn = [
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
      ];
      if (that.items === 3) {
        actionbtn = [
          {
            text: 'Hardly Ever',
            value: 'Hardly Ever'
          },
          {
            text: 'Some of the Time',
            value: 'Some of the Time'
          },
          {
            text: 'Often',
            value: 'Often'
          },
        ];
      }

      botui.message.bot({
        loading: true,
        delay: 1600,
        content: (that.uclastep + 1) + '. ' + that.uclaselectquestions[that.uclastep],
      }).then(function () {
        botui.action.button({
          action: actionbtn,
        }).then((res) => {
          that.getscore(res.text);
          //console.log(that.uclascore);
          that.uclastep++;
          if (that.uclastep < that.items) {
            that.uclachat();
          } else {
            botui.message.bot({
              loading: true,
              delay: 1600,
              content: 'Thank you for answering all the questions! Let’s see the results of your feelings of loneliness. '
            }).then(() => {
              botui.action.button({
                action: [
                  { // show only one button
                    text: 'Results',
                    value: 'Results'
                  }
                ]
              }).then(() => {
                //console.log(res);
                //给服务器传一个分数
                instance.post('/setscore', {
                  'id': that.$cookies.get("id"),
                  'sid': that.$cookies.get("sid"),
                  'score': that.uclascore,
                  'rbtime': new Date().getTime(),
                }).then(() => {
                  //console.log(response.data);
                  that.showref();
                  that.scoresheet = true;
                  that.chartData.rows = [{type: 'score', value: that.uclascore}]
                });
              })
            });
            that.uclastep = 0;
          }
        })
      })
    },
    uclaform: function () {
      //items有三个值（3，10，20)
      this.ucladialog = true;
    },
    getscore: function (item) {
      //将结果传到server
      const item3score = {'Hardly Ever': 1, 'Some of the Time': 2, 'Often': 3};
      const itemscore = {'Never': 1, 'Rarely': 2, 'Sometimes': 3, 'Always': 4};
      const itemrscore = {'Never': 4, 'Rarely': 3, 'Sometimes': 2, 'Always': 1};
      //console.log(item);
      let citem = '';
      switch (this.items) {
        case 3:
          citem = 'c' + (this.ucla3array[this.uclastep] + 1);
          this.uclascore += item3score[item]
          break;
        case 10:
          citem = 'c' + (this.ucla10array[this.uclastep] + 1);
          if (this.uclareversearr.includes(this.ucla10array[this.uclastep])) {
            this.uclascore += itemrscore[item]
            //console.log(itemrscore[item])
          } else {
            this.uclascore += itemscore[item]
            //console.log(itemscore[item])
          }
          break;
        case 20:
          citem = 'c' + (this.uclastep + 1);
          if (this.uclareversearr.includes(this.uclastep)) {
            this.uclascore += itemrscore[item]
            //console.log(itemrscore[item])
          } else {
            this.uclascore += itemscore[item]
            //console.log(itemscore[item])
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
      }).then(() => {
        //console.log(response.data);
      });
    },

    closescore: function () {
      let that = this;
      instance.post('/closescore', {
        'id': this.$cookies.get("id"),
        'sid': this.$cookies.get("sid"),
        'ratime': new Date().getTime(),
      }).then(() => {
        this.scoresheet = false;
        //console.log(response.data);
        botui.message.bot({
          loading: true,
          delay: 3200,
          content: "I have known your feelings of loneliness. Now I would like to ask you several more specific questions to help you cope with loneliness.",
        }).then(() => {
          botui.message.bot({
            loading: true,
            delay: 1600,
            content: " Please tell me as much as possible about your feelings."
          }).then(()=>{
            botui.action.button({
              action: [
                {'text': 'OK', 'value': "OK"}
              ]
            }).then(() => {
              //console.log(res);
              //给服务器传一个点击时间
              instance.post('/setotime', {
                'id': that.$cookies.get("id"),
                'sid': that.$cookies.get("sid"),
                'otime': new Date().getTime(),
              });
              this.openended();
            });
          });
        });
      });
    },
    openended: function () {
      this.msgStatus = true;
      botui.message.bot({
        loading: true,
        delay: 1600,
        content: this.opdquestions[this.msgStep - 1]
      }).then(() => {
        this.msgStatus = false;
        this.rules = {
          length: true,
          language: true,
        };
        this.$refs.send.resetValidation();
        this.userMessage = '';
      });
      this.msgStep += 1;
    },
    //提交ucla表单
    subucla: function () {
      let that = this;
      if (this.$refs.form.validate()) {
        instance.post('/uclaf', {
          'id': this.$cookies.get("id"),
          'sid': this.$cookies.get("sid"),
          'content': this.ucla20ans,
          'ctime': new Date().getTime(),
        }).then((res) => {
          //console.log(res.data);
          this.uclascore = res.data['score'];
          this.chartData.rows = [{type: 'score', value: this.uclascore}];
          //console.log(this.uclascore);
          this.ucladialog = false;
          this.showref();
          botui.message.bot({
            loading: true,
            delay: 1600,
            content: 'Thank you for answering all the questions! Let’s see the result of your feelings of loneliness. '
          }).then(() => {
            botui.action.button({
              action: [
                { // show only one button
                  text: 'Results',
                  value: 'Results'
                }
              ]
            }).then(() => {
              //console.log(res);
              //给服务器传一个打开时间
              instance.post('/setrbtime', {
                'id': that.$cookies.get("id"),
                'sid': that.$cookies.get("sid"),
                'rbtime': new Date().getTime(),
              }).then(() => {
                that.scoresheet = true;
              });
            });
          });
        })
        //this.openended();
      } else {
        this.snackbartext = "Some items are required, please check again.";
        this.snackbar = true;
      }
    },
    // 显示dish board的提示语
    showref: function () {
      switch (this.items) {
        case 3:
          this.uclaref = 'Varma, P., Junge, M., Meaklim, H., & Jackson, M. L. (2021). Younger people are more vulnerable to stress, anxiety and depression during COVID-19 pandemic: A global cross-sectional survey. Progress in neuro-psychopharmacology & biological psychiatry, 109, 110236. https://doi.org/10.1016/j.pnpbp.2020.110236';
          this.uclatips = 'A study on loneliness for adults from 63 countries (Varma et al. 2021) indicates that 47.2% of participants get more than 6 out of 9 for loneliness measure during the COVID-19 pandemic.';
          break;
        case 10:
          this.uclaref = 'Hager, N. M., Judah, M. R., & Milam, A. L. (2020). Loneliness and Depression in College Students During the COVID-19 Pandemic: Boredom and Repetitive Negative Thinking as Mediators.';
          this.uclatips = 'A study on loneliness for college students in America (Hager et al. 2020) indicates that participants\' mean score is 20.51 for loneliness measure during the COVID-19 pandemic.';
          break;
        case 20:
          this.uclaref = 'Tso, I. F., & Park, S. (2020). Alarming levels of psychiatric symptoms and the role of loneliness during the COVID-19 epidemic: A case study of Hong Kong. Psychiatry research, 293, 113423.';
          this.uclatips = 'A study on loneliness for adults in Hong Kong (Tso et al. 2020) indicates that a half of participants in the study get 50 or more out of 80 for loneliness measure during the COVID-19 pandemic.';
          break;
        default:
          this.uclatips = '';
          this.uclaref = '';
      }
    },
    //使用回车发送信息
    enter_send: function (e) {
      // 浏览器阻止默认事件兼容
      if (e.preventDefault) e.preventDefault();
      //阻止IE的默认操作
      else window.event.value = false;
      this.msgsend();
    },
    //end
    end_tips: function () {
      let that = this;
      botui.message.bot({
        type: 'html',
        loading: true,
        delay: 2600,
        content: "<ul><li>Try calling a friend, family member, health professional or counsellor to talk about your feelings. </li>" +
            "<li>Join an online group or class that focuses on something you enjoy – that could be anything from an online exercise class, book club, etc. </li>" +
            "<li>Consider going for short walks in public places (while keeping a two metre distance).</li>"+
            "<li>You can also contact HKBU Counselling and Development Centre (https://sa.hkbu.edu.hk/cdc/) for help.</li>"
      }).then(() => {
            botui.message.bot({
              loading: true,
              delay: 3600,
              content: "I am happy to talk to you. How are you feeling now?"
            }).then(()=>{
              botui.action.button({
                action: [
                  {
                    text: 'Excited 😀 ',
                    value: 'Excited'
                  },
                  {
                    text: 'Happy 😊 ',
                    value: 'Happy'
                  },
                  {
                    text: 'Relaxed 🙂 ',
                    value: 'Relaxed'
                  },
                  {
                    text: 'Calm 😌 ',
                    value: 'Calm'
                  },
                  {
                    text: 'Sad ☹️',
                    value: 'Sad'
                  },
                  {
                    text: 'Depressed 😔 ',
                    value: 'Depressed'
                  },
                  {
                    text: 'Upset 😭 ',
                    value: 'Upset'
                  },
                  {
                    text: 'Nervous 😨 ',
                    value: 'Nervous'
                  },
                ]
              }).then((res)=>{
                instance.post('/moodn', {
                  'id': that.$cookies.get("id"),
                  'sid': that.$cookies.get("sid"),
                  'mood': res.value,
                  'mtime': new Date().getTime(),
                });
                botui.message.bot({
                  loading: true,
                  delay: 1600,
                  content: "Now, I would like to know your experiences of participating in this interview with the Percy bot."
                }).then(() => {
                  botui.action.button({
                    action: [
                      { // show only one button
                        text: 'Fill in the final questionnaire',
                        value: 'Fill in the final questionnaire'
                      }
                    ]
                  }).then(() => {
                    instance.post('/setftime', {
                      'id': that.$cookies.get("id"),
                      'sid': that.$cookies.get("sid"),
                      'ftime': new Date().getTime(),
                    }).then(() => {
                      this.$router.replace('/interview').catch((err) => {
                        console.log(err.message);
                      });
                    });
                  })
                })
              })
            })
          }
      )
    }
  }
}
</script>

<style>
.botui-actions-buttons-button {
  margin-top: 6px !important;
  margin-bottom: 6px !important;
  padding-left: 6px;
  padding-right: 6px;
  font-size: 90% !important;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: .0892857143em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: .0892857143em;
  text-transform: none;
  transition-duration: .28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  align-items: center;
  border: thin solid;
  color: #3f51b5;
  caret-color: #3f51b5;
  background-color: transparent;
}

.botui-message-content {
  background-color: #E3F2FD;
}

.botui-message-content.human {
  background-color: #1E88E5;
}

.botui-message-content.loading {
  background-color: #E3F2FD;
}

.botui-message-content.html {
  background-color: #E3F2FD;
}

.botui-actions-container {
  margin-top: -20px;
}

.v-bottom-sheet.v-dialog {
  overflow: auto !important;
}
</style>

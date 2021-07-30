<template>
  <v-main>
    <v-container fluid>
      <v-stepper alt-labels v-model="e1">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="e1 > 1">
            Part1
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="e1 > 2">
            Part2
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form ref="questions" lazy-validation>
<!--              <p class="font-weight-medium text-justify">Please let us know your experiences of using this interview-->
<!--                chatbot.</p>-->
              <div v-if="qnum>0">
              <p class="font-weight-medium">Regarding your loneliness score <span class="font-weight-black">{{ score }} </span> returned by the Percy bot, please answer the following 3 questions.</p>
              <v-sheet
                  elevation="0"
                  class="mb-6 rounded"
                  v-for="(q,index) in ques.slice(0,3)" :key="index"
              >
                <p class="text-justify">{{ index + 1 }}. {{ q }}</p>
                <v-radio-group
                    row
                    required
                    :rules="[v => !!v || 'Item is required']"
                    v-model="qans[index]"
                >
                  <div style="width:100%" class="d-flex justify-space-around">
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">&nbsp;</div>
                      <div class="radio-lebel">Disagree strongly</div>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">1</div>
                      <v-radio value="1" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">2</div>
                      <v-radio value="2" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">3</div>
                      <v-radio value="3" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">4</div>
                      <v-radio value="4" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">5</div>
                      <v-radio value="5" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">&nbsp;</div>
                      <div class="radio-lebel">Agree strongly</div>
                    </div>
                  </div>
                </v-radio-group>
                <v-divider></v-divider>
              </v-sheet>
                <br/>
              </div>
              <p class="font-weight-medium">Please give your feedback on the following statements.</p>
              <v-sheet
                  elevation="0"
                  class="mb-6 rounded"
                  v-for="(q,index) in ques.slice(3,13)" :key="index+50"
              >
                <p v-if="qnum===0" class="text-justify">{{ index + 1 }}. {{ q }}</p>
                <p v-if="qnum > 0" class="text-justify">{{ index + 4 }}. {{ q }}</p>
                <v-radio-group
                    row
                    required
                    :rules="[v => !!v || 'Item is required']"
                    v-model="qans[index+3]"
                >
                  <div style="width:100%" class="d-flex justify-space-around">
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">&nbsp;</div>
                      <div class="radio-lebel">Disagree strongly</div>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">1</div>
                      <v-radio value="1" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">2</div>
                      <v-radio value="2" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">3</div>
                      <v-radio value="3" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">4</div>
                      <v-radio value="4" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">5</div>
                      <v-radio value="5" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">&nbsp;</div>
                      <div class="radio-lebel">Agree strongly</div>
                    </div>
                  </div>
                </v-radio-group>
                <v-divider></v-divider>
              </v-sheet>
              <p class="text-justify font-weight-medium">
                After talking with the Percy bot,
              </p>
              <v-sheet
                  elevation="0"
                  class="mb-6 rounded"
                  v-for="(q,index) in ques.slice(13)" :key="index+100"
              >
                <p v-if="qnum===0" class="text-justify">{{ index + 11 }}. {{ q }}</p>
                <p v-if="qnum > 0" class="text-justify">{{ index + 14 }}. {{ q }}</p>
                <v-radio-group
                    row
                    required
                    :rules="[v => !!v || 'Item is required']"
                    v-model="qans[index+13]"
                >
                  <div style="width:100%" class="d-flex justify-space-around">
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">&nbsp;</div>
                      <div class="radio-lebel">Disagree strongly</div>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">1</div>
                      <v-radio value="1" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">2</div>
                      <v-radio value="2" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">3</div>
                      <v-radio value="3" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">4</div>
                      <v-radio value="4" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">5</div>
                      <v-radio value="5" class="mr-0"></v-radio>
                    </div>
                    <div class="d-flex flex-column align-center">
                      <div class="radio-lebel">&nbsp;</div>
                      <div class="radio-lebel">Agree strongly</div>
                    </div>
                  </div>
                </v-radio-group>
                <v-divider></v-divider>
              </v-sheet>
            </v-form>

            <v-btn
                color="primary"
                @click="step1to2"
            >
              Continue
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <p class="font-weight-medium text-justify" v-if="qnum>0">Please answer the following 5 questions briefly.</p>
            <p  class="font-weight-medium text-justify" v-if="qnum===0">Please answer the following 4 questions briefly.</p>
            <v-form
                ref="ondquestions"
                lazy-validation
            >
              <div v-if="qnum>0">
              <p>1. {{openendedq1}}</p>
              <v-textarea
                  counter
                  outlined
                  auto-grow
                  v-model="oans[0]"
                  :rules="[rules.language, rules.length]"
              ></v-textarea>
              </div>
              <div class="mb-6" v-for="(q,index) in openended" :key="index+200">
                <p v-if="qnum>0">{{ index + 2 }}. {{ q }}</p>
                <p v-if="qnum===0">{{ index + 1 }}. {{ q }}</p>
                <v-textarea
                    counter
                    outlined
                    auto-grow
                    v-model="oans[index+1]"
                    :rules="[rules.language, rules.length]"
                ></v-textarea>
              </div>
            </v-form>

            <v-btn
                color="primary"
                @click="finish"
                block
            >
              Submit
            </v-btn>

          </v-stepper-content>
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
        </v-stepper-items>
      </v-stepper>
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
    </v-container>
  </v-main>
</template>

<script>
import {instance} from "@/network/request";

export default {
  name: "Interview",
  data: function () {
    return {
      score: '',
      qnum: 0,
      cookiedialog: false,
      snackbar: false,
      snackbartext: '',
      e1: 1,
      ques: ['I am convinced that the score can indicate my feelings of loneliness.',
        'I am confident I will trust my loneliness score.',
        'The loneliness score calculated by the Percy bot can be trusted.',
        'The Percy bot made me aware of my loneliness.',
        'I enjoy talking with the Percy bot.',
        'The design of the interview Percy bot made me think longer about my responses compared to traditional surveys.',
        'I will use the Percy bot to answer survey questions again.',
        'I think I have told my real feelings to the Percy bot.',
        'I think I have provided sufficient information to the Percy bot.',
        'I feel enjoyable when I converse with the Percy bot.',
        'If time allows, I would like to spend more time on elaborating my responses, so as to let the Percy bot understand me better.',
        'I would like to answer survey questions with the Percy bot.',
        'I am not willing to reveal my feelings to the Percy bot.',
        'I have insight into myself.',
        'I have a good self-image.',
        'I recognize the stress and worry in my current life.',
        'I understand myself well.',
        'I feel generally positive about self-awareness.',
      ],
      qans: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      openended: [
        'What do you think of knowing your mental state by chatting with such a bot?',
        'What do you think of answering the questions in conversation with the Percy bot, instead of filling in an online form?',
        'What do you think of describing your feelings through talking with the Percy bot?',
        'What questions that the Percy bot asked may make you feel concerned of?'
      ],
      openendedq1: 'What do you think of answering the questions to know your loneliness score?',
      oans: ['', '', '', '', ''],
      rules: {length: true, language: true},
    }

  },
  methods: {
    step1to2: function () {
      let that = this;
      if (this.$refs.questions.validate()) {
        instance.post('/sqans', {
          'id': this.$cookies.get("id"),
          'sid': this.$cookies.get("sid"),
          'sqtime': new Date().getTime(),
          'qans': this.qans,
        }).then((response) => {
          console.log(response.data);
          this.e1 = 2;
          window.scrollTo(0, 0);
        });
      } else {
        this.snackbartext = "Some items are required, please check again.";
        this.snackbar = true;
        this.$nextTick(() => {
          const el = that.$el.querySelector(".v-messages__message:first-of-type");
          that.$vuetify.goTo(el);
        });
      }
    },
    finish: function () {
      let that = this;
      this.rules = {
        length: v => (v || "").length >= 2 || 'Feel free to tell me more',
        language: v => !/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(v) || "Please type English",
      };
      this.$nextTick(() => {
        if (this.$refs.ondquestions.validate()) {
          instance.post('/finish', {
            'id': this.$cookies.get("id"),
            'sid': this.$cookies.get("sid"),
            'soqtime': new Date().getTime(),
            'soq1': this.oans[0],
            'soq2': this.oans[1],
            'soq3': this.oans[2],
            'soq4': this.oans[3],
            'soq5': this.oans[4],
          }).then((response) => {
            console.log(response.data);
            this.$router.replace('/about').catch((err) => {
              console.log(err.message);
            });
          });
        } else {
          this.snackbartext = "Some items are required, please check again.";
          this.snackbar = true;
          this.$nextTick(() => {
            const el = that.$el.querySelector(".v-messages__message:first-of-type");
            that.$vuetify.goTo(el);
          });
        }
      });

    },
    goindex: function () {
      this.cookiedialog = false;
      this.$router.replace('/index/').catch((err) => {
        console.log(err.message);
      });
    },
  },
  created: function () {
    if (!this.$cookies.get('sid')) {
      this.cookiedialog = true;
    }
  },
  mounted: function (){
    instance.get("/surveyscore").then((response) => {
      console.log(response.data);
      this.score = response.data['score'];
      this.qnum = response.data['qnum'];
      this.category = response.data['category'];
      window.scrollTo(0, 0);
    });
  }

}
</script>

<style>
.v-application--is-ltr .v-input--selection-controls__input {
  margin-right: 0 !important;
}

.radio-lebel {
  margin-right: 0;
  text-align: center;
}

</style>

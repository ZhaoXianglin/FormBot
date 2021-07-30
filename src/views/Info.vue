<template>
  <v-main>
    <v-container fluid>
      <h3 class="mt-3">Please answer the following questions about your general background.</h3>
      <v-form ref="personalinfo" lazy-validation class="mt-6">
        <v-row>
          <v-col
              cols="12"
          >
            <p class="text-justify font-weight-medium">Please indicate your age range.</p>
            <v-select
                v-model="age"
                :items="agesitems"
                filled
                label="Age range"
                required
                :rules="[v => !!v || 'Item is required']"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <p class="font-weight-medium">Please indicate your gender.</p>
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
          <v-col cols="12">
            <p class="font-weight-medium">Please indicate you are a ____. </p>
            <v-radio-group v-model="location"
                           required
                           :rules="[v => !!v || 'Item is required']"
            >
              <v-radio
                  label="Local student"
                  value="Local student"
              ></v-radio>
              <v-radio
                  label="Mainland student"
                  value="Mainland student"
              ></v-radio>
              <v-radio
                  label="International student"
                  value="International student"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p class="font-weight-medium">Overall how would you rate your mental health?</p>
            <v-radio-group v-model="mental"
                           required
                           :rules="[v => !!v || 'Item is required']"
            >
              <v-radio
                  label="Excellent"
                  value="Excellent"
              ></v-radio>
              <v-radio
                  label="Somewhat good"
                  value="Somewhat good"
              ></v-radio>
              <v-radio
                  label="Average"
                  value="Average"
              ></v-radio>
              <v-radio
                  label="Poor"
                  value="Poor"
              ></v-radio>
              <v-radio
                  label="Not sure"
                  value="Not sure"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p class="font-weight-medium">Which level of degree are you pursuing at HKBU?</p>
            <v-radio-group v-model="education"
                           required
                           :rules="[v => !!v || 'Item is required']"
            >
              <v-radio
                  label="Bachelor"
                  value="Bachelor"
              ></v-radio>
              <v-radio
                  label="Master"
                  value="Master"
              ></v-radio>
              <v-radio
                  label="Doctor"
                  value="Doctor"
              ></v-radio>
              <v-radio
                  label="Others"
                  value="Others"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p class="font-weight-medium">Please select your faculty, school or academic department.</p>
            <v-select
                v-model="school"
                :items="schoolitems"
                filled
                label="faculty school or academic department"
                required
                :rules="[v => !!v || 'Item is required']"
            ></v-select>
          </v-col>
          <v-col cols="12">
              <p class="font-weight-medium text-justify">
                Please answer the following 10 questions about your personality.
              </p>
            <v-sheet
                elevation="0"
                class="mb-6 rounded"
                v-for="(q,index) in personalq" :key="index"
            >
              <p class="text-justify">{{ index + 1 }}. I see myself as someone who {{ q }}</p>
              <v-radio-group
                  row
                  required
                  :rules="[v => !!v || 'Item is required']"
                  v-model="personality[index]"
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
          </v-col>
          <v-col cols="12">
            <p class="font-weight-medium text-justify">
              Please let us know your general intention of sharing your personal information with a healthcare application, e.g., 醫健通eHealth.
            </p>
            <v-sheet
                elevation="0"
                class="mb-6 rounded"
                v-for="(q,index) in quesp1" :key="index"
            >
              <p class="text-justify">{{ index + 1 }}. {{ q }}</p>
              <v-radio-group
                  row
                  required
                  :rules="[v => !!v || 'Item is required']"
                  v-model="qp1ans[index]"
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
          </v-col>
        </v-row>
      </v-form>
      <v-btn
          color="primary"
          @click="submit"
          block
          class="mb-6"
      >
        Submit
      </v-btn>
      <v-snackbar
          v-model="snackbar"
      >
        Some items are required, please check again.
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
</template>

<script>
import {instance} from "@/network/request";

export default {
  name: "Info",
  data: function () {
    return {
      snackbar: false,
      //用户信息
      age: '',
      agesitems: ['< 25 years old', '25-30 years old', '30-35 years old', '35-40 years old', '40-45 years old', '> 45 years old'],
      gender: '',
      location: '',
      education: '',
      schoolitems:['Faculty of Arts','School of Business','School of Chinese Medicine','Faculty of Science','Faculty of Social Sciences','Academy of Visual Arts','School of Continuing Education','Others'],
      school:'',
      mental:'',
      //personality
      personality: ['', '', '', '', '', '', '', '', '', ''],
      personalq: ['is reserved.', 'is generally trusting.', 'tends to be lazy.', 'is relaxed, handles stress well.',
        'has few artistic interests.', 'is outgoing, sociable.', 'tends to find fault with others.',
        'does a thorough job.', 'gets nervous easily.', 'has an active imagination.'],
      //Credibility
      quesp1: [
        'In general, I feel good that a healthcare application uses my health information.',
        'In general, it is okay to share my personal information with a healthcare application.',
        'In general, I feel uncomfortable about sharing my personal information with a healthcare application.',
        'In general, I am very likely to disclose my health information online.',
      ],
      qp1ans: [
        '', '', '', ''
      ],
    }
  },

  methods: {
    submit: function () {
      let that = this;
      if (this.$refs.personalinfo.validate()) {
        instance.post('/person', {
          'id': this.$cookies.get("id"),
          'sid': this.$cookies.get("sid"),
          'age': this.age,
          'gender': this.gender,
          'location': this.location,
          'education': this.education,
          'faculty': this.school,
          'mental': this.mental,
          'etime': new Date().getTime(),
          'personality': this.personality,
          'sqp1ans': this.qp1ans,
        }).then(() => {
          window.scrollTo(0, 0);
          let goto = this.$cookies.get("category");
          this.$router.replace('/chatbot/'+goto).catch((err) => {
            console.log(err.message);
          });
        });
      } else {
        this.snackbar = true;
        this.$nextTick(() => {
          const el = that.$el.querySelector(".v-messages__message:first-of-type");
          that.$vuetify.goTo(el);
        });
      }
    },
  }

}
</script>


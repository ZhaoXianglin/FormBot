<template>
  <v-main>
    <v-container fluid>
      <v-card elevation="2">
        <v-card-title>Introduction</v-card-title>
        <v-card-text>
          <p class="text-justify">Have you suffered from some mental issues under COVID-19 pandemic situation? Many people in quarantine stay alone and have less contact with friends and relatives. At Hong Kong Baptist University, we are designing a music chatbot to relieve loneliness by recommending good music in conversation.</p>
          <p class="text-justify">To understand your attitude toward music usage for alleviating loneliness, we want to ask you several questions. If you are interested in helping us design this music chatbot, we invite you to participate in our study.</p>
          <p class="text-justify">It will take about half an hour to finish the study. The whole study consists of three (two for baseline) steps,</p>
          <ol>
            <li>You will be asked to measure your feeling of loneliness</li>
            <li>You will be asked you several questions about your music preference</li>
            <li>We will ask you to evaluate your experience of participating in our study</li>
          </ol>
          <p class="text-justify">We will pay <span style="font-style: italic">30HKD</span> Pacific Coffee Coupon to all participants who successfully finish the study to say our thanks.</p>
        </v-card-text>
      </v-card>
      <v-card elevation="2" class="mt-3">
        <v-card-title>Tips:</v-card-title>
        <v-card-text>
          <ul>
            <li>You can participate in study either on your PC or mobile phone.</li>
            <li>We recommend you use Chrome browser.</li>
            <li>You can send your message to the bot by click the "Send" button.</li>
            <li>The <span style="color: red" class="text-decoration-underline">[university research ethics office]?</span> has approved this study. All of your data will be kept confidential and be only used for our research analysis.
            </li>
          </ul>
        </v-card-text>
      </v-card>
      <v-row class="mt-2 mb-4">
        <v-col>
          <v-btn
              color="primary"
              elevation="2"
              block
              @click="next"
          >
            Let's start
          </v-btn>
        </v-col>
      </v-row>
      <v-dialog persistent
          v-model="dialog"
      >
        <v-card>
          <v-card-title class="text-h6 grey lighten-2">
            Informed Consent Statement
          </v-card-title>
          <v-card-text>
            <p></p>
            <h5>DURATION:</h5>
            <p class="text-justify">This study will take you approximately half an hour to complete (including time for filling out questionnaires).</p>
            <h5>BENEFITS:</h5>
            <p class="text-justify">{  }</p>
            <h5>RISKS & CONFIDENTIALITY:</h5>
            <p class="text-justify">There is no risk of taking this study. We will try to keep all of the data collected in confidential places (in HKBU server with encryption), and only use them for research purposes. The data will be kept for two years before they will be destroyed.</p>
            <h5>VOLUNTARY PARTICIPATION AND RIGHT TO WITHDRAW:</h5>
            <p class="text-justify">Your participation in this study is voluntary; you may decline to participate without penalty. If you decide to participate, you may withdraw from the study at any time without penalty. If you withdraw from the study before data collection is completed your data will be returned to you or destroyed.</p>
            <h5>CIRCUMSTANCES THAT COULD LEAD US TO END YOUR PARTICIPATION:</h5>
            <p class="text-justify">We may decide to end your participation if we identify that you are not following the instructions closely enough.</p>
            <h5>COMPENSATION:</h5>
            <p class="text-justify">If you satisfactorily complete the study, you will receive 30 HKD Pacific Coffee Coupon to compensate you for your participation.</p>
            <h5>CONTACT INFORMATION:</h5>
            <p class="text-justify">If you have any questions about this research, you may contact: Yucheng Jin at jinyc2@lenovo.com, or Li Chen at lichen@comp.hkbu.edu.hk, and Wanling Cai at cswlcai@comp.hkbu.edu.hk.</p>
            <p class="text-justify">If you feel that you have not been treated according to the descriptions in this form, or your rights as a participant in this research have been violated during the course of this project, you may contact the -Research Ethics Committee by email at hkbu_rec@hkbu.edu.hk or by mail to Graduate School, Hong Kong Baptist University, Kowloon Tong, Hong Kong.</p>
            <h5>CLICKING ACCEPT:</h5>
            <p class="text-justify">By clicking on the “Accept” button, you indicate that you are 18 years of age or older, that you voluntarily agree to participate in this study and that you understand the information in this consent form</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Index",
  data: function (){
    return{
      dialog:true,
    }
  },
  methods:{
    next:function(){
      this.$router.replace('/chatbot').catch((err)=>{
        console.log(err.message);
      });
    }
  }
}
</script>

<style scoped>

</style>

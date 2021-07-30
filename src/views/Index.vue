<template>
  <v-main>
    <v-container fluid>
      <v-card elevation="2">
        <v-card-title>Introduction</v-card-title>
        <v-card-text>
          <p class="text-justify">Have you suffered from some mental issues under COVID-19 pandemic situation? Many people in quarantine stay alone and have less contact with friends and relatives. At Hong Kong Baptist University, we are designing an interview web application to help people understand their feelings of loneliness better and provide practical advice to cope with loneliness.</p>
          <p class="text-justify">To understand your attitude toward measuring loneliness through an interview web application, we want to ask you several questions. If you are interested in helping us design a web application to alleviate loneliness, we invite you to participate in our study.</p>
          <p class="text-justify">The whole study will take about 20-30 minutes and it consists of three steps:</p>
          <ol>
            <li>You will be asked to answer some background questions.</li>
            <li>You will be asked to measure your feelings of loneliness through interacting with our interview app (called <span class="font-weight-bold">"Percy bot"</span>).</li>
            <li>You will be asked to share your experience of using this interview app.</li>
          </ol>
          <br/>
          <p class="text-justify">To compensate for your support to our research, we will draw 30 lucky participants who satisfactorily complete the study to win a supermarket or coffee shop coupon valued at <span class="font-weight-bold">200 HKD</span>.</p>
        </v-card-text>
      </v-card>
      <v-card elevation="2" class="mt-3">
        <v-card-title>Tips:</v-card-title>
        <v-card-text>
          <ul>
            <li>You can participate in this study either on your PC or mobile phone.</li>
            <li>We recommend you to use Chrome browser.</li>
            <li>When you interact with the system, you can send your message by clicking the "Send" button.</li>
            <li>The Research Ethics Committee of the Hong Kong Baptist University has granted ethics (human/non-clinical) clearance approval for this study on 01-06-2021. All of your
              data will be kept confidential and be only used for our research analysis.
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
            START
          </v-btn>
        </v-col>
      </v-row>
      <v-dialog persistent v-model="finish">
        <v-card>
          <v-card-title>
            Success
          </v-card-title>
          <v-card-text>
            You have completed this test. Thanks for your cooperation.
          </v-card-text>
          <v-card-actions>
            <v-btn
                class="mb-5"
                color="primary"
                @click="finish = false"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog persistent
                v-model="dialog"
      >
        <v-card>
          <v-card-title>
            <h5 style="margin:0 auto;text-align:center">HONG KONG BAPTIST UNIVERSITY<br/>
              Informed Consent Statement<br/>
              Web Interview for Loneliness
            </h5>
          </v-card-title>
          <v-card-text class="text-justify">
            <h5>PURPOSE OF RESEARCH STUDY:</h5>
            <p>The purpose of this study is to design an interview web application to help you understand your feelings of loneliness better.</p>
            <h5>PROCEDURE:</h5>
            <p>Your task is to interact with our web application to answer the questions related to your feelings of loneliness. After that, you need to provide your feedback by completing a questionnaire and will be invited to attend a face-to-face interview.</p>
            <h5>DURATION:</h5>
            <p>This study will take you about 20 - 30 minutes (including time for filling out the questionnaire).</p>
            <h5>BENEFITS:</h5>
            <p>By attending this study, you will understand your feelings of loneliness better and receive some practical advice to cope with loneliness. In addition, we believe your feedback will help us design an effective web application to alleviate the feelings of loneliness.</p>
            <h5>RISKS & CONFIDENTIALITY:</h5>
            <p>There is no risk of taking this study. We will keep all of the collected data confidential (in the HKBU server with encryption). The collected data will be anonymously processed and only be used for research purposes.</p>
            <h5>VOLUNTARY PARTICIPATION AND RIGHT TO WITHDRAW:</h5>
            <p>Your participation in this study is voluntary; you may decline to participate without penalty. If you decide to participate, you may withdraw from the study at any time without penalty. However, if you withdraw from the study before data collection is completed, your data will be returned to you or destroyed.</p>
            <h5>CIRCUMSTANCES THAT COULD LEAD US TO END YOUR PARTICIPATION:</h5>
            <p>We may decide to end your participation if we identify that you are not following the instructions closely enough.</p>
            <h5>COMPENSATION:</h5>
            <p>To compensate for your support to our research, we will draw 30 lucky participants who satisfactorily complete the study to win a supermarket or coffee shop coupon valued at <span class="font-weight-black">200 HKD</span>.</p>
            <h5>CONTACT INFORMATION:</h5>
            <p class="text-left">If you have any questions about this research, please contact Yucheng Jin at <span class="font-italic">yuchengjin@comp.hkbu.edu.hk</span> or Xianglin Zhao at <span class="font-italic">csxlzhao@comp.hkbu.edu.hk</span>.</p>
            <p>If you feel that you have not been treated according to the descriptions in this form, or your rights as a participant have been violated, you may contact the Research Ethics Committee by email at <span class="font-italic">hkbu_rec@hkbu.edu.hk</span> or by mail to Graduate School, Hong Kong Baptist University, Kowloon Tong, Hong Kong.</p>
            <h5>CLICKING ACCEPT:</h5>
            <p>By clicking on the “Accept” button, you indicate that you are 18 years of age or older, that you voluntarily agree to participate in this study, and that you understand the information in this consent form.</p>

          </v-card-text>
          <v-card-actions>
            <v-btn
                class="mb-5"
                color="primary"
                block
                @click="close"
            >
              Accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </v-main>
</template>

<script>
import {instance} from '../network/request';

export default {
  name: "Index",
  data: function () {
    return {
      dialog: true,
      finish: false,
      atime: null,
      device: navigator.userAgent,
    }
  },
  methods: {
    close: function (){
      this.dialog = false;
      this.atime = new Date().getTime();
      //console.log(this.device);
    },
    next: function () {
      let ts = new Date().getTime();
      instance.post('/add', {'ts': ts,'atime': this.atime,'device':this.device}).then((response) => {
        if (response.data['status'] === 1) {
          //设置一个cookie 7day过期
          this.$cookies.config('1d')
          this.$cookies.set('sid', response.data['sid'], '1d');
          this.$cookies.set('id', response.data['id'], '1d');
          this.$cookies.set('category', response.data['id'] % 7, '1d');
          //let gotype = response.data['id'] % 7;
          //console.log(gotype)
          //this.$router.replace('/chatbot/' + gotype).catch((err) => {
          this.$router.replace('/info').catch((err) => {
            console.log(err.message);
          });
        }else if(response.data['status'] === 2) {
          //已经完成测试了
          //console.log(response.data);
          this.finish = true;
        }else {
          alert("please check the local time or try again later");
        }
        //console.log(response.data)
      }).catch((err)=>{
        console.log(err);
        alert("Error, Please check the network or try again later");
      })
    }
  }
}
</script>


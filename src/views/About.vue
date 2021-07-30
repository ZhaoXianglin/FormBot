<template>
  <v-main>
    <v-container fluid>
      <v-card elevation="2">
        <v-card-title>Thanks for your cooperation!</v-card-title>
        <v-card-text>
          <p class="text-justify font-weight-medium">Please leave your email if you would like to join the lucky draw
            for winning <span class="font-weight-black">a 200 HKD coupon</span>.
          </p>
          <v-checkbox
              v-model="draw"
              label="I want to join the lucky draw."
          ></v-checkbox>
          <v-form
              ref="form"
              lazy-validation
          >
            <p class="text-justify font-weight-black">We also want to invite you to take a follow-up face-to-face (or
              online via Zoom) interview about your experience of using this app. </p>
            <p class="text-justify">We will pay <span class="font-weight-black">100 HKD</span> to each person who will
              attend the follow-up interview (that will last around 1 hour). Please leave your email if you want to take
              the face-to-face interview.</p>
            <v-checkbox
                v-model="f2f"
                label="I want to take the follow-up face-to-face interview."
            ></v-checkbox>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                outlined
                required
                v-if="emailshow"
            ></v-text-field>
            <v-btn
                color="primary"
                @click="submit"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-snackbar
          v-model="snackbar"
      >
        You can close this page now, thank you.
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
  name: "About",
  data: function () {
    return {
      f2f: false,
      draw: false,
      email: '',
      emailRules: [true],
      snackbar: false
    }
  },
  computed: {
    emailshow: function () {
      return this.f2f || this.draw
    }
  },

  methods: {
    submit: function () {
      if (this.f2f || this.draw) {
        this.emailRules = [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ];
        this.$nextTick(() => {
          if (this.$refs.form.validate()) {
            instance.post('/email', {
              'id': this.$cookies.get("id"),
              'sid': this.$cookies.get("sid"),
              'email': this.email,
              'f2f': this.f2f,
              'draw': this.draw,
            }).then((response) => {
              //提交成功
              console.log(response)
              //that.snackbar = true;
              this.$router.replace('/finish').catch((err) => {
                console.log(err.message);
              });
            })
          }
        });
      }else{
        this.$router.replace('/finish').catch((err) => {
          console.log(err.message);
        });
      }
    },
  }

}
</script>


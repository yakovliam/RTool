<template>
  <div class="page">
    <div class="scale-with-page">
      <b-container class="container-1">
        <b-row class="justify-content-center">
          <b-col xl="8" lg="12" md="12" sm="12" cols="12">
            <div class="card-box shadow-lg p-3 mb-5 bg-white rounded-lg">
              <div class="login-form">
                <div class="title">Login</div>
                <template>
                  <b-alert :show="alert" dismissible @dismissed="alert = false" variant="danger">{{
                      this.alertText
                    }}
                  </b-alert>
                  <div>
                    <b-form-group
                        id="email"
                        description="We'll never share your email with anyone else."
                        :invalid-feedback="emailFeedback"
                        :state="validEmail"
                    >
                      <b-form-input placeholder="Email" id="email" v-model="email" :state="validEmail"
                                    trim></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="password"
                        :invalid-feedback="passwordFeedback"
                        :state="validPassword"
                    >
                      <b-form-input type="password" placeholder="Password" id="password" v-model="password"
                                    :state="validPassword"
                                    trim></b-form-input>
                    </b-form-group>
                    <div class="submission">
                      <b-button class="submit-button" v-on:click="this.submit" variant="outline-primary">LOG IN
                      </b-button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Login',
  computed: {
    emailFeedback() {
      if (!this.email.length >= 1) return null;

      if (!this.validEmail) {
        return 'Invalid email. Example: user@domain.com'
      }

      return 'Please enter something.'
    },
    passwordFeedback() {
      if (!this.password.length >= 1) return null;

      if (!this.validPassword) {
        return 'Password must be 8 or more characters.'
      }

      return 'Please enter something.'
    },
    validEmail: function () {
      if (!this.email.length >= 1) return null;
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
    },
    validPassword: function () {
      if (this.password.length <= 0) return null;

      return this.password.length >= 8
    }
  },
  methods: {
    submit: function () {
      if (!this.validEmail || !this.validPassword) {
        this.alertText = "Please complete the form below";
        this.alert = true;
        return;
      }

      // submit data to the API
      axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_LOGIN_PATH, {
        email: this.email,
        password: this.password
      }, {withCredentials: true}).then(() => {
        // redirect to profile
        this.$router.push({name: 'profile'});
      }).catch(err => {
        if (err.response.data.response)
          this.alertText = err.response.data.response;
        else
          this.alertText = "An error has occurred";
        this.alert = true;
      });
    }
  },
  data() {
    return {
      email: '',
      password: '',
      alert: false,
      alertText: '',
    }
  }
};

</script>

<style lang="scss" scoped>
.page {
  // Background color
  background-color: #fafbfc;
}

.container-1 {
  padding-top: 6rem;
  padding-bottom: 20rem;
}

.login-form {
  padding: 0 3rem 10px;
  font-family: Inter, sans-serif;

  .title {
    text-align: center;

    font-weight: 900;
    font-size: 50px;

    padding-top: 10px;
    padding-bottom: 30px;
  }

  .submission {
    padding-top: 10px;

    text-align: center;

    .submit-button {
      font-family: Inter, sans-serif;
      font-weight: 900;
      padding: 5px 2rem;
    }
  }
}
</style>

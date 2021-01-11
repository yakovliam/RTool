<template>
  <div class="page">
    <div class="scale-with-page">
      <b-container>
        <b-row class="section">
          <b-col align-self="center">
            <div class="title">New Client</div>
          </b-col>
        </b-row>
        <b-row class="justify-content-center section-2">
          <b-col xl="10" lg="10" md="10" align-self="center">
            <div class="shadow-lg rounded-lg">
              <div class="new-client">
                <b-alert class="padded-alert" :show="showAlert" dismissible @dismissed="showAlert = false"
                         v-bind:variant="alertType">{{
                    this.alertText
                  }}
                </b-alert>
                <b-form-group
                    id="edit-clientHandle"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="7"
                    label="Client Handle (Name)"
                    label-for="clientHandle-input"
                    :invalid-feedback="clientHandleFeedback"
                    :state="validClientHandle"
                >
                  <b-form-input :state="validClientHandle" v-model="clientHandle"
                                id="clientHandle-input"></b-form-input>
                </b-form-group>
                <b-form-group
                    id="edit-clientId"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="7"
                    label="Client ID"
                    label-for="clientId-input"
                    :invalid-feedback="clientIdFeedback"
                    :state="validClientId"
                >
                  <b-form-input :state="validClientId" v-model="clientId" id="clientId-input"></b-form-input>
                </b-form-group>
                <b-form-group
                    id="edit-clientToken"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="7"
                    label="Client Token"
                    label-for="clientToken-input"
                    :invalid-feedback="clientTokenFeedback"
                    :state="validClientToken"
                >
                  <b-form-input :state="validClientToken" v-model="clientToken"
                                id="clientToken-input"></b-form-input>
                </b-form-group>
                <b-button squared variant="outline-info" v-on:click="createClient()">CREATE</b-button>
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

const crypto = require('crypto');

export default {
  name: 'NewClient',
  data() {
    return {
      clientHandle: "",
      clientId: "",
      clientToken: "",
      showAlert: false,
      alertText: "",
      alertType: "",
    }
  },
  methods: {
    createClient() {
      // check validity
      if (!this.validClientId || !this.validClientHandle || !this.validClientToken) {
        this.alertType = "danger";
        this.alertText = "Missing fields";
        this.showAlert = true;
        return;
      }

      // submit to create api
      axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_CLIENT_CREATE_PATH,
          {handle: this.clientHandle, clientId: this.clientId, clientToken: this.clientToken},
          {withCredentials: true})
          .then(() => {
            // redirect to client home page
            this.$router.push({name: 'clientshome'});
          })
          .catch(error => {
            this.alertType = "danger";
            // get error message, display as alert
            if (error.response.data.response) {
              this.alertText = error.response.data.response;
            } else {
              this.alertText = "An error has occurred";
            }
            this.showAlert = true;
          });

    }
  },
  mounted() {
    // automatically generate id and token (can be changed if the user wants)
    this.clientId = crypto.randomBytes(10).toString('hex')
    this.clientToken = crypto.randomBytes(10).toString('hex')
  },
  computed: {
    clientHandleFeedback() {
      if (!this.clientHandle.length >= 1) return null;

      if (!this.validClientHandle) {
        return 'Invalid handle. Must be over 3 characters.'
      }

      return 'Please enter something.'
    },
    clientIdFeedback() {
      if (!this.clientId.length >= 1) return null;

      if (!this.validClientId) {
        return 'Invalid id. Must be over 3 characters.'
      }

      return 'Please enter something.'
    },
    clientTokenFeedback() {
      if (!this.clientToken.length >= 1) return null;

      if (!this.validClientToken) {
        return 'Invalid token. Must be over 3 characters.'
      }

      return 'Please enter something.'
    },
    validClientHandle: function () {
      if (this.clientHandle.length <= 0) return null;

      return this.clientHandle.length >= 3
    },
    validClientId: function () {
      if (this.clientId.length <= 0) return null;

      return this.clientId.length >= 3
    },
    validClientToken: function () {
      if (this.clientToken.length <= 0) return null;

      return this.clientToken.length >= 3
    }
  }
};

</script>

<style lang="scss" scoped>
.page {
  //TODO Fix this causing a small amount of scrolling required
  min-height: 100vh;

  // Padding
  padding-top: 50px;

  // Background color
  background-color: #fafbfc;
}

.section {

  text-align: center;
  font-family: Inter, sans-serif;

  .title {
    font-weight: 900;
    font-size: 50px;
  }

  .subtitle {

    font-weight: 600;
    font-size: 30px;

    padding: 0 15px;
    color: #64738e;
  }
}

.section-2 {

  padding-top: 50px;

  text-align: center;
  font-family: Inter, sans-serif;

  .title {
    padding-top: 30px;
    font-weight: 500;
    font-size: 30px;
  }

  .new-client {
    padding: 40px 20px 20px;
  }
}

.padded-alert {
  margin-bottom: 40px;
}
</style>

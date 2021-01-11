<template>
  <div class="page">
    <div class="scale-with-page">
      <b-container>
        <b-row class="section">
          <b-col align-self="center">
            <div class="title"> Explore Client</div>
            <div class="subtitle">
              {{ this.clientHandle }}
              <status-indicator v-bind:status="connectivityStatus"/>
            </div>
          </b-col>
        </b-row>
        <b-row class="justify-content-center section-2">
          <b-col xl="10" lg="10" md="10" align-self="center">
            <div class="shadow-lg rounded-lg">
              <div class="options">
                <b-alert :show="showAlert" dismissible @dismissed="showAlert = false" v-bind:variant="alertType">{{
                    this.alertText
                  }}
                </b-alert>
                <div class="title">
                  Options
                </div>
                <b-form-group
                    id="edit-clientHandle"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="7"
                    label="Client Handle"
                    label-for="clientHandle-input"
                >
                  <b-form-input v-model="clientHandle" id="clientHandle-input"></b-form-input>
                </b-form-group>
                <b-form-group
                    id="edit-clientId"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="7"
                    label="Client ID"
                    label-for="clientId-input"
                >
                  <b-form-input disabled v-model="clientId" id="clientId-input"></b-form-input>
                </b-form-group>
                <b-form-group
                    id="edit-clientToken"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="7"
                    label="Client Token"
                    label-for="clientToken-input"
                >
                  <b-form-input v-model="clientToken" id="clientToken-input"></b-form-input>
                </b-form-group>
                <b-button squared variant="outline-info" v-on:click="updateClient()">SAVE</b-button>
                <b-button squared variant="outline-danger" v-on:click="deleteClient()">DELETE</b-button>
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
  name: 'ClientOptions',
  data() {
    return {
      client: undefined,
      clientId: "",
      clientHandle: "",
      clientToken: "",
      showAlert: false,
      alertText: "",
      alertType: "",
      box: "",
      connectivityStatus: "negative"
    }
  },
  mounted: async function () {
    // get client data
    await axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_CLIENT_GET_PATH, {clientId: this.$route.params.clientId}, {withCredentials: true})
        .then(response => {
          this.client = response.data.response.client;

          // also set client id & handle & token
          this.clientHandle = this.client.handle;
          this.clientId = this.client.clientId;
          this.clientToken = this.client.clientToken;
          // also connectivity
          if (response.data.response.connected) {
            this.connectivityStatus = "positive";
          }

        }).catch(() => {
          // send back to clients page
          this.$router.push({name: 'clientshome'});
        });
  },
  methods: {
    updateClient: async function () {
      // update client data
      await axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_CLIENT_UPDATE_PATH,
          {clientId: this.clientId, handle: this.clientHandle, clientToken: this.clientToken},
          {withCredentials: true})
          .then(() => {
            // show success
            this.alertType = "success";
            this.alertText = "Successfully Updated";
            this.showAlert = true;

          }).catch((error) => {
            this.alertType = "danger";
            // get error message, display as alert
            if (error.response.data.response) {
              this.alertText = error.response.data.response;
            } else {
              this.alertText = "An error has occurred";
            }
            this.showAlert = true;
          });
    },
    deleteClient: async function () {
      // confirm deletion
      this.box = "";
      this.$bvModal.msgBoxConfirm('Please confirm the deletion of this client.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        hideHeaderClose: false,
        centered: true
      })
          .then(async (value) => {
            this.box = value;
            // if true, delete
            if (this.box === true) {
              // delete client
              await axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_CLIENT_DELETE_PATH,
                  {clientId: this.clientId},
                  {withCredentials: true})
                  .then(() => {
                    // redirect to '/clients'
                    this.$router.push({name: 'clientshome'});
                  }).catch((error) => {
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
          })
          .catch(() => {
            // do nothing
          });

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
    font-weight: 500;
    font-size: 20px;

    padding: 0 15px;
    color: #64738e;
  }
}


.section-2 {

  padding-top: 50px;

  text-align: center;
  font-family: Inter, sans-serif;

  .options {

    .title {
      font-weight: 500;
      font-size: 30px;
      padding-bottom: 20px;
    }

    padding: 30px 20px 20px;
  }
}

</style>
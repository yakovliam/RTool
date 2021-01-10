<template>
  <div class="page">
    <div class="scale-with-page">
      <b-container>
        <b-row class="section">
          <b-col align-self="center">
            <div class="title">Welcome Back,</div>
            <div class="subtitle">
              {{ this.username }}
            </div>
          </b-col>
        </b-row>
        <b-row class="section-2">
          <b-col align-self="center">
            <b-button to="/clients" squared variant="info">VIEW CLIENTS</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Profile',
  mounted() {
    // query api for user data
    axios
        .post(process.env.VUE_APP_API_URL + process.env.VUE_APP_GET_PATH, {}, {withCredentials: true})
        .then(response => {
          const user = response.data.response;
          // set the name variable to the username
          this.username = user.username;
        });
  },
  data() {
    return {
      username: ''
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
  text-align: center;
  padding-top: 5rem;
}

</style>

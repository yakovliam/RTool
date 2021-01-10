<template>
  <div class="header-page">
    <div class="header-navbar-a scale-with-page">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand>
          <router-link to="/home">
            <b-img src="~/../assets/icon.svg" width="25px" class="img"></b-img>
          </router-link>
          <b-nav-text class="ml-2">RTool</b-nav-text>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <router-link v-if="this.isLoggedIn === false" to="/login">
              <b-button size="sm" class="ml-3 header-button" squared>LOGIN</b-button>
            </router-link>
            <router-link v-if="this.isLoggedIn === true" to="/profile">
              <b-button size="sm" class="ml-3 header-button" squared>PROFILE</b-button>
            </router-link>
            <router-link v-if="this.isLoggedIn === true" to="/clients">
              <b-button size="sm" class="ml-3 header-button" squared>CLIENTS</b-button>
            </router-link>
            <router-link v-if="this.isLoggedIn === true" to="/">
              <b-button size="sm" v-on:click="this.logout" class="ml-3 header-button" squared>LOGOUT</b-button>
            </router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {bus} from "@/main";

export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: this.checkIfIsLoggedIn()
    }
  },
  created() {
    bus.$on("update-dynamic", () => {
      this.isLoggedIn = this.checkIfIsLoggedIn();
    })
  },
  methods: {
    logout() {
      // clear localStorage user
      localStorage.removeItem("user");
      // update header stuff
      this.isLoggedIn = this.checkIfIsLoggedIn();
      // post to url to remove cookie
      axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_LOGOUT_PATH, {}, {withCredentials: true});
    },
    checkIfIsLoggedIn() {
      return !!localStorage.getItem("user");
    }
  }
};

</script>

<style lang="scss" scoped>
.header-page {
  // Background color
  background-color: #fafbfc;
}

.header-navbar-a {
  font-family: Inter, sans-serif;
}

.header-button {
  padding: 5px 13px;

  font-size: 15px;
  font-weight: 800;

  background-color: #22282f;
}
</style>

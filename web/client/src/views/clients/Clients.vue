<template>
  <div class="page">
    <div class="scale-with-page">
      <b-container>
        <b-row class="section">
          <b-col align-self="center">
            <div class="title">Clients</div>
          </b-col>
        </b-row>
        <b-row class="section-2 overflow-auto" align-h="center">
          <router-link to="/clients/new">
            <b-button class="new-button" squared variant="outline-primary">NEW</b-button>
          </router-link>
          <b-table
              id="client-table"
              hover
              :busy.sync="isBusy"
              :fields="fields"
              :items="provider"
              :per-page="limit"
              :current-page="currentPage">
            <template #cell(view)="data">
              <router-link :to="{path: '/clients/' + encodeURIComponent(data.item.clientId) + '/options'}">
                <b-button size="sm" squared variant="outline-primary">Explore</b-button>
              </router-link>
            </template>
          </b-table>
        </b-row>
        <b-row class="justify-content-center section-3">
          <b-pagination
              :total-rows="rows"
              v-model="currentPage"
              :per-page="limit"
              aria-controls="client-table"
              align="fill">
          </b-pagination>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Clients',
  data() {
    return {
      limit: 6,
      currentPage: 1,
      rows: 1,
      isBusy: false,
      fields: [
        {key: 'handle', label: 'Client Handle'},
        {key: 'clientId', label: 'Client ID'},
        {key: 'view', label: 'Interact'}
      ],
    }
  },
  methods: {
    provider(ctx) {
      // Here we don't set isBusy prop, so busy state will be
      // handled by table itself
      // this.isBusy = true
      let promise = axios.post(process.env.VUE_APP_API_URL + process.env.VUE_APP_CLIENTS_QUERY_PATH + "?page=" + ctx.currentPage + "&limit=" + ctx.perPage, {}, {withCredentials: true});

      return promise.then((data) => {
        const items = data.data.response.clients.docs;
        this.rows = data.data.response.clients.total;
        // Here we could override the busy state, setting isBusy to false
        // this.isBusy = false
        return (items)
      }).catch(() => {
        // Here we could override the busy state, setting isBusy to false
        // this.isBusy = false
        // Returning an empty array, allows table to correctly handle
        // internal busy state in case of error
        return []
      })
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

  font-family: Inter, sans-serif;
  font-weight: 400;

  .new-button {
    margin-bottom: 20px;
  }
}

</style>

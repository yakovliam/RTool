<template>
  <div class="page">
    <div class="scale-with-page">
      <b-container>
        <b-row class="section">
          <b-col align-self="center">
            <div class="title">Clients</div>
          </b-col>
        </b-row>
        <b-row class="section-2">
          <b-table hover :fields="fields" :items="items">
            <template #cell(view)="data">
              <router-link :to="{path: '/clients/' + data.item.client_handle + '/options'}">
                <b-button squared variant="outline-primary">Explore</b-button>
              </router-link>
            </template>
          </b-table>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clients',
  data() {
    return {
      //TODO make this use the api to retrieve data
      fields: [
        {key: 'client_handle', label: 'Client Handle'},
        {key: 'client_id', label: 'Client ID'},
        {key: 'view', label: 'Interact'}
      ],
      items: [
        {client_handle: "handle_here", client_id: "id_here"},
        {client_handle: "handle_here", client_id: 'id_here'},
        {client_handle: "handle_here", client_id: 'id_here'},
        {client_handle: "handle_here", client_id: 'id_here'}
      ]
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
}

</style>

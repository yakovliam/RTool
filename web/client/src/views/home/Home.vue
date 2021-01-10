<template>
  <div class="page">
    <b-modal id="info-modal" centered title="Info" ok-only>
      <div class="modal-text">This service is currently Invite Only.</div>
    </b-modal>
    <div class="scale-with-page">
      <b-container>
        <b-row class="section">
          <b-col align-self="center">
            <div class="title">RTool</div>
            <div class="subtitle">
              The most robust and efficient remote access software for educators.
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container class="container-2" fluid="*">
        <hr/>
        <b-row class="section-2">
          <b-col align-self="center">
            <div class="title">Pricing</div>
          </b-col>
        </b-row>
        <b-row class="justify-content-center pricing">
          <b-col class="column" xl="4" md="7" sm="9" cols="10">
            <div class="card-box shadow-lg p-3 mb-5 bg-white rounded-lg">
              <b-img class="balloon" src="~/../../assets/balloon.svg"/>
              <div class="right">
                <div class="title">Basic</div>
                <div class="price">$ 5</div>
                <div class="sub-price">per month</div>
              </div>
              <div class="left">
                <div class="features-list">
                  <ul>
                    <li>
                      <b-icon icon="check2-circle"></b-icon>
                      Up to
                      <div class="bolded">20</div>
                      clients
                    </li>
                    <li>
                      <b-icon icon="check2-circle"></b-icon>
                      Up to
                      <div class="bolded">100</div>
                      Actions per day
                    </li>
                    <li>
                      <b-icon icon="check2-circle"></b-icon>
                      Technical Support
                    </li>
                  </ul>
                </div>
              </div>
              <div class="learn-more">
                <b-button v-b-modal.info-modal class="button hvr-grow-shadow" variant="light">LEARN MORE</b-button>
              </div>
            </div>
          </b-col>
          <b-col class="column" xl="4" md="7" sm="9" cols="10">
            <div class="card-box shadow-lg p-3 mb-5 bg-white rounded-lg">
              <b-img class="balloon" src="~/../../assets/balloon.svg"/>
              <div class="right">
                <div class="title">Pro</div>
                <div class="price">$ 10</div>
                <div class="sub-price">per month</div>
              </div>
              <div class="left">
                <div class="features-list">
                  <ul>
                    <li>
                      <b-icon icon="check2-circle"></b-icon>
                      Up to
                      <div class="bolded">200</div>
                      clients
                    </li>
                    <li>
                      <b-icon icon="check2-circle"></b-icon>
                      Up to
                      <div class="bolded">10,000</div>
                      Actions per day
                    </li>
                    <li>
                      <b-icon icon="check2-circle"></b-icon>
                      Priority Technical Support
                    </li>
                  </ul>
                </div>
              </div>
              <div class="learn-more">
                <b-button v-b-modal.info-modal class="button hvr-grow-shadow" variant="light">LEARN MORE</b-button>
              </div>
            </div>
          </b-col>
          <b-col class="column" xl="4" md="7" sm="9" cols="10">
            <div class="card-box shadow-lg p-3 mb-5 bg-white rounded-lg">
              <b-img class="balloon" src="~/../../assets/balloon.svg"/>
              <div class="right">
                <div class="title">Enterprise</div>
                <div class="price">Contact</div>
                <div class="sub-price">for more information</div>
              </div>
              <div class="left">
                <div class="features-list">
                  <ul>
                    <li>
                      <b-icon icon="check2-circle"></b-icon>
                      <div class="bolded">Unlimited</div>
                      clients
                    </li>
                    <li>
                      <b-icon icon="check2-circle"></b-icon>
                      <div class="bolded">100,000+</div>
                      Actions per day
                    </li>
                    <li>
                      <b-icon icon="check2-circle"></b-icon>
                      24/7 Priority Technical Support
                    </li>
                  </ul>
                </div>
              </div>
              <div class="learn-more">
                <b-button v-b-modal.info-modal class="button hvr-grow-shadow" variant="light">GET IN CONTACT
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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

.modal-text {
  // Font
  font-family: Inter, sans-serif;
  // Font weight
  font-weight: 300;
}

.section {

  text-align: center;
  font-family: Inter, sans-serif;

  .title {

    font-weight: 900;
    font-size: 50px;
  }

  .subtitle {

    padding: 0 15px;
    color: #64738e;

    font-size: 20px;
  }
}

.container-2 {
  padding-top: 10rem;
}

.section-2 {
  text-align: center;
  font-family: Inter, sans-serif;

  .title {
    font-weight: 800;
    font-size: 40px;
  }
}

.pricing {
  padding-top: 2rem;
  padding-bottom: 10rem;

  // Medium and below
  @media only screen and (max-width: 992px) {
    .column {
      margin-bottom: 30px;
    }
  }

  .card-box {
    background-image: linear-gradient(#1968f3, #25c1e1);;

    font-family: Inter, sans-serif;
    color: white;

    // Height
    height: auto;

    .right {
      // Alignment
      text-align: right;
      // Padding
      padding-right: 10px;
    }

    .title {
      // Text
      font-size: 20px;
      font-weight: 800;
    }

    .price {
      // Padding
      padding-top: 20px;

      // Text
      font-size: 40px;
      font-weight: 700;
    }

    .sub-price {
      // Text
      font-size: 15px;
      font-weight: 600;
    }

    .left {
      text-align: left;
    }

    .features-list {

      // Padding on the top of the container
      padding-top: 30px;

      // Font weight
      font-weight: 500;

      ul {
        // Remove padding from bullets
        padding: 0;
        // Remove margins from bullets
        margin: 0;
        // Remove bullets themselves
        list-style-type: none;
      }

      li {
        margin: 0 0 20px 0;
      }

      .bolded {
        display: inline;
        font-weight: 900;
      }
    }

    .learn-more {
      // Alignment
      text-align: center;

      // Padding <top> <left/right> <bottom>
      padding: 40px 10px 5px;

      .button {
        padding: 10px;
        width: 100%;

        font-weight: 800;
      }
    }

    .balloon {
      position: absolute;
      top: 20px;
      width: 140px;
      opacity: 0.2;
    }
  }
}
</style>

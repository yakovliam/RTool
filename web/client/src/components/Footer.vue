<template>
  <div class="footer-page">
    <div class="scale-with-page">
      <footer>
        <hr class="footer-hr"/>
        <b-container class="text-left">
          <b-row class="footer-center-mobile">
            <b-col md="6">
              <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">RTool</h5>
              <p>RTool is a private organization dedicated to keeping digital client control simple.</p>
            </b-col>
            <hr class="footer-hr clearfix w-100 d-md-none"/>
            <b-col class="footer-center-mobile" md="2">
              <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">Links</h5>
              <ul class="list-unstyled">
                <li><a class="footer-a" href="https://www.yakovliam.com/">Yakovliam</a></li>
                <li><a class="footer-a" href="https://rtool.yakovliam.com/">Site Home</a></li>
              </ul>
            </b-col>
          </b-row>
        </b-container>
        <hr class="footer-hr"/>
        <div class="text-center py-3">
          <ul class="list-unstyled list-inline mb-0">
            <li class="list-inline-item">
              <h5 class="mb-1">Register for free</h5>
            </li>
            <li class="list-inline-item">
              <router-link
                  :disaabled="true"
                  to="/signup">
                <div v-b-tooltip.hover title="Currently: Invite Only">
                  <button type="button" class="btn btn-outline-primary" disabled>Sign Up</button>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <hr class="footer-hr"/>
        <div class="text-center">
          <ul class="list-unstyled list-inline">
            <li class="list-inline-item"><a class="footer-a btn-floating btn-sm btn-fb mx-1"><i class="fab fa-facebook"> </i></a>
            </li>
            <li class="list-inline-item"><a class="footer-a btn-floating btn-sm btn-tw mx-1"><i class="fab fa-twitter"> </i></a>
            </li>
            <li class="list-inline-item"><a class="footer-a btn-floating btn-sm btn-gplus mx-1"><i
                class="fab fa-google-plus"> </i></a></li>
            <li class="list-inline-item"><a class="footer-a btn-floating btn-sm btn-li mx-1"><i
                class="fab fa-linkedin-in"> </i></a>
            </li>
            <li class="list-inline-item"><a class="footer-a btn-floating btn-sm btn-dribbble mx-1"><i
                class="fab fa-dribbble"> </i></a></li>
          </ul>
        </div>
        <div class="footer-copyright text-center py-3">
          <b-container fluid>
            &copy; {{ date }} Copyright <a class="footer-a" href="https://www.yakovliam.com/"> Yakovliam.com </a>
          </b-container>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data() {
    return {
      date: new Date().getFullYear()
    }
  }
};

</script>

<style lang="scss" scoped>
.footer-page {
  // Background color
  background-color: #fafbfc;

  font-family: Inter, sans-serif;
}


.footer-hr {
  display: block;
  height: 1px;

  margin-top: 0;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.footer-center-mobile {

  @media only screen and (max-width: 600px) {
    text-align: center;
  }
}

.footer-a {
  color: #797171;

  &:hover {
    color: #bbb2b2;
  }
}

</style>

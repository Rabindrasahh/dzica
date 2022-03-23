<template>
  <div>
    <index-navbar></index-navbar>
    <!-- Categories -->
    <div class="categories">
      <div class="container">
        <h2 class="heading1">Categories</h2>
        <carousel :items-to-show="5">
          <slide
            v-for="category in categories"
            :key="category._id"
            class="owl-carousel owl-theme"
          >
            <router-link
              class="item"
              :to="{ name: 'allTalents', query: { category: category.name } }"
            >
              <div
                class="cate_box"
                :style="{
                  'background-image': `${
                    category.gradient
                  }, url(https://dzicace.herokuapp.com/${category.image?.replaceAll()})`,
                }"
              >
                <h3 class="text-white my-auto">{{ category.name }}</h3>
              </div>
            </router-link>
          </slide>
          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
    </div>

    <!-- Talents -->

    <div class="feature-talent">
      <div class="container">
        <div class="head_flex">
          <h2 class="heading1">Feature Talent</h2>
          <a href="#">See more</a>
        </div>
        <div class="row">
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NEW CELEBRITIES -->
    <div class="feature-talent">
      <div class="container">
        <div class="head_flex">
          <h2 class="heading1">New Celebrities</h2>
          <router-link :to="{ name: 'allTalents' }">View More</router-link>
        </div>
        <div class="row mt-3">
          <celebrity-card
            v-for="talent in talents"
            :key="talent._id"
            :data="talent"
          ></celebrity-card>
        </div>
      </div>
    </div>

    <div class="feature-talent">
      <div class="container">
        <div class="head_flex">
          <h2 class="heading1">Famous Singers</h2>
          <a href="#">See more</a>
        </div>
        <div class="row">
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-talent">
      <div class="container">
        <div class="head_flex">
          <h2 class="heading1">Football players</h2>
          <a href="#">See more</a>
        </div>
        <div class="row">
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-talent-card">
              <div
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/images/ft.png') + ')',
                }"
                class="cardbg"
              ></div>
              <h4>Yacine Brahimi</h4>
              <div class="card-details">
                <h5>Price <span>8000DA</span></h5>
                <p>785 <i class="fa fa-heart-o" aria-hidden="true"></i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ARTICLES -->
    <div class="feature-talent">
      <div class="container">
        <div class="head_flex">
          <h2 class="heading1">Blog Articles</h2>
          <router-link :to="{ name: 'articles' }">View More</router-link>
        </div>
        <div class="row justify-content-around">
          <article-card
            v-for="article in articles"
            :key="article"
            :data="article"
          ></article-card>
        </div>
      </div>
    </div>
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
    <the-footer></the-footer>
  </div>
</template>

<script>
import IndexNavbar from "../../components/layouts/IndexNavbar.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  components: {
    IndexNavbar,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    explore() {
      document.querySelector(".new").scrollIntoView();
    },
    async init() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("site/getIndexData");
      } catch (err) {
        this.$swal({
          icon: "error",
          text: err.message,
        });
      }
      this.isLoading = false;
    },
    getRandomGradient() {
      const gradients = [
        `linear-gradient(310deg, #ffafbd , #ffc3a0)`,
        `linear-gradient(310deg, #2193b0  , #6dd5ed)`,
        `linear-gradient(310deg, #de6262  , #ffb88c)`,
        `linear-gradient(310deg, #06beb6  , #06beb6 )`,
        `linear-gradient(310deg, #eb3349   , #f45c43 )`,
        `linear-gradient(310deg, #56ab2f    , #a8e063 )`,
        `linear-gradient(310deg, #614385    , #516395 )`,
        `linear-gradient(310deg, #02aab0    , #00cdac )`,
        `linear-gradient(310deg, #ff512f    , #dd2476 )`,
        `linear-gradient(310deg, #4568dc     , #b06ab3 )`,
      ];
      return gradients[Math.floor(Math.random() * gradients.length)];
    },
  },
  computed: {
    talents() {
      return this.$store.getters["site/indexData"].newTalents;
    },
    categories() {
      return this.$store.getters["site/indexData"].categories?.map((c) => {
        return {
          ...c,
          image: c.image?.replaceAll(
            String.fromCharCode(92),
            String.fromCharCode(47)
          ),
          gradient: this.getRandomGradient(),
        };
      });
    },
    articles() {
      return this.$store.getters["site/indexData"].articles;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style>
body {
  background-color: #061428;
}
.navbar {
  padding: 0.5rem 0rem;
}
.navbar-brand {
  margin-right: 40px;
}

.banner-content h1 {
  color: #fff;
  font-size: 50px;
  font-weight: 700;
}
.banner-content p {
  color: #ffff;
  font-size: 14px;
  padding: 10px 0px;
}
.green-btn {
  background: linear-gradient(45deg, #23b071, #2a805a);
  color: #fff !important;
  padding: 15px 40px;
  font-size: 22px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none !important;
}
.trans-btn {
  background: transparent;
  border: 2px solid #fff;
  color: #fff !important;
  padding: 13px 35px;
  font-size: 22px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none !important;
  margin-left: 20px;
}
ul.navbar-nav {
  display: flex;
  align-items: center;
}
.banner-btns {
  margin-top: 30px;
}
.green-girl {
  position: absolute;
  bottom: 0;
  right: 0;
  width: auto;
  height: 70%;
}
.banner-content {
  margin-top: 90px;
}
.header ul li a {
  padding: 5px 20px !important;
  border-radius: 30px;
  transition: 0.4s;
}
.header ul li a:hover {
  background-color: #0e2648;
  transition: 0.4s;
}
.dropdown-menu {
  background-color: #1a3a67;
  text-align: right;
  padding: 10px 10px !important;
}
.dropdown-menu a {
  color: black;
  border-radius: 5px !important;
}
.dropdown-menu a:hover {
  background-color: #1c3f72;
  color: #fff;
  transition: 0.4s;
}
.dropdown-toggle::after {
  display: none;
}
.search_bar button {
  position: absolute;
  background: no-repeat;
  border: none;
  color: #fff;
  top: 7px;
  right: 8px;
}
.search_bar {
  position: relative;
  margin-right: 30px;
}
.search_bar input {
  background: #0f223f;
  border: 1px solid #4275bc;
  border-radius: 30px;
  color: #fff;
  padding: 8px 13px;
  width: 300px;
}
.search_bar input::placeholder {
  color: #fff;
}
.dropdown-menu.profile {
  background: #fff;
  left: -125px;
  top: 44px;
}
.dropdown-menu.profile a {
  font-weight: 600;
  color: #112644;
}
.dropdown-menu.profile a:hover {
  color: #fff;
}
.selectField {
  background: #203c65;
  border-radius: 30px;
  padding: 5px 10px;
  font-size: 14px;
}
.selectField select {
  border: none;
  color: #fff;
  background: #203c65;
}
.selectField select:focus {
  outline: none;
}
.singer {
  background-color: #102441;
  height: 130px;
  padding: 10px 20px;
  border-radius: 8px;
}
.singer h3 {
  color: #fff;
  font-size: 22px;
  text-transform: capitalize;
}
.tiktok {
  background-color: #10411e;
  height: 130px;
  padding: 10px 20px;
  border-radius: 8px;
}
.tiktok h3 {
  color: #fff;
  font-size: 22px;
  text-transform: capitalize;
}
.sports {
  background-color: #261041;
  height: 130px;
  padding: 10px 20px;
  border-radius: 8px;
}
.sports h3 {
  color: #fff;
  font-size: 22px;
  text-transform: capitalize;
}
.television {
  background-color: #401041;
  height: 130px;
  padding: 10px 20px;
  border-radius: 8px;
}
.television h3 {
  color: #fff;
  font-size: 22px;
  text-transform: capitalize;
}
.influencers {
  background-color: #411025;
  height: 130px;
  padding: 10px 20px;
  border-radius: 8px;
}
.influencers h3 {
  color: #fff;
  font-size: 22px;
  text-transform: capitalize;
}
.owl-dots {
  display: none;
}
button.owl-next {
  display: none !important;
  right: -30px;
  position: absolute;
  top: 17%;
  background: transparent !important;
  width: 25px;
  color: #000 !important;
  font-size: 39px !important;
}
button.owl-prev {
  display: none !important;
  left: -30px;
  position: absolute;
  top: 17%;
  background: transparent !important;
  width: 25px;
  color: #000 !important;
  font-size: 39px !important;
}
button:focus {
  outline: none;
}
.categories {
  margin: 50px 0px;
}
.heading1 {
  color: #fff;
  padding-bottom: 15px;
}
.cardbg {
  height: 250px;
  background-size: cover;
}
.feature-talent-card {
  background: #102441;
  box-shadow: 0px 4px 20px #00000059;
  margin-bottom: 10px;
}
.col-md-3 {
  padding: 0px 6px;
}
.card-details h5 span {
  background: #1a355b;
  padding: 4px 11px;
  border-radius: 18px;
}
.feature-talent-card h4 {
  color: #fff;
  font-size: 22px;
  padding: 10px 15px;
}
.card-details h5 {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
}
.card-details p i {
  font-size: 16px;
}

.card-details p {
  color: #fff;
  font-size: 12px;
}
.card-details {
  display: flex;
  justify-content: space-between;
  padding: 0px 15px;
  padding-bottom: 5px;
}
.head_flex {
  display: flex;
  justify-content: space-between;
}
.head_flex a {
  color: #fff;
  text-decoration: underline;
  font-weight: 500;
}
.feature-talent {
  margin: 50px 0px;
}

.articlecardbg {
  height: 150px;
  background-size: cover;
}
.articles-card {
  background: #fff;
  border-radius: 7px;
  margin-bottom: 10px;
}
.padd_20 {
  padding: 20px;
}
.articles-card p {
  font-size: 13px;
  color: #061428;
  font-weight: 500;
  word-spacing: 2px;
  letter-spacing: 1px;
}

.articles-card h4 {
  font-size: 22px;
  font-weight: 800;
  color: #061428;
}
.articles-card-a a {
  text-decoration: underline;
  color: #061428;
  font-size: 15px;
  font-weight: 700;
}

.articles-card-a {
  text-align: right;
}
.footer {
  background: #000;
  padding: 50px 0px;
  color: #fff;
}
.footer-card p {
  font-size: 14px;
  color: #ddd;
}

.footer-card h5 {
  font-size: 16px;
  padding-bottom: 10px;
}
.join input {
  background: #0f223f;
  border: 1px solid #4275bc;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 30px;
  width: 100%;
  color: #fff;
}
.join input::placeholder {
  color: #fff;
}
.join {
  width: 65%;
  position: relative;
}
.join button {
  position: absolute;
  right: 0;
  background: #36609b;
  border: none;
  color: #fff;
  bottom: 0;
  top: 0;
  border-radius: 30px;
  font-size: 14px;
  padding: 0px 27px;
}
.footer-card li a {
  color: #fff;
  font-size: 13px;
  text-decoration: none;
}
.footer-card li {
  list-style-type: none;
  padding-bottom: 12px;
}
.footer-down h5 {
  font-size: 16px;
  padding-bottom: 10px;
}
.footer-down button {
  background: linear-gradient(45deg, #23b071, #2a805a);
  color: #fff !important;
  padding: 13px 30px;
  font-size: 15px;
  border-radius: 30px;
  font-weight: 600;
  border: none;
}
.footer-down img {
  width: auto;
  height: 25px;
}

.footer-down p {
  font-size: 14px;
  text-align: right;
}
.articles {
  margin-bottom: 50px;
}

.log-form {
  background-color: #061428;
}
.inner-log-form {
  background: #0e213e;
  padding: 50px 70px;
  width: 45%;
  margin: 50px auto;
  text-align: center;
}
.inner-log-form form {
  text-align: left;
}
.inner-log-form img {
  width: auto;
  height: 35px;
}

.inner-log-form h6 {
  color: #ddd;
  font-size: 16px;
  font-weight: 400;
  padding: 12px 0px;
}
.inner-log-form input {
  border: 1px solid #4a6c9b;
  background: transparent !important;
  color: #8aa5cb !important;
  padding: 25px 15px;
  border-radius: 6px;
}
.inner-log-form input::placeholder {
  color: #8aa5cb;
}
.inner-log-form label {
  color: #b2c7e3;
  font-size: 15px;
  font-weight: 400;
}
.fp {
  margin-bottom: 30px;
}

.fp a {
  color: #8aa5cb;
}
.log-green-btn button {
  background: linear-gradient(45deg, #23b071, #2a805a);
  border: none;
  color: #fff;
  width: 100%;
  font-size: 18px;
  padding: 11px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: 400;
}
.inner-log-form h5 a {
  color: #fff;
  font-weight: 600;
}

.inner-log-form h5 {
  font-size: 14px;
  color: #8aa5cb;
  font-weight: 400;
}
.google-btn {
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: #fff;
  color: #757575;
  font-weight: 500;
  margin-bottom: 10px;
}
.facebook-btn {
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: #4267b2;
  color: #fff;
  font-weight: 500;
  margin-bottom: 10px;
}
.divider span {
  color: #4b6e9f;
  text-transform: uppercase;
}
.divider {
  text-align: center;
  margin: 20px 0px;
  position: relative;
}
.divider::before {
  position: absolute;
  content: "";
  background-color: #4b6e9f;
  height: 1px;
  width: 40%;
  left: 0;
  top: 50%;
}
.divider::after {
  position: absolute;
  content: "";
  background-color: #4b6e9f;
  height: 1px;
  width: 40%;
  right: 0;
  top: 50%;
}

.google-btn img {
  width: auto;
  height: 25px;
  margin-right: 15px;
}
.facebook-btn img {
  width: auto;
  margin-right: 15px;
  height: 25px;
}
.inner-log-form label a {
  color: #fff;
  text-decoration: underline;
  font-weight: 500;
}
.talent-banner {
  height: 400px;
  background-size: cover;
}
.blog {
  background: #fff;
  padding: 50px 0px;
}
.blog-articles {
  background: #fff;
  padding-bottom: 50px;
}
.blog-articles h2 {
  color: #353535;
  font-size: 30px;
  font-weight: 800;
  padding-bottom: 15px;
}
.blog-head h6 {
  color: #7a7a7a;
  font-size: 14px;
}
.blog-head h6 a {
  color: #7a7a7a;
  text-decoration: none;
}
.blog-head h2 {
  font-weight: 700;
  color: #061428;
  font-size: 26px;
}
.blog-text h2 {
  font-weight: 700;
  color: #061428;
  font-size: 26px;
  padding-top: 40px;
}
.blog-head p {
  font-size: 14px;
  color: #a1a1a1;
}
.blog-text p {
  color: #353535;
  font-size: 15px;
  font-weight: 500;
}
.blog-img img {
  width: 100%;
}
</style>
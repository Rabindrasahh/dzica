<template>
  <div class="banner">
    <div class="header">
      <div class="container">
        <nav class="navbar navbar-expand-md navbar-dark">
          <router-link class="navbar-brand" to="/"
            ><img src="../../assets/img/logos/white.png"
          /></router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          ></button>

          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  >Categories <i class="fa fa-angle-down" aria-hidden="true"></i
                ></a>
                <div class="dropdown-menu">
                  <router-link
                    v-for="category in categories"
                    :key="category._id"
                    class="dropdown-item"
                    :to="{
                      name: 'allTalents',
                      query: { category: category.name },
                    }"
                  >
                    {{ category.name }}
                  </router-link>
                </div>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/talents"
                  >Talents</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/blog">Blog</router-link>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <div class="search_bar">
                  <input
                    type="search"
                    placeholder="Search.."
                    autocomplete="on"
                    name="search"
                    v-model="query"
                  />
                  <button>
                    <router-link
                      :to="{ name: 'allTalents', query: { search: query } }"
                      type="submit"
                    >
                      <i class="fa fa-search"></i>
                    </router-link>
                  </button>
                </div>
              </li>
              <li class="nav-item selectField">
                <select>
                  <option>English</option>
                  <option>Duch</option>
                  <option>Spanish</option>
                  <option>Romanian</option>
                </select>
              </li>
              <li class="nav-item dropdown">
                <router-link
                  :to="{ name: 'login' }"
                  class="btn btn-outline-dark mb-0 ms-3"
                  v-if="!isAuth"
                >
                  <i class="fa-duotone fa-shield"></i>
                  <span class="ms-2 mb-2">LOGIN</span>
                </router-link>
                <div class="dropdown" v-else>
                  <button
                    class="btn btn-link"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                  >
                    <i
                      class="fa-duotone fa-user"
                      :style="{ color: 'white' }"
                    ></i>
                    <span class="ms-2" :style="{ color: 'white' }"
                      >Account</span
                    >
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'userPanelCompletedOrders' }"
                        >Profile</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'userPanelCompletedOrders' }"
                        >Orders</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: panelLink }"
                        >Saved</router-link
                      >
                    </li>
                    <li>
                      <button
                        @click="$store.dispatch('auth/logout')"
                        class="dropdown-item text-danger"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <header class="header-rounded-images vh-100">
      <div class="container">
        <div class="banner-content">
          <h1>Personalized videos <br />from your favorite stars.</h1>
          <p>
            Accesss thousands of celebrities and request a personalized video
            <br />message for any occasion.
          </p>
          <div class="banner-btns">
            <button
              type="button"
              @click="explore"
              class="btn btn-lg bg-gradient-main text-white btn-rounded me-2"
            >
              Explore
            </button>
            <router-link
              to="/enrole"
              type="button"
              class="btn btn-lg btn-outline-white btn-rounded ms-xl-3"
              >Join as celebrity</router-link
            >
          </div>
          <img
            class="green-girl"
            src="../../assets/img/logos/images/banner-img.png"
          />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuthenticated"];
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
    panelLink() {
      const role = this.$store.getters["auth/getUserRole"];
      if (role === "admin") return "adminPanelTalentsPending";
      if (role === "talent") return "talentPanelProfile";
      if (role === "user") return "userPanelCompletedOrders";
      else return "";
    },
  },
  methods: {
    toggle() {
      const navigation = document.querySelector("#navigation");
      const isToggled = navigation.classList.contains("show");
      if (isToggled) {
        navigation.classList.remove("show");
        navigation.classList.remove("animation");
      } else {
        navigation.classList.add("show");
        navigation.classList.add("animation");
      }
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
  mounted() {
    if (this.$store.getters["auth/getUserRole"] === undefined && this.isAuth)
      this.$store.dispatch("auth/getUserRole");
  },
};
</script>

<style scoped>
/* @import '/assets/css/all.css'; */
.navbar-brand img {
  max-width: 150px !important;
}
/* .dropdown-menu a {
  color: #0b1d35;
  border-radius: 5px !important;
} */
@media only screen and (max-width: 767px) {
  .inner-log-form {
    width: 100%;
  }
}
</style>
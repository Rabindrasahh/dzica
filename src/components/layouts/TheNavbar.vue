<template>
  <div class="header">
    <div class="container">
      <nav class="navbar navbar-expand-md navbar-dark">
        <router-link class="navbar-brand" :to="{ name: 'index' }"
          ><img src="../../assets/img/logos/white.png"
        /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
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
                <span class="ms-2">LOGIN</span>
              </router-link>
              <div class="dropdown ms-3" v-else>
                <button
                  class="btn btn-link"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                >
                  <i class="fa-duotone fa-user" :style="{ color: 'white' }"></i>
                  <span class="ms-2" :style="{ color: 'white' }">Account</span>
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
                    <router-link class="dropdown-item" :to="{ name: panelLink }"
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
  },
  mounted() {
    if (this.$store.getters["auth/getUserRole"] === undefined && this.isAuth)
      this.$store.dispatch("auth/getUserRole");
    console.log(process.env.VUE_APP_ROOT_API);
  },
};
</script>

<style scoped>
@import "/dzicace/dist/assets/css/all.css";

.header {
  background-color: #0b1d35;
}
.navbar-brand img {
  max-width: 150px !important;
}
</style>

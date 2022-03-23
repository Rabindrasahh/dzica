<template>
  <router-view v-slot="{ Component }">
    <transition name="router" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
import "bootstrap";
import "jquery";
import "@popperjs/core";
import "./assets/js/soft-ui-dashboard";
export default {
  created() {
    this.$store.dispatch("auth/autoLogin");
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters["auth/didAutoLogout"];
    },
  },
  name: "App",
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&display=swap");
</style>
<style lang="scss">
@import url("./assets/css/soft-ui-pro.css");
@import url("./assets/css/font-awesome.min.css");
@import "./assets/scss/_variables.scss";
* {
  font-family: "Outfit", sans-serif;
}
body {
  background-color: #061428 !important;
}
label {
  font-size: 14px;
}
tr {
  vertical-align: middle;
}
/* Router Transition  */
.router-enter-from,
.router-leave-to {
  opacity: 0;
}
.router-enter-active {
  transition: all 0.25s ease-out;
}
.router-leave-active {
  transition: all 0.25s ease-in;
}
.router-enter-to,
.router-leave-from {
  opacity: 1;
}
.bg-gradient-main {
  background-image: linear-gradient(
    310deg,
    $color-ocean-green-2,
    $color-emerald-green
  );
}
.text-emerald {
  color: $color-emerald-green !important;
}
.text-bottle {
  color: $color-bottle-green !important;
}
.btn-outline-emerald {
  color: $color-emerald-green;
  border-color: $color-emerald-green;
  box-shadow: none;
}
.item {
  display: inline-block;
  width: 90%;
}
.cate_box {
  height: 140px;
  border-radius: 10px;
  text-align: left;
  padding: 10px 20px;
}
.banner {
  position: relative;
}
@media only screen and (max-width: 767px) {
  .green-girl {
    display: none;
  }
  li.carousel__slide.carousel__slide--visible {
    width: 50% !important;
  }
  li.carousel__slide.carousel__slide--prev {
    width: 17% !important;
  }
  .inner-log-form {
    width: 100% !important;
    padding: 50px 40px !important;
  }
  .Influencers {
    background-color: #411025;
    height: 130px;
    padding: 10px 20px;
    border-radius: 8px;
  }
  .Influencers h3 {
    color: #fff;
    font-size: 22px;
    text-transform: capitalize;
  }
}
</style>
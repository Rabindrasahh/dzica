<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="footer-card">
            <h5>Rejoignez notre liste de diffusion</h5>
            <p>
              Soyez les premiers à être informés des nouvelles stars<br />et des
              meilleures offres sur Dzicace.
            </p>
            <div class="join">
              <input type="text" placeholder="ali@goubba.com" />
              <button type="submit">Join now</button>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="footer-card">
            <h5>My account</h5>
            <li>
              <router-link :to="{ name: 'userPanelCompletedOrders' }"
                >Profile</router-link
              >
            </li>
            <li><a href="#">Favorite</a></li>
            <li><a href="#">My orders</a></li>
          </div>
        </div>
        <div class="col-md-2">
          <div class="footer-card">
            <h5>Discover</h5>
            <li><a href="#">Popular stars</a></li>
            <li><a href="#">Features Stars</a></li>
            <li>
              <router-link class="nav-link" :to="{ name: 'allCategories' }"
                >Categories</router-link
              >
            </li>
          </div>
        </div>
        <div class="col-md-2">
          <div class="footer-card">
            <h5>Dzicace</h5>
            <li><a href="#">About us</a></li>
            <li><router-link :to="{ name: 'TheFAQ' }">FAQ</router-link></li>
            <li>
              <router-link :to="{ name: 'login' }">Contact us</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'ThePolicy' }"
                >Privacy Policy</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'TheTermAndCondition' }"
                >Terms of use</router-link
              >
            </li>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="footer-down">
            <h5>Join our community, it is Free!</h5>
          </div>
        </div>
        <div class="col-md-6">
          <div class="footer-down">
            <router-link :to="{ name: 'login' }">
              <button type="button">Enroll as a talent</button>
            </router-link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="footer-down">
            <p>
              All right reserved 2022
              <img src="../../assets/img/logos/white.png" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";
</style>
<template>
  <div class="background">
    <the-navbar></the-navbar>
    <div
      :style="{
        backgroundImage:
          'url(' + require('@/assets/img/logos/images/talentbg.png') + ')',
      }"
      class="talent-banner"
    ></div>
    <div class="blog">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="blog-head">
              <h6><a href="#">Dzicace</a>/Blog</h6>
              <h2>Newbeach expend to Algerian east side</h2>
              <p>
                <span>by Raouf</span> <span>Last updated Jul 29, 2021</span>
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="blog-text">
              <p>
                If you are looking for the best things to see in Broome, then
                you came to the right place.
              </p>
              <p>
                We really liked Broome. After driving through the Australian
                outback and Northern territory we were really looking forward to
                hopping into the water. Luckily Broome has many beautiful
                beaches, stunning sunsets, and happy camels running around the
                beach.
              </p>
              <p>
                If you are looking for the best things to see in Broome, then
                you came to the right place.
              </p>
              <p>
                We really liked Broome. After driving through the Australian
                outback and Northern territory we were really looking forward to
                hopping into the water. Luckily Broome has many beautiful
                beaches, stunning sunsets, and happy camels running around the
                beach.
              </p>
              <p>
                Broome also has the biggest tides in the Southern Hemisphere
                with a difference of up to 10 meters between high and low
                tide.Broome also has the biggest tides in the Southern
                Hemisphere with a difference of up to 10 meters between high and
                low tide.
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="blog-img">
              <img src="../../assets/img/logos/images/blog.png" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="blog-text">
              <h2>Next step</h2>
              <p>
                If you are looking for the best things to see in Broome, then
                you came to the right place.
              </p>
              <p>
                We really liked Broome. After driving through the Australian
                outback and Northern territory we were really looking forward to
                hopping into the water. Luckily Broome has many beautiful
                beaches, stunning sunsets, and happy camels running around the
                beach.We really liked Broome. After driving through the
                Australian outback and Northern territory we were really looking
                forward to hopping into the water. Luckily Broome has many
                beautiful beaches, stunning sunsets, and happy camels running
                around the beach.
              </p>
              <p>
                Broome also has the biggest tides in the Southern Hemisphere
                with a difference of up to 10 meters between high and low tide.
              </p>
            </div>
          </div>
          <div class="col-md-12">
            <div class="blog-text">
              <h2>What’s next?</h2>
              <p>
                If you are looking for the best things to see in Broome, then
                you came to the right place.
              </p>
              <p>
                We really liked Broome. After driving through the Australian
                outback and Northern territory we were really looking forward to
                hopping into the water. Luckily Broome has many beautiful
                beaches, stunning sunsets, and happy camels running around the
                beach.
              </p>
              <p>
                Broome also has the biggest tides in the Southern Hemisphere
                with a difference of up to 10 meters between high and low tide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="d-flex flex-wrap">
        <h2 class="text-uppercase text-dark">More Blog</h2>
        <router-link
          :to="{ name: 'articles' }"
          class="btn btn-outline-emerald ms-auto"
          >View More &rarr;</router-link
        >
      </div>
      <div class="row justify-content-around">
        <article-card
          v-for="article in articles"
          :key="article"
          :data="article"
        ></article-card>
      </div>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
export default {
  components: "TheBlog",
  computed: {
    articles() {
      return this.$store.getters["site/indexData"].articles;
    },
  },
};
</script>

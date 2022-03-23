<template>
  <div class="card">
    <div class="card-header bg-gradient-main">
      <h4 class="text-white">My Reviews</h4>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <th>Client name</th>
            <th>Content</th>
            <th>Rating</th>
          </thead>
          <tbody>
            <tr v-for="rev in reviews" :key="rev._id">
              <td>{{ rev.userId.fullName }}</td>
              <td>{{ rev.comment.content }}</td>
              <td>{{ rev.comment.rating }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row justify-content-center">
        <the-pagination
          :data-in-each-page="dataInEachPage"
          :data-length="totalItems"
          @navigate-page="init"
        ></the-pagination>
      </div>
    </div>
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
  </div>
</template>

<script>
export default {
  name: "MyReviews",
  data() {
    return {
      dataInEachPage: 10,
      totalItems: 0,
      isLoading: false,
    };
  },
  methods: {
    async init(page = 1) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("talent/getMyReviews", {
          skip: (page - 1) * this.dataInEachPage,
          limit: this.dataInEachPage,
        });
        this.totalItems = this.$store.getters["talent/myReviews"].totalItems;
      } catch (err) {
        this.$swal({
          icon: "error",
          text: err.message,
        });
      }
      this.isLoading = false;
    },
  },
  computed: {
    reviews() {
      return this.$store.getters["talent/myReviews"].reviews;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
tr {
  vertical-align: middle;
}
</style>


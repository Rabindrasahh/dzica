<template>
  <div class="">
    <the-navbar></the-navbar>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div class="card z-index-0 mt-sm-10 mt-7 mb-4">
              <div class="card-header text-center pt-4 pb-1">
                <h4 class="font-weight-bolder text-emerald mb-1">
                  Reset Password
                </h4>
              </div>
              <div class="card-body">
                <form @submit.prevent="submitForm">
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': v$.email.$error }"
                      placeholder="Email"
                      v-model="email"
                    />
                    <span v-if="v$.email.$error" class="text-sm text-danger">
                      {{ v$.email.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="text-center">
                    <button
                      type="submit"
                      class="btn bg-gradient-main text-white w-100 my-4 mb-2"
                    >
                      Reset Password
                    </button>
                  </div>
                  <p class="text-sm text-center mt-3 mb-0">
                    Already have an account?
                    <router-link
                      :to="{ name: 'login' }"
                      class="text-bottle font-weight-bolder"
                      >Login</router-link
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <the-footer></the-footer>
      </div>
    </section>
    <loading :can-cancel="true" v-model:active="isLoading" />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      email: {
        required: helpers.withMessage("Please Enter Your Email", required),
        email: helpers.withMessage("Please Enter Your Email Correctly", email),
      },
    };
  },
  data() {
    return {
      email: "",
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      const result = await this.v$.$validate();

      if (result) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("auth/resetPasswordRequest", {
            email: this.email,
          });
          this.$swal({
            icon: "success",
            text: "The reset password email was sent to your email",
          });
          setTimeout(() => {
            this.$router.replace({ name: "index" });
          }, 2000);
        } catch (err) {
          this.$swal({
            icon: "error",
            text: err.message,
          });
        }
        this.isLoading = false;
      }
    },
  },
  created() {
    document.body.style.backgroundColor = "#e9ecef";
  },
};
</script>

<style >
</style>
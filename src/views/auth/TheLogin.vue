<template>
  <div>
    <the-navbar></the-navbar>
    <section>
      <div class="log-form">
        <div class="container">
          <div class="inner-log-form">
            <img src="../../assets/img/logos/white.png" />
            <h6>Login to DZicace to continue</h6>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="email">Email</label>
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
              <div class="form-group">
                <label for="pwd">Password</label>
                <input
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': v$.password.$error }"
                  placeholder="Password"
                  v-model="password"
                />
                <span v-if="v$.password.$error" class="text-sm text-danger">
                  {{ v$.password.$errors[0].$message }}
                </span>
              </div>
              <div class="fp">
                <router-link
                  :to="{ name: 'resetPasswordRequest' }"
                  class="text-bottle font-weight-bolder"
                  >Reset password</router-link
                >
              </div>
              <div class="log-green-btn">
                <button type="submit">Continue</button>
              </div>
              <h5>
                Don't have an account?<router-link
                  :to="{ name: 'signup' }"
                  class="text-bottle font-weight-bolder"
                  >Sign up</router-link
                >
              </h5>
              <div class="divider">
                <span>or</span>
              </div>
              <button type="button" class="google-btn">
                <img src="../../assets/img/logos/images/google.png" /> Continue
                with Google
              </button>
              <button type="button" class="facebook-btn">
                <img src="../../assets/img/logos/images/fb.png" /> Continue with
                Facebook
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <loading :can-cancel="true" v-model:active="isLoading" />
    <the-footer></the-footer>
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
      password: {
        required: helpers.withMessage("Please Enter Your Password", required),
      },
    };
  },
  data() {
    return {
      email: "",
      password: "",
      prevRoute: null,
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      const result = await this.v$.$validate();

      if (result) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("auth/login", {
            password: this.password,
            email: this.email,
          });
          if (
            this.prevRoute.name !== "signup" &&
            this.prevRoute.name !== "resetPassword"
          )
            this.$router.replace(this.prevRoute.path);
          else this.$router.replace({ name: "index" });
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
};
</script>
<style>
body {
  background-color: #061428 !important;
}
</style>



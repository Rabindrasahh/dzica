<template>
  <div class="">
    <the-navbar></the-navbar>
    <section>
      <div class="log-form">
        <div class="container">
          <div class="inner-log-form">
            <img src="../../assets/img/logos/white.png" />
            <h6>Book personalized video shoutouts from your favorite people</h6>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Full name</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': v$.fullName.$error }"
                  placeholder="Full Name"
                  v-model="fullName"
                />
                <span v-if="v$.fullName.$error" class="text-sm text-danger">
                  {{ v$.fullName.$errors[0].$message }}
                </span>
              </div>

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
              <div class="form-group form-check">
                <label class="form-check-label">
                  <input
                    class="form-check-input p-0"
                    type="checkbox"
                    id="flexCheckDefault"
                    v-model="isAgree"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    I agree the
                    <router-link
                      :to="{ name: 'TheTermAndCondition' }"
                      class="text-bright font-weight-bolder"
                      >Terms and Conditions</router-link
                    >
                  </label>
                  <span
                    v-if="v$.isAgree.$error"
                    class="text-sm text-danger d-block"
                  >
                    {{ v$.isAgree.$errors[0].$message }}
                  </span>
                </label>
              </div>
              <div class="log-green-btn">
                <button type="submit">Sign up</button>
              </div>
              <h5>
                Already have an account?<router-link
                  :to="{ name: 'login' }"
                  class="text-bottle font-weight-bolder"
                  >Sign in</router-link
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
        <the-footer></the-footer>
      </div>

      <loading :can-cancel="true" v-model:active="isLoading" />
    </section>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";

const isTrue = (value) => value;
export default {
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      fullName: {
        required: helpers.withMessage("Please Enter Your Full Name", required),
      },
      email: {
        required: helpers.withMessage("Please Enter Your Email", required),
        email: helpers.withMessage("Please Enter Your Email Correctly", email),
      },
      password: {
        required: helpers.withMessage("Please Enter Your Password", required),
      },
      isAgree: {
        isTrue: helpers.withMessage("Please Accept The Agreements", isTrue),
      },
    };
  },
  data() {
    return {
      isLoading: false,
      fullName: "",
      email: "",
      password: "",
      isAgree: false,
      prevRoute: null,
    };
  },
  methods: {
    async submitForm() {
      const result = await this.v$.$validate();

      if (result) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("auth/signup", {
            fullName: this.fullName,
            password: this.password,
            email: this.email,
            setToken: true,
          });
          this.$router.replace(this.prevRoute.path);
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


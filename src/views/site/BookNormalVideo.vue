<template>
  <div>
    <the-navbar></the-navbar>
    <div class="personal">
      <div class="container">
        <div class="inner-personal">
          <h6>Receive a personalized video message from {{ talent.name }}</h6>
          <form @submit.prevent="submitForm">
            <div class="video">
              <p>Who is the video message intended for?</p>
              <div class="personal-radio">
                <p>
                  <input
                    type="radio"
                    id="test1"
                    name="owner"
                    v-model="videoOwner"
                  />
                  <label for="test1">Price</label>
                </p>
                <p class="personal-radio">
                  <input
                    type="radio"
                    id="test2"
                    value="Review"
                    v-model="videoOwner"
                    name="owner"
                  />
                  <label for="test2">Number of reviews</label>
                </p>
              </div>
              <div class="personal-group">
                <label for="name">Your Name</label>
                <input
                  type="text"
                  v-model="name"
                  class="personal-group"
                  placeholder="Your Name"
                  :class="{ 'is-invalid': v$.name.$error }"
                />
                <span v-if="v$.name.$error" class="text-sm text-danger">
                  {{ v$.name.$errors[0].$message }}
                </span>
              </div>

              <div class="personal-group">
                <label for="text">For which occasion</label>
                <div class="form-group">
                  <select
                    class="form-control"
                    id="sel1"
                    name="sellist1"
                    v-model="occasion"
                    :class="{ 'is-invalid': v$.occasion.$error }"
                  >
                    <option value="" disabled="">Choose an occasion</option>
                    <option>
                      <i class="fa fa-birthday-cake" aria-hidden="true"></i
                      >🎁Birthday
                    </option>
                    <option>
                      <i class="fa fa-birthday-cake" aria-hidden="true"></i
                      >🎉Congartulations
                    </option>
                    <option>
                      <i class="fa fa-question-circle" aria-hidden="true"></i
                      >❓Questions
                    </option>
                    <option>
                      <i class="fa fa-question-circle" aria-hidden="true"></i
                      >🧐Tips
                    </option>
                    <option>
                      <i class="fa fa-question-circle" aria-hidden="true"></i>
                      🔎Other
                    </option>
                  </select>
                </div>
              </div>

              <div class="personal-group">
                <label for="email">Delivery Email</label>
                <input
                  type="email"
                  class="personal-group"
                  placeholder="Delivery Email"
                  v-model="email"
                  :class="{ 'is-invalid': v$.email.$error }"
                />
                <span v-if="v$.email.$error" class="text-sm text-danger">
                  {{ v$.email.$errors[0].$message }}
                </span>
              </div>

              <div class="form-group1">
                <label for="comment">Instructions</label>
                <textarea
                  class="form-control"
                  rows="5"
                  id="comment"
                  name="text"
                  v-model="instructions"
                  :class="{ 'is-invalid': v$.instructions.$error }"
                ></textarea>
                <span v-if="v$.instructions.$error" class="text-sm text-danger">
                  {{ v$.instructions.$errors[0].$message }}
                </span>
              </div>

              <div class="profile">
                <label class="box">
                  <span class="five"
                    >Make this video visible on {{ talent.name }} profile</span
                  >
                  <input type="checkbox" v-model="visibleOnProfile" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="order-btn">
                <button type="submit">
                  ORDER FOR DA {{ talent.normalPrice }}
                </button>
              </div>
            </div>
          </form>
          <form
            @submit.prevent="doPayment"
            :class="{ 'd-none': !showPaymentBox }"
          >
            <div class="mt-3" id="payment-element">
              <hr />
            </div>
            <div class="text-center mt-3">
              <button
                class="btn bg-gradient-dark mt-3 text-lg w-100 w-md-50"
                type="submit"
              >
                <i class="fa-duotone fa-credit-card me-2"></i>
                <span> PAY </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <loading :can-cancel="false" v-model:active="isLoading" />
    </div>

    <the-footer></the-footer>
  </div>
</template>

<script>
const someoneVerify = function (value) {
  if (!value && this.videoOwner === "Someone") return false;
  else return true;
};
const meVerify = function (value) {
  if (!value && this.videoOwner === "Me") return false;
  else return true;
};

import useVuelidate from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
export default {
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      name: {
        meVerify: helpers.withMessage("Please Enter Your Name", meVerify),
      },
      to: {
        someoneVerify: helpers.withMessage(
          "Please Enter To field",
          someoneVerify
        ),
      },
      from: {
        someoneVerify: helpers.withMessage(
          "Please Enter From Field",
          someoneVerify
        ),
      },
      occasion: {
        required: helpers.withMessage("Please Enter the Occasion", required),
      },
      instructions: {
        required: helpers.withMessage(
          "Please Enter Your Instructions",
          required
        ),
      },
      email: {
        required: helpers.withMessage("Please Enter Your Email", required),
        email: helpers.withMessage("Please Enter Your Email Correctly", email),
      },
    };
  },
  props: ["talentId"],
  data() {
    return {
      videoOwner: "",
      from: "",
      to: "",
      name: "",
      occasion: "",
      email: "",
      instructions: "",
      visibleOnProfile: false,
      isLoading: false,
      showPaymentBox: false,
      stripe: {},
      elements: {},
    };
  },
  methods: {
    async init() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("talent/getTalent", {
          talentId: this.talentId,
        });
      } catch (err) {
        this.$swal({
          icon: "error",
          text: err.message,
        });
      }
      this.isLoading = false;
    },
    async submitForm() {
      const result = await this.v$.$validate();
      if (!result) return;

      this.isLoading = true;
      try {
        // get payment intent
        await this.$store.dispatch("site/getPaymentIntent", {
          talentId: this.talentId,
          type: "normal",
        });
        const clientSecret =
          this.$store.getters["site/paymentIntent"]?.clientSecret;
        this.showPaymentBox = true;

        // STRIPE INIT

        const appearance = {
          theme: "stripe",
        };
        this.elements = this.stripe.elements({
          appearance,
          clientSecret,
        });
        const paymentElement = this.elements.create("payment");
        paymentElement.mount("#payment-element");

        // set payment data in localstorage
        localStorage.setItem(
          "o",
          JSON.stringify({
            type: "Normal",
            videoOwner: this.videoOwner,
            from: this.from,
            to: this.to,
            name: this.name,
            occasion: this.occasion,
            instructions: this.instructions,
            email: this.email,
            isPublicOnProfile: this.visibleOnProfile,
            talentId: this.talentId,
          })
        );
      } catch (err) {
        this.$swal({
          icon: "error",
          text: err.message,
        });
      }
      this.isLoading = false;
    },
    async doPayment() {
      this.isLoading = true;

      const { error } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          // Make sure to change this to your payment completion page

          return_url: `https://dzicace.netlify.app${window.location.pathname}`,
        },
      });
      if (error.type === "card_error" || error.type === "validation_error") {
        this.$swal({
          icon: "error",
          text: error.messsage,
        });
      }
    },
    async verifyPayment() {
      this.isLoading = true;
      const clientSecret = this.$route.query.payment_intent_client_secret;
      if (!clientSecret) return;

      const { paymentIntent } = await this.stripe.retrievePaymentIntent(
        clientSecret
      );
      const status = paymentIntent.status;
      const paymentId = paymentIntent.id;

      if (status === "succeeded") {
        let data = localStorage.getItem("o");
        data = JSON.parse(data);
        await this.$store.dispatch("site/bookVideo", {
          ...data,
          paymentId,
        });

        this.$swal({
          icon: "success",
          text: "Your purchase was successfull!",
        });
        localStorage.removeItem("o");
        this.$router.replace({ name: "userPanelPendingOrders" });
      } else if (status === "processing") {
        this.$swal({
          icon: "warning",
          text: "Your purchase is processing",
        });
      } else if (status === "requires_payment_method") {
        this.$swal({
          icon: "error",
          text: "Your payment was not successful, please try again.",
        });
      } else {
        this.$swal({
          icon: "error",
          text: "Something went wrong.",
        });
      }
    },
  },
  computed: {
    talent() {
      return this.$store.getters["talent/talent"]?.talent;
    },
  },
  created() {
    this.stripe = global.Stripe(
      "pk_test_51KJ0PwABlJOAQIO6iCsxrVlLO5nasgOGUAJIHxo5ZpM6Z0vu713Lm8hRNNBzUdS5i04F40tlx39rLyjirL1Yx4KH0068wqg2vO"
    );

    // if payment completed, this block will run
    const paymentIntentQuery = this.$route.query.payment_intent_client_secret;
    if (paymentIntentQuery) this.verifyPayment();

    this.init();
  },
};
</script>
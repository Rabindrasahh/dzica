<template>
<div>
	<the-navbar></the-navbar>
	<div class="container mt-4 mt-md-7">
		<div class="row align-items-center">
			<div class="col-lg-6">
				<h2>Closer to your Fans than Ever! </h2>
				<h4>Do you want to ba a talent on
					<h2 class="text-bottle d-inline-block">Dzicace?</h2>

				</h4>
				<p class="text-bottle fw-bold mt-3">The only place where you can share happiness! Share your fans their special
					moments with funny, heartwarming and joyful videos </p>
			</div>
			<div class="col-lg-6 talent"></div>
		</div>
		<div class="mt-4">
			<div class="card">
				<div class="card-body p-md-6">
					<div class="row">
						<div class="col-lg-4 px-3 mt-lg-0 mt-3">
							<h4>
								<i class="fa-duotone fa-globe"></i>
								A click away, anywhere
							</h4>
							<p class="mt-4 fw-bold">
								30 seconds is all it takes, so wherever you are, a video to your fans is always an option!
								Dzicace can be done anytime, anywhere, let your creativity shine!
							</p>
						</div>
						<div class="col-lg-4 px-3 mt-lg-0 mt-3">
							<h4>
								<i class="fa-duotone fa-face-laugh-beam"></i>
								Wider Fan base
							</h4>
							<p class="mt-4 fw-bold">
								Searching for real connection? Be part of your fans' special occasions and share the joy of all moments,
								Dzicace makes this communication simpler than ever!
							</p>
						</div>
						<div class="col-lg-4 px-3 mt-lg-0 mt-3">
							<h4>
								<i class="fa-duotone fa-thumbs-up"></i>
								Give back
							</h4>
							<p class="mt-4 fw-bold">
								Are you seeking a noble sharing experience?
								Dzicace allows you to design your support experience with giving back your earnings to any charitable organization.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center align-items-center mt-7">
			<div class="col-lg-5">
				<h2 class="text-dark">
					<i class="fa-duotone fa-handshake"></i>
					How can I join to Dzicace?
				</h2>
				<p class="fw-bold text-lg mt-3 text-bottle"> In 4 days, you can accept or decline Fans Requests
					<br><br>
					Share the moment with your fans in 30-seconds video
					<br><br>
					Set the price and enjoy 75% of the earnings*
				</p>
			</div>
			<div class="col-lg-5 mt-4">
				<img
					src="../../assets/img/logo_white.svg"
					alt=""
				>
			</div>
		</div>
		<div class="row align-items-center mt-8">
			<div class="col-lg-6 calculator"></div>
			<div class="col-lg-6">
				<h3>
					<i class="fa-duotone fa-calculator"></i>
					Use this calculator to check earnings
				</h3>
				<p
					class="text-bottle fw-bold mt-3 text-lg"
					style="line-height:3"
				>
					If I'm priced at
					$<input
						type="text"
						class="form-control w-25 d-inline ms-2 me-2"
						v-model.number="price"
					>
					and complete
					<input
						type="text"
						class="form-control w-25 d-inline ms-2"
						v-model.number="count"
					> Starzly videos
				</p>
				<h2>I can earn about ${{ earning }} in {{ duration }} minutes.</h2>
			</div>
		</div>
		<div class="text-center mt-5">
			<button
				class="btn bg-gradient-main text-white w-100 w-md-50"
				style="font-size:28px"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
			>JOIN NOW!</button>
		</div>

		<!-- MODAL -->
		<div
			class="modal fade"
			id="exampleModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>JOIN AS TALENT</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p class="fw-bold">Join Dzicace as a talent today!
							Fill in the form and our team will get back to you within 24 hours.</p>
						<form @submit.prevent="joinTalent">
							<div class="mb-3">
								<input
									type="text"
									class="form-control"
									:class="{'is-invalid':v$.name.$error}"
									placeholder="Name"
									v-model="name"
								/>
								<span
									v-if="v$.name.$error"
									class="text-sm text-danger"
								>
									{{ v$.name.$errors[0].$message }}
								</span>
							</div>
							<div class="mb-3">
								<input
									type="text"
									class="form-control"
									:class="{'is-invalid':v$.email.$error}"
									placeholder="Email"
									v-model="email"
								/>
								<span
									v-if="v$.email.$error"
									class="text-sm text-danger"
								>
									{{ v$.email.$errors[0].$message }}
								</span>
							</div>
							<div class="mb-3">
								<input
									type="text"
									class="form-control"
									:class="{'is-invalid':v$.phoneNumber.$error}"
									placeholder="Whatsapp/Viber number"
									v-model="phoneNumber"
								/>
								<span
									v-if="v$.phoneNumber.$error"
									class="text-sm text-danger"
								>
									{{ v$.phoneNumber.$errors[0].$message }}
								</span>
							</div>
							<div class="mb-3">
								<Multiselect
									class="form-control"
									:class="{'is-invalid':v$.social.$error}"
									placeholder="Which social network do you rule?"
									v-model="social"
									:options="['Instagram','Youtube','Snapchat','TikTok','TV','Other']"
								/>
								<span
									v-if="v$.social.$error"
									class="text-sm text-danger"
								>
									{{ v$.social.$errors[0].$message }}
								</span>
							</div>
							<div class="mb-3">
								<input
									type="text"
									class="form-control"
									:class="{'is-invalid':v$.nickName.$error}"
									placeholder="Knows as?"
									v-model="nickName"
								/>
								<span
									v-if="v$.nickName.$error"
									class="text-sm text-danger"
								>
									{{ v$.nickName.$errors[0].$message }}
								</span>
							</div>
							<div class="mb-3">
								<input
									type="text"
									class="form-control"
									:class="{'is-invalid':v$.socialLink.$error}"
									placeholder="Social link"
									v-model="socialLink"
								/>
								<span
									v-if="v$.socialLink.$error"
									class="text-sm text-danger"
								>
									{{ v$.socialLink.$errors[0].$message }}
								</span>
							</div>
							<div class="mb-3">
								<input
									type="number"
									class="form-control"
									placeholder="How many followers do you have?"
									v-model.number="followers"
								/>
							</div>
							<div class="mb-3">
								<textarea
									type="text"
									class="form-control"
									:class="{'is-invalid':v$.description.$error}"
									v-model="description"
									placeholder="Bio (description)"
									rows="4"
								></textarea>
								<span
									v-if="v$.description.$error"
									class="text-sm text-danger"
								>
									{{ v$.description.$errors[0].$message }}
								</span>
							</div>
							<button
								type="submit"
								class="btn bg-gradient-main text-white w-100 text-lg"
							>JOIN</button>
						</form>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn bg-gradient-secondary"
							data-bs-dismiss="modal"
						>Close</button>
					</div>
				</div>
			</div>
		</div>
		<loading
			v-model:active="isLoading"
			:can-cancel="false"
			:is-full-page="true"
		/>
	</div>
</div>	

</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, email, numeric } from "@vuelidate/validators";

// const moreThanZero = (value) => value > 0;
export default {
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			isLoading: false,
			price: 100,
			count: 10,
			duration: 5,
			earning: 750,
			followers: null,
			social: "",
			socialLink: "",
			nickName: "",
			name: "",
			email: "",
			phoneNumber: "",
			description: "",
		};
	},
	validations() {
		return {
			name: {
				required: helpers.withMessage(
					"Please Enter Your Name",
					required
				),
			},
			nickName: {
				required: helpers.withMessage(
					"Please Enter Your Nick Name",
					required
				),
			},
			email: {
				required: helpers.withMessage(
					"Please Enter Your Email",
					required
				),
				email: helpers.withMessage(
					"Please Enter Your Email Correctly",
					email
				),
			},
			phoneNumber: {
				required: helpers.withMessage(
					"Please Enter Your Phone Number",
					required
				),
				numeric: helpers.withMessage(
					"Please Enter Your Phone Number Correctly",
					numeric
				),
			},
			social: {
				required: helpers.withMessage(
					"Please Enter Your Social Media Network",
					required
				),
			},
			socialLink: {
				required: helpers.withMessage(
					"Please Enter Your Social Media Link",
					required
				),
			},
			description: {
				required: helpers.withMessage(
					"Please Enter Your Bio",
					required
				),
			},
		};
	},
	methods: {
		async joinTalent() {
			const result = await this.v$.$validate();
			if (!result) return;

			try {
				this.isLoading = true;
				await this.$store.dispatch("talent/talentJoin", {
					name: this.name,
					nickName: this.nickName,
					email: this.email,
					followers: this.followers,
					socialNetwork: this.social,
					socialNetworkLink: this.socialLink,
					phoneNumber: this.phoneNumber,
					description: this.description,
				});
				this.$swal({
					icon: "success",
					text: "Your request submitted successfully! our team will get back to you within 24 hours.",
				});
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
	},
	watch: {
		price(newVal) {
			this.earning = (this.count * newVal * 75) / 100;
		},
		count(newVal) {
			this.earning = (this.price * newVal * 75) / 100;
			this.duration = newVal * 0.5;
		},
	},
	created() {
		document.body.style.backgroundColor = "#b7e4c7";
	},
	unmounted() {
		document.body.style.backgroundColor = "#fbfbfb";
	},
};
</script>

<style lang="scss" scoped>
.talent {
	background-image: url("../../assets/img/talent.svg");
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	height: 500px;
}
.calculator {
	background-image: url("../../assets/img/Calculator.svg");
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	height: 500px;
}
</style>
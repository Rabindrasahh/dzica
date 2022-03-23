<template>
	<div class="card">
		<div class="card-header bg-gradient-main">
			<h4 class="text-white">Profile</h4>
		</div>
		<div class="card-body">
			<p class="d-flex align-items-center flex-wrap">
				<img
					:src="`https://dzicace.herokuapp.com/${talent.profileImage}`"
					class="img-rounded me-2"
					v-if="talent.profileImage"
				>
				<img
					src="../../assets/img/user-placeholder.png"
					class="img-rounded me-2"
					v-else
				>
				<span>You can change your profile info here!</span>
			</p>
			<hr>
			<form @submit.prevent="updateProfile">
				<div class="row">
					<div class="form-group col-md-6">
						<label for="">Name:</label>
						<input
							type="text"
							class="form-control"
							disabled
							:placeholder="name"
						>
					</div>
					<div class="form-group col-md-6">
						<label for="">NickName:</label>
						<input
							type="text"
							class="form-control"
							v-model="nickName"
							:class="{'is-invalid':v$.nickName.$error}"
						>
						<span
							v-if="v$.nickName.$error"
							class="text-sm text-danger"
						>
							{{ v$.nickName.$errors[0].$message }}
						</span>
					</div>
					<div class="form-group col-md-6">
						<label for="">Followers:</label>
						<input
							type="text"
							class="form-control"
							v-model="followers"
							:class="{'is-invalid':v$.followers.$error}"
						>
						<span
							v-if="v$.followers.$error"
							class="text-sm text-danger"
						>
							{{ v$.followers.$errors[0].$message }}
						</span>
					</div>
					<div class="form-group col-md-6">
						<label for="">Social Network:</label>
						<Multiselect
							class="form-control"
							:class="{'is-invalid':v$.socialNetwork.$error}"
							placeholder="Which social network do you rule?"
							v-model="socialNetwork"
							:options="['Instagram','Youtube','Snapchat','TikTok','TV','Other']"
						/>
						<span
							v-if="v$.socialNetwork.$error"
							class="text-sm text-danger"
						>
							{{ v$.socialNetwork.$errors[0].$message }}
						</span>
					</div>
					<div class="form-group col-md-6">
						<label for="">Profile Image:</label>
						<input
							type="file"
							class="form-control"
							ref="image"
						>
					</div>
					<div class="form-group col-md-6">
						<label for="">Social Network Link:</label>
						<input
							type="text"
							class="form-control"
							v-model="socialNetworkLink"
							placeholder="Whatsapp/Viber Number"
							:class="{'is-invalid':v$.socialNetworkLink.$error}"
						>
						<span
							v-if="v$.socialNetworkLink.$error"
							class="text-sm text-danger"
						>
							{{ v$.socialNetworkLink.$errors[0].$message }}
						</span>
					</div>

					<div class="form-group col-md-6">
						<label for="">Whatsapp/Viber Number:</label>
						<input
							type="text"
							class="form-control"
							v-model="phoneNumber"
							placeholder="Whatsapp/Viber Number"
							:class="{'is-invalid':v$.phoneNumber.$error}"
						>
						<span
							v-if="v$.phoneNumber.$error"
							class="text-sm text-danger"
						>
							{{ v$.phoneNumber.$errors[0].$message }}
						</span>
					</div>
					<div class="form-group col-md-6">
						<label for="">Agency Name:</label>
						<input
							type="text"
							class="form-control"
							v-model="agencyName"
							placeholder="Agency Name"
						>
					</div>
					<div class="form-group col-md-6">
						<label for="">Normal Price:</label>
						<input
							type="text"
							class="form-control"
							v-model="normalPrice"
							:class="{'is-invalid':v$.normalPrice.$error}"
						>
						<span
							v-if="v$.normalPrice.$error"
							class="text-sm text-danger"
						>
							{{ v$.normalPrice.$errors[0].$message }}
						</span>
					</div>
					<div class="form-group col-md-6">
						<label for="">Normal Price:</label>
						<input
							type="text"
							class="form-control"
							v-model="normalPrice"
							:class="{'is-invalid':v$.normalPrice.$error}"
						>
						<span
							v-if="v$.normalPrice.$error"
							class="text-sm text-danger"
						>
							{{ v$.normalPrice.$errors[0].$message }}
						</span>
					</div>
					<div class="form-group col-md-6">
						<label for="">Marketing Price:</label>
						<input
							type="text"
							class="form-control"
							v-model="marketingPrice"
							:class="{'is-invalid':v$.marketingPrice.$error}"
						>
						<span
							v-if="v$.marketingPrice.$error"
							class="text-sm text-danger"
						>
							{{ v$.marketingPrice.$errors[0].$message }}
						</span>
					</div>
					<div class="col-12 form-group">
						<label for="">Description:</label>
						<textarea
							rows="4"
							class="form-control"
							v-model="description"
							:class="{'is-invalid':v$.description.$error}"
						></textarea>
						<span
							v-if="v$.description.$error"
							class="text-sm text-danger"
						>
							{{ v$.description.$errors[0].$message }}
						</span>
					</div>
				</div>
				<div class="text-center mt-2">
					<button class="btn bg-gradient-main w-100 w-md-50 text-lg text-white">
						<i class="fas fa-circle-check me-2"></i>
						<span>Submit</span>
					</button>
				</div>
			</form>
			<hr>
			<form @submit.prevent="uploadVideo">
				<p class="fw-bold">
					<i class="fas fa-exclamation-triangle text-warning me-2"></i>
					<span>You can upload an introduction video</span>
				</p>
				<input
					type="file"
					accept="video/*"
					class="form-control"
					ref="video"
				>
				<div class="text-center mt-2">
					<button class="btn bg-gradient-main w-100 w-md-50 text-lg text-white">
						<i class="fas fa-upload me-2"></i>
						<span>Upload</span>
					</button>
				</div>
			</form>
		</div>
		<loading
			:can-cancel="false"
			v-model:active="isLoading"
		/>
	</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";
export default {
	setup: () => ({ v$: useVuelidate() }),
	validations() {
		return {
			nickName: {
				required: helpers.withMessage(
					"Please Enter Your Nick Name",
					required
				),
			},
			followers: {
				required: helpers.withMessage(
					"Please Enter Your Followers",
					required
				),
				numeric: helpers.withMessage(
					"Followers should be numeric",
					numeric
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
			socialNetwork: {
				required: helpers.withMessage(
					"Please Enter Your Social Network",
					required
				),
			},
			socialNetworkLink: {
				required: helpers.withMessage(
					"Please Enter Your Social Media Link",
					required
				),
			},
			normalPrice: {
				required: helpers.withMessage(
					"Please Enter Your Preferred Price",
					required
				),
				numeric: helpers.withMessage(
					"Price should be numeric",
					numeric
				),
			},
			marketingPrice: {
				required: helpers.withMessage(
					"Please Enter Your Preferred Marketing Price",
					required
				),
				numeric: helpers.withMessage(
					"Price should be numeric",
					numeric
				),
			},
			description: {
				required: helpers.withMessage(
					"Please Enter The Description",
					required
				),
			},
		};
	},
	props: ["talentId"],
	data() {
		return {
			isLoading: false,
			name: "",
			nickName: "",
			followers: 0,
			socialNetwork: "",
			socialNetworkLink: "",
			phoneNumber: "",
			normalPrice: 0,
			marketingPrice: 0,
			description: "",
			agencyName: "",
		};
	},
	methods: {
		async updateProfile() {
			const result = await this.v$.$validate();
			if (!result) return;

			this.isLoading = true;
			try {
				const formData = new FormData();
				formData.append("name", this.name);
				formData.append("nickName", this.nickName);
				formData.append("followers", this.followers);
				formData.append("phoneNumber", this.phoneNumber);
				formData.append("socialNetwork", this.socialNetwork);
				formData.append("socialNetworkLink", this.socialNetworkLink);
				formData.append("normalPrice", this.normalPrice);
				formData.append("marketingPrice", this.marketingPrice);
				formData.append("description", this.description);
				formData.append("agencyName", this.agencyName);

				if (this.$refs.image.files[0])
					formData.append("image", this.$refs.image.files[0]);

				await this.$store.dispatch("talent/updateMyProfile", formData);

				this.$swal({
					icon: "success",
					text: "Your Profile was updated successfully!",
				});
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async uploadVideo() {
			if (!this.$refs.video.files[0])
				return this.$swal({
					icon: "error",
					text: "Please select a video",
				});

			this.isLoading = true;
			try {
				const formData = new FormData();
				formData.append("image", this.$refs.video.files[0]);

				await this.$store.dispatch("talent/updateIntroVideo", formData);

				this.$swal({
					icon: "success",
					text: "Your Profile was updated successfully!",
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
	computed: {
		talent() {
			return this.$store.getters["talent/myProfile"];
		},
	},
	watch: {
		talent(newVal) {
			this.name = newVal.name;
			this.phoneNumber = newVal.phoneNumber;
			this.nickName = newVal.nickName;
			this.agencyName = newVal.agencyName;
			this.followers = newVal.followers;
			this.socialNetwork = newVal.socialNetwork;
			this.socialNetworkLink = newVal.socialNetworkLink;
			this.description = newVal.description;
			this.normalPrice = newVal.normalPrice ? newVal.normalPrice : 0;
			this.marketingPrice = newVal.marketingPrice
				? newVal.marketingPrice
				: 0;
		},
	},
	created() {
		if (this.talent) {
			this.name = this.talent.name;
			this.phoneNumber = this.talent.phoneNumber;
			this.nickName = this.talent.nickName;
			this.agencyName = this.talent.agencyName;
			this.followers = this.talent.followers;
			this.socialNetwork = this.talent.socialNetwork;
			this.socialNetworkLink = this.talent.socialNetworkLink;
			this.description = this.talent.description;
			this.normalPrice = this.talent.normalPrice
				? this.talent.normalPrice
				: 0;
			this.marketingPrice = this.talent.marketingPrice
				? this.talent.marketingPrice
				: 0;
		}
	},
};
</script>

<style lang="scss" scoped>
.img-rounded {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
</style>
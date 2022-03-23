<template>
	<div class="card">
		<div class="card-header bg-gradient-main">
			<h4 class="text-white">Profile</h4>
		</div>
		<div class="card-body">
			<p class="d-flex align-items-center flex-wrap">
				<img
					:src="`https://dzicace.herokuapp.com/${userProfile.profileImage}`"
					class="img-rounded me-2"
					v-if="userProfile.profileImage"
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
							v-model="name"
							:class="{'is-invalid':v$.name.$error}"
						>
						<span
							v-if="v$.name.$error"
							class="text-sm text-danger"
						>
							{{ v$.name.$errors[0].$message }}
						</span>
					</div>
					<div class="form-group col-md-6">
						<label for="">Phone Number:</label>
						<input
							type="text"
							class="form-control"
							v-model="phoneNumber"
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
						<label for="">Email:</label>
						<input
							type="text"
							class="form-control"
							v-model="email"
							:class="{'is-invalid':v$.email.$error}"
						>
						<span
							v-if="v$.email.$error"
							class="text-sm text-danger"
						>
							{{ v$.email.$errors[0].$message }}
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
					<!-- NEW PASSOWRD -->
					<hr>
					<h5 class="text-danger"> Change Password </h5>
					<div class="col-md-6">
						<label for="">Password:</label>
						<input
							type="password"
							class="form-control"
							v-model="password"
						>
					</div>
					<div class="col-md-6">
						<label for="">Confirm Password:</label>
						<input
							type="password"
							class="form-control"
							v-model="confirmPassword"
						>
					</div>
				</div>
				<div class="text-center mt-3">
					<button class="btn bg-gradient-main w-100 w-md-50 text-lg text-white">
						<i class="fas fa-circle-check me-2"></i>
						<span>Submit</span>
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
import { required, helpers, email } from "@vuelidate/validators";
export default {
	setup: () => ({ v$: useVuelidate() }),
	validations() {
		return {
			name: {
				required: helpers.withMessage(
					"Please Enter Your Name",
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
			},
		};
	},
	data() {
		return {
			isLoading: false,
			name: "",
			email: "",
			phoneNumber: 0,
			password: "",
			confirmPassword: "",
		};
	},
	methods: {
		async updateProfile() {
			const result = await this.v$.$validate();
			if (!result) return;

			if (this.password || this.confirmPassword) {
				if (this.password !== this.confirmPassword) {
					this.$swal({
						icon: "error",
						text: "The password confirmation is wrong",
					});
					return;
				}
			}
			try {
				this.isLoading = true;
				const formData = new FormData();
				formData.append("name", this.name);
				formData.append("email", this.email);
				formData.append("phoneNumber", this.phoneNumber);
				if (this.$refs.image.files[0])
					formData.append("image", this.$refs.image.files[0]);
				if (this.password) formData.append("password", this.password);

				await this.$store.dispatch("site/updateMyProfile", formData);

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
		userProfile() {
			return this.$store.getters["site/userProfile"];
		},
	},
	watch: {
		userProfile(newVal) {
			this.name = newVal.fullName;
			this.email = newVal.email;
			this.phoneNumber = newVal.phoneNumber;
		},
	},
	created() {
		if (this.userProfile) {
			this.name = this.userProfile.fullName;
			this.email = this.userProfile.email;
			this.phoneNumber = this.userProfile.phoneNumber;
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
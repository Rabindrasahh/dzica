<template>
	<div>
		<div class="card">
			<div class="card-header bg-gradient-dark">
				<h4 class="text-white">Add Talent</h4>
			</div>
			<div class="card-body">
				<form @submit.prevent="joinTalent">
					<div class="mb-3">
						<Multiselect
							class="form-control"
							:class="{'is-invalid':v$.category.$error}"
							placeholder="Category"
							v-model="category"
							:options="categories"
						/>
						<span
							v-if="v$.category.$error"
							class="text-sm text-danger"
						>
							{{ v$.category.$errors[0].$message }}
						</span>
					</div>
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
						<input
							type="text"
							class="form-control"
							:class="{'is-invalid':v$.password.$error}"
							placeholder="Password"
							v-model="password"
						/>
						<span
							v-if="v$.password.$error"
							class="text-sm text-danger"
						>
							{{ v$.password.$errors[0].$message }}
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
						class="btn bg-gradient-dark text-white w-100 text-lg"
					>Add</button>
				</form>
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
import useVuelidate from "@vuelidate/core";
import { required, helpers, email, numeric } from "@vuelidate/validators";

// const moreThanZero = (value) => value > 0;
export default {
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			isLoading: false,
			followers: null,
			social: "",
			socialLink: "",
			nickName: "",
			name: "",
			email: "",
			phoneNumber: "",
			description: "",
			password: "",
			category: "",
		};
	},
	validations() {
		return {
			category: {
				required: helpers.withMessage(
					"Please Select a Category",
					required
				),
			},
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
			password: {
				required: helpers.withMessage(
					"Please Enter a Password",
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
		async init() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/getCategories");
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async joinTalent() {
			const result = await this.v$.$validate();
			if (!result) return;

			try {
				this.isLoading = true;
				await this.$store.dispatch("admin/addTalent", {
					category: this.category,
					name: this.name,
					nickName: this.nickName,
					email: this.email,
					followers: this.followers,
					socialNetwork: this.social,
					socialNetworkLink: this.socialLink,
					phoneNumber: this.phoneNumber,
					description: this.description,
					password: this.password,
				});
				this.$swal({
					icon: "success",
					text: "The talent was added successfully!",
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
		categories() {
			return this.$store.getters["admin/categories"].map((cat) => {
				return {
					value: cat._id,
					label: cat.name,
				};
			});
		},
	},
	created() {
		this.init();
	},
};
</script>
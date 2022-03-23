<template>
	<div class="card">
		<div class="card-header bg-gradient-dark ">
			<h4 class="text-white">Settings</h4>
		</div>
		<div class="card-body">
			<!-- ADMIN -->
			<h4>ADMIN</h4>
			<button
				class="btn bg-gradient-dark mt-2"
				data-bs-target="#newModal"
				data-bs-toggle="modal"
			>
				<i class="fa-regular fa-plus-circle me-2"></i>
				<span>new admin</span>
			</button>
			<!-- Edit your info -->
			<form @submit.prevent="editAdmin">
				<div class="row">
					<p class="mt-2 fw-bold">Edit your info:</p>
					<div class="col-lg-4 mt-2">
						<label for="">Name:</label>
						<input
							type="text"
							class="form-control"
							v-model="edit.name"
							placeholder="Name"
						>
					</div>
					<div class="col-lg-4 mt-2">
						<label for="">Email:</label>
						<input
							type="email"
							class="form-control"
							v-model="edit.email"
							placeholder="Email"
						>
					</div>
					<div class="col-lg-4 mt-2">
						<label for="">Password:</label>
						<input
							type="text"
							class="form-control"
							v-model="edit.password"
							placeholder="Password"
						>
					</div>
					<div class="text-center mt-4">
						<button
							class="bg-gradient-dark text-white btn text-lg w-xl-25 w-md-50 w-100"
							type="submit"
						>
							<i class="fa-duotone fa-check-circle me-2"></i>
							<span>EDIT</span>
						</button>
					</div>
					<hr>
				</div>
			</form>

			<!-- GETAWAY -->
			<h4>GETAWAY SETTINGS</h4>
			<form @submit.prevent="editGetaway">
				<div class="row">
					<p class="mt-2 fw-bold">Edit info:</p>
					<div class="col-lg-6 mt-2">
						<label for="">Public key:</label>
						<input
							type="text"
							class="form-control"
							v-model="getaway.public"
							placeholder="Public key"
						>
					</div>
					<div class="col-lg-6 mt-2">
						<label for="">Secret Key:</label>
						<input
							type="text"
							class="form-control"
							v-model="getaway.secret"
							placeholder="Secret Key"
						>
					</div>
					<div class="text-center mt-4">
						<button
							class="bg-gradient-dark text-white btn text-lg w-xl-25 w-md-50 w-100"
							type="submit"
						>
							<i class="fa-duotone fa-check-circle me-2"></i>
							<span>EDIT</span>
						</button>
					</div>
					<hr>
				</div>
			</form>
		</div>

		<!-- NEW ADMIN MODAL -->
		<div
			class="modal fade"
			id="newModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>New Admin</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form
							@submit.prevent="addAdmin"
							id="newAdmin"
						>
							<div class="mb-3">
								<label for="">Name:</label>
								<input
									class="form-control"
									v-model="create.name"
									required
								>
							</div>
							<div class="mb-3">
								<label for="">Email:</label>
								<input
									type="email"
									class="form-control"
									required
									v-model="create.email"
								>
							</div>
							<div class="mb-3">
								<label for="">Password:</label>
								<input
									required
									class="form-control"
									v-model="create.password"
								>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn bg-gradient-secondary"
							data-bs-dismiss="modal"
						>Close</button>
						<button
							type="submit"
							form="newAdmin"
							class="btn bg-gradient-primary"
						>Create</button>
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
</template>

<script>
export default {
	data() {
		return {
			isLoading: false,
			categoryName: "",
			create: {
				name: "",
				email: "",
				password: "",
			},
			edit: {
				name: "",
				email: "",
				password: "",
			},
			getaway: {
				public: "",
				secret: "",
			},
		};
	},
	methods: {
		selectEdit(id) {
			this.selectedTalentForEdit = id;
			const category = this.categories.find((c) => c._id === id);
			this.categoryName = category.name;
		},
		async init() {
			this.isLoading = true;
			try {
				// await this.$store.dispatch("admin/getCategories");
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async addAdmin() {
			try {
				this.isLoading = true;

				await this.$store.dispatch("admin/addAdmin", {
					name: this.create.name,
					email: this.create.email,
					password: this.create.password,
				});

				this.$swal({
					icon: "success",
					text: "The admin created successfully!",
				});
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async editGetaway() {
			try {
				this.isLoading = true;

				await this.$store.dispatch("admin/updateGetawaySettings", {
					public: this.getaway.public,
					secret: this.getaway.secret,
				});

				this.$swal({
					icon: "success",
					text: "Settings was changed successfully!",
				});
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async editAdmin() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/editAdmin", {
					name: this.edit.name,
					email: this.edit.email,
					password: this.edit.password,
				});

				this.$swal({
					icon: "success",
					text: "your info edited successfully!",
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
<template>
	<div class="card">
		<div class="card-header bg-gradient-dark ">
			<h4 class="text-white">Users</h4>
		</div>
		<div class="card-body">
			<button
				data-bs-target="#newUserModal"
				data-bs-toggle="modal"
				class="btn bg-gradient-dark"
			>
				<i class="fa-regular fa-plus-circle me-2"></i>
				<span>New User</span>
			</button>
			<div class="table-responsive mt-3">
				<table class="table">
					<thead>
						<th>Full Name</th>
						<th>Email</th>
						<th>Join Date</th>
						<th>Manage</th>
					</thead>
					<tbody>
						<tr
							v-for="user in users"
							:key="user._id"
						>
							<td> {{ user.fullName }} </td>
							<td> {{ user.email }} </td>
							<td> {{ new Date(user.createdAt).toLocaleString() }} </td>
							<td>
								<i
									data-bs-toggle="modal"
									data-bs-target="#editUserModal"
									class="fa-duotone fa-pen me-3 text-emerald cursor-pointer"
									@click="selectedUserForEdit=user._id; edit.name=user.fullName; edit.email=user.email"
								></i>
								<i
									class="fa-duotone fa-trash text-danger cursor-pointer"
									data-bs-toggle="modal"
									data-bs-target="#deleteModal"
									@click="selectedUserForDelete=user._id"
								></i>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="row justify-content-center mt-3">
				<the-pagination
					:data-in-each-page="dataInEachPage"
					:data-length="totalItems"
					@navigate-page="init"
				></the-pagination>
			</div>
		</div>
		<delete-modal
			title="Delete Article"
			@deleted="deleteUser"
		></delete-modal>
		<loading
			v-model:active="isLoading"
			:can-cancel="false"
			:is-full-page="true"
		/>
		<!-- EDIT USER MODAL -->
		<div
			class="modal fade"
			id="editUserModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>Edit User</h5>
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
							@submit.prevent="editUser"
							id="createForm"
						>
							<div class="mb-3">
								<label for="">Full Name:</label>
								<input
									type="text"
									class="form-control"
									v-model="edit.name"
									required
								>
							</div>
							<div class="mb-3">
								<label for="">Email:</label>
								<input
									type="email"
									class="form-control"
									required
									v-model="edit.email"
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
							form="createForm"
							class="btn bg-gradient-primary"
						>Edit</button>
					</div>
				</div>
			</div>
		</div>
		<!-- NEW USER MODAL -->
		<div
			class="modal fade"
			id="newUserModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>New User</h5>
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
							@submit.prevent="newUser"
							id="createForm"
						>
							<div class="mb-3">
								<label for="">Full Name:</label>
								<input
									type="text"
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
									type="text"
									class="form-control"
									v-model="create.password"
									required
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
							form="createForm"
							class="btn bg-gradient-primary"
						>Create</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataInEachPage: 15,
			isLoading: false,
			selectedUserForDelete: null,
			selectedUserForEdit: null,
			totalItems: 0,
			create: {
				email: "",
				password: "",
				name: "",
			},
			edit: {
				email: "",
				name: "",
			},
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/getUsers", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems = this.$store.getters["admin/users"].totalItems;
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async newUser() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("auth/signup", {
					fullName: this.create.name,
					email: this.create.email,
					password: this.create.password,
					setToken: false,
				});
				this.$swal({
					icon: "success",
				});

				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async editUser() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/editUser", {
					name: this.edit.name,
					email: this.edit.email,
					userId: this.selectedUserForEdit,
				});
				this.$swal({
					icon: "success",
				});

				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async deleteUser() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/deleteUser", {
					articleId: this.selectedUserForDelete,
				});
				this.$swal({
					icon: "success",
					text: "The user was deleted successfully!",
				});

				const newUsers = this.users.filter(
					(c) => c._id !== this.selectedUserForDelete
				);
				this.$store.commit("admin/setUsers", {
					users: newUsers,
					totalItems: this.totalItems - 1,
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
		users() {
			return this.$store.getters["admin/users"].users;
		},
	},
	created() {
		this.init();
	},
};
</script>

<style lang="scss" scoped>
.image {
	object-fit: cover;
	width: 80%;
	height: 60px;
}
tr {
	vertical-align: middle;
}
</style>
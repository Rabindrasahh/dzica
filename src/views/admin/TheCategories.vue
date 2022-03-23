<template>
	<div class="card">
		<div class="card-header bg-gradient-dark ">
			<h4 class="text-white">Categories</h4>
		</div>
		<div class="card-body">
			<button
				class="btn bg-gradient-dark "
				data-bs-target="#newModal"
				data-bs-toggle="modal"
			>
				<i class="fa-regular fa-plus-circle me-2"></i>
				<span>new category</span>
			</button>
			<div class="table-responsive mt-3">
				<table class="table">
					<thead>
						<th></th>
						<th>Name</th>
						<th>Edit</th>
						<th>Delete</th>
					</thead>
					<tbody>
						<tr
							v-for="category in categories"
							:key="category._id"
						>
							<td>
								<img
									:src="`https://dzicace.herokuapp.com/${category.image}`"
									style="width:100px;height:50px;object-fit:cover"
								>
							</td>
							<td> {{ category.name }} </td>
							<td>
								<i
									class="fa-duotone fa-pen ms-3 text-emerald cursor-pointer"
									data-bs-toggle="modal"
									data-bs-target="#editModal"
									@click="selectEdit(category._id)"
								></i>
							</td>
							<td>
								<i
									class="fa-duotone fa-trash text-danger cursor-pointer"
									data-bs-toggle="modal"
									data-bs-target="#deleteModal"
									@click="selectedTalentForDelete=category._id"
								></i>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<delete-modal
			title="Delete Category"
			text="if you delete a category all of its talents will delete, too!"
			@deleted="deleteCategory"
		></delete-modal>

		<!-- NEW CATEGORY MODAL -->
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
						>New Category</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<label for="">Category Name:</label>
							<input
								class="form-control"
								v-model="categoryName"
							>
						</div>
						<div class="mb-3">
							<label for="">Category Image:</label>
							<input
								type="file"
								class="form-control"
								ref="newImage"
							>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn bg-gradient-secondary"
							data-bs-dismiss="modal"
						>Close</button>
						<button
							type="button"
							@click="newCategory"
							class="btn bg-gradient-primary"
						>Create</button>
					</div>
				</div>
			</div>
		</div>
		<!-- EDIT CATEGORY MODAL -->
		<div
			class="modal fade"
			id="editModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>Edit Category</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<label for="">Category Name:</label>
							<input
								class="form-control"
								v-model="categoryName"
							>
						</div>
						<div class="mb-3">
							<label for="">Category Image:</label>
							<input
								type="file"
								class="form-control"
								ref="editImage"
							>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn bg-gradient-secondary"
							data-bs-dismiss="modal"
						>Close</button>
						<button
							type="button"
							@click="editCategory"
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
			selectedTalentForDelete: null,
			selectedTalentForEdit: null,
			categoryName: "",
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
				await this.$store.dispatch("admin/getCategories");
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async newCategory() {
			try {
				if (!this.$refs.newImage.files[0]) {
					this.$swal({
						icon: "error",
						text: "Please select an image",
					});
					return;
				}

				this.isLoading = true;
				const formData = new FormData();
				formData.append("name", this.categoryName);
				formData.append("image", this.$refs.newImage.files[0]);

				await this.$store.dispatch("admin/newCategory", formData);
				// re get data
				await this.init();
				this.categoryName = "";

				this.$swal({
					icon: "success",
					text: "The category created successfully!",
				});
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async editCategory() {
			this.isLoading = true;
			try {
				const formData = new FormData();

				formData.append("name", this.categoryName);
				if (this.$refs.editImage.files[0])
					formData.append("image", this.$refs.editImage.files[0]);

				await this.$store.dispatch("admin/editCategory", {
					data: formData,
					categoryId: this.selectedTalentForEdit,
				});

				// re get data
				await this.init();
				this.categoryName = "";

				this.$swal({
					icon: "success",
					text: "The category edited successfully!",
				});
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async deleteCategory() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/deleteCategory", {
					categoryId: this.selectedTalentForDelete,
				});
				this.$swal({
					icon: "success",
					text: "The category deleted successfully!",
				});

				const newCategories = this.categories.filter(
					(c) => c._id !== this.selectedTalentForDelete
				);
				this.$store.commit("admin/setCategories", newCategories);
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
			return this.$store.getters["admin/categories"];
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
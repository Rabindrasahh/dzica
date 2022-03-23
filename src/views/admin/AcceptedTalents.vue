<template>
	<div class="card">
		<div class="card-header bg-gradient-dark ">
			<h4 class="text-white">Accepted Talents</h4>
		</div>
		<div class="card-body">
			<div class="d-flex">
				<input
					type="text"
					placeholder="Search for talent name..."
					class="form-control"
					v-model="searchQuery"
				>
			</div>
			<div class="table-responsive mt-3">
				<table class="table">
					<thead>
						<th>Category</th>
						<th>Name</th>
						<th>Nick Name</th>
						<th>Email</th>
						<th>Social Network</th>
						<th>Followers</th>
						<th>Actions</th>
					</thead>
					<tbody>
						<tr
							v-for="talent in talents"
							:key="talent._id"
						>
							<td> {{ talent.categoryId?.name }} </td>
							<td> {{ talent.name }} </td>
							<td>{{ talent.nickName }}</td>
							<td>{{ talent.email }}</td>
							<td>{{ talent.socialNetwork }}</td>
							<td>{{ talent.followers }}</td>
							<td>
								<i
									class="fa-duotone fa-trash text-danger cursor-pointer"
									data-bs-toggle="modal"
									data-bs-target="#deleteModal"
									@click="selectedTalentForDelete=talent._id"
								></i>
								<i
									class="fa-duotone fa-pen ms-3 text-emerald cursor-pointer"
									data-bs-toggle="modal"
									data-bs-target="#editModal"
									@click="selectEdit(talent._id)"
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
					v-if="!searchQuery"
				></the-pagination>
			</div>
		</div>
		<delete-modal
			title="Delete Talent's Request"
			@deleted="deleteTalent"
		></delete-modal>
		<!-- EDIT MODAL -->
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
						>Change Talent's info</h5>
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
							@submit.prevent="editTalent"
							id="acceptForm"
						>
							<div>
								<label for="">Select Talent's Category</label>
								<select
									class="form-control"
									v-model="talentCategory"
								>
									<option
										v-for="c in categories"
										:key="c._id"
										:value="c._id"
									> {{ c.name }} </option>
								</select>
							</div>
							<div class="mt-3">
								<label for="">Followers</label>
								<input
									class="form-control"
									v-model="followers"
								>

							</div>
							<div class="mt-3">
								<label for="">Comission</label>
								<input
									class="form-control"
									v-model.number="comission"
									type="number"
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
							form="acceptForm"
							class="btn bg-gradient-primary"
						>Edit Talent</button>
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
			dataInEachPage: 10,
			selectedTalentForDelete: null,
			selectedTalentForEdit: null,
			talentCategory: "",
			followers: 0,
			searchQuery: "",
			comission: 25,
		};
	},
	methods: {
		selectEdit(id) {
			this.selectedTalentForEdit = id;
			const talent = this.talents.find((talent) => talent._id === id);
			this.talentCategory = talent.categoryId._id;
			this.followers = talent.followers;
			this.comission = talent.comission ? talent.comission : 25;
		},
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/getAcceptedTalents", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				await this.$store.dispatch("admin/getCategories");
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async editTalent() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/editTalent", {
					categoryId: this.talentCategory,
					followers: this.followers,
					comission: this.comission,
					talentId: this.selectedTalentForEdit,
				});
				this.$swal({
					icon: "success",
					text: "The talent was edited successfully!",
				});
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async deleteTalent() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/deleteTalent", {
					talentId: this.selectedTalentForDelete,
				});
				this.$swal({
					icon: "success",
					text: "The talent was deleted successfully!",
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
		async searchQuery(newVal, oldVal) {
			if (newVal != oldVal && newVal !== "") {
				try {
					await this.$store.dispatch("admin/searchTalent", {
						query: newVal,
					});
				} catch (err) {
					this.$swal({
						icon: "error",
						text: err.message,
					});
				}
			}
			if (newVal === "") {
				this.init();
			}
		},
	},
	computed: {
		talents() {
			return this.$store.getters["admin/acceptedTalents"].talents;
		},
		categories() {
			return this.$store.getters["admin/categories"];
		},
		totalItems() {
			return this.$store.getters["admin/acceptedTalents"].totalItems;
		},
	},
	created() {
		this.init();
	},
};
</script>
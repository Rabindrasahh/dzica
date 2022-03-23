<template>
	<div class="card">
		<div class="card-header bg-gradient-dark ">
			<h4 class="text-white">Talents Requests</h4>
		</div>
		<div class="card-body">
			<div class="table-responsive mt-3">
				<table class="table">
					<thead>
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
									class="fa-duotone fa-check ms-3 text-emerald cursor-pointer"
									data-bs-toggle="modal"
									data-bs-target="#acceptModal"
									@click="selectedTalentForAccept=talent._id"
								></i>
								<i
									class="fa-duotone fa-eye ms-3 text-dark cursor-pointer"
									data-bs-toggle="modal"
									data-bs-target="#infoModal"
									@click="selectedTalentForMoreInfo=talent"
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
			title="Delete Talent's Request"
			@deleted="deleteRequest"
		></delete-modal>
		<!-- ACCEPT MODAL -->
		<div
			class="modal fade"
			id="acceptModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>Fill Final Data</h5>
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
							@submit.prevent="acceptRequest"
							id="acceptForm"
						>
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
						>Accept Talent</button>
					</div>
				</div>
			</div>
		</div>
		<!-- MORE INFO MODAL -->
		<div
			class="modal fade"
			id="infoModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>More Info about talent</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p> Name: {{ selectedTalentForMoreInfo.name }} </p>
						<p> Social media: {{ selectedTalentForMoreInfo.socialNetwork }} </p>
						<p> Social media Link: <a :href="`${selectedTalentForMoreInfo.socialNetworkLink}`">View</a> </p>
						<p> Followers: {{ selectedTalentForMoreInfo.followers }} </p>
						<p> Email: {{ selectedTalentForMoreInfo.email }} </p>
						<p> Whatsapp/ Viber number: {{ selectedTalentForMoreInfo.phoneNumber }} </p>
						<p> bio(description): {{ selectedTalentForMoreInfo.description }} </p>
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
</template>

<script>
export default {
	data() {
		return {
			isLoading: false,
			dataInEachPage: 10,
			selectedTalentForDelete: null,
			selectedTalentForAccept: null,
			selectedTalentForMoreInfo: {},
			talentCategory: "",
			comission: 25,
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/getPendingTalents", {
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
		async acceptRequest() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/acceptTalent", {
					categoryId: this.talentCategory,
					talentId: this.selectedTalentForAccept,
					comission: this.comission,
				});
				this.$swal({
					icon: "success",
					text: "The talent was accepted successfully!",
				});
				this.init();
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async deleteRequest() {
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
	computed: {
		talents() {
			return this.$store.getters["admin/pendingTalents"].talents;
		},
		categories() {
			return this.$store.getters["admin/categories"];
		},
		totalItems() {
			return this.$store.getters["admin/pendingTalents"].totalItems;
		},
	},
	created() {
		this.init();
	},
};
</script>
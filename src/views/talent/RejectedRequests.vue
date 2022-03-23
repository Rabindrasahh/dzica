<template>
	<div class="card">
		<div class="card-header bg-gradient-main">
			<h4 class="text-white">Rejected Requests</h4>
		</div>
		<div class="card-body">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<th>Type</th>
						<th>Name (Company Name)</th>
						<th>Occasion</th>
						<th>Price</th>
						<th>
							Request Creation date
						</th>
						<th>Status</th>
						<th>View More</th>
					</thead>
					<tbody>
						<tr
							v-for="req in requests"
							:key="req._id"
						>
							<td> {{req.type}} </td>
							<td> {{ req.companyName ? req.companyName : req.name }} </td>
							<td> {{ req.occasion ? req.occasion : '-' }} </td>
							<td> ${{ req.price }} </td>
							<td> {{ new Date(req.createdAt).toLocaleDateString() }} </td>
							<td v-if="req.status === 0">
								<span class="text-danger">Rejected</span>
							</td>
							<td v-if="req.status === -1">
								<span class="text-danger">Deadline has been reached</span>
							</td>
							<td>
								<button
									class="btn bg-gradient-dark mb-0"
									data-bs-toggle="modal"
									data-bs-target="#exampleModal"
									@click="selectRequest(req._id)"
								>View More</button>
							</td>
						</tr>

					</tbody>
				</table>
			</div>
			<div class="row justify-content-center">
				<the-pagination
					:data-in-each-page="dataInEachPage"
					:data-length="totalItems"
					@navigate-page="init"
				></the-pagination>
			</div>
		</div>
		<loading
			v-model:active="isLoading"
			:can-cancel="false"
			:is-full-page="true"
		/>
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
						>Request Info</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						>
							<span>&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p class="fw-bold text-emerald">Order ID: {{ selectedRequest._id }} </p>
						<!-- NORMAL VIDEO TYPE DATA -->
						<div v-if="selectedRequest.type == 'Normal'">
							<p v-if="selectedRequest.videoOwner == 'Me'">
								<span class="fw-bold">Name:</span>
								{{ selectedRequest.name }}
							</p>
							<div v-else>
								<p>
									<span class="fw-bold">From:</span>
									{{ selectedRequest.from }}
								</p>
								<p>
									<span class="fw-bold">To:</span>
									{{ selectedRequest.to }}
								</p>
							</div>
						</div>
						<!-- OCCASION -->
						<p>
							<span class="fw-bold">Occasion:</span>
							{{ selectedRequest.occasion }}
						</p>
						<!-- PRICE -->
						<p>
							<span class="fw-bold">Price:</span>
							${{ selectedRequest.price }}
						</p>
						<!-- INSTRUCTIONS -->
						<p>
							<span class="fw-bold">Instructions:</span>
							{{ selectedRequest.instructions }}
						</p>

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
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataInEachPage: 10,
			totalItems: 0,
			isLoading: false,
			selectedRequest: {},
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("talent/getRejectedRequests", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["talent/rejectedRequests"].totalItems;
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},

		selectRequest(id) {
			this.selectedRequest = this.requests.find((req) => req._id === id);
		},
	},
	computed: {
		requests() {
			return this.$store.getters["talent/rejectedRequests"].requests;
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


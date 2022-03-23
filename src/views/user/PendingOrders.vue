<template>
	<div class="card">
		<div class="card-header bg-gradient-main">
			<h4 class="text-white">Pending Orders</h4>
		</div>
		<div class="card-body">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<th>Type</th>
						<th>Name (Company Name)</th>
						<th>Occasion</th>
						<th>Price</th>
						<th>Created At</th>
						<th>Status</th>
						<th>View More</th>
					</thead>
					<tbody>
						<tr
							v-for="req in orders"
							:key="req._id"
						>
							<td> {{req.type}} </td>
							<td> {{ req.talentId.name }} </td>
							<td> {{ req.occasion ? req.occasion : '-' }} </td>
							<td> {{ req.price }}$ </td>
							<td> {{ new Date(req.createdAt).toLocaleDateString() }} </td>
							<td
								v-if="req.status === 1"
								class="text-danger"
							> Pending Approval </td>
							<td
								v-if="req.status === 2"
								class="text-emerald"
							> Approved </td>
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
						<p class="fw-bold text-emerald">Payment Method: {{ selectedRequest.paymentWay }} </p>
						<p class="fw-bold text-emerald">Payment #: {{ selectedRequest.paymentId }} </p>
						<hr>
						<!-- TALENT INFO -->
						<p class="fw-bold text-danger">Talent Info:</p>
						<p class="mb-1">Name: {{ selectedRequest.talentId?.name }} </p>
						<p class="mb-1">Email: {{ selectedRequest.talentId?.email }} </p>
						<p class="mb-1">Social media: {{ selectedRequest.talentId?.socialNetwork }} </p>
						<p class="mb-1">Followers: {{ selectedRequest.talentId?.followers }} </p>
						<hr>
						<!-- ORDER INFO -->
						<p class="fw-bold text-danger">Order Info:</p>
						<p>
							<span class="fw-bold">Request Type:</span>
							{{ selectedRequest.type }}
						</p>
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
						<p>
							<span class="fw-bold">Instructions:</span>
							{{ selectedRequest.instructions }}
						</p>
						<p>
							<span class="fw-bold">Video Owner:</span>
							{{ selectedRequest.videoOwner }}
						</p>
						<p>
							<span class="fw-bold">Occasion:</span>
							{{ selectedRequest.occasion }}
						</p>
						<p>
							<span class="fw-bold">Delivery Email:</span>
							{{ selectedRequest.email }}
						</p>
						<p>
							<span class="fw-bold">Order Date:</span>
							{{ new Date(selectedRequest.createdAt).toLocaleString() }}
						</p>
						<p>
							<span class="fw-bold">Delivery Date:</span>
							{{ selectedRequest.deliveryDate? new Date(selectedRequest.deliveryDate).toLocaleString() :'-' }}
						</p>
						<hr>
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
				await this.$store.dispatch("site/getPendingOrders", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["site/pendingOrders"].totalItems;
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},

		selectRequest(id) {
			this.selectedRequest = this.orders.find((req) => req._id === id);
		},
	},
	computed: {
		orders() {
			return this.$store.getters["site/pendingOrders"].orders;
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


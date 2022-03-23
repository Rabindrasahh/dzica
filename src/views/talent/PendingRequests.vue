<template>
	<div class="card">
		<div class="card-header bg-gradient-main">
			<h4 class="text-white">Pending Requests</h4>
		</div>
		<div class="card-body">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<th>Type</th>
						<th>Name (Company Name)</th>
						<th>Occasion</th>
						<th>Price</th>
						<th>Status</th>
						<th>
							Request Creation date
						</th>
						<th>
							Deadline date
						</th>
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
							<td
								v-if="req.status === 1"
								class="text-danger"
							> Waiting for Accept </td>
							<td
								v-if="req.status === 2"
								class="text-emerald"
							> Accepted </td>
							<td> {{ new Date(req.createdAt).toLocaleDateString() }} </td>
							<td> {{ 4 - Math.ceil(moment.duration(moment().startOf('day').diff(moment(req.createdAt))).asDays()) }} days</td>
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

						<!-- UPLOAD FORM -->
						<div
							v-if="selectedRequest.status===2"
							class="mt-3 text-center"
						>
							<hr>
							<form @submit.prevent="uploadVideo">
								<label for="">Select Video</label>
								<input
									type="file"
									class="form-control"
									accept="video/*"
									ref="video"
								>
								<button
									type="submit"
									class="btn bg-gradient-main text-white w-100 mt-3"
								>Upload</button>
							</form>
						</div>

						<!-- ACCEPT AND REJECT BUTTONS -->
						<div
							v-if="selectedRequest.status===1"
							class="mt-3 text-center"
						>
							<button
								@click="accept"
								class="btn bg-gradient-main text-white w-100 w-md-40 mt-2 me-2"
							>Accept</button>
							<button
								@click="reject"
								class="btn bg-gradient-danger w-100 w-md-40 mt-2"
							>Reject</button>
						</div>
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
import moment from "moment";
export default {
	data() {
		return {
			dataInEachPage: 10,
			totalItems: 0,
			isLoading: false,
			selectedRequest: {},
			moment: {},
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("talent/getPendingRequests", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["talent/pendingRequests"].totalItems;
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async uploadVideo() {
			if (!this.$refs.video.files[0]) {
				this.$swal({
					icon: "error",
					text: "Please select a video",
				});
				return;
			}
			try {
				this.isLoading = true;

				const formData = new FormData();
				formData.append("image", this.$refs.video.files[0]);
				await this.$store.dispatch("talent/uploadVideo", {
					data: formData,
					orderId: this.selectedRequest._id,
				});
				this.$swal({
					icon: "success",
					text: "The request accepted successfully!",
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
		async accept() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("talent/acceptPendingRequest", {
					orderId: this.selectedRequest._id,
				});
				this.$swal({
					icon: "success",
					text: "The request accepted successfully!",
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
		async reject() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("talent/rejectPendingRequest", {
					orderId: this.selectedRequest._id,
				});
				this.$swal({
					icon: "success",
					text: "The request rejected successfully!",
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
		selectRequest(id) {
			this.selectedRequest = this.requests.find((req) => req._id === id);
		},
	},
	computed: {
		requests() {
			return this.$store.getters["talent/pendingRequests"].requests;
		},
	},
	created() {
		this.init();
		this.moment = moment;
	},
};
</script>

<style lang="scss" scoped>
tr {
	vertical-align: middle;
}
</style>


<template>
	<div class="card">
		<div class="card-header bg-gradient-main">
			<h4 class="text-white">Completed Orders</h4>
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
						<th>Manage</th>
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
								v-if="req.status === 3"
								class="text-danger"
							> Delivered </td>
							<td
								v-if="req.status === 4"
								class="text-emerald"
							> Completed </td>
							<td>
								<button
									class="btn bg-gradient-dark mb-0"
									data-bs-toggle="modal"
									data-bs-target="#exampleModal"
									@click="selectRequest(req._id)"
								>View</button>
								<button
									v-if="req.status === 4 && !req.comment?.content"
									class="btn bg-gradient-dark mb-0 ms-2"
									data-bs-toggle="modal"
									data-bs-target="#reviewModal"
									@click="selectRequest(req._id)"
								>Submit Review</button>
								<button
									v-if="req.status === 3 || req.status === 4"
									class="btn bg-gradient-dark mb-0 ms-2"
									data-bs-toggle="modal"
									data-bs-target="#downloadModal"
									@click="selectRequest(req._id)"
								>Download</button>
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
		<!-- MORE INFO MODAL -->
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
						>Order Info</h5>
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
						<!-- NORMAL VIDEO TYPE DATA -->
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

						<!-- ACCEPT AND REJECT BUTTONS -->
						<div
							v-if="selectedRequest.status===3"
							class="text-center"
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
		<!-- DOWNLOAD VIDEO MODAL -->
		<div
			class="modal fade"
			id="downloadModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>Download</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						>
							<span>&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="text-center mt-3">
							<button
								class="btn bg-gradient-dark"
								@click="downloadVideo"
							>
								<i class="fa-duotone fa-download me-2"></i>
								Download Video
							</button>
							<a
								class="btn bg-gradient-dark ms-2"
								href="mailto:EMAIL"
							>
								<i class="fa-duotone fa-envelope me-2"></i>
								Send (Via Email)
							</a>
							<button
								class="btn bg-gradient-dark"
								@click="copyVideoLink"
							>
								<i class="fa-duotone fa-share-nodes me-2"></i>
								Share
							</button>
						</div>
						<hr>
						<!-- ACCEPT AND REJECT BUTTONS -->
						<p class="fw-bold">Was the video correct?</p>
						<div class="text-center">
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
		<!-- Submit Review MODAL -->
		<div
			class="modal fade"
			id="reviewModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>Submit Review</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						>
							<span>&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="submitReview">
							<textarea
								placeholder="review"
								v-model="review"
								class="form-control"
							></textarea>
							<div class="d-flex justify-content-center mt-3 mb-3">
								<rating
									:step="1"
									:show-rating="false"
									:star-size="30"
									:glow="1"
									v-model:rating="rate"
								/>
							</div>
							<div class="text-center mt-1">
								<button class="btn bg-gradient-main mt-2 text-white">Submit</button>
							</div>
						</form>
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
import rating from "vue-star-rating";
export default {
	components: {
		rating,
	},
	data() {
		return {
			dataInEachPage: 10,
			totalItems: 0,
			isLoading: false,
			selectedRequest: {},
			review: "",
			rate: 0,
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("site/getCompletedOrders", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["site/completedOrders"].totalItems;
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async submitReview() {
			console.log(this.rate);
			if (!this.review) {
				this.$swal({
					icon: "error",
					text: "Please enter the review",
				});
				return;
			}
			if (!this.rate) {
				this.$swal({
					icon: "error",
					text: "Please enter the rating",
				});
				return;
			}
			try {
				this.isLoading = true;
				await this.$store.dispatch("site/submitReview", {
					orderId: this.selectedRequest._id,
					content: this.review,
					rating: this.rate,
				});
				this.$swal({
					icon: "success",
					text: "Your review submitted successfully!",
				});
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async downloadVideo() {
			try {
				this.isLoading = true;
				const res = await this.$store.dispatch("site/downloadVideo", {
					orderId: this.selectedRequest._id,
				});
				const fileURL = window.URL.createObjectURL(
					new Blob([res.data])
				);
				const fileLink = document.createElement("a");
				fileLink.href = fileURL;
				fileLink.setAttribute("download", Date.now());
				document.body.appendChild(fileLink);
				fileLink.click();
				fileLink.remove();
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async copyVideoLink() {
			try {
				this.isLoading = true;
				const res = await this.$store.dispatch("site/copyVideoLink", {
					orderId: this.selectedRequest._id,
				});
				await navigator.clipboard.writeText(res);
				this.$swal({
					icon: "success",
					text: "The video link was copied successfully",
				});
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
				await this.$store.dispatch("site/acceptPendingOrder", {
					orderId: this.selectedRequest._id,
				});
				this.$swal({
					icon: "success",
					text: "The order accepted successfully!",
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
				await this.$store.dispatch("site/rejectPendingOrder", {
					orderId: this.selectedRequest._id,
				});
				this.$swal({
					icon: "success",
					text: "The order rejected successfully!",
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
			this.selectedRequest = this.orders.find((req) => req._id === id);
		},
	},
	computed: {
		orders() {
			return this.$store.getters["site/completedOrders"].orders;
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


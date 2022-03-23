<template>
	<div class="card">
		<div class="card-header bg-gradient-dark">
			<h4 class="text-white">Requests</h4>
		</div>
		<div class="card-body">
			<div class="row px-2">
				<input
					type="text"
					class="form-control"
					placeholder="Search for order ID..."
					v-model="searchQuery"
				>
				<div class="d-flex flex-wrap">
					<p class="fw-bold mt-3 mb-0 me-2 text-dark">Filter By Status:</p>
					<span
						v-for="s in Object.entries(status)"
						:key="s"
						class="badge bg-gradient-main text-white me-2 mt-3 cursor-pointer"
						@click="selectStatus(s[0])"
					> {{ s[1] }} </span>
				</div>
			</div>
			<div class="table-responsive mt-3">
				<table class="table">
					<thead>
						<th>Talent Info</th>
						<th>Type</th>
						<th>Name (Company Name)</th>
						<th>Occasion</th>
						<th>Price</th>
						<th>Created At</th>
						<th>Delivery date</th>
						<th>Status</th>
						<th>View More</th>
						<th>Edit</th>
						<th>Delete</th>
					</thead>
					<tbody>
						<tr
							v-for="req in requests"
							:key="req._id"
						>
							<td>
								<router-link
									class="text-emerald fw-bold"
									:to="{name:'adminPanelTalentInfo',params:{talentId:req.talentId._id}}"
								>View</router-link>
							</td>
							<td> {{req.type}} </td>
							<td> {{ req.companyName ? req.companyName : req.name }} </td>
							<td> {{ req.occasion ? req.occasion : '-' }} </td>
							<td> {{ req.price }}$ </td>
							<td> {{ new Date(req.createdAt).toLocaleString() }} </td>
							<td> {{ req.deliveryDate? new Date(req.deliveryDate).toLocaleString() :'-' }} </td>
							<td
								v-if="req.status === 0"
								class="text-danger fw-bold"
							> Rejected </td>
							<td
								v-if="req.status === 1"
								class="text-danger fw-bold"
							> Waiting for Talent Accept </td>
							<td
								v-if="req.status === 2"
								class="text-emerald fw-bold"
							> Processing </td>
							<td
								v-if="req.status === 3"
								class="text-danger fw-bold"
							> Waiting for User Accept </td>
							<td
								v-if="req.status === 4"
								class="text-emerald fw-bold"
							> Completed </td>
							<td>
								<button
									class="btn bg-gradient-dark mb-0"
									data-bs-toggle="modal"
									data-bs-target="#exampleModal"
									@click="selectRequest(req._id)"
								>View More</button>
							</td>
							<td>
								<button
									class="btn bg-gradient-main text-white mb-0 ms-2"
									data-bs-toggle="modal"
									data-bs-target="#editModal"
									@click="selectRequest(req._id); edit.status=req.status; edit.instructions=req.instructions"
								>Edit</button>
							</td>
							<td>
								<button
									class="btn bg-gradient-danger text-white mb-0 ms-2"
									data-bs-toggle="modal"
									data-bs-target="#deleteModal"
									@click="selectRequest(req._id);"
								>Delete</button>
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
					v-if="!searchQuery && !isStatusFilterEnabled"
				></the-pagination>
				<the-pagination
					:data-in-each-page="dataInEachPage"
					:data-length="totalItems"
					@navigate-page="navigateWhenFilterEnabled"
					v-if="!searchQuery && isStatusFilterEnabled"
				></the-pagination>
			</div>
		</div>
		<loading
			v-model:active="isLoading"
			:can-cancel="false"
			:is-full-page="true"
		/>
		<delete-modal
			title="Delete Order"
			@deleted="deleteOrder"
		></delete-modal>
		<!-- INFO MODAL -->
		<div
			class="modal fade"
			id="exampleModal"
		>
			<div class="modal-dialog modal-lg modal-dialog-centered">
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
						<!-- CUSTOMER INFO -->
						<p class="fw-bold text-danger">Customer Info:</p>
						<p class="mb-1">Name: {{ selectedRequest.userId?.fullName }} </p>
						<p class="mb-1">Email: {{ selectedRequest.userId?.email }} </p>
						<p class="mb-1">Phone Number: {{ selectedRequest.userId?.phoneNumber }} </p>
						<hr>
						<!-- TALENT INFO -->
						<p class="fw-bold text-danger">Talent Info:</p>
						<p class="mb-1">Name: {{ selectedRequest.talentId?.name }} </p>
						<p class="mb-1">Email: {{ selectedRequest.talentId?.email }} </p>
						<p class="mb-1">Social media: {{ selectedRequest.talentId?.socialNetwork }} </p>
						<p class="mb-1">Followers: {{ selectedRequest.talentId?.followers }} </p>
						<p class="mb-1">View talent profile: <router-link
								class="text-emerald fw-bold"
								:to="{name:'adminPanelTalentInfo',params:{talentId:selectedRequest.talentId?._id ? selectedRequest.talentId?._id :'undefined'}}"
							>View</router-link>
						</p>
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
						<div
							class="text-center mt-3"
							v-if="selectedRequest.status===3 || selectedRequest.status===4"
						>
							<button
								class="btn bg-gradient-dark"
								@click="downloadVideo"
							>
								<i class="fa-duotone fa-download me-2"></i>
								Download Video
							</button>
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
						<form @submit.prevent="editOrder">
							<div class="mb-3">
								<label for="">Change Status</label>
								<select
									class="form-control"
									v-model="edit.status"
								>
									<option value="0">Rejected</option>
									<option value="1">Waiting for talent accept</option>
									<option value="2">Processing</option>
									<option value="3">Waiting for user accept</option>
									<option value="4">Completed</option>
								</select>
							</div>
							<div class="mb-3">
								<label for="">Instructions</label>
								<textarea
									class="form-control"
									v-model="edit.instructions"
								></textarea>
							</div>
							<button class="btn bg-gradient-main w-100 mt-3 text-lg text-white">
								<i class="fa-duotone fa-check-circle me-2"></i>
								<span>EDIT</span>
							</button>
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
import DeleteModal from "../../components/UI/DeleteModal.vue";
export default {
	components: { DeleteModal },
	data() {
		return {
			status: {
				0: "Rejected",
				1: "Waiting for Talent Accept",
				2: "Processing",
				3: "Waiting for User Accept",
				4: "Completed",
			},
			dataInEachPage: 15,
			totalItems: 0,
			isLoading: false,
			selectedRequest: {},
			searchQuery: "",
			isStatusFilterEnabled: false,
			statusFilter: "",
			edit: {
				status: "",
				instructions: "",
			},
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/getAllRequests", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["admin/allRequests"].totalItems;
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
				const res = await this.$store.dispatch("admin/downloadVideo", {
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
		selectRequest(id) {
			this.selectedRequest = this.requests.find((req) => req._id === id);
		},
		navigateWhenFilterEnabled(page) {
			this.selectStatus(this.statusFilter, page);
		},
		async selectStatus(status, page = 1) {
			this.isLoading = true;
			this.isStatusFilterEnabled = true;
			this.statusFilter = status;
			try {
				await this.$store.dispatch("admin/filterRequests", {
					status,
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["admin/allRequests"].totalItems;
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async editOrder() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/editRequest", {
					data: this.edit,
					orderId: this.selectedRequest._id,
				});
				this.$swal({
					icon: "success",
					text: "order has changed successfully!",
				});

				setTimeout(() => {
					window.location.reload();
				}, 1500);
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async deleteOrder() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/deleteRequest", {
					orderId: this.selectedRequest._id,
				});
				this.$swal({
					icon: "success",
					text: "order was deleted successfully!",
				});

				setTimeout(() => {
					window.location.reload();
				}, 1500);
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
			if (oldVal == newVal) return;
			try {
				await this.$store.dispatch("admin/searchRequests", {
					query: newVal,
				});
				this.totalItems =
					this.$store.getters["admin/allRequests"].totalItems;
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
		requests() {
			return this.$store.getters["admin/allRequests"].requests;
		},
	},
	created() {
		this.init();
	},
};
</script>
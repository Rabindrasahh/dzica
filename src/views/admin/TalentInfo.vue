<template>
	<div class="card">
		<div class="card-header bg-gradient-dark ">
			<h4 class="text-white"> {{ talent.name }} Info </h4>
		</div>
		<div class="card-body">
			<p>Do you want to see {{ talent.name }}'s public page?
				<router-link :to="{name:'talentInfo',params:{talentId:talent._id? talent._id :'undefined'}}">Click here!</router-link>
			</p>
			<hr>
			<!-- Personal Info: -->
			<h5 class="text-danger">Personal Info:</h5>
			<p><span class="fw-bold">Name:</span> {{ talent.name }} </p>
			<p><span class="fw-bold">Email:</span> {{ talent.email }} </p>
			<p><span class="fw-bold">Phone Number:</span> {{ talent.phoneNumber }} </p>
			<p><span class="fw-bold">Known as:</span> {{ talent.nickName }} </p>
			<p v-if="talent.agencyName"><span class="fw-bold">Agency Name:</span> {{ talent.agencyName }} </p>
			<p><span class="fw-bold">Social Media:</span> {{ talent.socialNetwork }} </p>
			<p><span class="fw-bold">Followers:</span> {{ talent.followers }} </p>
			<p><span class="fw-bold">Rating:</span> {{ talent.rating }} </p>
			<p><span class="fw-bold">Description:</span> {{ talent.description }}</p>
			<hr>
			<!-- Balance Info: -->
			<h5 class="text-danger">Balance Info:</h5>
			<p><span class="fw-bold">Balance:</span> ${{ talent.balance }} </p>
			<p><span class="fw-bold">Total Paid Amount:</span> ${{ talent.totalPaidAmount }} </p>
			<p><span class="fw-bold">Total Pending Amount:</span> ${{ talent.totalPendingAmount }} </p>
			<p><span class="fw-bold">Total Earned Amount:</span> ${{ talent.totalEarnedAmount }} </p>
			<hr>
			<!-- Requests Info: -->
			<h5 class="text-danger">Requests Info:</h5>
			<p><span class="fw-bold">Requests count:</span> {{ talent.requestsCount }} </p>
			<p><span class="fw-bold">Pending requests count:</span> {{ talent.pendingRequestsCount }} </p>
			<p><span class="fw-bold">Normal video price:</span> ${{ talent.normalPrice }} </p>
			<p><span class="fw-bold">Marketing video price:</span> ${{ talent.marketingPrice }} </p>
			<hr>
			<!-- Transactions -->
			<h5 class="text-danger">Transactions Info:</h5>
			<div class="table-responsive mt-4">
				<table class="table">
					<thead>
						<th>Date</th>
						<th>Amount</th>
						<th>Payment way</th>
						<th>Payment info</th>
						<th>Status</th>
						<th>Change status</th>
					</thead>
					<tbody>
						<tr
							v-for="transaction in transactions"
							:key="transaction._id"
						>
							<td> {{ new Date(transaction.createdAt).toLocaleString() }} </td>
							<td> ${{transaction.amount}} </td>
							<td> {{transaction.paymentWay}} </td>
							<td v-if="transaction.paymentWay==='PayPal'">
								<p class="mb-0"><span class="fw-bold">Email:</span> {{transaction.email}}</p>
							</td>
							<td v-if="transaction.paymentWay==='Bank Transfer'">
								<p><span class="fw-bold">Bank name:</span> {{transaction.bankName}}</p>
								<p class="mb-0"><span class="fw-bold">Bank account number:</span> {{transaction.bankAccountNumber}}</p>
							</td>
							<td
								v-if="transaction.status === 0"
								class="text-danger fw-bold"
							> Rejected </td>
							<td
								v-if="transaction.status === 1"
								class="text-warning fw-bold"
							> Pending </td>
							<td
								v-if="transaction.status === 2"
								class="text-emerald fw-bold"
							> Completed </td>
							<td>
								<button
									class="btn bg-gradient-dark mb-0"
									data-bs-target="#transactionModal"
									data-bs-toggle="modal"
									@click="selectedItem=transaction"
								>Change</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<hr>
			<!-- Orders -->
			<h5 class="text-danger">Orders Info:</h5>
			<div class="table-responsive mt-3">
				<table class="table">
					<thead>
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
							v-for="req in orders"
							:key="req._id"
						>
							<td> {{req.type}} </td>
							<td> {{ req.companyName ? req.companyName : req.name }} </td>
							<td> {{ req.occasion ? req.occasion : '-' }} </td>
							<td> ${{ req.price }} </td>
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
		<!-- TRANSACTION MODAL -->
		<div
			class="modal fade"
			id="transactionModal"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>Edit transaction status</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						>
							<span>&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="editTransaction">
							<label for="">Status:</label>
							<select
								class="form-control"
								v-model="status"
							>
								<option value="0">Rejected</option>
								<option value="1">Pending</option>
								<option value="2">Completed</option>
							</select>
							<div class="text-center mt-4">
								<button
									type="submit"
									class="btn bg-gradient-main text-white w-100"
								>Sumbit</button>
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
export default {
	data() {
		return {
			isLoading: false,
			selectedRequest: {},
			selectedItem: {},
			edit: {
				status: "",
				instructions: "",
			},
			status: 0,
		};
	},
	props: ["talentId"],
	methods: {
		async init() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/getTalentAllInfo", {
					talentId: this.talentId,
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
			this.selectedRequest = this.orders.find((req) => req._id === id);
			console.log(this.selectedRequest);
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
		async editTransaction() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("transaction/editTransaction", {
					id: this.selectedItem._id,
					status: +this.status,
				});
				this.$swal({
					icon: "success",
					text: "The transaction request was edited successfully!",
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
	},
	computed: {
		talent() {
			if (this.$store.getters["admin/talentAllInfo"].talent)
				return this.$store.getters["admin/talentAllInfo"].talent;
			else return {};
		},
		transactions() {
			if (this.$store.getters["admin/talentAllInfo"].transactions)
				return this.$store.getters["admin/talentAllInfo"].transactions;
			else return {};
		},
		orders() {
			if (this.$store.getters["admin/talentAllInfo"].orders)
				return this.$store.getters["admin/talentAllInfo"].orders;
			else return {};
		},
	},
	created() {
		this.init();

		const modalBack = document.querySelector(".modal-backdrop");
		if (modalBack) modalBack.remove();
		document.body.style.overflow = "visible";
	},
};
</script>

<style lang="scss" scoped>
tr {
	vertical-align: middle;
}

p {
	margin-bottom: 12.5px !important;
}
</style>
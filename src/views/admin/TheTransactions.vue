<template>
	<div class="card">
		<div class="card-header bg-gradient-dark">
			<h4 class="text-white">Transactions</h4>
		</div>
		<div class="card-body">
			<div class="flex flex-wrap">
				Filter:
				<span
					class="badge bg-gradient-main cursor-pointer"
					@click="status='completed'"
				>Completed</span>
				<span
					class="badge bg-gradient-main ms-2 cursor-pointer"
					@click="status='pending'"
				>Pending</span>
				<span
					class="badge bg-gradient-main ms-2 cursor-pointer"
					@click="status='rejected'"
				>Rejected</span>
			</div>
			<div class="table-responsive mt-4">
				<table class="table">
					<thead>
						<th>Talent</th>
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
							<td>
								{{transaction.talentId?.name}} &nbsp;&nbsp;
								<router-link :to="{name:'talentInfo',params:{talentId:transaction.talentId?._id}}">View Profile</router-link>
							</td>
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
									data-bs-target="#exampleModal"
									data-bs-toggle="modal"
									@click="selectedItem=transaction"
								>Change</button>
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
								v-model="selectedStatus"
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
			dataInEachPage: 10,
			totalItems: 0,
			isLoading: false,
			selectedItem: {},
			status: undefined,
			selectedStatus: 0,
		};
	},
	watch: {
		status(newVal, oldVal) {
			if (newVal !== oldVal) this.init();
		},
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("transaction/getAllTransactions", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
					status: this.status,
				});
				this.totalItems =
					this.$store.getters["transaction/transactions"].totalItems;
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
					status: +this.selectedStatus,
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
		transactions() {
			return this.$store.getters["transaction/transactions"].transactions;
		},
		profile() {
			return this.$store.getters["talent/myProfile"];
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


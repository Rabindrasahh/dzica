<template>
	<div class="card">
		<div class="card-header bg-gradient-main">
			<h4 class="text-white">Transactions</h4>
		</div>
		<div class="card-body">
			<button
				class="btn bg-gradient-main text-white"
				data-bs-target="#exampleModal"
				data-bs-toggle="modal"
			>
				<i class="fas fa-plus-circle me-2"></i>
				<span>New transaction</span>
			</button>
			<div class="table-responsive mt-3">
				<table class="table">
					<thead>
						<th>Date</th>
						<th>Amount</th>
						<th>Payment way</th>
						<th>Status</th>
					</thead>
					<tbody>
						<tr
							v-for="transaction in transactions"
							:key="transaction._id"
						>
							<td> {{ new Date(transaction.createdAt).toLocaleDateString() }} </td>
							<td> {{transaction.amount}} </td>
							<td> {{transaction.paymentWay}} </td>
							<td
								v-if="transaction.status === 0"
								class="text-danger"
							> Rejected </td>
							<td
								v-if="transaction.status === 1"
								class="text-warning"
							> Pending </td>
							<td
								v-if="transaction.status === 2"
								class="text-emerald"
							> Completed </td>
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
						>Submit new transaction</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						>
							<span>&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="newTransaction">
							<div class="mb-3">
								<label for="">Amount</label>
								<input
									type="text"
									class="form-control"
									placeholder="Amount"
									v-model="amount"
									:class="{'is-invalid':v$.amount.$error}"
								>
								<span
									v-if="v$.amount.$error"
									class="text-sm text-danger"
								>
									{{ v$.amount.$errors[0].$message }}
								</span>
							</div>
							<div class="mb-3">
								<label for="">Payment Way</label>
								<select
									class="form-control"
									v-model="paymentWay"
									:class="{'is-invalid':v$.paymentWay.$error}"
								>
									<option value="PayPal">PayPal</option>
									<option value="Bank Transfer">Bank Transfer</option>
								</select>
							</div>
							<div v-if="paymentWay === 'PayPal'">
								<div class="mb-3">
									<label for="">PayPal Email</label>
									<input
										type="text"
										class="form-control"
										placeholder="PayPal Email"
										v-model="email"
										:class="{'is-invalid':v$.email.$error}"
									>
									<span
										v-if="v$.email.$error"
										class="text-sm text-danger"
									>
										{{ v$.email.$errors[0].$message }}
									</span>
								</div>
							</div>
							<div v-if="paymentWay === 'Bank Transfer'">
								<div class="mb-3">
									<label for="">Bank Name</label>
									<input
										type="text"
										class="form-control"
										placeholder="Bank Name"
										v-model="bankName"
									>
								</div>
								<div class="mb-3">
									<label for="">Bank Account Number</label>
									<input
										type="text"
										class="form-control"
										placeholder="Bank Account Number"
										v-model="bankAccountNumber"
									>
								</div>
							</div>
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
import useVuelidate from "@vuelidate/core";
import { required, helpers, email, numeric } from "@vuelidate/validators";

export default {
	setup: () => ({ v$: useVuelidate() }),
	validations() {
		return {
			amount: {
				required: helpers.withMessage(
					"Please enter an amount",
					required
				),
				numeric: helpers.withMessage(
					"Amount should be numeric",
					numeric
				),
			},
			email: {
				email: helpers.withMessage(
					"Please Enter Your Email Correctly",
					email
				),
			},
			paymentWay: {
				required: helpers.withMessage(
					"Please select a payment way",
					required
				),
			},
		};
	},
	data() {
		return {
			dataInEachPage: 10,
			totalItems: 0,
			isLoading: false,
			amount: 0,
			paymentWay: "",
			email: "",
			bankName: "",
			bankAccountNumber: "",
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch(
					"transaction/getTalentTransactions",
					{
						skip: (page - 1) * this.dataInEachPage,
						limit: this.dataInEachPage,
					}
				);
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
		async newTransaction() {
			const result = await this.v$.$validate();
			if (!result) return;

			if (this.paymentWay === "PayPal" && !this.email) {
				this.$swal({
					icon: "error",
					text: "Please Enter your email",
				});
				return;
			}
			if (this.paymentWay === "Bank Transfer" && !this.bankName) {
				this.$swal({
					icon: "error",
					text: "Please Enter your bank name",
				});
				return;
			}
			if (
				this.paymentWay === "Bank Transfer" &&
				!this.bankAccountNumber
			) {
				this.$swal({
					icon: "error",
					text: "Please Enter your bank account number",
				});
				return;
			}
			if (this.amount > this.profile.balance) {
				this.$swal({
					icon: "error",
					text: "Your balance is less than " + this.amount,
				});
				return;
			}

			this.isLoading = true;
			try {
				await this.$store.dispatch("transaction/newTransaction", {
					amount: this.amount,
					paymentWay: this.paymentWay,
					email: this.email,
					bankName: this.bankName,
					bankAccountNumber: this.bankAccountNumber,
				});
				await this.$store.dispatch("talent/getMyProfile");
				this.$swal({
					icon: "success",
					text: "Your request was submitted successfully!",
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


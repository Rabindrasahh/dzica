<template>
	<div class="row">
		<div class="col-lg-4 col-md-6 mt-4">
			<div class="card">
				<div class="card-header bg-gradient-main">
					<h4 class="text-white">New Pending Requests</h4>
				</div>
				<div class="card-body">
					<p class="h5">
						You have <span class="badge bg-gradient-main text-white"> {{ talent.pendingRequestsCount ? talent.pendingRequestsCount :0 }} </span> new requests
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-4 col-md-6 mt-4">
			<div class="card">
				<div class="card-header bg-gradient-main">
					<h4 class="text-white">Total Received Requests</h4>
				</div>
				<div class="card-body">
					<p class="h5">
						You received <span class="badge bg-gradient-main text-white"> {{ talent.requestsCount ? talent.requestsCount :0 }} </span> requests
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-4 col-md-6 mt-4">
			<div class="card">
				<div class="card-header bg-gradient-main">
					<h4 class="text-white">Current balance</h4>
				</div>
				<div class="card-body">
					<p class="h5">
						Your current balance is <span class="badge bg-gradient-main text-white">$ {{ talent.balance }} </span>
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-4 col-md-6 mt-4">
			<div class="card">
				<div class="card-header bg-gradient-main">
					<h4 class="text-white">Total gained balance</h4>
				</div>
				<div class="card-body">
					<p class="h5">
						You have earned <span class="badge bg-gradient-main text-white">${{ talent.totalEarnedAmount ? talent.totalEarnedAmount :0 }}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-4 col-md-6 mt-4">
			<div class="card">
				<div class="card-header bg-gradient-main">
					<h4 class="text-white">Pending amount</h4>
				</div>
				<div class="card-body">
					<p class="h5">
						Your current balance is <span class="badge bg-gradient-main text-white">$ {{ talent.totalPendingAmount? talent.totalPendingAmount :0 }} </span>
					</p>
				</div>
			</div>
		</div>
		<div class="col-lg-4 col-md-6 mt-4">
			<div class="card">
				<div class="card-header bg-gradient-main">
					<h4 class="text-white">Total paid amount</h4>
				</div>
				<div class="card-body">
					<p class="h5">
						You have received <span class="badge bg-gradient-main text-white">$ {{ talent.totalPaidAmount? talent.totalPaidAmount :0 }} </span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		talent() {
			return this.$store.getters["talent/myProfile"];
		},
	},
};
</script>
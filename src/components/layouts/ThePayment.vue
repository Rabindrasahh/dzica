<template>
	<div>

	</div>
	<!-- stripe-checkout -->
</template>

<script>
export default {
	methods: {
		submit() {
			console.log(this.$refs.checkoutRef);
			// You will be redirected to Stripe's secure checkout page
			this.$refs.checkoutRef.redirectToCheckout();
		},
	},
	created() {
		this.submit();
	},
};
</script>
<template>
	<div>
		<the-navbar></the-navbar>
		<div class="container mt-4">
			<div class="row justify-content-center">
				<article-card
					v-for="article in articles"
					:key="article"
					:data="article"
				></article-card>
			</div>
			<div class="row justify-content-center mt-3">
				<the-pagination
					:data-in-each-page="dataInEachPage"
					:data-length="totalItems"
					@navigate-page="init"
				></the-pagination>
			</div>
		</div>
		<the-footer></the-footer>
		<loading
			:can-cancel="false"
			v-model:active="isLoading"
		/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataInEachPage: 12,
			isLoading: false,
			totalItems: 0,
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("site/getArticles", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["site/articles"].totalItems;
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
		articles() {
			return this.$store.getters["site/articles"].articles;
		},
	},
	created() {
		this.init();
	},
};
</script>
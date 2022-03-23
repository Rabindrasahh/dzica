<template>
	<div>
		<the-navbar></the-navbar>
		<div class="container mt-5">
			<div class="row justify-content-center">
				<div class="row px-4">
					<input
						type="text"
						class="form-control"
						placeholder="Search..."
						v-model="searchQuery"
					>
					<div class="d-flex flex-wrap">
						<p class="fw-bold mt-3 mb-0 me-2 text-dark">Categories:</p>
						<span
							v-for="category in categories"
							:key="category"
							class="badge bg-gradient-main text-white me-2 mt-3 cursor-pointer"
							@click="selectCategory(category.name)"
						> {{ category.name }} </span>
					</div>
				</div>
				<div class="row mt-2">
					<celebrity-card
						v-for="talent in talents"
						:key="talent._id"
						:data="talent"
					></celebrity-card>
				</div>
				<div class="row justify-content-center mt-3">
					<the-pagination
						:data-in-each-page="dataInEachPage"
						:data-length="totalItems"
						@navigate-page="init"
						v-if="!searchQuery "
					></the-pagination>
				</div>
			</div>
		</div>
		<loading
			v-model:active="isLoading"
			:can-cancel="false"
			:is-full-page="true"
		/>
		<the-footer></the-footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchQuery: "",
			dataInEachPage: 20,
			isLoading: false,
			totalItems: 0,
			isCategorySelected: false,
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("talent/getAllTalents", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["talent/allTalents"].totalItems;
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async selectCategory(category) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("talent/searchTalentsByCategory", {
					category,
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
	watch: {
		async searchQuery(newVal) {
			try {
				await this.$store.dispatch("talent/searchTalents", {
					query: newVal,
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
		talents() {
			return this.$store.getters["talent/allTalents"].talents;
		},
		categories() {
			return this.$store.getters["talent/allTalents"].categories;
		},
	},
	created() {
		if (this.$route.query.search) {
			this.searchQuery = this.$route.query.search;
		} else if (this.$route.query.category) {
			this.selectCategory(this.$route.query.category);
		} else this.init();
	},
};
</script>

<style lang="scss" scoped>
.form-control {
	border-radius: 50px;
	padding-left: 25px;
}
</style>
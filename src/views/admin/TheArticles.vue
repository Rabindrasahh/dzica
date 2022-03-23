<template>
	<div class="card">
		<div class="card-header bg-gradient-dark ">
			<h4 class="text-white">Articles</h4>
		</div>
		<div class="card-body">
			<router-link
				:to="{name:'adminPanelNewArticle'}"
				class="btn bg-gradient-dark "
			>
				<i class="fa-regular fa-plus-circle me-2"></i>
				<span>new Article</span>
			</router-link>
			<div class="table-responsive mt-3">
				<table class="table">
					<thead>
						<th></th>
						<th>Title</th>
						<th>Created At</th>
						<th>Edit</th>
						<th>Delete</th>
					</thead>
					<tbody>
						<tr
							v-for="article in articles"
							:key="article._id"
						>
							<td>
								<img
									:src="`https://dzicace.herokuapp.com/${article.image}`"
									class="image"
								>
							</td>
							<td> {{ article.title }} </td>
							<td> {{ new Date(article.createdAt).toLocaleString() }} </td>
							<td>
								<router-link
									:to="{name:'adminPanelEditArticle',params:{articleId:article._id}}"
									class="fa-duotone fa-pen ms-3 text-emerald cursor-pointer"
								></router-link>
							</td>
							<td>
								<i
									class="fa-duotone fa-trash text-danger cursor-pointer"
									data-bs-toggle="modal"
									data-bs-target="#deleteModal"
									@click="selectedArticleForDelete=article._id"
								></i>
							</td>
						</tr>
					</tbody>
				</table>

			</div>
			<div class="row justify-content-center mt-3">
				<the-pagination
					:data-in-each-page="dataInEachPage"
					:data-length="totalItems"
					@navigate-page="init"
				></the-pagination>
			</div>
		</div>
		<delete-modal
			title="Delete Article"
			@deleted="deleteArticle"
		></delete-modal>

		<loading
			v-model:active="isLoading"
			:can-cancel="false"
			:is-full-page="true"
		/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataInEachPage: 15,
			isLoading: false,
			selectedArticleForDelete: null,
			totalItems: 0,
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("admin/getArticles", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["admin/articles"].totalItems;
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async deleteArticle() {
			this.isLoading = true;
			console.log(this.selectedArticleForDelete);
			try {
				await this.$store.dispatch("admin/deleteArticle", {
					articleId: this.selectedArticleForDelete,
				});
				this.$swal({
					icon: "success",
					text: "The article deleted successfully!",
				});

				const newArticles = this.articles.filter(
					(c) => c._id !== this.selectedArticleForDelete
				);
				this.$store.commit("admin/setArticles", {
					articles: newArticles,
					totalItems: this.totalItems - 1,
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
		articles() {
			return this.$store.getters["admin/articles"].articles;
		},
	},
	created() {
		this.init();
	},
};
</script>

<style lang="scss" scoped>
.image {
	object-fit: cover;
	width: 80%;
	height: 60px;
}
tr {
	vertical-align: middle;
}
</style>
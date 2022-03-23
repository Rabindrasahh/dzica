<template>
	<div class="card">
		<div class="card-header bg-gradient-main">
			<h4 class="text-white">Pending Orders</h4>
		</div>
		<div class="card-body">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<th>Talent Name</th>
						<th>View Talent Profile </th>
						<th>Unbookmark</th>
					</thead>
					<tbody>
						<tr
							v-for="bookmark in bookmarks"
							:key="bookmark._id"
						>
							<td> {{bookmark.talentId?.name}} </td>
							<td>
								<router-link
									class="btn bg-gradient-main text-white mb-0"
									:to="{name:'talentInfo', params:{talentId: bookmark.talentId?._id ? bookmark.talentId._id : 'undefined'}}"
								>
									View
								</router-link>
							</td>
							<td>
								<i
									class="fas fa-bookmark cursor-pointer"
									@click="unbookmark(bookmark._id,bookmark.talentId?._id)"
								></i>
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
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataInEachPage: 10,
			totalItems: 0,
			isLoading: false,
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("site/getBookmarks", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["site/bookmarks"].totalItems;
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
			this.isLoading = false;
		},
		async unbookmark(bookmarkId, talentId) {
			try {
				await this.$store.dispatch("site/unbookmark", {
					talentId,
				});
				const newBookmarks = this.bookmarks.filter(
					(bookmark) => bookmark._id !== bookmarkId
				);
				this.$store.commit("site/setBookmarks", newBookmarks);
			} catch (err) {
				this.$swal({
					icon: "error",
					text: err.message,
				});
			}
		},
	},
	computed: {
		bookmarks() {
			return this.$store.getters["site/bookmarks"].bookmarks;
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


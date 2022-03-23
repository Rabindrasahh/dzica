<template>
	<div class="card">
		<div class="card-header bg-gradient-main">
			<h4 class="text-white">My Videos</h4>
		</div>
		<div class="card-body">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<th>Client name</th>
						<th>Watch video</th>
					</thead>
					<tbody>
						<tr
							v-for="vid in videos"
							:key="vid._id"
						>
							<td> {{vid.userId.fullName}} </td>
							<td>
								<button
									class="btn bg-gradient-dark mb-0"
									@click="selectedVideoToWatch=vid.video"
									data-bs-toggle="modal"
									data-bs-target="#exampleModal"
								>
									<i class="fa-duotone fa-eye me-2"> </i>
									<span>watch</span>
								</button>
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
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title"
							id="exampleModalLabel"
						>Modal title</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
						></button>
					</div>
					<div class="modal-body">
						<video
							controls
							autoplay="autoplay"
							class="w-100"
							:key="`https://dzicace.herokuapp.com/${selectedVideoToWatch}`"
						>
							<source
								:src="`https://dzicace.herokuapp.com/${selectedVideoToWatch}`"
								:type="`video/${selectedVideoToWatch.split('.')[1]}`"
							>

							Sorry, your browser doesn't support embedded videos.
						</video>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
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
			selectedVideoToWatch: "",
		};
	},
	methods: {
		async init(page = 1) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("talent/getMyVideos", {
					skip: (page - 1) * this.dataInEachPage,
					limit: this.dataInEachPage,
				});
				this.totalItems =
					this.$store.getters["talent/myVideos"].totalItems;
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
		videos() {
			return this.$store.getters["talent/myVideos"].videos;
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


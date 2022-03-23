<template>
	<div>
		<the-navbar></the-navbar>
		<div class="container mt-4">
			<div class="row justify-content-center">
				<div class="col-12 mb-4">
					<div class=" mt-3">
						<div class="card flex-auto">
							<img
								class="card-img-top"
								:src="`https://dzicace.herokuapp.com/${article.image}`"
							>
							<div
								class="position-relative overflow-hidden"
								style="height:50px;margin-top:-50px;"
							>
								<div class="position-absolute w-100 top-0 z-index-1">
									<svg
										class="waves waves-sm"
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										viewBox="0 24 150 40"
										preserveAspectRatio="none"
										shape-rendering="auto"
									>
										<defs>
											<path
												id="card-wave"
												d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
											></path>
										</defs>
										<g class="moving-waves">
											<use
												xlink:href="#card-wave"
												x="48"
												y="-1"
												fill="rgba(255,255,255,0.30"
											></use>
											<use
												xlink:href="#card-wave"
												x="48"
												y="3"
												fill="rgba(255,255,255,0.35)"
											></use>
											<use
												xlink:href="#card-wave"
												x="48"
												y="5"
												fill="rgba(255,255,255,0.25)"
											></use>
											<use
												xlink:href="#card-wave"
												x="48"
												y="8"
												fill="rgba(255,255,255,0.20)"
											></use>
											<use
												xlink:href="#card-wave"
												x="48"
												y="13"
												fill="rgba(255,255,255,0.15)"
											></use>
											<use
												xlink:href="#card-wave"
												x="48"
												y="16"
												fill="rgba(255,255,255,0.99)"
											></use>
										</g>
									</svg>
								</div>
							</div>
							<div class="card-body">
								<h3 class="mb-0"> {{ article.title }} </h3>
								<p
									class="mt-3"
									v-html="article.content"
								>

								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<loading
			:can-cancel="false"
			v-model:active="isLoading"
		/>
		<the-footer></the-footer>
	</div>
</template>

<script>
export default {
	props: ["articleId"],
	data() {
		return {
			isLoading: false,
		};
	},
	methods: {
		async init() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("site/getSingleArticle", {
					articleId: this.articleId,
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
		article() {
			return this.$store.getters["site/singleArticle"];
		},
	},
	created() {
		this.init();
	},
};
</script>

<style lang="scss" scoped>
.card-img-top {
	object-fit: cover;
	max-height: 500px;
}
</style>
<template>
	<div class="col-md-6 col-xxl-3 mt-4">
		<div class="card flex-auto">
			<img
				class="card-img-top"
				:src="`https://dzicace.herokuapp.com/${data.image}`"
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
				<h4> {{ data.title }} </h4>
				<p>
					{{ content  }}
				</p>
				<router-link
					:to="{name:'article',params:{articleId:data._id}}"
					class="text-bottle icon-move-right"
				>Read More
					<i
						class="fas fa-arrow-right text-xs ms-1"
						aria-hidden="true"
					></i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["data"],
	computed: {
		content() {
			return `${this.data.content
				?.replace(/<\/?[^>]+(>|$)/g, "")
				.slice(0, 150)}...`;
		},
	},
};
</script>
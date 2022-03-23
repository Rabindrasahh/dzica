<template>
	<div class="c-card mt-3">
		<router-link :to="{name:'talentInfo',params:{talentId:data._id}}">
			<div class="image-card">
				<img
					v-if="data.profileImage"
					:src="`https://dzicace.herokuapp.com/${data.profileImage}`"
					:alt="data.name"
				>
				<img
					v-else
					src="../../assets/img/user-placeholder.png"
					:alt="data.name"
				>
			</div>
			<div class="ms-1">
				<h4 class="mt-2 mb-0"> {{ data.name }} </h4>
				<p class="text-dark mb-1"> {{ data.categoryId?.name }} </p>
				<p class=" text-dark">
					<span class="text-sm">From</span>
					<span class="fw-bold ms-2">${{ data.normalPrice }}</span>
				</p>
			</div>
		</router-link>
	</div>

</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.c-card {
	width: 20%;

	@media screen and (max-width: 1200px) {
		width: 33%;
	}
	@media screen and (max-width: 768px) {
		width: 50%;
	}
	@media screen and (max-width: 450px) {
		width: 100%;
	}
}
.image-card {
	overflow: hidden;
	border-radius: 20px;
}
img {
	width: 100%;
	height: 300px;
	object-fit: cover;
	transition: all 0.4s cubic-bezier(0.17, 0.67, 0.13, 1.02) 0s;

	&:hover {
		transform: scale(1.1);
	}
}
</style>
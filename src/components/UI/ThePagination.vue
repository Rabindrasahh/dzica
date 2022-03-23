<template>
	<nav
		aria-label="Page navigation example "
		v-if="dataLength > dataInEachPage"
	>
		<ul class="pagination justify-content-center mt-3 mb-4">
			<li
				class="page-item"
				:class="{ disabled: curPage === 1 }"
			>
				<a
					class="page-link"
					@click="navigatePage(curPage - 1)"
				>
					<i class="fa fa-angle-right"></i>
				</a>
			</li>
			<li
				class="page-item"
				:class="{ active: i === curPage }"
				v-for="(i, key) in pagesCount"
				:key="i"
			>
				<a
					v-if="
						key === 0 ||
						key === pagesCount - 1 ||
						key === curPage ||
						key + 1 === curPage ||
						key - 1 === curPage ||
						key + 2 === curPage
					"
					class="page-link"
					@click="navigatePage(i)"
				>
					{{ i }}
				</a>
				<a
					v-else-if="key === curPage - 3"
					class="page-link"
				> ... </a>
				<a
					v-if="key === pagesCount - 2 && curPage < key - 1"
					class="page-link"
				>
					...
				</a>
			</li>
			<li
				class="page-item"
				:class="{ disabled: curPage === pagesCount }"
			>
				<a
					class="page-link"
					@click="navigatePage(curPage + 1)"
					tabindex="-1"
				>
					<i class="fa fa-angle-left"></i>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			curPage: 1,
			pagesCount: 0,
		};
	},
	props: {
		dataInEachPage: {
			type: Number,
			required: true,
		},
		dataLength: {
			type: Number,
			required: true,
		},
		// pagesCount: {
		// 	type: Number,
		// 	required: true,
		// },
	},
	methods: {
		navigatePage(targetPage) {
			this.pagesCount = Math.ceil(this.dataLength / this.dataInEachPage);
			this.curPage = targetPage;
			const startIndex =
				this.dataInEachPage * targetPage - this.dataInEachPage;
			let finishIndex = startIndex + this.dataInEachPage;

			if (finishIndex > this.dataLength) finishIndex = this.dataLength;

			// scroll up
			window.scrollTo(0, 0);

			this.$emit("navigate-page", this.curPage);
		},
	},
	watch: {
		dataLength(newVal, oldVal) {
			if (newVal !== oldVal) {
				this.navigatePage(this.curPage);
			}
		},
	},
};
</script>

<style scoped>
* {
	direction: rtl;
}

.page-item:first-child .page-link {
	border-top-left-radius: 0rem;
	border-bottom-left-radius: 0rem;
	border-top-right-radius: 0.5rem;
	border-bottom-right-radius: 0.5rem;
}

.page-item:last-child .page-link {
	border-top-left-radius: 0.5rem;
	border-bottom-left-radius: 0.5rem;
	border-top-right-radius: 0rem;
	border-bottom-right-radius: 0rem;
}

.page-link {
	cursor: pointer;
}
</style>
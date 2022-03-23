<template>
	<div
		class="modal fade"
		id="deleteModal"
		tabindex="-1"
		role="dialog"
	>
		<div
			class="modal-dialog modal-dialog-centered"
			role="document"
		>
			<div class="modal-content">
				<div class="modal-header bg-gradient-danger">
					<h5
						class="modal-title text-white"
						id="exampleModalLabel"
					>
						<i class="fas fa-trash me-2"></i>
						<span> {{ title }} </span>
					</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					>
					</button>
				</div>
				<div class="modal-body mt-3">
					<p class="fw-bold">
						{{ text }}
					</p>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn bg-gradient-secondary"
						data-bs-dismiss="modal"
					> {{ denyText }} </button>
					<button
						@click.prevent="doDelete"
						class="btn bg-gradient-danger"
					> {{ confirmText }} </button>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: false,
		},
		text: {
			type: String,
			default: "Are you sure?",
		},
		confirmText: {
			type: String,
			default: "Yes!",
		},
		denyText: {
			type: String,
			default: "No!",
		},
	},
	methods: {
		doDelete() {
			this.$emit("deleted");
		},
	},
};
</script>